import type { Metadata } from "next";
import BlogHub, { type BlogHubPost } from "@/app/components/BlogHub";

export const metadata: Metadata = {
  title: "Blog | Agile36 — SAFe, Agile, AI & Career Guides",
  description:
    "Browse articles by category: SAFe certifications, agile glossary, AI tools, careers, industry insights, and frameworks.",
};
import type { BlogCategoryId } from "@/app/lib/blog-categories";
import { getGeneratedBlogSummaries } from "@/app/lib/generated-blog";

const EDITORIAL: Array<{
  slug: string;
  title: string;
  categoryId: Exclude<BlogCategoryId, "all">;
  description?: string;
  date?: string;
}> = [
  {
    slug: "ai-transformation",
    title: "What Is AI Transformation? A Complete Guide for Modern Organizations",
    categoryId: "ai",
    description:
      "How organizations move from pilots to measurable outcomes with AI—and what agile leaders should prioritize.",
    date: "2025-03-01",
  },
  {
    slug: "ai-tools-product-managers",
    title: "Top AI Tools Every Product Manager Should Know",
    categoryId: "ai",
    description: "Practical tools PMs use across discovery, delivery, and stakeholder communication.",
    date: "2025-03-01",
  },
  {
    slug: "lean-portfolio-management",
    title: "Lean Portfolio Management on SAFe: Strategy and Execution",
    categoryId: "practices",
    description: "Connect strategy to execution with LPM cadences, funding, and value streams.",
    date: "2025-02-15",
  },
  {
    slug: "leading-safe-certification-cost-2026",
    title: "Leading SAFe Certification Cost 2026",
    categoryId: "safe",
    description: "Pricing, exam fees, and what to budget for Leading SAFe training and certification.",
    date: "2026-01-10",
  },
  {
    slug: "is-safe-certification-worth-it-2026",
    title: "Is SAFe Certification Worth It in 2026?",
    categoryId: "safe",
    description: "When SAFe credentials help your career—and when other paths make more sense.",
    date: "2026-01-10",
  },
  {
    slug: "safe-lpm-vs-popm",
    title: "SAFe LPM vs POPM",
    categoryId: "safe",
    description: "Lean Portfolio Management vs Product Owner/Product Manager: scope, exams, and career fit.",
    date: "2025-12-01",
  },
  {
    slug: "ssm-vs-csm",
    title: "SSM vs CSM: Which Scrum Master Certification Fits You?",
    categoryId: "safe",
    description: "Compare SAFe Scrum Master and Certified Scrum Master for your context and goals.",
    date: "2025-11-01",
  },
  {
    slug: "safe-scrum-master-exam-questions",
    title: "SAFe Scrum Master Exam Questions",
    categoryId: "safe",
    description: "Format, topics, and how to prepare for the SSM certification exam.",
    date: "2025-10-01",
  },
  {
    slug: "pi-planning-explained",
    title: "PI Planning Explained",
    categoryId: "glossary",
    description: "What happens in a Program Increment planning event and how teams align on outcomes.",
    date: "2025-09-01",
  },
];

export default async function BlogIndexPage() {
  const generated = await getGeneratedBlogSummaries();

  const editorialHub: BlogHubPost[] = EDITORIAL.map((e) => ({
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
