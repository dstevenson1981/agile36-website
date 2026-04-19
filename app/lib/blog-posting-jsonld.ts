import {
  SCHEMA_ORGANIZATION_ID,
  SCHEMA_ORGANIZATION_LOGO_URL,
} from "@/app/lib/schema-site";

const SITE = "https://www.agile36.com";
/** Default article image; dimensions match intrinsic logo asset (see schema-site). */
const DEFAULT_IMAGE = SCHEMA_ORGANIZATION_LOGO_URL;
const DEADRA_LINKEDIN = "https://www.linkedin.com/in/deadra-stevenson-a20a6a1a2/";

function toIsoDateAtNoon(value?: string): string {
  const raw = value?.trim();
  const base = raw ? raw.split("T")[0]! : "2024-01-01";
  return `${base}T12:00:00.000Z`;
}

function countWords(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function authorExtras(name: string): {
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
} {
  const n = name.trim();
  if (!n || n === "Agile36") {
    return { jobTitle: "Editorial team", url: SITE };
  }
  if (n.toLowerCase().includes("deadra")) {
    return {
      jobTitle: "SAFe Program Consultant (SPC)",
      sameAs: [DEADRA_LINKEDIN],
    };
  }
  return {
    jobTitle: "Author",
  };
}

export function buildBlogPostingGraph(input: {
  slug: string;
  headline: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  authorName: string;
  authorJobTitle?: string;
  authorUrl?: string;
  authorSameAs?: string[];
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  articleSection: string;
  keywords: string[];
  wordCount?: number;
}): Record<string, unknown> {
  const url = `${SITE}/blog/${input.slug}`;
  const pub = toIsoDateAtNoon(input.datePublished);
  const mod = toIsoDateAtNoon(input.dateModified ?? input.datePublished);

  const author: Record<string, unknown> = {
    "@type": "Person",
    name: input.authorName,
  };
  const extras = authorExtras(input.authorName);
  author.jobTitle = input.authorJobTitle ?? extras.jobTitle;
  if (input.authorUrl ?? extras.url) {
    author.url = input.authorUrl ?? extras.url;
  }
  const sameAs = input.authorSameAs ?? extras.sameAs;
  if (sameAs?.length) author.sameAs = sameAs;

  const blogPosting: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: input.headline,
    description: input.description ?? input.headline,
    url,
    image: {
      "@type": "ImageObject",
      url: input.imageUrl,
      width: input.imageWidth,
      height: input.imageHeight,
    },
    datePublished: pub,
    dateModified: mod,
    author,
    /** Single graph node on site root — avoids duplicate Organization vs EducationalOrganization @id clash. */
    publisher: { "@id": SCHEMA_ORGANIZATION_ID },
    articleSection: input.articleSection,
    inLanguage: "en-US",
  };

  if (input.keywords.length) {
    blogPosting.keywords = input.keywords.join(", ");
  }
  if (input.wordCount != null && input.wordCount > 0) {
    blogPosting.wordCount = input.wordCount;
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
          { "@type": "ListItem", position: 3, name: input.headline, item: url },
        ],
      },
      blogPosting,
    ],
  };
}

export function buildGeneratedBlogPostingGraph(opts: {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  updated?: string;
  author?: string;
  keywords?: string[];
  content: string;
  articleSection: string;
}): Record<string, unknown> {
  const authorName = opts.author?.trim() || "Agile36";
  return buildBlogPostingGraph({
    slug: opts.slug,
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.updated ?? opts.date,
    authorName,
    imageUrl: DEFAULT_IMAGE,
    imageWidth: 512,
    imageHeight: 512,
    articleSection: opts.articleSection,
    keywords: opts.keywords ?? [],
    wordCount: countWords(opts.content),
  });
}

export function buildEditorialBlogPostingGraph(opts: {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  articleSection: string;
  authorName?: string;
  wordCount?: number;
}): Record<string, unknown> {
  const authorName = opts.authorName?.trim() || "Agile36";
  return buildBlogPostingGraph({
    slug: opts.slug,
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    authorName,
    imageUrl: DEFAULT_IMAGE,
    imageWidth: 512,
    imageHeight: 512,
    articleSection: opts.articleSection,
    keywords: [],
    wordCount: opts.wordCount,
  });
}
