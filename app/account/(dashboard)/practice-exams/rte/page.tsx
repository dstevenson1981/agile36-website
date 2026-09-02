import Link from 'next/link';
import { hasRteProAccess } from '@/app/lib/practice-exams';
import RtePracticeTest from './RtePracticeTest';
import { RTE_QUESTIONS } from './questions';

export const metadata = {
  title: 'SAFe RTE Practice Test | Agile36',
  description:
    'SAFe Release Train Engineer (RTE) practice exam for Agile36 Pro students — prepare for the SAFe RTE certification exam.',
  robots: 'noindex, nofollow',
};

export default async function RtePracticeTestPage() {
  const hasAccess = await hasRteProAccess();

  if (!hasAccess) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          SAFe Release Train Engineer (RTE) Practice Test
        </h1>
        <p className="text-slate-600 mb-6">
          This practice test is available only to Pro plan purchasers of the SAFe Release Train Engineer
          course.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 max-w-xl">
          <h2 className="font-semibold text-amber-900 mb-2">Upgrade to access</h2>
          <p className="text-amber-800 mb-4">
            Purchase the Pro plan when enrolling in SAFe RTE to unlock practice exams and other learning
            resources.
          </p>
          <Link
            href="/courses/release-train-engineer/schedule"
            className="inline-flex items-center text-[#fa4a23] font-medium hover:underline"
          >
            View RTE schedule and enroll →
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

  const n = RTE_QUESTIONS.length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        SAFe Release Train Engineer (RTE) Practice Test
      </h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SAFe Release Train Engineer certification exam. Answer
        all questions, then submit to see your score and review.
      </p>
      <RtePracticeTest />
    </div>
  );
}
