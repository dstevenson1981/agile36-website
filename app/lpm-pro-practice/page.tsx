import { notFound } from 'next/navigation';
import LpmPracticeTest from '@/app/account/(dashboard)/practice-exams/lpm/LpmPracticeTest';

export const metadata = {
  title: 'SAFe LPM Practice Test (Pro) | Agile36',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

function accessKeyValid(provided: string | undefined, secret: string | undefined): boolean {
  if (!provided || !secret || secret.length < 16) return false;
  if (provided.length !== secret.length) return false;
  let mismatch = 0;
  for (let i = 0; i < provided.length; i++) {
    mismatch |= provided.charCodeAt(i) ^ secret.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Direct link to the full LPM Pro practice test without signing in.
 * Set LPM_PRO_PRACTICE_ACCESS_KEY in Vercel (long random string), then share:
 *   /lpm-pro-practice?key=<that value>
 */
export default async function LpmProPracticeSharedPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const secret = process.env.LPM_PRO_PRACTICE_ACCESS_KEY?.trim();

  if (!accessKeyValid(key, secret)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-slate-500 mb-6">
          Shared Pro practice test — for enrolled learners. Do not post this link publicly.
        </p>
        <LpmPracticeTest
          backHref="/courses/lean-portfolio-management"
          backLabel="SAFe LPM course"
        />
      </div>
    </div>
  );
}
