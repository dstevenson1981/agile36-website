/**
 * Pro practice exam availability (public direct links + account take-test routes).
 *
 * Global: set PRO_PRACTICE_EXAMS_ENABLED=true to enable all Pro practice exams.
 * When global is off, only courses in ALWAYS_ENABLED_COURSE_IDS stay live (LPM by default).
 */
const DEFAULT_PRO_PRACTICE_EXAMS_ENABLED = false;

/** Pro practice exams that stay available when global disable is on. */
const ALWAYS_ENABLED_COURSE_IDS = new Set(['lean-portfolio-management']);

const LPM_PUBLIC_PREFIXES = ['/lpmpro', '/lpm-pro-temp'] as const;

const NON_LPM_PUBLIC_PREFIXES = [
  '/popm-prep-pro',
  '/popm-practice-temp',
  '/sasm-practice',
  '/scrum-master-pro-temp-2',
  '/leading-safe-pro-temp-2',
] as const;

const LPM_COURSE_PRACTICE_EXAM = /^\/courses\/lean-portfolio-management\/practice-exam\/?$/;
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

function isLpmPublicOrAccountPath(path: string): boolean {
  if (path === '/account/practice-exams/lpm') return true;
  if (LPM_COURSE_PRACTICE_EXAM.test(path)) return true;
  return LPM_PUBLIC_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
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

  if (isLpmPublicOrAccountPath(path)) {
    return false;
  }

  if (isAccountProPracticeTakePath(path)) {
    return true;
  }

  if (ANY_COURSE_PRACTICE_EXAM.test(path)) {
    return true;
  }

  return NON_LPM_PUBLIC_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
