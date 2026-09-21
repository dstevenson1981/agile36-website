/** Official SAFe / Scaled Agile offerings — show Silver Partner trust marks. */
export const SCALED_AGILE_COURSE_SLUGS = new Set([
  "leading-safe",
  "scrum-master",
  "product-owner-manager",
  "agile-product-management",
  "safe-for-architects",
  "lean-portfolio-management",
  "safe-for-teams",
  "release-train-engineer",
  "devops",
  "responsible-ai",
  "value-stream-mapping",
  "advanced-scrum-master",
]);

/** AI courses taught under Agile36's Claude Partner Badge (Claude Code). */
export const CLAUDE_PARTNER_COURSE_SLUGS = new Set([
  "ai-driven-scrum-master",
  "ai-workflow-automation",
  "ai-agent-builder",
  "ai-app-builder",
  "certified-ai-product-manager",
  "executive-genai-leadership",
  "generative-ai-project-managers",
]);

export const CLAUDE_PARTNER_BADGE_ID = "a25bd309-54af-4ee4-91ac-a985de851179";
export const CLAUDE_PARTNER_BADGE_URL = `https://www.credly.com/badges/${CLAUDE_PARTNER_BADGE_ID}`;

export function isScaledAgileCourse(slug: string) {
  return SCALED_AGILE_COURSE_SLUGS.has(slug);
}

export function isClaudePartnerCourse(slug: string) {
  return CLAUDE_PARTNER_COURSE_SLUGS.has(slug);
}
