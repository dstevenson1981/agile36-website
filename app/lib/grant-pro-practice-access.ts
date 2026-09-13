import { findComboById } from '@/app/combo-courses/data';

/** Courses that include a Pro practice exam in the account hub. */
export const PRACTICE_EXAM_COURSE_IDS = new Set([
  'leading-safe',
  'product-owner-manager',
  'agile-product-management',
  'lean-portfolio-management',
  'scrum-master',
  'advanced-scrum-master',
  'safe-for-teams',
  'release-train-engineer',
]);

/** Map an order course_slug (including combo-*) to practice-exam course ids. */
export function resolvePracticeExamCourseIds(
  courseSlug: string,
  comboScheduleMap?: Record<string, string>,
): string[] {
  const slug = courseSlug?.trim() || '';
  if (!slug) return [];

  if (!slug.startsWith('combo-')) {
    return PRACTICE_EXAM_COURSE_IDS.has(slug) ? [slug] : [];
  }

  if (comboScheduleMap && Object.keys(comboScheduleMap).length > 0) {
    return Object.keys(comboScheduleMap).filter((id) => PRACTICE_EXAM_COURSE_IDS.has(id));
  }

  const comboId = slug.replace(/^combo-/, '');
  const combo = findComboById(comboId);
  if (!combo) return [];

  return combo.courses
    .map((course) => course.slug)
    .filter((id) => PRACTICE_EXAM_COURSE_IDS.has(id));
}
