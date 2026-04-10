import Link from 'next/link';
import Image from 'next/image';
import LpmPracticeTest from '@/app/account/(dashboard)/practice-exams/lpm/LpmPracticeTest';
import { LPM_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/lpm/questions';

export const metadata = {
  title: 'SAFe LPM Pro Practice Exam (51 Questions) | Agile36',
  description: 'Full-length SAFe Lean Portfolio Management practice exam for Pro course enrollments.',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

const n = LPM_QUESTIONS.length;

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
              Pro LPM practice exam ({n}&nbsp;questions)
            </div>
          </div>
        </nav>
      </header>

      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-3">
          <p className="text-sm text-slate-800">
            SAFe Lean Portfolio Management practice exam — <strong>{n} questions</strong>. Also available in your account
            under Practice Exams when you enroll with Pro.
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
