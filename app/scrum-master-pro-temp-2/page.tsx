import Link from 'next/link';
import ScrumMasterPracticeTest from '@/app/account/(dashboard)/practice-exams/scrum-master/ScrumMasterPracticeTest';
import { SCRUM_MASTER_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/scrum-master/questions';

/** Shared secret in the URL (?key=...). Rotate this value to invalidate old links without deleting the route. */
const TEMP_SSM_ACCESS_KEY = 'a36-ssm-pro-2026-hk9Qm7xRt3Nw';

/**
 * Optional automatic cutoff (UTC). After this instant the page shows “invalid” even with the correct key.
 * - Prefer `SCRUM_MASTER_PRO_TEMP_EXPIRES_AT` in Vercel/env (ISO 8601, e.g. 2026-07-01T00:00:00.000Z) so you can expire without redeploying.
 * - Or set INLINE_EXPIRES_AT_ISO below and redeploy.
 */
const INLINE_EXPIRES_AT_ISO: string | null = null;

function getExpiresAt(): Date | null {
  const fromEnv = process.env.SCRUM_MASTER_PRO_TEMP_EXPIRES_AT?.trim();
  if (fromEnv) return new Date(fromEnv);
  return INLINE_EXPIRES_AT_ISO ? new Date(INLINE_EXPIRES_AT_ISO) : null;
}

export const metadata = {
  title: 'SAFe Scrum Master Pro Practice Exam | Agile36',
  description:
    'SAFe Scrum Master (SSM) Pro practice exam — same full exam as Agile36 Pro students.',
  robots: 'noindex, nofollow',
};

export default async function ScrumMasterProTemp2Page({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const expiresAt = getExpiresAt();
  const isExpired = expiresAt !== null && !Number.isNaN(expiresAt.getTime()) && Date.now() > expiresAt.getTime();
  const isAuthorized = key === TEMP_SSM_ACCESS_KEY && !isExpired;

  if (!isAuthorized) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          SAFe Scrum Master (SSM) Pro Practice Exam
        </h1>
        <p className="text-slate-600 mb-6">This link is invalid or has expired.</p>
        <Link href="/" className="text-[#fa4a23] font-medium hover:underline">
          Back to Agile36
        </Link>
      </div>
    );
  }

  const n = SCRUM_MASTER_QUESTIONS.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Scrum Master (SSM) Pro Practice Exam</h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SAFe Scrum Master certification exam. Answer all questions, then
        submit to see your score and review.
      </p>
      <ScrumMasterPracticeTest />
    </div>
  );
}
