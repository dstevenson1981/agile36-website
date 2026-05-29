import LpmPracticeTest from '@/app/account/(dashboard)/practice-exams/lpm/LpmPracticeTest';
import { LPM_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/lpm/questions';

export const metadata = {
  title: 'SAFe LPM Pro Practice Exam | Agile36',
  description:
    'SAFe Lean Portfolio Management (LPM) Pro practice exam — full question set for Pro students.',
  robots: 'noindex, nofollow',
};

const n = LPM_QUESTIONS.length;

/** Public LPM Pro practice exam — no login or access key required. */
export default function LpmProTempPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        SAFe Lean Portfolio Management (LPM) Pro Practice Exam
      </h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SAFe LPM certification exam. Answer all questions, then
        submit to see your score and review.
      </p>
      <LpmPracticeTest backHref="/courses/lean-portfolio-management" backLabel="← LPM course" />
    </div>
  );
}
