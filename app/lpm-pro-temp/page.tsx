import Link from 'next/link';
import LpmPracticeTest from '@/app/account/(dashboard)/practice-exams/lpm/LpmPracticeTest';
import { LPM_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/lpm/questions';

/** Shared secret in the URL (?key=...). Rotate to invalidate old links without deleting the route. */
const TEMP_LPM_ACCESS_KEY = 'a36-lpm-pro-2026-kN9mQ4vRx7Lw';

/**
 * Optional automatic cutoff (UTC). After this instant the page shows “invalid” even with the correct key.
 * Prefer `LPM_PRO_TEMP_EXPIRES_AT` in Vercel/env (ISO 8601), or set INLINE_EXPIRES_AT_ISO below.
 */
const INLINE_EXPIRES_AT_ISO: string | null = null;

function getExpiresAt(): Date | null {
  const fromEnv = process.env.LPM_PRO_TEMP_EXPIRES_AT?.trim();
  if (fromEnv) return new Date(fromEnv);
  return INLINE_EXPIRES_AT_ISO ? new Date(INLINE_EXPIRES_AT_ISO) : null;
}

export const metadata = {
  title: 'SAFe LPM Pro Practice Exam | Agile36',
  description:
    'SAFe Lean Portfolio Management (LPM) Pro practice exam — full question set for Pro students.',
  robots: 'noindex, nofollow',
};

const n = LPM_QUESTIONS.length;

export default async function LpmProTempPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const expiresAt = getExpiresAt();
  const isExpired =
    expiresAt !== null && !Number.isNaN(expiresAt.getTime()) && Date.now() > expiresAt.getTime();
  const isAuthorized = key === TEMP_LPM_ACCESS_KEY && !isExpired;

  if (!isAuthorized) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          SAFe Lean Portfolio Management (LPM) Pro Practice Exam
        </h1>
        <p className="text-slate-600 mb-6">This link is invalid or has expired.</p>
        <Link href="/" className="text-[#fa4a23] font-medium hover:underline">
          Back to Agile36
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        SAFe Lean Portfolio Management (LPM) Pro Practice Exam
      </h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SAFe LPM certification exam. Answer all questions, then
        submit to see your score and review.
      </p>
      <LpmPracticeTest backHref="/courses/lean-portfolio-management" backLabel="← LPM course" />
    </div>
  );
}
