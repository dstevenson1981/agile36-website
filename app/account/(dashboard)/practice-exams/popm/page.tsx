import Link from 'next/link';
import { hasPopmProAccess } from '@/app/lib/practice-exams';
import PopmPracticeTest from './PopmPracticeTest';

export const metadata = {
  title: 'SAFe POPM Practice Test | Agile36',
  description:
    'SAFe Product Owner/Product Manager (POPM) practice exam for Agile36 Pro students — scenario-based prep.',
  robots: 'noindex, nofollow',
};

export default async function PopmPracticeTestPage() {
  const hasAccess = await hasPopmProAccess();

  if (!hasAccess) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe POPM Practice Test</h1>
        <p className="text-slate-600 mb-6">
          This practice test is available only to Pro plan purchasers of the SAFe Product Owner/Product Manager course.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 max-w-xl">
          <h2 className="font-semibold text-amber-900 mb-2">Upgrade to access</h2>
          <p className="text-amber-800 mb-4">
            Purchase the Pro plan when enrolling in SAFe POPM to unlock practice exams and other learning resources.
          </p>
          <Link
            href="/courses/product-owner-manager/schedule"
            className="inline-flex items-center text-[#fa4a23] font-medium hover:underline"
          >
            View POPM schedule and enroll →
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
      <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe POPM Practice Test</h1>
      <p className="text-slate-600 mb-8">
        45 questions to help you prepare for the SAFe Product Owner/Product Manager certification exam. Answer all questions, then submit to see your score and review.
      </p>
      <PopmPracticeTest />
    </div>
  );
}
