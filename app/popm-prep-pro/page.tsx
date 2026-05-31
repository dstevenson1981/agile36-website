import PopmPracticeTest from './PopmPracticeTest';

export const metadata = {
  title: 'SAFe POPM Pro Practice Exam | Agile36',
  description:
    'SAFe Product Owner/Product Manager (POPM) Pro practice exam — 45 questions, public access, no login.',
  robots: 'noindex, nofollow',
};

/** Public POPM Pro practice exam — no login or access key required. */
export default function PopmPrepProPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          SAFe Product Owner/Product Manager (POPM) Pro Practice Exam
        </h1>
        <p className="text-slate-600 mb-8">
          45 questions to help you prepare for the SAFe POPM certification exam. Answer all questions, then
          submit to see your score and review.
        </p>
        <PopmPracticeTest />
      </div>
    </div>
  );
}
