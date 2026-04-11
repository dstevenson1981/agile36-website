import Link from 'next/link';
import Image from 'next/image';
import AdvancedScrumMasterPracticeTest from '@/app/account/(dashboard)/practice-exams/advanced-scrum-master/AdvancedScrumMasterPracticeTest';
import { ADVANCED_SCRUM_MASTER_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/advanced-scrum-master/questions';

export const metadata = {
  title: 'SASM Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

const n = ADVANCED_SCRUM_MASTER_QUESTIONS.length;

/** Public link: full SASM practice exam (no login or Pro check). */
export default function SasmPracticePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="w-full bg-white border-b border-slate-200">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/Agile36Logo.png"
              alt="Agile36"
              width={200}
              height={64}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
          <span className="text-sm font-semibold text-slate-700">SASM practice ({n}&nbsp;questions)</span>
        </nav>
      </header>
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
