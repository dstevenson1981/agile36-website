import ScrumMasterPracticeTest from './ScrumMasterPracticeTest';
import { SCRUM_MASTER_QUESTIONS } from './questions';

export const metadata = {
  title: 'SAFe Scrum Master Practice Test | Agile36',
  description:
    'SAFe Scrum Master (SSM) Pro practice exam — closed-book style prep and coaching feedback.',
  robots: 'noindex, nofollow',
};

/** Temporary public until Friday — direct URL only; not linked from the public site. */
export default async function ScrumMasterPracticeTestPage() {
  const n = SCRUM_MASTER_QUESTIONS.length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        SAFe Scrum Master (SSM) Practice Test
      </h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SAFe Scrum Master certification exam. Answer all
        questions, then submit to see your score and review.
      </p>
      <ScrumMasterPracticeTest />
    </div>
  );
}
