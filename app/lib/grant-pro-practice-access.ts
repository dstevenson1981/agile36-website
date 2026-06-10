import type { SupabaseClient } from '@supabase/supabase-js';
import { COMBO_COURSES } from '@/app/combo-courses/data';

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

/** Grant Pro practice exam rows after a successful Pro purchase. */
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

/** Backfill user_access from all Pro orders for the signed-in user's emails. */
export async function syncProPracticeAccessForUser(
  supabase: SupabaseClient,
  userId: string,
  authEmail?: string | null,
  profileEmail?: string | null,
): Promise<void> {
  const emails = [...new Set([authEmail, profileEmail].map((e) => e?.trim()).filter(Boolean) as string[])];
  if (emails.length === 0) return;

  const courseIds = new Set<string>();

  for (const email of emails) {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('course_slug')
      .ilike('customer_email', email)
      .eq('plan', 'pro');

    if (error) {
      console.error('syncProPracticeAccessForUser orders lookup failed:', error);
      continue;
    }

    for (const order of orders ?? []) {
      for (const courseId of resolvePracticeExamCourseIds(order.course_slug || '')) {
        courseIds.add(courseId);
      }
    }
  }

  if (courseIds.size === 0) return;
  await upsertProAccess(supabase, userId, [...courseIds]);
}
