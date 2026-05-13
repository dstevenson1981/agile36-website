import Link from 'next/link';
import LeadingSafePracticeTest from '@/app/account/(dashboard)/practice-exams/leading-safe/LeadingSafePracticeTest';

/** Shared secret in the URL (?key=...). Rotate this value to invalidate old links without deleting the route. */
const TEMP_LEADING_SAFE_ACCESS_KEY = 'a36-leading-safe-pro-2026-pL4vK2mNq8Rx';

/**
 * Optional automatic cutoff (UTC). After this instant the page shows “invalid” even with the correct key.
 * - Prefer `LEADING_SAFE_PRO_TEMP_EXPIRES_AT` in Vercel/env (ISO 8601, e.g. 2026-07-01T00:00:00.000Z) so you can expire without redeploying.
 * - Or set INLINE_EXPIRES_AT_ISO below and redeploy.
 */
const INLINE_EXPIRES_AT_ISO: string | null = null;

function getExpiresAt(): Date | null {
  const fromEnv = process.env.LEADING_SAFE_PRO_TEMP_EXPIRES_AT?.trim();
  if (fromEnv) return new Date(fromEnv);
  return INLINE_EXPIRES_AT_ISO ? new Date(INLINE_EXPIRES_AT_ISO) : null;
}

export const metadata = {
  title: 'Temporary Leading SAFe Pro Access | Agile36',
  description: 'Temporary direct access route for Leading SAFe Pro practice exam.',
  robots: 'noindex, nofollow',
};

export default async function LeadingSafeProTemp2Page({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const expiresAt = getExpiresAt();
  const isExpired = expiresAt !== null && !Number.isNaN(expiresAt.getTime()) && Date.now() > expiresAt.getTime();
  const isAuthorized = key === TEMP_LEADING_SAFE_ACCESS_KEY && !isExpired;

  if (!isAuthorized) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Agilist (Leading SAFe) Practice Test</h1>
        <p className="text-slate-600 mb-6">This temporary link is invalid or has expired.</p>
        <Link href="/" className="text-[#fa4a23] font-medium hover:underline">
          Back to Agile36
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Agilist (Leading SAFe) Practice Test</h1>
      <p className="text-slate-600 mb-8">
        Temporary direct access. Invalidate by changing the key, setting an expiry (env or code), or removing this route.
      </p>
      <LeadingSafePracticeTest />
    </div>
  );
}
