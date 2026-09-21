import Link from 'next/link';
import { hasApmProAccess } from '@/app/lib/practice-exams';
import AgileProductManagementPracticeTest from './AgileProductManagementPracticeTest';
import { AGILE_PRODUCT_MANAGEMENT_QUESTIONS } from './questions';

export const metadata = {
  title: 'Agile Product Management Practice Test | Agile36',
  description:
    'Agile Product Management (APM) Pro practice exam — closed-book style prep and coaching feedback.',
  robots: 'noindex, nofollow',
};

export default async function AgileProductManagementPracticeTestPage() {
  const hasAccess = await hasApmProAccess();

  if (!hasAccess) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Agile Product Management (APM) Practice Test
        </h1>
        <p className="text-slate-600 mb-6">
          This practice test is available only to Pro plan purchasers of the Agile Product Management
          course.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 max-w-xl">
          <h2 className="font-semibold text-amber-900 mb-2">Upgrade to access</h2>
          <p className="text-amber-800 mb-4">
            Purchase the Pro plan when enrolling in Agile Product Management to unlock practice exams
            and other learning resources.
          </p>
          <Link
            href="/courses/agile-product-management/schedule"
            className="inline-flex items-center text-[#fa4a23] font-medium hover:underline"
          >
            View Agile Product Management schedule and enroll →
          </Link>
        </div>
        <Link href="/account/practice-exams" className="inline-block mt-6 text-slate-600 hover:text-slate-900 text-sm">
          ← Back to Practice Exams
        </Link>
      </div>
    );
  }

  const n = AGILE_PRODUCT_MANAGEMENT_QUESTIONS.length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Agile Product Management (APM) Practice Test
      </h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SAFe Agile Product Management certification exam.
        Answer all questions, then submit to see your score and review.
      </p>
      <AgileProductManagementPracticeTest />
    </div>
  );
}
