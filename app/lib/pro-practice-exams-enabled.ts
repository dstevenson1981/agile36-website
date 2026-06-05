/**
 * Pro practice exam availability (public direct links + account take-test routes).
 *
 * Global: set PRO_PRACTICE_EXAMS_ENABLED=true to enable all Pro practice exams.
 * When global is off, only courses in ALWAYS_ENABLED_COURSE_IDS stay live.
 */
const DEFAULT_PRO_PRACTICE_EXAMS_ENABLED = false;

/** Pro practice exams that stay available when global disable is on. */
const ALWAYS_ENABLED_COURSE_IDS = new Set([
  'lean-portfolio-management',
  'product-owner-manager',
  'leading-safe',
]);

const ALWAYS_ENABLED_PUBLIC_PREFIXES = [
  '/lpmpro',
  '/lpm-pro-temp',
  '/popmpro',
  '/popm-prep-pro',
  '/popm-practice-temp',
] as const;

const ALWAYS_ENABLED_ACCOUNT_PATHS = new Set([
  '/account/practice-exams/lpm',
  '/account/practice-exams/popm',
  '/account/practice-exams/leading-safe',
]);

const ALWAYS_ENABLED_COURSE_PRACTICE_EXAM =
  /^\/courses\/(lean-portfolio-management|product-owner-manager|leading-safe)\/practice-exam\/?$/;

const BLOCKED_PUBLIC_PREFIXES = [
  '/sasm-practice',
  '/scrum-master-pro-temp-2',
  '/leading-safe-pro-temp-2',
] as const;

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

function isAlwaysEnabledPublicOrAccountPath(path: string): boolean {
  if (ALWAYS_ENABLED_ACCOUNT_PATHS.has(path)) return true;
  if (ALWAYS_ENABLED_COURSE_PRACTICE_EXAM.test(path)) return true;
  return ALWAYS_ENABLED_PUBLIC_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

function isAccountProPracticeTakePath(path: string): boolean {
  if (path === '/account/practice-exams') return false;
  return path.startsWith('/account/practice-exams/');
}

/** Paths that return 404 while their Pro practice exam is unavailable. */
export function isProPracticeExamPath(pathname: string): boolean {
  const path = normalizePath(pathname);

  if (areProPracticeExamsEnabled()) {
    return false;
  }

  if (isAlwaysEnabledPublicOrAccountPath(path)) {
    return false;
  }

  if (isAccountProPracticeTakePath(path)) {
    return true;
  }

  if (ANY_COURSE_PRACTICE_EXAM.test(path)) {
    return true;
  }

  return BLOCKED_PUBLIC_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
