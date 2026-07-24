import AgileProductManagementPracticeTest from '@/app/account/(dashboard)/practice-exams/agile-product-management/AgileProductManagementPracticeTest';
import { AGILE_PRODUCT_MANAGEMENT_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/agile-product-management/questions';
import { APM_PRO_PUBLIC_PATH } from '@/app/lib/apm-pro-temp-access';

export const metadata = {
  title: 'Agile Product Management Practice Test | Agile36',
  description:
    'Private Agile Product Management (APM) Pro practice exam link.',
  robots: 'noindex, nofollow',
};

/** Unlisted share URL — not in nav/sitemap. Anyone with the link can take the Pro exam. */
export default function ApmProTempPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          Agile Product Management Practice Test
        </h1>
        <p className="mb-8 text-slate-600">
          {AGILE_PRODUCT_MANAGEMENT_QUESTIONS.length} questions from your APM prep
          document. Answer all questions, then submit to see your score and review.
        </p>
        <AgileProductManagementPracticeTest
          backHref={APM_PRO_PUBLIC_PATH}
          backLabel="Back to top"
        />
      </div>
    </main>
  );
}
