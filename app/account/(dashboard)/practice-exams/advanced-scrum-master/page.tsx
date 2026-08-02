import AdvancedScrumMasterPracticeTest from './AdvancedScrumMasterPracticeTest';
import { ADVANCED_SCRUM_MASTER_QUESTIONS } from './questions';

export const metadata = {
  title: 'SASM Practice Test | Agile36',
  description:
    'SAFe Advanced Scrum Master (SASM) practice exam — ART-level coaching and facilitation scenarios.',
  robots: 'noindex, nofollow',
};

/** Temporarily public: no Pro enrollment or login required for this route. */
export default async function AdvancedScrumMasterPracticeTestPage() {
  const n = ADVANCED_SCRUM_MASTER_QUESTIONS.length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Advanced Scrum Master (SASM) Practice Test</h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SASM certification exam. Answer all questions, then submit to see your score
        and review.
      </p>
      <AdvancedScrumMasterPracticeTest backHref="/courses/advanced-scrum-master" backLabel="Back to SASM course" />
    </div>
  );
}
