import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Parser from "rss-parser";

import { SOURCES, matchesAiKeywords } from "./sources.mjs";
import { canonicalId, normalizeTitle, findNearDuplicate } from "./dedupe.mjs";
import { classify } from "./categories.mjs";
import { whyItMatters } from "./enrich.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "data", "items.json");
const MAX_ITEMS = 5000;
const MAX_AGE_DAYS = 180;

const parser = new Parser({ timeout: 15000 });

function stripHtml(html) {
  return (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncateExcerpt(text, maxLen = 200) {
  const clean = stripHtml(text);
  if (clean.length <= maxLen) return clean;
  const cut = clean.slice(0, maxLen);
  const lastSentence = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (lastSentence > maxLen * 0.4) return cut.slice(0, lastSentence + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLen)}...`;
}

async function loadExisting() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function fetchRssSource(source) {
  const feed = await parser.parseURL(source.url);
  return (feed.items || []).map((item) => ({
    title: item.title?.trim() || "(untitled)",
    sourceUrl: item.link,
    publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
    rawExcerpt: item.contentSnippet || item.summary || item.content || "",
  }));
}

async function fetchHnAlgolia(source) {
  const res = await fetch(source.url);
  if (!res.ok) throw new Error(`HN Algolia responded ${res.status}`);
  const json = await res.json();
  return (json.hits || [])
    .filter((hit) => hit.url && hit.title)
    .map((hit) => ({
      title: hit.title.trim(),
      sourceUrl: hit.url,
      publishedAt: hit.created_at || new Date().toISOString(),
      rawExcerpt: "",
    }));
}

async function fetchSource(source) {
  try {
    const raw =
      source.kind === "hn-algolia" ? await fetchHnAlgolia(source) : await fetchRssSource(source);

    const filtered = source.aiFilter
      ? raw.filter((it) => matchesAiKeywords(`${it.title} ${it.rawExcerpt}`))
      : raw;

    console.log(`[${source.name}] fetched ${raw.length} item(s), ${filtered.length} after AI filter`);
    return filtered.map((it) => ({ ...it, sourceName: source.name, defaultCategory: source.category }));
  } catch (err) {
    const level = source.bestEffort ? "log" : "warn";
    console[level](`[${source.name}] fetch failed (${source.bestEffort ? "best-effort source, ignoring" : "non-fatal"}): ${err.message}`);
    return [];
  }
}

async function main() {
  const existing = await loadExisting();
  const existingById = new Map(existing.map((it) => [it.id, it]));
  const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

  const rawResults = await Promise.all(SOURCES.map(fetchSource));
  // Drop anything older than the retention window before dedup/enrich so we
  // never waste a Claude call (or CPU) on an item that gets trimmed anyway -
  // some source feeds (e.g. OpenAI, Hugging Face) serve their entire history
  // on every fetch, not just recent posts.
  const candidates = rawResults.flat().filter((it) => new Date(it.publishedAt).getTime() >= cutoff);

  let newCount = 0;
  let dupCount = 0;
  let mergedCount = 0;

  // Process oldest-first within this batch so near-dup matching against
  // "existing" (which grows as we go) behaves consistently.
  candidates.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));

  for (const cand of candidates) {
    if (!cand.sourceUrl) continue;
    const id = canonicalId(cand.sourceUrl);
    if (existingById.has(id)) {
      dupCount++;
      continue; // exact duplicate, already stored
    }

    const normalizedTitle = normalizeTitle(cand.title);
    const excerpt = truncateExcerpt(cand.rawExcerpt);
    const category = classify(cand.title, cand.rawExcerpt, cand.defaultCategory);

    const nearDup = findNearDuplicate(
      { publishedAt: cand.publishedAt, normalizedTitle, sourceUrl: cand.sourceUrl },
      existing
    );

    if (nearDup) {
      const already = nearDup.alsoCoveredBy.some((c) => c.sourceUrl === cand.sourceUrl);
      if (!already) {
        nearDup.alsoCoveredBy.push({ sourceName: cand.sourceName, sourceUrl: cand.sourceUrl });
      }
      existingById.set(id, nearDup); // so a later exact-dup check against this same URL is caught too
      mergedCount++;
      continue;
    }

    const note = await whyItMatters({ title: cand.title, excerpt, sourceName: cand.sourceName });

    const newItem = {
      id,
      title: cand.title,
      normalizedTitle,
      sourceName: cand.sourceName,
      sourceUrl: cand.sourceUrl,
      publishedAt: cand.publishedAt,
      fetchedAt: new Date().toISOString(),
      excerpt,
      whyItMatters: note,
      category,
      mentionedTools: [],
      dedupGroupId: id,
      alsoCoveredBy: [],
    };

    existing.push(newItem);
    existingById.set(id, newItem);
    newCount++;
  }

  const trimmed = existing
    .filter((it) => new Date(it.publishedAt).getTime() >= cutoff)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, MAX_ITEMS);

  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, `${JSON.stringify(trimmed, null, 2)}\n`, "utf-8");

  console.log(
    `\nDone. ${newCount} new item(s), ${mergedCount} merged into existing stories, ${dupCount} exact duplicate(s) skipped. Store now has ${trimmed.length} item(s).`
  );
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[fetch-feeds] fatal error:", err);
    process.exit(1);
  });
