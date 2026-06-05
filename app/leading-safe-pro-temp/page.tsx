import LeadingSafePracticeTest from '@/app/account/(dashboard)/practice-exams/leading-safe/LeadingSafePracticeTest';
import { LEADING_SAFE_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/leading-safe/questions';

export const metadata = {
  title: 'Leading SAFe Pro Practice Exam | Agile36',
  description:
    'Leading SAFe (SAFe Agilist) Pro practice exam — full question set for Pro students.',
  robots: 'noindex, nofollow',
};

const n = LEADING_SAFE_QUESTIONS.length;

/** Public Leading SAFe Pro practice exam — no login or access key required. */
export default function LeadingSafeProTempPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        SAFe Agilist (Leading SAFe) Pro Practice Exam
      </h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SAFe Agilist certification exam. Answer all questions, then
        submit to see your score and review.
      </p>
      <LeadingSafePracticeTest />
    </div>
  );
}
