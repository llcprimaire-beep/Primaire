import type { NewsItem } from "@/types/news";
import { CATEGORY_LABELS } from "@/types/news";
import { findAffiliateLinks } from "@/lib/affiliates";
import AffiliateCallout from "./AffiliateCallout";

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
}

export default function NewsCard({ item }: { item: NewsItem }) {
  const affiliateLinks = findAffiliateLinks(item.mentionedTools);

  return (
    <article className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 sm:p-5 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        <span className="font-medium">{item.sourceName}</span>
        <span aria-hidden>·</span>
        <time dateTime={item.publishedAt}>{formatTime(item.publishedAt)}</time>
        <span className="ml-auto rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">
          {CATEGORY_LABELS[item.category]}
        </span>
      </div>

      <h3 className="text-lg font-semibold leading-snug">
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-2"
        >
          {item.title}
        </a>
      </h3>

      {item.excerpt && (
        <p className="text-sm text-neutral-600 dark:text-neutral-300">{item.excerpt}</p>
      )}

      {item.whyItMatters && (
        <p className="text-sm border-l-2 border-blue-400 pl-3 italic text-neutral-700 dark:text-neutral-200">
          <span className="not-italic font-medium">Why it matters: </span>
          {item.whyItMatters}
        </p>
      )}

      {item.alsoCoveredBy.length > 0 && (
        <div className="flex flex-wrap gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
          <span>Also covered by:</span>
          {item.alsoCoveredBy.map((ref) => (
            <a
              key={ref.sourceUrl}
              href={ref.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              {ref.sourceName}
            </a>
          ))}
        </div>
      )}

      {affiliateLinks.length > 0 && <AffiliateCallout links={affiliateLinks} />}

      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mt-1"
      >
        Read full story at {item.sourceName} →
      </a>
    </article>
  );
}
