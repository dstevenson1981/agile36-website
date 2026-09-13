import { createClient } from '@/app/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { checkProAccess } from '@/app/lib/checkCourseAccess';
import { isProPracticeExamExpiredForCourse } from '@/app/lib/pro-practice-exams-enabled';
import { resolvePracticeExamCourseIds } from '@/app/lib/grant-pro-practice-access';

/** Profile email when non-empty; otherwise auth email. (Empty string profile must not win over auth.) */
function primaryLookupEmail(
  authEmail: string | undefined,
  profileEmail: string | null | undefined
): string {
  const p = profileEmail?.trim() ?? '';
  const a = authEmail?.trim() ?? '';
  return p.length > 0 ? p : a;
}

function distinctEmailsForWhitelist(
  authEmail: string | undefined,
  profileEmail: string | null | undefined
): string[] {
  const a = authEmail?.trim() ?? '';
  const p = profileEmail?.trim() ?? '';
  return [...new Set([p, a].filter((e) => e.length > 0))];
}

const EMERGENCY_SSM_ACCESS_EMAILS = new Set([
  'cchivers444@gmail.com',
  'softwaredevelopmentinstructor@gmail.com',
  'danesh.selvarajan@gmail.com',
  'abhishek.yelgalwar@gmail.com',
]);

const EMERGENCY_LEADING_SAFE_PRO_ACCESS_EMAILS = new Set([
  'haw_glazes_6x@icloud.com',
  'kevinjmcg@yahoo.com',
  'carl.fisher@trimont.com',
  'carl.j.fisher@gmail.com',
]);
const EMERGENCY_POPM_PRO_ACCESS_EMAILS = new Set([
  'beranguelly@hotmail.com',
  'rebecca.clark@lmcu.org',
  'hughes.lauren12@gmail.com',
  'eahoppstetter@gmail.com',
]);
const EMERGENCY_APM_PRO_ACCESS_EMAILS = new Set([
  'harry@harrychand.com',
  'brian.hickey@hrsdc-rhdcc.gc.ca',
]);
const EMERGENCY_LPM_PRO_ACCESS_EMAILS = new Set([
  'aguerrero@habitat.org',
  'dquintard@gmail.com',
  'allibasili@gmail.com',
  'paulc37@comcast.net',
]);

function hasEmergencyEmail(
  emails: Set<string>,
  authEmail: string | undefined,
  profileEmail: string | null | undefined
): boolean {
  return distinctEmailsForWhitelist(authEmail, profileEmail).some((email) =>
    emails.has(email.toLowerCase())
  );
}

async function hasCourseProAccess(
  courseSlug: string,
  emergencyEmails?: Set<string>,
): Promise<boolean> {
  if (isProPracticeExamExpiredForCourse(courseSlug)) return false;

  if (emergencyEmails) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('user_id', user.id)
        .single();
      if (hasEmergencyEmail(emergencyEmails, user.email, profile?.email)) return true;
    }
  }

  return checkProAccess(courseSlug);
}

/** True when the user purchased Pro for this course. */
export async function hasProPlanEnrollmentForCourse(courseSlug: string): Promise<boolean> {
  return checkProAccess(courseSlug);
}

/** Get course slugs the user has registered for (any order, basic or pro) */
export async function getRegisteredCourseSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return [];

  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();

  const slugs = new Set<string>();
  const lookupEmail = primaryLookupEmail(user.email, profile?.email);

  const { data: orders } = await supabase
    .from('orders')
    .select('course_slug')
    .ilike('customer_email', lookupEmail);
  for (const o of orders ?? []) {
    if (o.course_slug) slugs.add(o.course_slug);
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (serviceKey && serviceUrl) {
    const serviceSupabase = createServiceClient(serviceUrl, serviceKey);
    for (const em of distinctEmailsForWhitelist(user.email, profile?.email)) {
      const { data: serviceOrders } = await serviceSupabase
        .from('orders')
        .select('course_slug')
        .ilike('customer_email', em);
      for (const o of serviceOrders ?? []) {
        if (o.course_slug) slugs.add(o.course_slug);
      }
    }
  }

  return [...slugs];
}

/**
 * Expand order slugs (including combo-*) into practice-exam course ids
 * using the same COMBO_COURSES catalog as /combo-courses.
 */
export function practiceExamCoursesFromRegistrations(registeredSlugs: string[]): Set<string> {
  const ids = new Set<string>();
  for (const slug of registeredSlugs) {
    for (const id of resolvePracticeExamCourseIds(slug)) {
      ids.add(id);
    }
  }
  return ids;
}

/** Check if user has Basic (not Pro) for a course - eligible for $50 upgrade */
export async function hasBasicPlanForCourse(courseSlug: string): Promise<boolean> {
  if (courseSlug === 'advanced-scrum-master') {
    if (await hasAdvancedScrumMasterProAccess()) return false;
  } else if (courseSlug === 'scrum-master') {
    if (await hasScrumMasterProAccess()) return false;
  } else if (await checkProAccess(courseSlug)) {
    return false;
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();
  const lookupEmail = primaryLookupEmail(user.email, profile?.email);

  // Resolve single-course and combo-* orders the same way as the combo catalog.
  const { data: orders } = await supabase
    .from('orders')
    .select('course_slug')
    .ilike('customer_email', lookupEmail)
    .eq('plan', 'basic')
    .limit(50);

  return (orders ?? []).some((o) =>
    resolvePracticeExamCourseIds(o.course_slug || '').includes(courseSlug),
  );
}

export async function hasPopmProAccess(): Promise<boolean> {
  return hasCourseProAccess('product-owner-manager', EMERGENCY_POPM_PRO_ACCESS_EMAILS);
}

export async function hasApmProAccess(): Promise<boolean> {
  return hasCourseProAccess('agile-product-management', EMERGENCY_APM_PRO_ACCESS_EMAILS);
}

export async function hasLeadingSafeProAccess(): Promise<boolean> {
  return hasCourseProAccess('leading-safe', EMERGENCY_LEADING_SAFE_PRO_ACCESS_EMAILS);
}

export async function hasScrumMasterProAccess(): Promise<boolean> {
  return hasCourseProAccess('scrum-master', EMERGENCY_SSM_ACCESS_EMAILS);
}

export async function hasLpmProAccess(): Promise<boolean> {
  return hasCourseProAccess('lean-portfolio-management', EMERGENCY_LPM_PRO_ACCESS_EMAILS);
}

export async function hasSafeForTeamsProAccess(): Promise<boolean> {
  return hasCourseProAccess('safe-for-teams');
}

export async function hasRteProAccess(): Promise<boolean> {
  return hasCourseProAccess('release-train-engineer');
}

export async function hasAdvancedScrumMasterProAccess(): Promise<boolean> {
  return hasCourseProAccess('advanced-scrum-master');
}
