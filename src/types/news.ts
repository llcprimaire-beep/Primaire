export type Category = "research" | "product-launches" | "policy-business" | "tools";

export type SourceRef = {
  sourceName: string;
  sourceUrl: string;
};

export type NewsItem = {
  id: string;
  title: string;
  normalizedTitle: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  fetchedAt: string;
  excerpt: string;
  whyItMatters: string | null;
  category: Category;
  mentionedTools: string[];
  dedupGroupId: string;
  alsoCoveredBy: SourceRef[];
};

export const CATEGORY_LABELS: Record<Category, string> = {
  research: "Research",
  "product-launches": "Product Launches",
  "policy-business": "Policy & Business",
  tools: "Tools",
};
