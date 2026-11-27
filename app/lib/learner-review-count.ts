/**
 * Review counts already published per course in schema.
 * Courses missing here have no confirmed count.
 * TODO: confirm a real reviewCount before adding a course to this map. Do not use a shared placeholder.
 */
const REVIEW_COUNTS: Record<string, number> = {
  "release-train-engineer": 180,
  "responsible-ai": 156,
  "ai-driven-scrum-master": 234,
  "executive-genai-leadership": 156,
  "certified-genai-practitioner": 156,
  "ai-agent-builder": 156,
  "certified-ai-product-manager": 156,
  "generative-ai-project-managers": 187,
};

export function learnerReviewCount(slug: string): number | null {
  return REVIEW_COUNTS[slug] ?? null;
}

export function learnerReviewCountLabel(slug: string): string | null {
  const count = learnerReviewCount(slug);
  return count == null ? null : count.toLocaleString("en-US");
}

export function ratingLine(slug: string, withPartner: boolean): string {
  const count = learnerReviewCountLabel(slug);
  const base = count ? `Rated 4.9/5 from ${count} reviews` : "Rated 4.9/5";
  return withPartner ? `${base}, with the highest feedback score on Scaled Agile.` : `${base}.`;
}
