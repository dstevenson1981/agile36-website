import PopmPracticeTest from './PopmPracticeTest';

export const metadata = {
  title: 'POPM Prep Pro | SAFe Practice Test | Agile36',
  description: 'SAFe Product Owner/Product Manager practice test. 45 questions to prepare for your POPM certification exam.',
  robots: 'noindex, nofollow',
};

export default function PopmPrepProPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">POPM Prep Pro</h1>
        <p className="text-slate-600 mb-8">
          SAFe Product Owner/Product Manager practice test. 45 questions to help you prepare for your certification exam.
        </p>
        <PopmPracticeTest />
      </div>
    </div>
  );
}
