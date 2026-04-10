import Link from 'next/link';
import { hasScrumMasterProAccess } from '@/app/lib/practice-exams';
import ScrumMasterPracticeTest from './ScrumMasterPracticeTest';
import { SCRUM_MASTER_QUESTIONS } from './questions';

export const metadata = {
  title: 'SAFe Scrum Master Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

export default async function ScrumMasterPracticeTestPage() {
  const hasAccess = await hasScrumMasterProAccess();

  if (!hasAccess) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Scrum Master (SSM) Practice Test</h1>
        <p className="text-slate-600 mb-6">
          This practice test is available only to Pro plan purchasers of the SAFe Scrum Master course.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 max-w-xl">
          <h2 className="font-semibold text-amber-900 mb-2">Upgrade to access</h2>
          <p className="text-amber-800 mb-4">
            Purchase the Pro plan when enrolling in AI-Empowered SAFe Scrum Master to unlock practice exams and other learning resources.
          </p>
          <Link
            href="/courses/scrum-master/schedule"
            className="inline-flex items-center text-[#fa4a23] font-medium hover:underline"
          >
            View SSM schedule and enroll →
          </Link>
        </div>
        <Link
          href="/account/practice-exams"
          className="inline-block mt-6 text-slate-600 hover:text-slate-900 text-sm"
        >
          ← Back to Practice Exams
        </Link>
      </div>
    );
  }

  const n = SCRUM_MASTER_QUESTIONS.length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Scrum Master (SSM) Practice Test</h1>
      <p className="text-slate-600 mb-2">
        {n} questions transcribed from the SAFe Scrum Master exam item set (official exam has 45 items; item 3 was not in
        the provided photos). Answer all questions, then submit to see your score and review.
      </p>
      <ScrumMasterPracticeTest />
    </div>
  );
}
