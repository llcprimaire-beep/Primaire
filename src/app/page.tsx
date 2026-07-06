import { getAllItems, groupByDay } from "@/lib/data";
import NewsFeed from "@/components/NewsFeed";

export const dynamic = "force-static";

const HOMEPAGE_DAY_COUNT = 7;

export default function Home() {
  const allItems = getAllItems();
  const dayGroups = groupByDay(allItems).slice(0, HOMEPAGE_DAY_COUNT);
  const items = dayGroups.flatMap((g) => g.items);

  return (
    <div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
        The latest AI news, curated from OpenAI, Google, Hugging Face, TechCrunch, VentureBeat,
        and more — every headline links to its original source.
      </p>
      <NewsFeed items={items} />
    </div>
  );
}
