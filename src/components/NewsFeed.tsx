import type { NewsItem } from "@/types/news";
import { groupByDay } from "@/lib/data";
import NewsCard from "./NewsCard";
import DayGroupHeader from "./DayGroupHeader";
import AdSlot from "./AdSlot";

const AD_EVERY = 6;

export default function NewsFeed({
  items,
  showDayHeaders = true,
}: {
  items: NewsItem[];
  showDayHeaders?: boolean;
}) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400 py-8 text-center">
        No stories yet — check back soon.
      </p>
    );
  }

  const groups = showDayHeaders ? groupByDay(items) : [{ day: "", items }];
  let runningIndex = 0;

  return (
    <div className="flex flex-col">
      {groups.map((group) => (
        <section key={group.day || "flat"}>
          {showDayHeaders && <DayGroupHeader day={group.day} />}
          <div className="flex flex-col gap-4">
            {group.items.map((item) => {
              runningIndex++;
              const showAd = runningIndex % AD_EVERY === 0;
              return (
                <div key={item.id} className="flex flex-col gap-4">
                  <NewsCard item={item} />
                  {showAd && <AdSlot slot={`feed-${runningIndex}`} />}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
