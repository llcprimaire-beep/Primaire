import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE_NAME}.`,
};

export default function TermsPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Terms of Use</h1>
      <p className="text-sm text-neutral-500">
        Last updated: [fill in the date you publish this page].
      </p>

      <h2>What this site is</h2>
      <p>
        {SITE_NAME} aggregates and links to publicly available AI news from third-party
        publishers. Headlines, short excerpts, and our own &quot;why it matters&quot; commentary
        are shown alongside a link to the original source. We do not host or claim ownership of
        the full articles we link to — all rights to that content belong to its original
        publishers.
      </p>

      <h2>No warranty on accuracy</h2>
      <p>
        We do our best to summarize accurately, but we do not independently verify third-party
        reporting. Content is provided &quot;as is&quot; without warranties of any kind. Always
        check the original source before relying on any story.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE_NAME} and its operator are not liable for
        any damages arising from your use of this site or reliance on its content, including
        content on external sites we link to.
      </p>

      <h2>Advertising and affiliate links</h2>
      <p>
        This site displays third-party ads (e.g. Google AdSense) and may contain affiliate links.
        See our <a href="/privacy">Privacy Policy</a> for details.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Don&apos;t scrape, republish, or use automated tools against this site in a way that
        disrupts it for other visitors.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time; continued use of the site means you accept the current version.</p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href="mailto:vadimkovalev999@gmail.com">vadimkovalev999@gmail.com</a>.
      </p>
    </article>
  );
}
