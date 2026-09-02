import Link from 'next/link';
import { hasSafeForTeamsProAccess } from '@/app/lib/practice-exams';
import SafeForTeamsPracticeTest from './SafeForTeamsPracticeTest';
import { SAFE_FOR_TEAMS_QUESTIONS } from './questions';

export const metadata = {
  title: 'SAFe for Teams Practice Test | Agile36',
  description:
    'SAFe for Teams (SP) practice exam for Agile36 Pro students — prepare for the AI-Empowered SAFe for Teams certification exam.',
  robots: 'noindex, nofollow',
};

export default async function SafeForTeamsPracticeTestPage() {
  const hasAccess = await hasSafeForTeamsProAccess();

  if (!hasAccess) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          SAFe for Teams (SP) Practice Test
        </h1>
        <p className="text-slate-600 mb-6">
          This practice test is available only to Pro plan purchasers of the SAFe for Teams course.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 max-w-xl">
          <h2 className="font-semibold text-amber-900 mb-2">Upgrade to access</h2>
          <p className="text-amber-800 mb-4">
            Purchase the Pro plan when enrolling in SAFe for Teams to unlock practice exams and other
            learning resources.
          </p>
          <Link
            href="/courses/safe-for-teams/schedule"
            className="inline-flex items-center text-[#fa4a23] font-medium hover:underline"
          >
            View SAFe for Teams schedule and enroll →
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

  const n = SAFE_FOR_TEAMS_QUESTIONS.length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        SAFe for Teams (SP) Practice Test
      </h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SAFe for Teams (SP) certification exam. Answer all
        questions, then submit to see your score and review.
      </p>
      <SafeForTeamsPracticeTest />
    </div>
  );
}
