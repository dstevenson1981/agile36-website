import Link from 'next/link';
import Image from 'next/image';
import LpmPracticeTest from '@/app/account/(dashboard)/practice-exams/lpm/LpmPracticeTest';
import { LPM_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/lpm/questions';

export const metadata = {
  title: 'SAFe LPM Practice Test (Full 51 Questions) | Agile36',
  description:
    'Full SAFe LPM practice exam — same 51 questions as Pro in your Agile36 account. No login required.',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

const n = LPM_QUESTIONS.length;

/**
 * Full Pro question bank, public URL — for learners who bought Pro but Practice Exams
 * in the account doesn’t show yet, or anyone who needs a direct link.
 */
export default function LeanPortfolioManagementFullPracticePage() {
  return (
    <main className="min-h-screen bg-[#f0f9ff]">
      <header className="w-full bg-[#e8f0f5] border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <div className="h-28 sm:h-32 w-auto">
                <Image
                  src="/Agile36Logo.png"
                  alt="Agile36 Logo"
                  width={360}
                  height={128}
                  className="h-28 sm:h-32 w-auto object-contain"
                  priority
                />
              </div>
            </Link>
            <div className="text-sm font-semibold text-gray-700">
              LPM — full practice ({n}&nbsp;questions)
            </div>
          </div>
        </nav>
      </header>

      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-3">
          <p className="text-sm text-slate-800">
            This is the <strong>full {n}-question</strong> practice exam (same question bank as{' '}
            <strong>Pro → Practice Exams → LPM</strong> when signed in). Use this page if your account
            doesn’t show it yet — bookmark and share this URL.
          </p>
        </div>
      </div>

      <section className="w-full py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <LpmPracticeTest
            backHref="/courses/lean-portfolio-management"
            backLabel="SAFe LPM course"
          />
        </div>
      </section>
    </main>
  );
}
