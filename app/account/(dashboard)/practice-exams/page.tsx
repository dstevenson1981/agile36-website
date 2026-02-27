import Link from 'next/link';
import { hasPopmProAccess } from '@/app/lib/practice-exams';

export const metadata = {
  title: 'Practice Exams | Agile36',
  robots: 'noindex, nofollow',
};

export default async function PracticeExamsPage() {
  const hasPopmPro = await hasPopmProAccess();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Practice Exams</h1>
      <p className="text-slate-600 mb-8">
        Prepare for your certification with practice tests. Available when you purchase the Pro plan.
      </p>

      <div className="space-y-4">
        {/* POPM Practice Test */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📝</span>
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">SAFe Product Owner/Product Manager (POPM)</h2>
              <p className="text-slate-600 text-sm mt-1">
                45 questions covering key SAFe POPM concepts
              </p>
            </div>
          </div>
          {hasPopmPro ? (
            <Link
              href="/account/practice-exams/popm"
              className="px-4 py-2 bg-[#fa4a23] text-white rounded-lg font-medium hover:bg-[#e8431f] transition-colors flex-shrink-0"
            >
              Start Test
            </Link>
          ) : (
            <div className="flex-shrink-0 text-right">
              <p className="text-sm text-amber-600 font-medium">Pro plan required</p>
              <Link
                href="/courses/product-owner-manager/schedule"
                className="text-sm text-[#fa4a23] hover:underline"
              >
                Upgrade to access
              </Link>
            </div>
          )}
        </div>

        {/* Placeholder for future practice exams */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm opacity-75">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-slate-700">More practice exams coming soon</h2>
              <p className="text-slate-500 text-sm mt-1">
                Additional SAFe certification practice tests will be added for Pro plan purchasers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
