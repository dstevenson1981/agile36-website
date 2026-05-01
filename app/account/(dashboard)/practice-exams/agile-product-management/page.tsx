import Link from 'next/link';
import { hasApmProAccess } from '@/app/lib/practice-exams';
import AgileProductManagementPracticeTest from './AgileProductManagementPracticeTest';

export const metadata = {
  title: 'Agile Product Management Practice Test | Agile36',
  description:
    'Agile Product Management (APM) practice exam for Agile36 Pro students — based on your APM preparation material.',
  robots: 'noindex, nofollow',
};

export default async function AgileProductManagementPracticeTestPage() {
  const hasAccess = await hasApmProAccess();

  if (!hasAccess) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Agile Product Management Practice Test</h1>
        <p className="text-slate-600 mb-6">
          This practice test is available only to Pro plan purchasers of the Agile Product Management course.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 max-w-xl">
          <h2 className="font-semibold text-amber-900 mb-2">Upgrade to access</h2>
          <p className="text-amber-800 mb-4">
            Purchase the Pro plan when enrolling in Agile Product Management to unlock practice exams and
            other learning resources.
          </p>
          <Link
            href="/courses/agile-product-management/schedule"
            className="inline-flex items-center text-[#fa4a23] font-medium hover:underline"
          >
            View APM schedule and enroll →
          </Link>
        </div>
        <Link href="/account/practice-exams" className="inline-block mt-6 text-slate-600 hover:text-slate-900 text-sm">
          ← Back to Practice Exams
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Agile Product Management Practice Test</h1>
      <p className="text-slate-600 mb-8">
        51 questions from your APM prep document. Answer all questions, then submit to see your score and review.
      </p>
      <AgileProductManagementPracticeTest />
    </div>
  );
}
