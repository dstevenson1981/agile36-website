import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BlogAuthorByline from "@/app/components/blog/BlogAuthorByline";
import BlogPostingStructuredData from "@/app/components/blog/BlogPostingStructuredData";
import {
  categoryShortBadgeForId,
  mapVerticalToCategoryId,
} from "@/app/lib/blog-categories";
import {
  BLOG_LEAD_AUTHOR_LINKEDIN,
  BLOG_LEAD_AUTHOR_NAME,
  resolveLeadBlogAuthorName,
} from "@/app/lib/blog-author";
import { buildGeneratedBlogPostingGraph } from "@/app/lib/blog-posting-jsonld";
import { getGeneratedBlogPost, getGeneratedBlogSlugs } from "@/app/lib/generated-blog";

import { DEFAULT_OG_IMAGES } from "@/app/lib/og-defaults";
type PageProps = {
  params: Promise<{ slug: string }>;
};

function BlogHeroDots() {
  return (
    <>
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#d97706]/40 rounded-full" />
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#d97706]/40 rounded-full" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#d97706]/40 rounded-full" />
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-[#d97706]/40 rounded-full" />
          ))}
        </div>
      </div>
    </>
  );
}

/** Avoid showing the title twice when MDX opens with `# Same as frontmatter title`. */
function stripLeadingDuplicateH1(content: string, title?: string): string {
  if (!title) return content;
  const t = title.trim().replace(/\s+/g, " ");
  const lines = content.split(/\r?\n/);
  const first = lines[0]?.trim();
  if (!first?.startsWith("# ")) return content;
  const h1 = first.slice(2).trim().replace(/\s+/g, " ");
  if (h1.toLowerCase() === t.toLowerCase()) {
    return lines.slice(1).join("\n").replace(/^\s+/, "");
  }
  return content;
}

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

  const canonical = `https://www.agile36.com/blog/${slug}`;

  const authorName = resolveLeadBlogAuthorName(post.frontmatter.author);

  const description =
    post.frontmatter.description?.trim() ||
    (post.frontmatter.title
      ? `${post.frontmatter.title} — expert perspective from Agile36 (2026).`
      : "Expert SAFe, Agile, and AI articles from Agile36 — updated for 2026.");

  return {
    title: post.frontmatter.title ? `${post.frontmatter.title} | Agile36` : "Agile36 Blog",
    description,
    keywords: post.frontmatter.keywords,
    authors: [
      authorName === BLOG_LEAD_AUTHOR_NAME
        ? { name: authorName, url: BLOG_LEAD_AUTHOR_LINKEDIN }
        : { name: authorName },
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      images: [...DEFAULT_OG_IMAGES],
      type: "article",
      url: canonical,
      siteName: "Agile36",
      title: post.frontmatter.title ?? "Agile36 Blog",
      description,
    },
  };
}

/**
 * Outline: page has one <h1> in the hero. Map markdown headings down one level
 * so the article does not introduce a second <h1>.
 */
export default async function GeneratedBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getGeneratedBlogPost(slug);

  if (!post) {
    notFound();
  }

  const categoryId = mapVerticalToCategoryId(post.frontmatter.vertical);
  const badge = categoryShortBadgeForId(categoryId);
  const title = post.frontmatter.title ?? slug.replace(/-/g, " ");
  const body = stripLeadingDuplicateH1(post.content, post.frontmatter.title);
  const schemaGraph = buildGeneratedBlogPostingGraph({
    slug,
    title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    updated: post.frontmatter.updated,
    author: post.frontmatter.author,
    keywords: post.frontmatter.keywords ?? [],
    content: post.content,
    articleSection: badge,
  });

  return (
    <>
      <BlogPostingStructuredData data={schemaGraph} />
      <main className="min-h-screen bg-black text-[#1f2c4a]">
      <div className="w-full min-h-[12rem] sm:h-64 bg-black border-b border-[#1f2c4a]/10 relative flex items-center justify-center overflow-hidden px-4 py-10 sm:py-0">
        <BlogHeroDots />
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1f2c4a] text-center relative z-10 max-w-4xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-[#94a3b8]">
          <Link href="/" className="hover:text-[#1f2c4a] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#1f2c4a] transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-[#475569] line-clamp-2">{title}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <span className="border border-[#d97706]/30 bg-[#d97706]/10 text-[#d97706] text-xs font-medium uppercase tracking-wider px-4 py-1 rounded-full">
            {badge}
          </span>
        </div>

        <BlogAuthorByline updated={post.frontmatter.date} />

        <div className="blog-prose prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => {
                const nodes = React.Children.toArray(children).filter((c) => c != null);
                if (nodes.length === 0) return null;
                return <p>{children}</p>;
              },
              h1: ({ children }) => <h2>{children}</h2>,
              h2: ({ children }) => <h3>{children}</h3>,
              h3: ({ children }) => <h4>{children}</h4>,
              h4: ({ children }) => <h5>{children}</h5>,
              h5: ({ children }) => <h6>{children}</h6>,
              h6: ({ children }) => (
                <h6 className="text-sm font-semibold uppercase tracking-wide text-[#475569] not-prose">
                  {children}
                </h6>
              ),
              table: ({ children }) => (
                <div className="my-8 overflow-x-auto rounded-lg border border-[#1f2c4a]/10">
                  <table>{children}</table>
                </div>
              ),
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
              img: () => null,
            }}
          >
            {body}
          </ReactMarkdown>
        </div>
      </article>
    </main>
    </>
  );
}
