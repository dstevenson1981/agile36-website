import LpmPracticeTest from '@/app/account/(dashboard)/practice-exams/lpm/LpmPracticeTest';

export const metadata = {
  title: 'LPM Pro Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

export default function LpmProPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">LPM Pro</h1>
        <p className="text-slate-600 mb-8">
          51 questions to help you prepare for the SAFe Lean Portfolio Management certification exam. Answer all questions, then submit to see your score and review.
        </p>
        <LpmPracticeTest />
      </div>
    </div>
  );
}
