import { createClient } from '@/app/lib/supabase/server';
import { createClient as createServiceClient, type SupabaseClient } from '@supabase/supabase-js';
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

/** Distinct non-empty emails to check against whitelists (auth + profile may differ). */
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

function hasEmergencySsmAccess(
  authEmail: string | undefined,
  profileEmail: string | null | undefined
): boolean {
  return distinctEmailsForWhitelist(authEmail, profileEmail).some((email) =>
    EMERGENCY_SSM_ACCESS_EMAILS.has(email.toLowerCase())
  );
}

function hasEmergencyLeadingSafeProAccess(
  authEmail: string | undefined,
  profileEmail: string | null | undefined
): boolean {
  return distinctEmailsForWhitelist(authEmail, profileEmail).some((email) =>
    EMERGENCY_LEADING_SAFE_PRO_ACCESS_EMAILS.has(email.toLowerCase())
  );
}

function hasEmergencyPopmProAccess(
  authEmail: string | undefined,
  profileEmail: string | null | undefined
): boolean {
  return distinctEmailsForWhitelist(authEmail, profileEmail).some((email) =>
    EMERGENCY_POPM_PRO_ACCESS_EMAILS.has(email.toLowerCase())
  );
}

function hasEmergencyApmProAccess(
  authEmail: string | undefined,
  profileEmail: string | null | undefined
): boolean {
  return distinctEmailsForWhitelist(authEmail, profileEmail).some((email) =>
    EMERGENCY_APM_PRO_ACCESS_EMAILS.has(email.toLowerCase())
  );
}

function hasEmergencyLpmProAccess(
  authEmail: string | undefined,
  profileEmail: string | null | undefined
): boolean {
  return distinctEmailsForWhitelist(authEmail, profileEmail).some((email) =>
    EMERGENCY_LPM_PRO_ACCESS_EMAILS.has(email.toLowerCase())
  );
}

function isRpcMissingError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  const msg = String(error.message ?? '');
  const code = String(error.code ?? '');
  return (
    code === 'PGRST202' ||
    code === '42883' ||
    /match_lpm_whitelist|function.*does not exist/i.test(msg)
  );
}

async function whitelistHasEmail(
  serviceSupabase: SupabaseClient,
  table:
    | 'lpm_pro_access_whitelist'
    | 'popm_pro_access_whitelist'
    | 'leading_safe_pro_access_whitelist'
    | 'advanced_scrum_master_pro_access_whitelist'
    | 'scrum_master_pro_access_whitelist'
    | 'agile_product_management_pro_access_whitelist',
  authEmail: string | undefined,
  profileEmail: string | null | undefined
): Promise<boolean> {
  for (const em of distinctEmailsForWhitelist(authEmail, profileEmail)) {
    const { data, error } = await serviceSupabase
      .from(table)
      .select('id')
      .ilike('email', em)
      .limit(1);
    if (error) return false;
    if ((data?.length ?? 0) > 0) return true;
  }
  return false;
}

/** True when the user purchased Pro for this course (exam may still be locked until manual unlock). */
export async function hasProPlanEnrollmentForCourse(courseSlug: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();

  for (const em of distinctEmailsForWhitelist(user.email, profile?.email)) {
    const { data: orders } = await supabase
      .from('orders')
      .select('course_slug')
      .ilike('customer_email', em)
      .eq('plan', 'pro')
      .limit(25);

    if (
      orders?.some((o) =>
        resolvePracticeExamCourseIds(o.course_slug || '').includes(courseSlug),
      )
    ) {
      return true;
    }
  }

  return false;
}

/** LPM whitelist: prefers RPC with Gmail dot–equivalence; falls back to ilike if RPC not installed. */
async function lpmWhitelistMatch(
  serviceSupabase: SupabaseClient,
  authEmail: string | undefined,
  profileEmail: string | null | undefined
): Promise<boolean> {
  const candidates = distinctEmailsForWhitelist(authEmail, profileEmail);
  let fallbackToLegacy = false;

  for (const em of candidates) {
    const { data, error } = await serviceSupabase.rpc('match_lpm_whitelist', { check_email: em });
    if (error) {
      if (isRpcMissingError(error)) {
        fallbackToLegacy = true;
        break;
      }
      return false;
    }
    if (data === true) return true;
  }

  if (fallbackToLegacy) {
    return whitelistHasEmail(serviceSupabase, 'lpm_pro_access_whitelist', authEmail, profileEmail);
  }
  return false;
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

/** Check if the logged-in user has Pro plan for POPM (product-owner-manager) */
export async function hasPopmProAccess(): Promise<boolean> {
  if (isProPracticeExamExpiredForCourse('product-owner-manager')) return false;
  // Prefer user_access table (grants from Stripe webhook)
  const fromUserAccess = await checkProAccess('product-owner-manager');
  if (fromUserAccess) return true;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();

  // Safety fallback so whitelist-only users are not blocked when DB grants are delayed.
  if (hasEmergencyPopmProAccess(user.email, profile?.email)) return true;

  const { data: popmWhitelistRows, error: popmWlErr } = await supabase
    .from('popm_pro_access_whitelist')
    .select('id')
    .limit(1);
  if (!popmWlErr && (popmWhitelistRows?.length ?? 0) > 0) return true;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (serviceKey && serviceUrl) {
    const serviceSupabase = createServiceClient(serviceUrl, serviceKey);
    if (
      await whitelistHasEmail(
        serviceSupabase,
        'popm_pro_access_whitelist',
        user.email,
        profile?.email,
      )
    ) {
      return true;
    }
  }

  return false;
}

/** Check if the logged-in user has Pro plan for Agile Product Management (agile-product-management) */
export async function hasApmProAccess(): Promise<boolean> {
  if (isProPracticeExamExpiredForCourse('agile-product-management')) return false;
  const fromUserAccess = await checkProAccess('agile-product-management');
  if (fromUserAccess) return true;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();

  // Safety fallback so manually granted users are not blocked while DB grants are pending.
  if (hasEmergencyApmProAccess(user.email, profile?.email)) return true;

  // Whitelist: RLS returns a row when auth or profile email matches.
  const { data: apmWhitelistRows, error: apmWlErr } = await supabase
    .from('agile_product_management_pro_access_whitelist')
    .select('id')
    .limit(1);
  if (!apmWlErr && (apmWhitelistRows?.length ?? 0) > 0) return true;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !serviceUrl) return false;

  const serviceSupabase = createServiceClient(serviceUrl, serviceKey);
  return whitelistHasEmail(
    serviceSupabase,
    'agile_product_management_pro_access_whitelist',
    user.email,
    profile?.email
  );
}

