import RtePracticeTest from './RtePracticeTest';
import { RTE_QUESTIONS } from './questions';

export const metadata = {
  title: 'SAFe RTE Practice Test | Agile36',
  description:
    'SAFe Release Train Engineer (RTE) Pro practice exam — prepare for the SAFe RTE certification exam.',
  robots: 'noindex, nofollow',
};

/** Temporarily public: no Pro enrollment or login required for this route. */
export default async function RtePracticeTestPage() {
  const n = RTE_QUESTIONS.length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        SAFe Release Train Engineer (RTE) Practice Test
      </h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SAFe Release Train Engineer certification exam.
        Answer all questions, then submit to see your score and review.
      </p>
      <RtePracticeTest
        backHref="/courses/release-train-engineer"
        backLabel="Back to RTE course"
      />
    </div>
  );
}
