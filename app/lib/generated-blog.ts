import type { Dirent } from "node:fs";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { BlogCategoryId } from "./blog-categories";
import { mapVerticalToCategoryId } from "./blog-categories";

export type GeneratedBlogFrontmatter = {
  title?: string;
  description?: string;
  keywords?: string[];
  date?: string;
  author?: string;
  template_type?: string;
  vertical?: string;
};

const BLOG_CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

function sanitizeGeneratedMdx(rawMdx: string): string {
  // Generated files sometimes append raw <SVG ...> payloads that are incomplete.
  const withoutInlineSvgPayload = rawMdx.replace(/\n<SVG filename="[\s\S]*$/m, "");
  return withoutInlineSvgPayload.replace(/<\/SVG>\s*/g, "").trim();
}

export async function getGeneratedBlogSlugs(): Promise<string[]> {
  let entries: Dirent[];
  try {
    entries = (await readdir(BLOG_CONTENT_ROOT, { withFileTypes: true })) as Dirent[];
  } catch {
    return [];
  }

  const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const validSlugs: string[] = [];

  for (const slug of dirs) {
    const mdxPath = path.join(BLOG_CONTENT_ROOT, slug, "index.mdx");
    try {
      await access(mdxPath);
      validSlugs.push(slug);
    } catch {
      // Ignore directories without the expected index.mdx
    }
  }

  return validSlugs.sort();
}

export async function getGeneratedBlogPost(slug: string): Promise<{
  slug: string;
  content: string;
  frontmatter: GeneratedBlogFrontmatter;
} | null> {
  const mdxPath = path.join(BLOG_CONTENT_ROOT, slug, "index.mdx");

  try {
    const raw = await readFile(mdxPath, "utf8");
    const parsed = matter(raw);
    return {
      slug,
      content: sanitizeGeneratedMdx(parsed.content),
      frontmatter: parsed.data as GeneratedBlogFrontmatter,
    };
  } catch {
    return null;
  }
}

export async function getGeneratedBlogSummaries(): Promise<
  Array<{
    slug: string;
    title: string;
    date?: string;
    description?: string;
    vertical?: string;
    categoryId: Exclude<BlogCategoryId, "all">;
  }>
> {
  const slugs = await getGeneratedBlogSlugs();
  const summaries = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getGeneratedBlogPost(slug);
      const fallbackTitle = slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      const vertical = post?.frontmatter.vertical;

      return {
        slug,
        title: post?.frontmatter.title ?? fallbackTitle,
        date: post?.frontmatter.date,
        description: post?.frontmatter.description,
        vertical,
        categoryId: mapVerticalToCategoryId(vertical),
      };
    })
  );

  return summaries;
}

export function getGeneratedBlogAssetPath(slug: string, asset: string): string {
  return path.join(BLOG_CONTENT_ROOT, slug, asset);
}
