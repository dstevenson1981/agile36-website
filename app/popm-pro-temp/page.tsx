import PopmPracticeTest from '@/app/account/(dashboard)/practice-exams/popm/PopmPracticeTest';
import { POPM_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/popm/questions';
import { POPM_PRO_PUBLIC_PATH } from '@/app/lib/popm-pro-temp-access';

export const metadata = {
  title: 'SAFe POPM Practice Test | Agile36',
  description:
    'Private SAFe Product Owner/Product Manager (POPM) Pro practice exam link.',
  robots: 'noindex, nofollow',
};

/** Unlisted share URL — not in nav/sitemap. Anyone with the link can take the Pro exam. */
export default function PopmProTempPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          SAFe POPM Practice Test
        </h1>
        <p className="mb-8 text-slate-600">
          {POPM_QUESTIONS.length} questions covering key SAFe POPM concepts.
          Answer all questions, then submit to see your score and review.
        </p>
        <PopmPracticeTest
          backHref={POPM_PRO_PUBLIC_PATH}
          backLabel="Back to top"
        />
      </div>
    </main>
  );
}
