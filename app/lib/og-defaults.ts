import {
  SCHEMA_DEFAULT_OG_IMAGE_URL,
  SCHEMA_DEFAULT_OG_IMAGE_WIDTH,
  SCHEMA_DEFAULT_OG_IMAGE_HEIGHT,
} from "@/app/lib/schema-site";

/**
 * Next.js replaces `openGraph` wholesale rather than deep-merging it, so a page
 * that sets its own title and description silently drops the root layout's
 * image. Spreading these into each page's `openGraph`/`twitter` keeps the share
 * card intact — without one, a link shared on LinkedIn renders as bare text.
 */
export const DEFAULT_OG_IMAGES = [
  {
    url: SCHEMA_DEFAULT_OG_IMAGE_URL,
    width: SCHEMA_DEFAULT_OG_IMAGE_WIDTH,
    height: SCHEMA_DEFAULT_OG_IMAGE_HEIGHT,
    alt: "Agile36 — SAFe, Agile, and AI training",
  },
] as const;

/** Twitter takes a plain URL list rather than image objects. */
export const DEFAULT_TWITTER_IMAGES = [SCHEMA_DEFAULT_OG_IMAGE_URL] as const;
