import type { Metadata } from "next";
import BlogHub, { type BlogHubPost } from "@/app/components/BlogHub";
import { BLOG_EDITORIAL } from "@/app/lib/blog-editorial";
import { getGeneratedBlogSummaries } from "@/app/lib/generated-blog";

export const metadata: Metadata = {
  title: "Blog (2026) | Agile36 — SAFe, Agile, AI & Career Guides",
  description:
    "2026 guides and comparisons: SAFe certifications, agile practice, AI tools, careers, and frameworks — expert-led articles from Agile36.",
  alternates: {
    canonical: "https://www.agile36.com/blog",
  },
  openGraph: {
    title: "Agile36 Blog (2026) — SAFe, Agile & AI",
    description:
      "Browse 2026 articles: SAFe paths, certification comparisons, AI adoption, and career playbooks.",
    url: "https://www.agile36.com/blog",
    siteName: "Agile36",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const generated = await getGeneratedBlogSummaries();

  const editorialHub: BlogHubPost[] = BLOG_EDITORIAL.map((e) => ({
    slug: e.slug,
    title: e.title,
    date: e.date,
    description: e.description,
    categoryId: e.categoryId,
    featured: true,
  }));

  const generatedSlugs = new Set(generated.map((g) => g.slug));
  const editorialOnly = editorialHub.filter((e) => !generatedSlugs.has(e.slug));

  const generatedHub: BlogHubPost[] = generated.map((g) => ({
    slug: g.slug,
    title: g.title,
    date: g.date,
    description: g.description,
    categoryId: g.categoryId,
    featured: false,
  }));

  const posts: BlogHubPost[] = [...editorialOnly, ...generatedHub];

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <BlogHub posts={posts} />
    </main>
  );
}
