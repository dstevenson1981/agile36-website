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
        <p className="text-sm font-semibold text-[#4f6882] uppercase tracking-wide mb-2">Resources</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Discover blogs by category</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base">
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
                  ? "bg-[#01203d] text-white border-[#01203d]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#01203d]/40 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">
          {active === "all"
            ? "Latest articles"
            : categoryLabelForId(active as Exclude<BlogCategoryId, "all">)}
        </h2>
        <p className="text-sm text-gray-500">
          {sorted.length} article{sorted.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-gray-300 transition-all flex flex-col"
          >
            <div className="h-32 bg-gradient-to-br from-[#01203d] to-[#0a3a5c] flex items-center justify-center px-4 py-3" />
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#fa4a23]/10 text-[#c53a1a] border border-[#fa4a23]/25">
                  {categoryLabelForId(post.categoryId)}
                </span>
                {post.date ? (
                  <time dateTime={post.date} className="text-xs text-gray-500 shrink-0">
                    {post.date}
                  </time>
                ) : null}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-[#01203d] transition-colors line-clamp-3 mb-2">
                {post.title}
              </h3>
              {post.description ? (
                <p className="text-sm text-gray-600 line-clamp-3 flex-1">{post.description}</p>
              ) : (
                <span className="text-sm text-[#fa4a23] font-medium mt-auto">Read article →</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {sorted.length === 0 ? (
        <p className="text-center text-gray-600 py-12">No articles in this category yet.</p>
      ) : null}
    </div>
  );
}
