"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogCategoryId } from "@/app/lib/blog-categories";
import { BLOG_CATEGORY_TABS, categoryLabelForId } from "@/app/lib/blog-categories";

export type BlogHubPost = {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  categoryId: Exclude<BlogCategoryId, "all">;
  featured?: boolean;
};

type Props = {
  posts: BlogHubPost[];
};

function parseDate(d?: string): number {
  if (!d) return 0;
  const t = Date.parse(d);
  return Number.isNaN(t) ? 0 : t;
}

export default function BlogHub({ posts }: Props) {
  const [active, setActive] = useState<BlogCategoryId>("all");

  const filtered = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((p) => p.categoryId === active);
  }, [posts, active]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return parseDate(b.date) - parseDate(a.date);
    });
    return copy;
  }, [filtered]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-10 sm:mb-14">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d97706] mb-3">Resources</p>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#1f2c4a] mb-4"
          style={{ letterSpacing: "-0.03em" }}
        >
          Discover blogs by category
        </h1>
        <p className="text-[#64748b] max-w-2xl mx-auto text-base">
          Articles on SAFe certifications, agile practice, AI tools, careers, and more—filter by topic below.
        </p>
      </div>

      <div
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12"
        role="tablist"
        aria-label="Blog categories"
      >
        {BLOG_CATEGORY_TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                isActive
                  ? "bg-[#1f2c4a] text-white border-white"
                  : "bg-[#1f2c4a]/[0.03] text-[#64748b] border-[#1f2c4a]/15 hover:border-[#1f2c4a]/30 hover:text-[#1f2c4a]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-normal text-[#1f2c4a]" style={{ letterSpacing: "-0.03em" }}>
          {active === "all"
            ? "Latest articles"
            : categoryLabelForId(active as Exclude<BlogCategoryId, "all">)}
        </h2>
        <p className="text-xs text-[#94a3b8]">
          {sorted.length} article{sorted.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl liquid-glass overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1f2c4a]/25 hover:bg-[#1f2c4a]/[0.06] flex flex-col"
          >
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center text-[11px] font-medium uppercase tracking-wider text-[#d97706]">
                  {categoryLabelForId(post.categoryId)}
                </span>
                {post.date ? (
                  <time dateTime={post.date} className="text-xs text-[#94a3b8] shrink-0">
                    {post.date}
                  </time>
                ) : null}
              </div>
              <h3 className="font-medium text-[#1f2c4a] transition-colors line-clamp-3 mb-2">
                {post.title}
              </h3>
              {post.description ? (
                <p className="text-sm text-[#64748b] line-clamp-3 flex-1">{post.description}</p>
              ) : (
                <span className="text-sm text-[#d97706] font-medium mt-auto">Read article →</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {sorted.length === 0 ? (
        <p className="text-center text-[#64748b] py-12">No articles in this category yet.</p>
      ) : null}
    </div>
  );
}
