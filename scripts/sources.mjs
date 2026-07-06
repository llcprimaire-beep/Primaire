// RSS/API sources for the AI news pipeline.
// `kind: "rss"` sources are parsed with rss-parser.
// `kind: "hn-algolia"` is a special JSON API adapter (see fetch-feeds.mjs).
// `aiFilter: true` sources are general-purpose feeds (not AI-only), so items
// are kept only if the title/description match AI-related keywords.

export const AI_KEYWORDS = [
  "artificial intelligence",
  " ai ",
  " ai,",
  " ai.",
  " ai-",
  "a.i.",
  "chatgpt",
  "claude",
  "anthropic",
  "openai",
  "gemini",
  "llm",
  "large language model",
  "machine learning",
  "neural network",
  "generative ai",
  "gpt-",
  "copilot",
  "deepmind",
  "hugging face",
  "midjourney",
  "stable diffusion",
];

export function matchesAiKeywords(text) {
  const lower = ` ${text.toLowerCase()} `;
  return AI_KEYWORDS.some((kw) => lower.includes(kw));
}

export const SOURCES = [
  {
    name: "OpenAI",
    url: "https://openai.com/news/rss.xml",
    kind: "rss",
    category: "product-launches",
    aiFilter: false,
  },
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/tag/artificial-intelligence/feed/",
    kind: "rss",
    category: "product-launches",
    aiFilter: false,
  },
  {
    name: "VentureBeat",
    url: "https://venturebeat.com/category/ai/feed/",
    kind: "rss",
    category: "product-launches",
    aiFilter: false,
  },
  {
    name: "Hugging Face",
    url: "https://huggingface.co/blog/feed.xml",
    kind: "rss",
    category: "tools",
    aiFilter: false,
  },
  {
    name: "MIT Technology Review",
    url: "https://www.technologyreview.com/topic/artificial-intelligence/feed",
    kind: "rss",
    category: "research",
    aiFilter: false,
  },
  {
    name: "Google AI Blog",
    url: "https://blog.google/technology/ai/rss/",
    kind: "rss",
    category: "research",
    aiFilter: false,
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
    kind: "rss",
    category: "research",
    aiFilter: true, // general tech feed, filter to AI-relevant items only
  },
  {
    name: "Ars Technica",
    url: "https://arstechnica.com/ai/feed/",
    kind: "rss",
    category: "research",
    aiFilter: false,
  },
  {
    name: "Hacker News",
    url: "https://hn.algolia.com/api/v1/search_by_date?tags=story&query=AI&hitsPerPage=20",
    kind: "hn-algolia",
    category: "tools",
    // Algolia's search is typo-tolerant/fuzzy, so a 2-letter query like "AI"
    // lets plenty of unrelated stories through - re-filter with our own
    // stricter keyword match before accepting anything from this source.
    aiFilter: true,
  },
  {
    name: "Anthropic",
    url: "https://tim-hilde.github.io/anthropic-rss/rss.xml",
    kind: "rss",
    category: "product-launches",
    aiFilter: false,
    bestEffort: true, // unofficial third-party mirror, no uptime guarantee - failures are silent, not warnings
  },
];
