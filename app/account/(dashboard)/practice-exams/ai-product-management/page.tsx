import Link from 'next/link';
import { hasAiProductManagementExamAccess } from '@/app/lib/exams/ai-product-management-access';
import { AI_PRODUCT_MANAGEMENT_PRACTICE_QUESTIONS } from './questions';
import AiProductManagementPracticeTest from './AiProductManagementPracticeTest';

export const metadata = {
  title: 'AI Product Management Practice Exam | Agile36',
  description:
    'Practice exam for Agile36 Certified AI Product Manager learners — scenario-based prep from the AI PM practice set.',
  robots: 'noindex, nofollow',
};

export default async function AiProductManagementPracticeExamPage() {
  const hasAccess = await hasAiProductManagementExamAccess();

  if (!hasAccess) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#1f2c4a] mb-2">
          AI Product Management Practice Exam
        </h1>
        <p className="text-slate-600 mb-6">
          This practice exam is available to learners rostered for the Certified
          AI Product Manager course.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 max-w-xl">
          <h2 className="font-semibold text-amber-900 mb-2">Not on the roster</h2>
          <p className="text-amber-800 mb-4">
            If you recently finished class, ask your instructor to add your
            account email to the AI PM exam roster.
          </p>
          <Link
            href="/courses/certified-ai-product-manager/schedule"
            className="inline-flex items-center text-[#d97706] font-medium hover:underline"
          >
            View AI Product Manager schedule →
          </Link>
        </div>
        <Link
          href="/account/practice-exams"
          className="inline-block mt-6 text-slate-600 hover:text-slate-900 text-sm"
        >
          ← Back to Practice Exams
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1f2c4a] mb-2">
        AI Product Management Practice Exam
      </h1>
      <p className="text-slate-600 mb-8">
        {AI_PRODUCT_MANAGEMENT_PRACTICE_QUESTIONS.length} questions to prepare
        for the AI Product Management final exam. Answer all questions, then
        submit to see your score and review.
      </p>
      <AiProductManagementPracticeTest />
    </div>
  );
}
