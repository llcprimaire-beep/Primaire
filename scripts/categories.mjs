export const CATEGORIES = ["research", "product-launches", "policy-business", "tools"];

// Keyword overrides applied on top of a source's default category.
// First matching rule wins; if nothing matches, the source's default category is kept.
const RULES = [
  { category: "policy-business", keywords: ["raises $", "funding round", "series a", "series b", "series c", "acquires", "acquisition", "valued at", "ipo", "lawsuit", "regulat", "antitrust", "ftc", "eu ai act", "layoffs"] },
  { category: "research", keywords: ["paper", "arxiv", "benchmark", "study finds", "researchers", "dataset"] },
];

export function classify(title, description, defaultCategory) {
  const text = `${title} ${description || ""}`.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => text.includes(kw))) return rule.category;
  }
  return defaultCategory;
}
