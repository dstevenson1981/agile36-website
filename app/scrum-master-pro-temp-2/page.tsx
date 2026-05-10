import Link from 'next/link';
import ScrumMasterPracticeTest from '@/app/account/(dashboard)/practice-exams/scrum-master/ScrumMasterPracticeTest';

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
  title: 'Temporary Scrum Master Pro Access (2) | Agile36',
  description: 'Temporary direct access route for Scrum Master Pro practice exam.',
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
        <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Scrum Master Practice Test</h1>
        <p className="text-slate-600 mb-6">
          This temporary link is invalid or has expired.
        </p>
        <Link href="/" className="text-[#fa4a23] font-medium hover:underline">
          Back to Agile36
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Scrum Master (SSM) Practice Test</h1>
      <p className="text-slate-600 mb-8">
        Temporary direct access. Invalidate by changing the key, setting an expiry (env or code), or removing this route.
      </p>
      <ScrumMasterPracticeTest />
    </div>
  );
}
