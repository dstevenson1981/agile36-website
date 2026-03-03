import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import { hasLpmProAccess } from '@/app/lib/practice-exams';
import LpmPracticeTest from '@/app/account/(dashboard)/practice-exams/lpm/LpmPracticeTest';

export const metadata = {
  title: 'LPM Pro Practice Test | Agile36',
  robots: 'noindex, nofollow',
};

export default async function LpmProPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/account/login?next=/lpmpro');
  }

  const hasAccess = await hasLpmProAccess();

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Lean Portfolio Management Practice Test</h1>
          <p className="text-slate-600 mb-6">
            This practice test is available only to Pro plan purchasers of the SAFe Lean Portfolio Management course.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
            <h2 className="font-semibold text-amber-900 mb-2">Upgrade to access</h2>
            <p className="text-amber-800 mb-4">
              Purchase the Pro plan when enrolling in SAFe Lean Portfolio Management to unlock practice exams.
            </p>
            <Link
              href="/courses/lean-portfolio-management/schedule"
              className="inline-flex items-center text-[#fa4a23] font-medium hover:underline"
            >
              View LPM schedule and enroll →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">LPM Pro</h1>
        <p className="text-slate-600 mb-8">
          51 questions to help you prepare for the SAFe Lean Portfolio Management certification exam. Answer all questions, then submit to see your score and review.
        </p>
        <LpmPracticeTest />
      </div>
    </div>
  );
}
