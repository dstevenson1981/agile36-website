import type { SupabaseClient } from '@supabase/supabase-js';
import { COMBO_COURSES } from '@/app/combo-courses/data';

/**
 * Manual Pro practice exam unlocks only — not called on checkout.
 * Grant access on the last day of class when instructed (upserts user_access).
 */

/** Courses that include a Pro practice exam in the account hub. */
export const PRACTICE_EXAM_COURSE_IDS = new Set([
  'leading-safe',
  'product-owner-manager',
  'agile-product-management',
  'lean-portfolio-management',
  'scrum-master',
  'advanced-scrum-master',
]);

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

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
  const combo = COMBO_COURSES.find((c) => c.id === comboId);
  if (!combo) return [];

  return combo.courses
    .map((course) => course.slug)
    .filter((id) => PRACTICE_EXAM_COURSE_IDS.has(id));
}

async function resolveUserId(
  supabase: SupabaseClient,
  email: string,
  explicitUserId?: string | null,
): Promise<string | null> {
  if (explicitUserId) return explicitUserId;

  const normalized = normalizeEmail(email);
  if (!normalized) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_id')
    .ilike('email', normalized)
    .limit(1)
    .maybeSingle();

  return profile?.user_id ?? null;
}

async function upsertProAccess(
  supabase: SupabaseClient,
  userId: string,
  courseIds: string[],
): Promise<void> {
  for (const courseId of courseIds) {
    const { error } = await supabase.from('user_access').upsert(
      { user_id: userId, course_id: courseId, plan_type: 'pro' },
      { onConflict: 'user_id,course_id' },
    );
    if (error) {
      console.error('Failed to grant Pro practice access:', { userId, courseId, error });
    }
  }
}

/** Manually grant Pro practice exam access for a user (last day of class, etc.). */
export async function grantProPracticeAccessForOrder(
  supabase: SupabaseClient,
  options: {
    customerEmail: string;
    courseSlug: string;
    plan: string;
    userId?: string | null;
    comboScheduleMap?: Record<string, string>;
  },
): Promise<void> {
  if (options.plan !== 'pro') return;

  const courseIds = resolvePracticeExamCourseIds(
    options.courseSlug,
    options.comboScheduleMap,
  );
  if (courseIds.length === 0) return;

  const userId = await resolveUserId(supabase, options.customerEmail, options.userId);
  if (!userId) return;

  await upsertProAccess(supabase, userId, courseIds);
}

/** Grant one course's practice exam to a user by email (manual unlock). */
export async function grantProPracticeAccessForEmail(
  supabase: SupabaseClient,
  email: string,
  courseId: string,
): Promise<boolean> {
  if (!PRACTICE_EXAM_COURSE_IDS.has(courseId)) return false;
  const userId = await resolveUserId(supabase, email);
  if (!userId) return false;
  await upsertProAccess(supabase, userId, [courseId]);
  return true;
}