/** Check if the logged-in user has Pro plan for Leading SAFe (leading-safe) */
export async function hasLeadingSafeProAccess(): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();

  if (hasEmergencyLeadingSafeProAccess(user.email, profile?.email)) return true;
  if (await checkProAccess('leading-safe')) return true;

  // Whitelist via session RLS (auth or profile email).
  const { data: lsWhitelistRows, error: lsWlErr } = await supabase
    .from('leading_safe_pro_access_whitelist')
    .select('id')
    .limit(1);
  if (!lsWlErr && (lsWhitelistRows?.length ?? 0) > 0) return true;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (serviceKey && serviceUrl) {
    const serviceSupabase = createServiceClient(serviceUrl, serviceKey);
    if (
      await whitelistHasEmail(
        serviceSupabase,
        'leading_safe_pro_access_whitelist',
        user.email,
        profile?.email,
      )
    ) {
      return true;
    }
  }

  if (isProPracticeExamExpiredForCourse('leading-safe')) return false;

  return false;
}

/** Check if the logged-in user has Pro plan for SAFe Scrum Master (scrum-master). */
export async function hasScrumMasterProAccess(): Promise<boolean> {
  if (isProPracticeExamExpiredForCourse('scrum-master')) return false;
  const fromUserAccess = await checkProAccess('scrum-master');
  if (fromUserAccess) return true;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();

  // Safety fallback so whitelist-only users are not blocked if DB whitelist migration has not been run yet.
  if (hasEmergencySsmAccess(user.email, profile?.email)) return true;

  const { data: ssmWhitelistRows, error: ssmWlErr } = await supabase
    .from('scrum_master_pro_access_whitelist')
    .select('id')
    .limit(1);
  if (!ssmWlErr && (ssmWhitelistRows?.length ?? 0) > 0) return true;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !serviceUrl) return false;

  const serviceSupabase = createServiceClient(serviceUrl, serviceKey);
  return whitelistHasEmail(
    serviceSupabase,
    'scrum_master_pro_access_whitelist',
    user.email,
    profile?.email
  );
}

/** Check if the logged-in user has Pro plan for LPM (lean-portfolio-management) */
export async function hasLpmProAccess(): Promise<boolean> {
  if (isProPracticeExamExpiredForCourse('lean-portfolio-management')) return false;
  // Prefer user_access table (grants from Stripe webhook)
  const fromUserAccess = await checkProAccess('lean-portfolio-management');
  if (fromUserAccess) return true;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();

  // Safety fallback so manually granted users are not blocked while DB grants are pending.
  if (hasEmergencyLpmProAccess(user.email, profile?.email)) return true;

  // Whitelist: RLS policy only returns rows where whitelist.email matches auth.users email
  // (case-insensitive). Works without SUPABASE_SERVICE_ROLE_KEY — required for whitelist-only users
  // on Vercel when the service key is missing.
  const { data: whitelistSelf, error: whitelistSelfErr } = await supabase
    .from('lpm_pro_access_whitelist')
    .select('id')
    .limit(1);
  if (!whitelistSelfErr && (whitelistSelf?.length ?? 0) > 0) return true;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !serviceUrl) return false;

  const serviceSupabase = createServiceClient(serviceUrl, serviceKey);
  return lpmWhitelistMatch(serviceSupabase, user.email, profile?.email);
}

/** Check if the logged-in user has Pro plan for SAFe for Teams (safe-for-teams). */
export async function hasSafeForTeamsProAccess(): Promise<boolean> {
  if (isProPracticeExamExpiredForCourse('safe-for-teams')) return false;
  return checkProAccess('safe-for-teams');
}

/** Pro practice exam + Studio-style access for SASM (advanced-scrum-master), including SSM+SASM combo. */
export async function hasAdvancedScrumMasterProAccess(): Promise<boolean> {
  if (isProPracticeExamExpiredForCourse('advanced-scrum-master')) return false;
  const fromUserAccess = await checkProAccess('advanced-scrum-master');
  if (fromUserAccess) return true;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('email')
    .eq('user_id', user.id)
    .single();
  // Whitelist (same pattern as LPM): RLS returns a row when auth or profile email matches — no service role needed.
  const { data: asmWhitelistRows, error: asmWlErr } = await supabase
    .from('advanced_scrum_master_pro_access_whitelist')
    .select('id')
    .limit(1);
  if (!asmWlErr && (asmWhitelistRows?.length ?? 0) > 0) return true;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !serviceUrl) return false;

  const serviceSupabase = createServiceClient(serviceUrl, serviceKey);
  return whitelistHasEmail(
    serviceSupabase,
    'advanced_scrum_master_pro_access_whitelist',
    user.email,
    profile?.email
  );
}
