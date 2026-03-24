import Link from 'next/link';
import { hasPopmProAccess, hasLpmProAccess, hasLeadingSafeProAccess, getRegisteredCourseSlugs } from '@/app/lib/practice-exams';
import UpgradeSuccessBanner from './UpgradeSuccessBanner';

export const metadata = {
  title: 'Practice Exams | Agile36',
  robots: 'noindex, nofollow',
};

export default async function PracticeExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>;
}) {
  const { upgraded } = await searchParams;
  const [hasPopmPro, hasLpmPro, hasLeadingSafePro, registeredCourses] = await Promise.all([
    hasPopmProAccess(),
    hasLpmProAccess(),
    hasLeadingSafeProAccess(),
    getRegisteredCourseSlugs(),
  ]);

  const hasPopm = registeredCourses.includes('product-owner-manager') || registeredCourses.some((s) => s?.startsWith('combo-') && s.includes('popm'));
  const hasLpm =
    registeredCourses.includes('lean-portfolio-management') ||
    registeredCourses.some((s) => s?.startsWith('combo-') && s.includes('lpm')) ||
    hasLpmPro;
  const hasLeadingSafe = registeredCourses.includes('leading-safe') || registeredCourses.some((s) => s?.startsWith('combo-leading-safe')) || hasLeadingSafePro;
  const hasAnyExam = hasPopm || hasLpm || hasLeadingSafe;

  return (
    <div>
      {upgraded && <UpgradeSuccessBanner courseSlug={upgraded} />}
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Practice Exams</h1>
      <p className="text-slate-600 mb-8">
        Practice tests for your courses. Pro plan includes full access. Basic plan? Upgrade for $50 to unlock.
      </p>

      <div className="space-y-4">
        {/* Leading SAFe - show if registered for course */}
        {hasLeadingSafe && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📘</span>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Leading SAFe / SAFe Agilist</h2>
                <p className="text-slate-600 text-sm mt-1">
                  45 questions covering key SAFe Agilist concepts
                </p>
              </div>
            </div>
            {hasLeadingSafePro ? (
              <Link
                href="/account/practice-exams/leading-safe"
                className="px-4 py-2 bg-[#fa4a23] text-white rounded-lg font-medium hover:bg-[#e8431f] transition-colors flex-shrink-0"
              >
                Start Test
              </Link>
            ) : (
              <div className="flex-shrink-0 text-right">
                <p className="text-sm text-amber-600 font-medium">Upgrade to Pro for $50</p>
                <p className="text-xs text-slate-500 mt-0.5">Practice exam included</p>
                <Link
                  href="/account/practice-exams/upgrade/leading-safe"
                  className="text-sm text-[#fa4a23] font-medium hover:underline mt-1 inline-block"
                >
                  Upgrade to access →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* POPM - show if registered for course */}
        {hasPopm && (
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
                <p className="text-sm text-amber-600 font-medium">Upgrade to Pro for $50</p>
                <p className="text-xs text-slate-500 mt-0.5">Practice exam included</p>
                <Link
                  href="/account/practice-exams/upgrade/product-owner-manager"
                  className="text-sm text-[#fa4a23] font-medium hover:underline mt-1 inline-block"
                >
                  Upgrade to access →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* LPM - show if registered for course */}
        {hasLpm && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📋</span>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">SAFe Lean Portfolio Management (LPM)</h2>
                <p className="text-slate-600 text-sm mt-1">
                  51 questions covering key SAFe LPM concepts
                </p>
              </div>
            </div>
            {hasLpmPro ? (
              <Link
                href="/account/practice-exams/lpm"
                className="px-4 py-2 bg-[#fa4a23] text-white rounded-lg font-medium hover:bg-[#e8431f] transition-colors flex-shrink-0"
              >
                Start Test
              </Link>
            ) : (
              <div className="flex-shrink-0 text-right">
                <p className="text-sm text-amber-600 font-medium">Upgrade to Pro for $50</p>
                <p className="text-xs text-slate-500 mt-0.5">Practice exam included</p>
                <Link
                  href="/account/practice-exams/upgrade/lean-portfolio-management"
                  className="text-sm text-[#fa4a23] font-medium hover:underline mt-1 inline-block"
                >
                  Upgrade to access →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Placeholder */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm opacity-75">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-slate-700">
                {hasAnyExam ? 'More practice exams coming soon' : 'Enroll in a course to see practice exams'}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {hasAnyExam
                  ? 'Additional SAFe certification practice tests will be added for Pro plan purchasers.'
                  : 'Practice exams appear here when you enroll in a course. Upgrade to Pro for $50 to unlock.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
