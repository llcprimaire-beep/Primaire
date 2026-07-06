import affiliatesConfig from "../../config/affiliates.json";

type AffiliateEntry = {
  keyword: string;
  label: string;
  url: string;
  disclosure: string;
};

const TOOLS: AffiliateEntry[] = (affiliatesConfig as { tools: AffiliateEntry[] }).tools ?? [];

export function findAffiliateLinks(mentionedTools: string[]): AffiliateEntry[] {
  if (mentionedTools.length === 0 || TOOLS.length === 0) return [];
  return TOOLS.filter((tool) =>
    mentionedTools.some((m) => m.toLowerCase() === tool.keyword.toLowerCase())
  );
}
