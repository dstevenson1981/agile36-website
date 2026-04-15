import Link from "next/link";
import { getGeneratedBlogSummaries } from "@/app/lib/generated-blog";

const EDITORIAL_POSTS: Array<{ slug: string; title: string }> = [
  { slug: "ai-transformation", title: "AI Transformation for Product Leaders" },
  { slug: "ai-tools-product-managers", title: "Best AI Tools for Product Managers" },
  { slug: "lean-portfolio-management", title: "Lean Portfolio Management Guide" },
  { slug: "leading-safe-certification-cost-2026", title: "Leading SAFe Certification Cost 2026" },
  { slug: "is-safe-certification-worth-it-2026", title: "Is SAFe Certification Worth It in 2026?" },
  { slug: "safe-lpm-vs-popm", title: "SAFe LPM vs POPM" },
  { slug: "ssm-vs-csm", title: "SSM vs CSM" },
  { slug: "safe-scrum-master-exam-questions", title: "SAFe Scrum Master Exam Questions" },
  { slug: "pi-planning-explained", title: "PI Planning Explained" },
];

export default async function BlogIndexPage() {
  const generatedPosts = await getGeneratedBlogSummaries();

  return (
    <main style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 1.25rem 4rem" }}>
      <h1 style={{ fontSize: "2.25rem", marginBottom: "0.75rem" }}>Agile36 Blog</h1>
      <p style={{ color: "#4b5563", marginBottom: "2rem" }}>
        Browse all blog content, including generated SEO pages and editorial guides.
      </p>

      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
          Featured Editorial Posts ({EDITORIAL_POSTS.length})
        </h2>
        <ul style={{ display: "grid", gap: "0.5rem", paddingLeft: "1.2rem" }}>
          {EDITORIAL_POSTS.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>
          Generated SEO Posts ({generatedPosts.length})
        </h2>
        <ul style={{ display: "grid", gap: "0.5rem", paddingLeft: "1.2rem" }}>
          {generatedPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              {post.date ? <span style={{ color: "#6b7280" }}> ({post.date})</span> : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
