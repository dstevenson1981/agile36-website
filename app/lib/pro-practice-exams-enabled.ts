/**
 * Public / direct-link Pro practice exam routes (not /account/practice-exams).
 *
 * Disabled by default. To re-enable public links:
 *   - Set PRO_PRACTICE_EXAMS_ENABLED=true in Vercel env, or
 *   - Change DEFAULT_PRO_PRACTICE_EXAMS_ENABLED to true and deploy.
 */
const DEFAULT_PRO_PRACTICE_EXAMS_ENABLED = false;

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
  '/lpmpro',
  '/scrum-master-pro-temp-2',
  '/leading-safe-pro-temp-2',
] as const;

const COURSE_PRACTICE_EXAM = /^\/courses\/[^/]+\/practice-exam\/?$/;

/** Paths that return 404 while Pro practice public links are disabled. Account routes stay live. */
export function isProPracticeExamPath(pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/';

  if (path === '/account/practice-exams' || path.startsWith('/account/practice-exams/')) {
    return false;
  }

  if (COURSE_PRACTICE_EXAM.test(path)) {
    return true;
  }

  return PUBLIC_PRO_PRACTICE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
