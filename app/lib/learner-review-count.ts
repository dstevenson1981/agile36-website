/** Matches the AggregateRating reviewCount already published on each course. */
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

export function learnerReviewCount(slug: string): number {
  return REVIEW_COUNTS[slug] ?? 2500;
}

export function learnerReviewCountLabel(slug: string): string {
  return learnerReviewCount(slug).toLocaleString("en-US");
}
