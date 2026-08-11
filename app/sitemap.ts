import type { MetadataRoute } from "next";
import { seoPages } from "@/data/seoPages";
import { BLOG_EDITORIAL } from "@/app/lib/blog-editorial";
import {
  getGeneratedBlogSlugs,
  getGeneratedBlogSummaries,
} from "@/app/lib/generated-blog";

const BASE_URL = "https://www.agile36.com";

function lastModifiedFromYyyyMmDd(value?: string): Date | undefined {
  const raw = value?.trim();
  if (!raw) return undefined;
  const iso = raw.includes("T") ? raw : `${raw.split("T")[0]}T12:00:00.000Z`;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Do not set lastModified unless tied to real content dates — identical timestamps
  // across hundreds of URLs are treated as unreliable by Google.
  const mainPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/corporate`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/safe-certifications`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/combo-courses`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const courseSlugs = [
    "leading-safe",
    "product-owner-manager",
    "lean-portfolio-management",
    "agile-product-management",
    "scrum-master",
    "safe-for-teams",
    "devops",
    "advanced-scrum-master",
    "release-train-engineer",
    "value-stream-mapping",
    "responsible-ai",
    "safe-devops",
    "certified-ai-product-manager",
    "ai-agent-builder",
    "ai-driven-scrum-master",
    "executive-genai-leadership",
    "generative-ai-project-managers",
    "certified-genai-practitioner",
  ];

  const coursePages: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${BASE_URL}/courses/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const { KEPT_LOCATION_PAGES } = await import(
    "@/app/lib/location-training-pages"
  );

  const geoPages: MetadataRoute.Sitemap = KEPT_LOCATION_PAGES.map(
    ({ segment, city }) => ({
      url: `${BASE_URL}/${segment}/${city}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  /** Legacy city URL shapes; canonical geo lives under /{segment}/{city}. Vercel 301s these to /courses/* — omit from sitemap to avoid competing URLs. */
  const legacyCitySlug = /^(safe-training|safe-certification)-/;
  const programmaticSeoPages: MetadataRoute.Sitemap = seoPages
    .filter((p: { slug: string }) => !legacyCitySlug.test(p.slug))
    .map((p: { slug: string }) => ({
      url: `${BASE_URL}/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  const editorialBlogSlugs = [
    "ai-transformation",
    "ai-tools-product-managers",
    "lean-portfolio-management",
    "leading-safe-certification-cost-2026",
    "is-safe-certification-worth-it-2026",
    "safe-lpm-vs-popm",
    "ssm-vs-csm",
    "safe-scrum-master-exam-questions",
    "pi-planning-explained",
    "what-is-a-component-team-in-safe",
  ];

  const generatedBlogSlugs = await getGeneratedBlogSlugs();
  const blogSlugs = Array.from(new Set([...editorialBlogSlugs, ...generatedBlogSlugs]));

  const editorialDateBySlug = new Map(
    BLOG_EDITORIAL.map((e) => [e.slug, e.date] as const)
  );
  const summaries = await getGeneratedBlogSummaries();
  const generatedDateBySlug = new Map(summaries.map((s) => [s.slug, s.date] as const));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => {
    const dateStr = editorialDateBySlug.get(slug) ?? generatedDateBySlug.get(slug);
    const lastModified = lastModifiedFromYyyyMmDd(dateStr);
    const row: MetadataRoute.Sitemap[number] = {
      url: `${BASE_URL}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    };
    if (lastModified) row.lastModified = lastModified;
    return row;
  });

  return [
    ...mainPages,
    ...coursePages,
    ...geoPages,
    ...programmaticSeoPages,
    ...blogPages,
  ];
}
