import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getItemsByCategory } from "@/lib/data";
import { CATEGORY_SLUGS } from "@/lib/categories";
import { CATEGORY_LABELS, type Category } from "@/types/news";
import NewsFeed from "@/components/NewsFeed";

export const dynamic = "force-static";

type Params = { slug: string };

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

function isCategory(slug: string): slug is Category {
  return (CATEGORY_SLUGS as string[]).includes(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isCategory(slug)) return {};
  return {
    title: CATEGORY_LABELS[slug],
    description: `Curated ${CATEGORY_LABELS[slug].toLowerCase()} AI news, updated throughout the day.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!isCategory(slug)) notFound();

  const items = getItemsByCategory(slug);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{CATEGORY_LABELS[slug]}</h1>
      <NewsFeed items={items} />
    </div>
  );
}
