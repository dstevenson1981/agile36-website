/**
 * Pro practice exam availability (account take-test routes + course practice-exam).
 *
 * Global: set PRO_PRACTICE_EXAMS_ENABLED=true to enable all Pro practice exams.
 * When global is off, only courses in ALWAYS_ENABLED_COURSE_IDS stay live.
 *
 * Public site never serves Pro banks — use getPublicProPracticeRedirect().
 */
const DEFAULT_PRO_PRACTICE_EXAMS_ENABLED = false;

/** Pro practice exams that stay available when global disable is on (account only). */
const ALWAYS_ENABLED_COURSE_IDS = new Set([
  'lean-portfolio-management',
  'product-owner-manager',
  'leading-safe',
  // 'scrum-master' — temporarily disabled; re-add to enable SSM Pro again
  'agile-product-management',
  'advanced-scrum-master',
  'safe-for-teams',
]);

const ALWAYS_ENABLED_ACCOUNT_PATHS = new Set([
  '/account/practice-exams/lpm',
  '/account/practice-exams/popm',
  '/account/practice-exams/leading-safe',
  // '/account/practice-exams/scrum-master' — temporarily disabled with SSM Pro
  '/account/practice-exams/agile-product-management',
  '/account/practice-exams/advanced-scrum-master',
  '/account/practice-exams/safe-for-teams',
]);

const ALWAYS_ENABLED_COURSE_PRACTICE_EXAM =
  /^\/courses\/(lean-portfolio-management|product-owner-manager|leading-safe|agile-product-management|advanced-scrum-master|safe-for-teams)\/practice-exam\/?$/;

/** Former public Pro shortcuts → free /test mocks or course pages (always). */
const PUBLIC_PRO_REDIRECTS: Record<string, string> = {
  '/test/leading-safe-pro': '/test/leading-safe',
  '/leading-safepro': '/test/leading-safe',
  '/leading-safe-pro-temp': '/test/leading-safe',
  '/leading-safe-pro-temp-2': '/test/leading-safe',
  '/ssmpro': '/test/scrum-master',
  '/scrum-master-pro-temp': '/test/scrum-master',
  '/scrum-master-pro-temp-2': '/test/scrum-master',
  '/sasm-practice': '/courses/advanced-scrum-master',
  '/test/advanced-scrum-master': '/courses/advanced-scrum-master',
};

const ANY_COURSE_PRACTICE_EXAM = /^\/courses\/[^/]+\/practice-exam\/?$/;

function normalizePath(pathname: string): string {
  return pathname.replace(/\/$/, '') || '/';
}

export function areProPracticeExamsEnabled(): boolean {
  const env = process.env.PRO_PRACTICE_EXAMS_ENABLED?.trim().toLowerCase();
  if (env === 'true') return true;
  if (env === 'false') return false;
  return DEFAULT_PRO_PRACTICE_EXAMS_ENABLED;
}

export function isProPracticeExamExpiredForCourse(courseId: string): boolean {
  if (areProPracticeExamsEnabled()) return false;
  return !ALWAYS_ENABLED_COURSE_IDS.has(courseId);
}

/** @deprecated Use isProPracticeExamExpiredForCourse per course. True when global off and no per-course exceptions. */
export function areAllProPracticeExamsExpired(): boolean {
  return areProPracticeExamsEnabled() === false && ALWAYS_ENABLED_COURSE_IDS.size === 0;
}

export function isPracticeExamsHubEnabled(): boolean {
  return areProPracticeExamsEnabled() || ALWAYS_ENABLED_COURSE_IDS.size > 0;
}

/** Free-site destination for a former public Pro URL, or null. */
export function getPublicProPracticeRedirect(pathname: string): string | null {
  const path = normalizePath(pathname);
  return PUBLIC_PRO_REDIRECTS[path] ?? null;
}

function isAlwaysEnabledAccountOrCoursePath(path: string): boolean {
  if (ALWAYS_ENABLED_ACCOUNT_PATHS.has(path)) return true;
  if (ALWAYS_ENABLED_COURSE_PRACTICE_EXAM.test(path)) return true;
  return false;
}

function isAccountProPracticeTakePath(path: string): boolean {
  if (path === '/account/practice-exams') return false;
  return path.startsWith('/account/practice-exams/');
}

/** Paths that return 404 while their Pro practice exam is unavailable (account/course only). */
export function isProPracticeExamPath(pathname: string): boolean {
  const path = normalizePath(pathname);

  // Public Pro URLs are redirected separately — never 404 here.
  if (getPublicProPracticeRedirect(path)) {
    return false;
  }

  if (areProPracticeExamsEnabled()) {
    return false;
  }

  if (isAlwaysEnabledAccountOrCoursePath(path)) {
    return false;
  }

  if (isAccountProPracticeTakePath(path)) {
    return true;
  }

  if (ANY_COURSE_PRACTICE_EXAM.test(path)) {
    return true;
  }

  return false;
}
