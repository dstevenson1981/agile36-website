import Link from 'next/link';
import Image from 'next/image';
import LpmPracticeTest from '@/app/account/(dashboard)/practice-exams/lpm/LpmPracticeTest';
import { LPM_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/lpm/questions';
import { hasLpmProAccess } from '@/app/lib/practice-exams';

export const metadata = {
  title: 'SAFe LPM Pro Practice Exam (51 Questions) | Agile36',
  description: 'Full-length SAFe Lean Portfolio Management practice exam for Pro course enrollments.',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

const n = LPM_QUESTIONS.length;

export default async function LeanPortfolioManagementFullPracticePage() {
  const hasAccess = await hasLpmProAccess();

  if (!hasAccess) {
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
            </div>
          </nav>
        </header>

        <div className="max-w-xl mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe LPM practice exam</h1>
          <p className="text-slate-600 mb-6">
            The full {n}-question practice exam is included with <strong>Pro</strong> enrollment in SAFe Lean Portfolio
            Management. Sign in and open it from your dashboard under Practice Exams — it is not available without Pro
            access.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/account/login?next=${encodeURIComponent('/account/practice-exams/lpm')}`}
              className="inline-flex justify-center items-center px-5 py-2.5 bg-[#fa4a23] text-white font-semibold rounded-lg hover:bg-[#e03d1a] transition-colors"
            >
              Sign in to Practice Exams
            </Link>
            <Link
              href="/courses/lean-portfolio-management/schedule"
              className="inline-flex justify-center items-center px-5 py-2.5 border-2 border-slate-300 text-slate-800 font-semibold rounded-lg hover:border-slate-400 transition-colors"
            >
              View LPM schedule &amp; enroll
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
            SAFe Lean Portfolio Management practice exam — <strong>{n} questions</strong>. You can also take this exam
            from your account under <strong>Practice Exams → LPM</strong>.
          </p>
        </div>
      </div>

      <section className="w-full py-8 px-4 sm:px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <LpmPracticeTest backHref="/courses/lean-portfolio-management" backLabel="SAFe LPM course" />
        </div>
      </section>
    </main>
  );
}
