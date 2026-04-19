/** Lead author for Agile36 blog (E-E-A-T / named Person in JSON-LD and UI). */
export const BLOG_LEAD_AUTHOR_NAME = "Deadra Stevenson";

export const BLOG_LEAD_AUTHOR_LINKEDIN =
  "https://www.linkedin.com/in/deadra-stevenson-a20a6a1a2/" as const;

/**
 * Use a named Person for posts that omit `author` or use a generic org byline.
 * Honor explicit non-Agile36 frontmatter (e.g. guest posts).
 */
export function resolveLeadBlogAuthorName(frontmatterAuthor?: string): string {
  const t = frontmatterAuthor?.trim();
  if (!t || /^agile36$/i.test(t)) return BLOG_LEAD_AUTHOR_NAME;
  return t;
}
