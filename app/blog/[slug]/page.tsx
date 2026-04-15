import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getGeneratedBlogPost, getGeneratedBlogSlugs } from "@/app/lib/generated-blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getGeneratedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getGeneratedBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Agile36",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.frontmatter.title ?? "Agile36 Blog",
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords,
  };
}

export default async function GeneratedBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getGeneratedBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.25rem 4rem" }}>
      <article>
        {post.frontmatter.title ? (
          <h1 style={{ fontSize: "2rem", lineHeight: "1.2", marginBottom: "0.5rem" }}>
            {post.frontmatter.title}
          </h1>
        ) : null}
        {post.frontmatter.date ? (
          <p style={{ color: "#6b7280", marginBottom: "2rem" }}>{post.frontmatter.date}</p>
        ) : null}

        <div style={{ lineHeight: 1.8 }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => {
                if (!href) {
                  return <span>{children}</span>;
                }
                if (href.startsWith("/")) {
                  return <Link href={href}>{children}</Link>;
                }
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                );
              },
              img: ({ src, alt }) => {
                const imageSrc = typeof src === "string" ? src : "";

                // SVG/image references from generated content use /blog/<slug>/<asset>.
                // Assets are copied into public/blog/<slug>/<asset>.
                return (
                  <Image
                    src={imageSrc}
                    alt={alt ?? ""}
                    width={1200}
                    height={675}
                    unoptimized
                    style={{ width: "100%", height: "auto", margin: "1.25rem 0" }}
                  />
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
