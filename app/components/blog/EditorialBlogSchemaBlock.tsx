import BlogPostingStructuredData from "@/app/components/blog/BlogPostingStructuredData";
import { BLOG_LEAD_AUTHOR_NAME } from "@/app/lib/blog-author";
import { BLOG_EDITORIAL } from "@/app/lib/blog-editorial";
import { categoryShortBadgeForId } from "@/app/lib/blog-categories";
import { buildEditorialBlogPostingGraph } from "@/app/lib/blog-posting-jsonld";

type Props = { slug: string };

export default function EditorialBlogSchemaBlock({ slug }: Props) {
  const entry = BLOG_EDITORIAL.find((e) => e.slug === slug);
  if (!entry) return null;
  const articleSection = categoryShortBadgeForId(entry.categoryId);
  const data = buildEditorialBlogPostingGraph({
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    date: entry.date,
    articleSection,
    authorName: BLOG_LEAD_AUTHOR_NAME,
  });
  return <BlogPostingStructuredData data={data} />;
}
