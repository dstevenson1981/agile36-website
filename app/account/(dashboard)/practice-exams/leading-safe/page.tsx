import Link from 'next/link';
import { hasLeadingSafeProAccess } from '@/app/lib/practice-exams';
import LeadingSafePracticeTest from './LeadingSafePracticeTest';

export const metadata = {
  title: 'SAFe Agilist Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

export default async function LeadingSafePracticeTestPage() {
  const hasAccess = await hasLeadingSafeProAccess();

  if (!hasAccess) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Agilist (Leading SAFe) Practice Test</h1>
        <p className="text-slate-600 mb-6">
          This practice test is available only to Pro plan purchasers of the Leading SAFe course.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 max-w-xl">
          <h2 className="font-semibold text-amber-900 mb-2">Upgrade to access</h2>
          <p className="text-amber-800 mb-4">
            Purchase the Pro plan when enrolling in Leading SAFe to unlock practice exams and other learning resources.
          </p>
          <Link
            href="/courses/leading-safe/schedule"
            className="inline-flex items-center text-[#fa4a23] font-medium hover:underline"
          >
            View Leading SAFe schedule and enroll →
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
      <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Agilist (Leading SAFe) Practice Test</h1>
      <p className="text-slate-600 mb-8">
        45 questions to help you prepare for the SAFe Agilist certification exam. Answer all questions, then submit to see your score and review.
      </p>
      <LeadingSafePracticeTest />
    </div>
  );
}
