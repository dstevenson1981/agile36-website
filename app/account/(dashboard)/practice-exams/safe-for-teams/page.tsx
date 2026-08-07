import SafeForTeamsPracticeTest from './SafeForTeamsPracticeTest';
import { SAFE_FOR_TEAMS_QUESTIONS } from './questions';

export const metadata = {
  title: 'SAFe for Teams Practice Test | Agile36',
  description:
    'SAFe for Teams (SP) Pro practice exam — prepare for the AI-Empowered SAFe for Teams certification exam.',
  robots: 'noindex, nofollow',
};

/** Temporarily public: no Pro enrollment or login required for this route. */
export default async function SafeForTeamsPracticeTestPage() {
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
      <SafeForTeamsPracticeTest
        backHref="/courses/safe-for-teams"
        backLabel="Back to SAFe for Teams course"
      />
    </div>
  );
}
