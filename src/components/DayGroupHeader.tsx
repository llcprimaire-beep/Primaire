import Link from "next/link";

function formatDay(day: string): string {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function DayGroupHeader({ day, linkToArchive = true }: { day: string; linkToArchive?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2 mt-8 mb-3 first:mt-0">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {formatDay(day)}
      </h2>
      {linkToArchive && (
        <Link
          href={`/archive/${day}`}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          View full day →
        </Link>
      )}
    </div>
  );
}
