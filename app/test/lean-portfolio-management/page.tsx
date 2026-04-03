import Link from 'next/link';
import Image from 'next/image';
import LpmPracticeTest from '@/app/account/(dashboard)/practice-exams/lpm/LpmPracticeTest';

export const metadata = {
  title: 'SAFe LPM Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

/** Full LPM practice bank (same as Pro in account). Public — no login. */
export default function LeanPortfolioManagementPracticeTestPage() {
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
              Lean Portfolio Management — Practice Test
            </div>
          </div>
        </nav>
      </header>

      <section className="w-full py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-600 mb-6">
            51 questions to help you prepare for the SAFe Lean Portfolio Management certification exam.
            Answer all questions, then submit to see your score and review.
          </p>
          <LpmPracticeTest
            backHref="/courses/lean-portfolio-management"
            backLabel="SAFe LPM course"
          />
        </div>
      </section>
    </main>
  );
}
