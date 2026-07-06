import Anthropic from "@anthropic-ai/sdk";

let client = null;
function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!client) client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}

/**
 * Generates a short, original one-sentence "why it matters" note for a news item.
 * Returns null (never throws) if no API key is configured or the call fails -
 * the pipeline must keep working without enrichment.
 */
export async function whyItMatters({ title, excerpt, sourceName }) {
  const anthropic = getClient();
  if (!anthropic) return null;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 80,
      messages: [
        {
          role: "user",
          content:
            `You write a single sentence of original analysis for an AI news aggregator. ` +
            `Given this headline and excerpt, write ONE plain-English sentence (max ~25 words) ` +
            `explaining why this matters or what the reader should take away. ` +
            `Do not repeat the headline. Do not use hedging phrases like "this shows" or "it seems". ` +
            `Do not use quotation marks around your answer.\n\n` +
            `Source: ${sourceName}\nHeadline: ${title}\nExcerpt: ${excerpt || "(none)"}`,
        },
      ],
    });
    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join(" ")
      .trim();
    return text || null;
  } catch (err) {
    console.warn(`[enrich] Claude call failed for "${title}": ${err.message}`);
    return null;
  }
}
