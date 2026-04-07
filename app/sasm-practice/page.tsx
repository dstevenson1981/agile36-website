import Link from 'next/link';
import AdvancedScrumMasterPracticeTest from '@/app/account/(dashboard)/practice-exams/advanced-scrum-master/AdvancedScrumMasterPracticeTest';
import { ADVANCED_SCRUM_MASTER_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/advanced-scrum-master/questions';

export const metadata = {
  title: 'SASM Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

/** Unlisted public link for the SASM practice exam (no account Pro or whitelist required). */
export default function SasmPracticePage() {
  const n = ADVANCED_SCRUM_MASTER_QUESTIONS.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/courses/advanced-scrum-master"
          className="text-sm text-slate-600 hover:text-slate-900 mb-6 inline-block"
        >
          ← AI-Empowered SAFe Advanced Scrum Master (SASM)
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Advanced Scrum Master (SASM) Practice Test</h1>
        <p className="text-slate-600 mb-8">
          {n} questions to help you prepare for the SASM certification exam. Answer all questions, then submit to see your
          score and review.
        </p>
        <AdvancedScrumMasterPracticeTest />
      </div>
    </div>
  );
}
