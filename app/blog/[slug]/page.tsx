import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  categoryShortBadgeForId,
  mapVerticalToCategoryId,
} from "@/app/lib/blog-categories";
import { getGeneratedBlogPost, getGeneratedBlogSlugs } from "@/app/lib/generated-blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function BlogHeroDots() {
  return (
    <>
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
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

  return {
    title: post.frontmatter.title ? `${post.frontmatter.title} | Agile36` : "Agile36 Blog",
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: "Agile36",
      title: post.frontmatter.title ?? "Agile36 Blog",
      description: post.frontmatter.description,
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
  const byline = post.frontmatter.date
    ? `Written by Agile36 · Updated ${post.frontmatter.date}`
    : "Written by Agile36 · SAFe Silver Partner";

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full min-h-[12rem] sm:h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden px-4 py-10 sm:py-0">
        <BlogHeroDots />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center relative z-10 max-w-4xl">
          {title}
        </h1>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#01203d]">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-900 line-clamp-2">{title}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <span className="bg-[#134263] text-white text-sm font-semibold px-4 py-1 rounded-full">
            {badge}
          </span>
        </div>

        <p className="text-base text-gray-500 mb-10">{byline}</p>

        <div className="blog-prose">
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
                <h6 className="text-sm font-semibold uppercase tracking-wide text-gray-800 not-prose">
                  {children}
                </h6>
              ),
              table: ({ children }) => (
                <div className="my-8 overflow-x-auto rounded-lg border border-gray-200">
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
  );
}
