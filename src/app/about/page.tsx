import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `How ${SITE_NAME} curates AI news and how it's funded.`,
};

export default function AboutPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>About {SITE_NAME}</h1>

      <p>
        {SITE_NAME} is a daily-updated roundup of artificial intelligence news. Every few hours,
        we pull headlines from a fixed list of publications we consider reliable sources on AI —
        including OpenAI, Google, Hugging Face, TechCrunch, VentureBeat, MIT Technology Review,
        Ars Technica, The Verge, and Hacker News — and organize them into one place.
      </p>

      <h2>How curation works</h2>
      <p>
        For each story, we show the headline, a short excerpt, and a link directly to the
        original article — we never republish full articles, and the source is always credited
        and linked. When the same story is covered by multiple outlets, we group it once and
        list every outlet that covered it.
      </p>
      <p>
        Each story also gets a short, original one-line note under &quot;Why it matters,&quot;
        generated with AI to add context beyond the headline. It is our own commentary, not a
        copy of anything from the source article.
      </p>

      <h2>How this site is funded</h2>
      <p>
        {SITE_NAME} is supported by display advertising (Google AdSense) and, where disclosed
        directly on a story, affiliate links that earn us a commission if you sign up for a
        product through them. Advertising and affiliate relationships never influence which
        stories we include or how we describe them.
      </p>

      <h2>Corrections and contact</h2>
      <p>
        Spotted an error, a broken link, or a story that&apos;s been misattributed? Contact us at{" "}
        <a href="mailto:vadimkovalev999@gmail.com">vadimkovalev999@gmail.com</a>.
      </p>

      <p className="text-sm text-neutral-500">
        [Site operator: replace or confirm the contact email above, and consider adding your name
        or company here before this page goes live for AdSense review.]
      </p>
    </article>
  );
}
