/**
 * Public / direct-link Pro practice exam routes (not /account/practice-exams).
 *
 * Most public links are disabled by default. Leading SAFe and LPM stay active.
 * To re-enable all other public links:
 *   - Set PRO_PRACTICE_EXAMS_ENABLED=true in Vercel env, or
 *   - Change DEFAULT_PRO_PRACTICE_EXAMS_ENABLED to true and deploy.
 */
const DEFAULT_PRO_PRACTICE_EXAMS_ENABLED = false;

/** Public short links + course practice-exam pages that stay live when global disable is on. */
const ALLOWED_PUBLIC_PREFIXES = ['/leading-safe-pro-temp-2', '/lpmpro'] as const;

const ALLOWED_COURSE_PRACTICE_EXAM =
  /^\/courses\/(leading-safe|lean-portfolio-management)\/practice-exam\/?$/;

export function areProPracticeExamsEnabled(): boolean {
  const env = process.env.PRO_PRACTICE_EXAMS_ENABLED?.trim().toLowerCase();
  if (env === 'true') return true;
  if (env === 'false') return false;
  return DEFAULT_PRO_PRACTICE_EXAMS_ENABLED;
}

const PUBLIC_PRO_PRACTICE_PREFIXES = [
  '/popm-prep-pro',
  '/popm-practice-temp',
  '/sasm-practice',
  '/scrum-master-pro-temp-2',
] as const;

const BLOCKED_COURSE_PRACTICE_EXAM = /^\/courses\/[^/]+\/practice-exam\/?$/;

function normalizePath(pathname: string): string {
  return pathname.replace(/\/$/, '') || '/';
}

function isAllowedPublicPracticePath(path: string): boolean {
  if (ALLOWED_COURSE_PRACTICE_EXAM.test(path)) return true;
  return ALLOWED_PUBLIC_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

/** Paths that return 404 while Pro practice public links are disabled. Account routes stay live. */
export function isProPracticeExamPath(pathname: string): boolean {
  const path = normalizePath(pathname);

  if (path === '/account/practice-exams' || path.startsWith('/account/practice-exams/')) {
    return false;
  }

  if (isAllowedPublicPracticePath(path)) {
    return false;
  }

  if (areProPracticeExamsEnabled()) {
    return false;
  }

  if (BLOCKED_COURSE_PRACTICE_EXAM.test(path)) {
    return true;
  }

  return PUBLIC_PRO_PRACTICE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
