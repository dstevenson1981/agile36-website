import Image from 'next/image';
import Link from 'next/link';
import LeadingSafePracticeTest from '@/app/account/(dashboard)/practice-exams/leading-safe/LeadingSafePracticeTest';
import { LEADING_SAFE_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/leading-safe/questions';

export const metadata = {
  title: 'Leading SAFe Pro Practice Test | Agile36',
  description:
    'Full Leading SAFe (SAFe Agilist) Pro practice exam — same question set as Agile36 Pro students.',
  robots: 'noindex, nofollow',
};

export default function LeadingSafeProPublicPracticeTestPage() {
  const n = LEADING_SAFE_QUESTIONS.length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/agile36-logo-header.png"
                alt="Agile36 Logo"
                width={487}
                height={152}
                className="h-10 sm:h-12 w-auto object-contain"
                priority
              />
            </Link>
            <Link href="/test" className="text-sm text-slate-600 hover:text-slate-900">
              All practice tests
            </Link>
          </div>
        </nav>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          SAFe Agilist (Leading SAFe) Pro Practice Test
        </h1>
        <p className="text-slate-600 mb-8">
          {n} questions to help you prepare for the SAFe Agilist certification exam. Answer all
          questions, then submit to see your score and review.
        </p>
        <LeadingSafePracticeTest backHref="/test" backLabel="Back to Practice Tests" />
      </section>
    </main>
  );
}
