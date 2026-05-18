/**
 * Public / direct-link Pro practice exam routes (not /account/practice-exams).
 *
 * Most public links are disabled by default. Leading SAFe is always allowed.
 * To re-enable all other public links:
 *   - Set PRO_PRACTICE_EXAMS_ENABLED=true in Vercel env, or
 *   - Change DEFAULT_PRO_PRACTICE_EXAMS_ENABLED to true and deploy.
 */
const DEFAULT_PRO_PRACTICE_EXAMS_ENABLED = false;

/** Leading SAFe stays active even when other public Pro practice URLs are off. */
const LEADING_SAFE_PUBLIC_PREFIXES = ['/leading-safe-pro-temp-2'] as const;

const LEADING_SAFE_COURSE_PRACTICE_EXAM = /^\/courses\/leading-safe\/practice-exam\/?$/;

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
] as const;

const COURSE_PRACTICE_EXAM = /^\/courses\/[^/]+\/practice-exam\/?$/;

function normalizePath(pathname: string): string {
  return pathname.replace(/\/$/, '') || '/';
}

function isLeadingSafePublicPracticePath(path: string): boolean {
  if (LEADING_SAFE_COURSE_PRACTICE_EXAM.test(path)) return true;
  return LEADING_SAFE_PUBLIC_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

/** Paths that return 404 while Pro practice public links are disabled. Account routes stay live. */
export function isProPracticeExamPath(pathname: string): boolean {
  const path = normalizePath(pathname);

  if (path === '/account/practice-exams' || path.startsWith('/account/practice-exams/')) {
    return false;
  }

  if (isLeadingSafePublicPracticePath(path)) {
    return false;
  }

  if (areProPracticeExamsEnabled()) {
    return false;
  }

  if (COURSE_PRACTICE_EXAM.test(path)) {
    return true;
  }

  return PUBLIC_PRO_PRACTICE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
