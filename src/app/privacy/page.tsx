import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}: what data we collect and how third-party ads and analytics use cookies.`,
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-neutral-500">
        Last updated: [fill in the date you publish this page]. [Site operator: replace bracketed
        placeholders below with your real details before applying for AdSense.]
      </p>

      <h2>Who we are</h2>
      <p>
        {SITE_NAME} ([legal name / operator name]) is a news-curation website. You can reach us
        at <a href="mailto:vadimkovalev999@gmail.com">vadimkovalev999@gmail.com</a>.
      </p>

      <h2>Information we collect</h2>
      <p>
        We do not require an account or collect personal information to read this site. We use
        standard web server and hosting logs (via our hosting provider, Vercel) that may record
        your IP address, browser type, and pages visited, for security and performance purposes.
      </p>

      <h2>Cookies and advertising</h2>
      <p>
        This site may display ads served by Google AdSense. Google and its partners use cookies
        and similar technologies to serve ads based on your prior visits to this or other
        websites. You can learn more about how Google uses data and opt out of personalized
        advertising at{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          Google&apos;s Partner Sites policy
        </a>{" "}
        and manage ad personalization at{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        .
      </p>

      <h2>Affiliate links</h2>
      <p>
        Some stories may include affiliate links to third-party products. If you click one and
        make a purchase or sign up, we may earn a commission at no extra cost to you. Affiliate
        links are marked as such where they appear.
      </p>

      <h2>Analytics</h2>
      <p>
        We may use privacy-conscious analytics to understand aggregate traffic (e.g. which pages
        are popular). [Site operator: name your analytics provider here if/when you add one, e.g.
        Vercel Analytics, Plausible, or Google Analytics, and update this section to match.]
      </p>

      <h2>Third-party links</h2>
      <p>
        Every story on this site links to its original source on another website. We are not
        responsible for the privacy practices or content of those external sites.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>This site is not directed at children under 13 and we do not knowingly collect data from them.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time; changes will be posted on this page.</p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href="mailto:vadimkovalev999@gmail.com">vadimkovalev999@gmail.com</a>.
      </p>
    </article>
  );
}
