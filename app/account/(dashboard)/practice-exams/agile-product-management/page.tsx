import AgileProductManagementPracticeTest from './AgileProductManagementPracticeTest';
import { AGILE_PRODUCT_MANAGEMENT_QUESTIONS } from './questions';

export const metadata = {
  title: 'Agile Product Management Practice Test | Agile36',
  description:
    'Agile Product Management (APM) Pro practice exam — closed-book style prep and coaching feedback.',
  robots: 'noindex, nofollow',
};

/** Temporary public for class use — direct URL only; not linked from the public site. */
export default async function AgileProductManagementPracticeTestPage() {
  const n = AGILE_PRODUCT_MANAGEMENT_QUESTIONS.length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Agile Product Management (APM) Practice Test
      </h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SAFe Agile Product Management certification exam.
        Answer all questions, then submit to see your score and review.
      </p>
      <AgileProductManagementPracticeTest backHref="/" backLabel="Agile36 home" />
    </div>
  );
}
