import Link from 'next/link';
import Image from 'next/image';
import AdvancedScrumMasterPracticeTest from '@/app/account/(dashboard)/practice-exams/advanced-scrum-master/AdvancedScrumMasterPracticeTest';
import { ADVANCED_SCRUM_MASTER_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/advanced-scrum-master/questions';

export const metadata = {
  title: 'SASM Practice Test | Agile36',
  description:
    'Public sample SAFe Advanced Scrum Master (SASM) practice questions for self-assessment — not a substitute for official course completion.',
  robots: 'noindex, nofollow',
};

const n = ADVANCED_SCRUM_MASTER_QUESTIONS.length;

/** Public link: full SASM practice exam (no login or Pro check). */
export default function SasmPracticePage() {
  return (
    <div className="min-h-screen bg-black text-[#1f2c4a]">
      <header className="w-full bg-black/60 backdrop-blur-2xl border-b border-[#1f2c4a]/10 sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/agile36-logo-header.png"
              alt="Agile36"
              width={487}
              height={152}
              className="h-10 sm:h-12 w-auto object-contain"
              priority
            />
          </Link>
          <span className="text-sm font-medium text-[#475569]">SASM practice ({n}&nbsp;questions)</span>
        </nav>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/courses/advanced-scrum-master"
          className="text-sm text-[#475569] hover:text-[#1f2c4a] mb-6 inline-block"
        >
          ← AI-Empowered SAFe Advanced Scrum Master (SASM)
        </Link>
        <h1 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] mb-2">SAFe Advanced Scrum Master (SASM) Practice Test</h1>
        <p className="text-[#475569] mb-8">
          {n} questions to help you prepare for the SASM certification exam. Answer all questions, then submit to see your
          score and review.
        </p>
        <AdvancedScrumMasterPracticeTest />
      </div>
    </div>
  );
}
