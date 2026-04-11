import Link from 'next/link';
import Image from 'next/image';
import { hasAdvancedScrumMasterProAccess } from '@/app/lib/practice-exams';
import AdvancedScrumMasterPracticeTest from '@/app/account/(dashboard)/practice-exams/advanced-scrum-master/AdvancedScrumMasterPracticeTest';
import { ADVANCED_SCRUM_MASTER_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/advanced-scrum-master/questions';

export const metadata = {
  title: 'SASM Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

const n = ADVANCED_SCRUM_MASTER_QUESTIONS.length;

export default async function SasmPracticePage() {
  const hasAccess = await hasAdvancedScrumMasterProAccess();

  if (!hasAccess) {
    return (
      <main className="min-h-screen bg-slate-50">
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
          </nav>
        </header>
        <div className="max-w-xl mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Advanced Scrum Master (SASM) practice exam</h1>
          <p className="text-slate-600 mb-6">
            The full {n}-question practice exam is included with <strong>Pro</strong> enrollment in AI-Empowered SASM.
            Sign in and open it from <strong>Account → Practice Exams</strong>, or enroll with Pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/account/login?next=${encodeURIComponent('/account/practice-exams/advanced-scrum-master')}`}
              className="inline-flex justify-center items-center px-5 py-2.5 bg-[#fa4a23] text-white font-semibold rounded-lg hover:bg-[#e03d1a] transition-colors"
            >
              Sign in to Practice Exams
            </Link>
            <Link
              href="/courses/advanced-scrum-master/schedule"
              className="inline-flex justify-center items-center px-5 py-2.5 border-2 border-slate-300 text-slate-800 font-semibold rounded-lg hover:border-slate-400 transition-colors"
            >
              View SASM schedule &amp; enroll
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
          <span className="text-sm font-semibold text-slate-700">SASM Pro practice ({n}&nbsp;questions)</span>
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
          score and review. Same exam as <strong>Account → Practice Exams → SASM</strong>.
        </p>
        <AdvancedScrumMasterPracticeTest />
      </div>
    </div>
  );
}
