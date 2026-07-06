import Link from "next/link";
import { CATEGORY_SLUGS } from "@/lib/categories";
import { CATEGORY_LABELS } from "@/types/news";

export default function CategoryNav() {
  return (
    <nav className="flex flex-wrap gap-4 text-sm">
      <Link href="/" className="font-medium hover:underline">
        Latest
      </Link>
      {CATEGORY_SLUGS.map((slug) => (
        <Link key={slug} href={`/category/${slug}`} className="text-neutral-600 dark:text-neutral-300 hover:underline">
          {CATEGORY_LABELS[slug]}
        </Link>
      ))}
    </nav>
  );
}
