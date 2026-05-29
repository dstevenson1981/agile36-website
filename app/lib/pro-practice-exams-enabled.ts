/**
 * Pro practice exam kill switch (public direct links + account take-test routes).
 *
 * Disabled by default. To re-enable:
 *   - Set PRO_PRACTICE_EXAMS_ENABLED=true in Vercel env, or
 *   - Change DEFAULT_PRO_PRACTICE_EXAMS_ENABLED to true and deploy.
 */
const DEFAULT_PRO_PRACTICE_EXAMS_ENABLED = false;

const PUBLIC_PRO_PRACTICE_PREFIXES = [
  '/popm-prep-pro',
  '/popm-practice-temp',
  '/sasm-practice',
  '/scrum-master-pro-temp-2',
  '/leading-safe-pro-temp-2',
  '/lpmpro',
  '/lpm-pro-temp',
] as const;

const BLOCKED_COURSE_PRACTICE_EXAM = /^\/courses\/[^/]+\/practice-exam\/?$/;

function normalizePath(pathname: string): string {
  return pathname.replace(/\/$/, '') || '/';
}

export function areProPracticeExamsEnabled(): boolean {
  const env = process.env.PRO_PRACTICE_EXAMS_ENABLED?.trim().toLowerCase();
  if (env === 'true') return true;
  if (env === 'false') return false;
  return DEFAULT_PRO_PRACTICE_EXAMS_ENABLED;
}

/** When true, has*ProAccess() returns false and take-test URLs 404. */
export function areAllProPracticeExamsExpired(): boolean {
  return !areProPracticeExamsEnabled();
}

function isAccountProPracticeTakePath(path: string): boolean {
  if (path === '/account/practice-exams') return false;
  return path.startsWith('/account/practice-exams/');
}

/** Paths that return 404 while Pro practice exams are expired/disabled. */
export function isProPracticeExamPath(pathname: string): boolean {
  if (areProPracticeExamsEnabled()) {
    return false;
  }

  const path = normalizePath(pathname);

  if (isAccountProPracticeTakePath(path)) {
    return true;
  }

  if (BLOCKED_COURSE_PRACTICE_EXAM.test(path)) {
    return true;
  }

  return PUBLIC_PRO_PRACTICE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
