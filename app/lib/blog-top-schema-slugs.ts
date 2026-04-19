import { cache } from "react";
import { BLOG_EDITORIAL } from "@/app/lib/blog-editorial";
import { getGeneratedBlogSummaries } from "@/app/lib/generated-blog";

function parsePostDate(value?: string): number {
  if (!value) return 0;
  const t = Date.parse(value);
  return Number.isNaN(t) ? 0 : t;
}

/**
 * Slugs that receive BlogPosting JSON-LD: every editorial route plus every
 * generated MDX post (deduped). Named author defaults support E-E-A-T sitewide.
 */
export async function getBlogPostingSchemaSlugs(): Promise<readonly string[]> {
  const generated = await getGeneratedBlogSummaries();
  const ordered: string[] = [];

  for (const e of BLOG_EDITORIAL) {
    if (ordered.includes(e.slug)) continue;
    ordered.push(e.slug);
  }

  const genSorted = [...generated].sort(
    (a, b) => parsePostDate(b.date) - parsePostDate(a.date)
  );

  for (const g of genSorted) {
    if (ordered.includes(g.slug)) continue;
    ordered.push(g.slug);
  }

  return ordered;
}

export const getBlogPostingSchemaSlugSet = cache(async (): Promise<ReadonlySet<string>> => {
  const slugs = await getBlogPostingSchemaSlugs();
  return new Set(slugs);
});
