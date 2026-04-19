import BlogPostingStructuredData from "@/app/components/blog/BlogPostingStructuredData";
import { BLOG_EDITORIAL } from "@/app/lib/blog-editorial";
import { categoryShortBadgeForId } from "@/app/lib/blog-categories";
import { buildEditorialBlogPostingGraph } from "@/app/lib/blog-posting-jsonld";
import { getBlogPostingSchemaSlugSet } from "@/app/lib/blog-top-schema-slugs";

type Props = { slug: string };

export default async function EditorialBlogSchemaBlock({ slug }: Props) {
  const top = await getBlogPostingSchemaSlugSet();
  if (!top.has(slug)) return null;
  const entry = BLOG_EDITORIAL.find((e) => e.slug === slug);
  if (!entry) return null;
  const articleSection = categoryShortBadgeForId(entry.categoryId);
  const data = buildEditorialBlogPostingGraph({
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    date: entry.date,
    articleSection,
  });
  return <BlogPostingStructuredData data={data} />;
}
