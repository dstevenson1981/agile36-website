import SsmAiPracticeTest from '@/app/account/(dashboard)/practice-exams/ssm-ai/SsmAiPracticeTest';
import { SSM_AI_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/ssm-ai/questions';

export const metadata = {
  title: 'AI-Empowered SAFe Scrum Master Practice Test | Agile36',
  description:
    'Temporary class link for the AI-Empowered SAFe Scrum Master practice exam. Not linked from the public site.',
  robots: 'noindex, nofollow',
};

export default function SsmAiProClassPage() {
  const n = SSM_AI_QUESTIONS.length;

  return (
    <div className="min-h-screen bg-[#f6f9fd]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <main className="min-w-0 rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="mb-2 text-2xl font-bold text-slate-900">
            AI-Empowered SAFe Scrum Master Practice Test
          </h1>
          <p className="mb-8 text-slate-600">
            {n} questions from the AI-Empowered SAFe Scrum Master exam. Answer all questions, then
            submit to see your score and review.
          </p>
          <SsmAiPracticeTest backHref="/" backLabel="Agile36 home" />
        </main>
      </div>
    </div>
  );
}
