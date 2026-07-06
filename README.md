# AI News Hub

A daily-updated, curated AI news aggregator. Every few hours it pulls headlines from ~10 public RSS feeds (OpenAI, Google AI, Hugging Face, TechCrunch, VentureBeat, MIT Technology Review, Ars Technica, The Verge, Hacker News, Anthropic), deduplicates them, optionally adds a one-line AI-generated "why it matters" note, and publishes them as a static Next.js site.

Every story links prominently back to its original source. Full articles are never reproduced — only headlines and short RSS excerpts, plus our own original commentary.

## How it works

```
GitHub Actions (every 4h)
  └─ scripts/fetch-feeds.mjs
       ├─ fetch all RSS feeds (scripts/sources.mjs)
       ├─ dedupe: exact URL hash + near-duplicate titles (scripts/dedupe.mjs)
       ├─ enrich: one-line "why it matters" via Claude API (scripts/enrich.mjs, optional)
       └─ write data/items.json → commit → push
             └─ Vercel auto-deploys the updated static site
```

- **`data/items.json`** — the entire "database": a capped (~5000 items / 180 days) JSON array, committed to git.
- **Pages** — homepage (day-grouped feed), `/category/[slug]` (research, product-launches, policy-business, tools), `/archive/[date]` (per-day pages for SEO), About / Privacy / Terms.
- **Ads** — `AdSlot` renders a placeholder until `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set (after AdSense approval). No code change needed to go live.
- **Affiliates** — add entries to `config/affiliates.json` (keyword, label, url, disclosure) once you join a program; callouts appear automatically on stories that mention those tools.

## Local development

```bash
npm install
node scripts/fetch-feeds.mjs   # populate data/items.json
npm run dev                    # http://localhost:3000
```

## Operations

| What | Where |
|---|---|
| Change news sources | `scripts/sources.mjs` |
| Update cron frequency | `.github/workflows/fetch-news.yml` |
| Enable "why it matters" notes | Repo secret `ANTHROPIC_API_KEY` (Settings → Secrets and variables → Actions) |
| Enable AdSense | Vercel env var `NEXT_PUBLIC_ADSENSE_CLIENT_ID` = `ca-pub-...`, then redeploy |
| Set canonical site URL | Vercel env var `NEXT_PUBLIC_SITE_URL` (used in sitemap/metadata) |
| Add affiliate links | `config/affiliates.json` |

## Before applying for AdSense

1. Fill in the bracketed `[placeholders]` in `src/app/about/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` (operator name, dates, analytics provider).
2. Let the site accumulate 2–4 weeks of daily content first.
3. Expect that approval is not guaranteed for aggregator-style sites; more original commentary improves the odds.
