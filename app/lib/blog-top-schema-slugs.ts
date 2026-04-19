import { cache } from "react";
import { BLOG_EDITORIAL } from "@/app/lib/blog-editorial";
import { getGeneratedBlogSummaries } from "@/app/lib/generated-blog";

const TOP_COUNT = 20;

function parsePostDate(value?: string): number {
  if (!value) return 0;
  const t = Date.parse(value);
  return Number.isNaN(t) ? 0 : t;
}

/**
 * Slugs that receive BlogPosting JSON-LD: all editorial routes first (pillar),
 * then newest generated posts until {@link TOP_COUNT} total (deduped).
 */
export async function getBlogPostingSchemaSlugs(): Promise<readonly string[]> {
  const generated = await getGeneratedBlogSummaries();
  const ordered: string[] = [];

  for (const e of BLOG_EDITORIAL) {
    if (ordered.length >= TOP_COUNT) break;
    if (ordered.includes(e.slug)) continue;
    ordered.push(e.slug);
  }

  const genSorted = [...generated].sort(
    (a, b) => parsePostDate(b.date) - parsePostDate(a.date)
  );

  for (const g of genSorted) {
    if (ordered.length >= TOP_COUNT) break;
    if (ordered.includes(g.slug)) continue;
    ordered.push(g.slug);
  }

  return ordered.slice(0, TOP_COUNT);
}

export const getBlogPostingSchemaSlugSet = cache(async (): Promise<ReadonlySet<string>> => {
  const slugs = await getBlogPostingSchemaSlugs();
  return new Set(slugs);
});
