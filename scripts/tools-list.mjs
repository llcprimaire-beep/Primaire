// AI tools tracked for affiliate potential. Detection is independent of
// whether an affiliate link is configured yet: items get tagged with every
// tracked tool they mention, and the frontend only renders a callout for
// tools that have a filled-in URL in config/affiliates.json. This means you
// can join a program later and historical items light up on the next cron run.

export const TRACKED_TOOLS = [
  { name: "ElevenLabs", patterns: ["elevenlabs", "eleven labs"] },
  { name: "Jasper", patterns: ["jasper ai", "jasper.ai"] },
  { name: "Writesonic", patterns: ["writesonic"] },
  { name: "Copy.ai", patterns: ["copy.ai", "copyai"] },
  { name: "Descript", patterns: ["descript"] },
  { name: "Notion", patterns: ["notion ai", "notion's ai"] },
  { name: "Grammarly", patterns: ["grammarly"] },
  { name: "Murf", patterns: ["murf ai", "murf.ai"] },
  { name: "Synthesia", patterns: ["synthesia"] },
  { name: "HeyGen", patterns: ["heygen"] },
  { name: "Pictory", patterns: ["pictory"] },
  { name: "Frase", patterns: ["frase.io", "frase ai"] },
  { name: "Surfer SEO", patterns: ["surfer seo", "surferseo"] },
  { name: "Midjourney", patterns: ["midjourney"] },
  { name: "Runway", patterns: ["runway ml", "runwayml", "runway gen"] },
  { name: "Perplexity", patterns: ["perplexity"] },
  { name: "Fliki", patterns: ["fliki"] },
];

export function detectTools(text) {
  const lower = text.toLowerCase();
  return TRACKED_TOOLS.filter((tool) => tool.patterns.some((p) => lower.includes(p))).map(
    (tool) => tool.name
  );
}
