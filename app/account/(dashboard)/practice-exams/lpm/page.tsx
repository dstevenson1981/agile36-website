import Link from 'next/link';
import { hasLpmProAccess } from '@/app/lib/practice-exams';
import LpmPracticeTest from './LpmPracticeTest';
import { LPM_QUESTIONS } from './questions';

export const metadata = {
  title: 'SAFe LPM Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

export default async function LpmPracticeTestPage() {
  const hasAccess = await hasLpmProAccess();

  if (!hasAccess) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Lean Portfolio Management Practice Test</h1>
        <p className="text-slate-600 mb-6">
          This practice test is available only to Pro plan purchasers of the SAFe Lean Portfolio Management course.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 max-w-xl">
          <h2 className="font-semibold text-amber-900 mb-2">Upgrade to access</h2>
          <p className="text-amber-800 mb-4">
            Purchase the Pro plan when enrolling in SAFe Lean Portfolio Management to unlock practice exams and other learning resources.
          </p>
          <Link
            href="/courses/lean-portfolio-management/schedule"
            className="inline-flex items-center text-[#fa4a23] font-medium hover:underline"
          >
            View LPM schedule and enroll →
          </Link>
        </div>
        <Link href="/account/practice-exams" className="inline-block mt-6 text-slate-600 hover:text-slate-900 text-sm">
          ← Back to Practice Exams
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Lean Portfolio Management Practice Test</h1>
      <p className="text-slate-600 mb-8">
        {LPM_QUESTIONS.length} questions — same Pro exam as{' '}
        <Link href="/test/lean-portfolio-management" className="text-[#fa4a23] underline">
          this direct link
        </Link>{' '}
        if you need it outside the dashboard. Answer all, then submit for your score and review.
      </p>
      <LpmPracticeTest />
    </div>
  );
}
