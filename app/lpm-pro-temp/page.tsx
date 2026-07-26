import LpmPracticeTest from '@/app/account/(dashboard)/practice-exams/lpm/LpmPracticeTest';
import { LPM_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/lpm/questions';
import { LPM_PRO_PUBLIC_PATH } from '@/app/lib/lpm-pro-temp-access';

export const metadata = {
  title: 'SAFe Lean Portfolio Management Practice Test | Agile36',
  description:
    'Private SAFe Lean Portfolio Management (LPM) Pro practice exam link.',
  robots: 'noindex, nofollow',
};

/** Unlisted share URL — not in nav/sitemap. Anyone with the link can take the Pro exam. */
export default function LpmProTempPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          SAFe Lean Portfolio Management Practice Test
        </h1>
        <p className="mb-8 text-slate-600">
          {LPM_QUESTIONS.length} questions covering key SAFe LPM concepts. Answer
          all questions, then submit to see your score and review.
        </p>
        <LpmPracticeTest
          backHref={LPM_PRO_PUBLIC_PATH}
          backLabel="Back to top"
        />
      </div>
    </main>
  );
}
