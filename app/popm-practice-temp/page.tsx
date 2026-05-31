import PopmPracticeTest from '@/app/popm-prep-pro/PopmPracticeTest';

export const metadata = {
  title: 'SAFe POPM Pro Practice Exam | Agile36',
  description:
    'SAFe Product Owner/Product Manager (POPM) Pro practice exam — full question set for Pro students.',
  robots: 'noindex, nofollow',
};

/** Public POPM Pro practice exam — no login or access key required. */
export default function PopmPracticeTempPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        SAFe Product Owner/Product Manager (POPM) Pro Practice Exam
      </h1>
      <p className="text-slate-600 mb-8">
        45 questions to help you prepare for the SAFe POPM certification exam. Answer all questions, then
        submit to see your score and review.
      </p>
      <PopmPracticeTest />
    </div>
  );
}
