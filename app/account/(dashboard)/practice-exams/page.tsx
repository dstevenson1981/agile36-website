import {
  hasPopmProAccess,
  hasApmProAccess,
  hasLpmProAccess,
  hasLeadingSafeProAccess,
  hasScrumMasterProAccess,
  hasAdvancedScrumMasterProAccess,
  hasProPlanEnrollmentForCourse,
  getRegisteredCourseSlugs,
} from '@/app/lib/practice-exams';
import PracticeExamAccessCta from '@/app/components/practice-exams/PracticeExamAccessCta';
import UpgradeSuccessBanner from './UpgradeSuccessBanner';
import {
  isPracticeExamsHubEnabled,
  isProPracticeExamExpiredForCourse,
} from '@/app/lib/pro-practice-exams-enabled';

export const metadata = {
  title: 'Practice Exams | Agile36',
  description:
    'Practice exams for Agile36 Pro enrollees — Leading SAFe, POPM, Agile Product Management, LPM, SSM, and Advanced Scrum Master. Sign-in required.',
  robots: 'noindex, nofollow',
};

export default async function PracticeExamsPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>;
}) {
  const { upgraded } = await searchParams;
  if (!isPracticeExamsHubEnabled()) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Practice Exams</h1>
        <p className="text-slate-600 max-w-xl">
          Pro practice exams are no longer available. If you have questions about your enrollment or
          certification exam, contact{' '}
          <a href="mailto:d.stevenson@agile36.com" className="text-[#fa4a23] font-medium hover:underline">
            d.stevenson@agile36.com
          </a>
          .
        </p>
      </div>
    );
  }

  const [
    hasPopmPro,
    hasApmPro,
    hasLpmPro,
    hasLeadingSafePro,
    hasSsmPro,
    hasAsmPro,
    registeredCourses,
    hasPopmProPlan,
    hasApmProPlan,
    hasLpmProPlan,
    hasLeadingSafeProPlan,
    hasSsmProPlan,
    hasAsmProPlan,
  ] = await Promise.all([
    hasPopmProAccess(),
    hasApmProAccess(),
    hasLpmProAccess(),
    hasLeadingSafeProAccess(),
    hasScrumMasterProAccess(),
    hasAdvancedScrumMasterProAccess(),
    getRegisteredCourseSlugs(),
    hasProPlanEnrollmentForCourse('product-owner-manager'),
    hasProPlanEnrollmentForCourse('agile-product-management'),
    hasProPlanEnrollmentForCourse('lean-portfolio-management'),
    hasProPlanEnrollmentForCourse('leading-safe'),
    hasProPlanEnrollmentForCourse('scrum-master'),
    hasProPlanEnrollmentForCourse('advanced-scrum-master'),
  ]);

  const hasPopm =
    registeredCourses.includes('product-owner-manager') ||
    registeredCourses.some((s) => s?.startsWith('combo-') && s.includes('popm')) ||
    hasPopmPro;
  const hasApm = registeredCourses.includes('agile-product-management') || hasApmPro;
  const hasLpm =
    registeredCourses.includes('lean-portfolio-management') ||
    registeredCourses.some((s) => s?.startsWith('combo-') && s.includes('lpm')) ||
    hasLpmPro;
  const hasLeadingSafe = registeredCourses.includes('leading-safe') || registeredCourses.some((s) => s?.startsWith('combo-leading-safe')) || hasLeadingSafePro;
  const hasScrumMaster =
    registeredCourses.includes('scrum-master') ||
    registeredCourses.some((s) => s?.startsWith('combo-') && s.includes('ssm')) ||
    hasSsmPro;
  const hasAsm =
    registeredCourses.includes('advanced-scrum-master') ||
    registeredCourses.includes('combo-ssm-advanced') ||
    hasAsmPro;
  const hasAnyExam = hasPopm || hasApm || hasLpm || hasLeadingSafe || hasScrumMaster || hasAsm;

  return (
    <div>
      {upgraded && <UpgradeSuccessBanner courseSlug={upgraded} />}
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Practice Exams</h1>
      <p className="text-slate-600 mb-8">
        Practice tests for your courses. Pro plan exams unlock on the last day of class. Basic plan? Upgrade for $50
        to unlock.
      </p>

      <div className="space-y-4">
        {/* Leading SAFe - show if registered for course */}
        {hasLeadingSafe && !isProPracticeExamExpiredForCourse('leading-safe') && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📘</span>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Leading SAFe / SAFe Agilist</h2>
                <p className="text-slate-600 text-sm mt-1">
                  45 questions covering key SAFe Agilist concepts
                </p>
              </div>
            </div>
            <PracticeExamAccessCta
              unlocked={hasLeadingSafePro}
              hasProPlan={hasLeadingSafeProPlan}
              testHref="/account/practice-exams/leading-safe"
              upgradeSlug="leading-safe"
            />
          </div>
        )}

        {/* POPM - show if registered for course */}
        {hasPopm && !isProPracticeExamExpiredForCourse('product-owner-manager') && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📝</span>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">SAFe Product Owner/Product Manager (POPM)</h2>
                <p className="text-slate-600 text-sm mt-1">
                  45 questions covering key SAFe POPM concepts
                </p>
              </div>
            </div>
            <PracticeExamAccessCta
              unlocked={hasPopmPro}
              hasProPlan={hasPopmProPlan}
              testHref="/account/practice-exams/popm"
              upgradeSlug="product-owner-manager"
            />
          </div>
        )}

        {/* Agile Product Management (APM) */}
        {hasApm && !isProPracticeExamExpiredForCourse('agile-product-management') && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Agile Product Management (APM)</h2>
                <p className="text-slate-600 text-sm mt-1">
                  51 questions derived from your APM preparation pack
                </p>
              </div>
            </div>
            <PracticeExamAccessCta
              unlocked={hasApmPro}
              hasProPlan={hasApmProPlan}
              testHref="/account/practice-exams/agile-product-management"
              upgradeSlug="agile-product-management"
            />
          </div>
        )}

        {/* SAFe Scrum Master (SSM) */}
        {hasScrumMaster && !isProPracticeExamExpiredForCourse('scrum-master') && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">SAFe Scrum Master (SSM)</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Practice questions aligned to the SAFe Scrum Master certification exam
                </p>
              </div>
            </div>
            <PracticeExamAccessCta
              unlocked={hasSsmPro}
              hasProPlan={hasSsmProPlan}
              testHref="/account/practice-exams/scrum-master"
              upgradeSlug="scrum-master"
            />
          </div>
        )}

        {/* SASM - show if registered for course or SSM+SASM combo */}
        {hasAsm && !isProPracticeExamExpiredForCourse('advanced-scrum-master') && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">SAFe Advanced Scrum Master (SASM)</h2>
                <p className="text-slate-600 text-sm mt-1">
                  55 questions aligned to the AI-Empowered SASM practice set
                </p>
              </div>
            </div>
            <PracticeExamAccessCta
              unlocked={hasAsmPro}
              hasProPlan={hasAsmProPlan}
              testHref="/account/practice-exams/advanced-scrum-master"
              upgradeSlug="advanced-scrum-master"
            />
          </div>
        )}

        {/* LPM - show if registered for course */}
        {hasLpm && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📋</span>
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">SAFe Lean Portfolio Management (LPM)</h2>
                <p className="text-slate-600 text-sm mt-1">
                  51 questions covering key SAFe LPM concepts
                </p>
              </div>
            </div>
            <PracticeExamAccessCta
              unlocked={hasLpmPro}
              hasProPlan={hasLpmProPlan}
              testHref="/account/practice-exams/lpm"
              upgradeSlug="lean-portfolio-management"
            />
          </div>
        )}

        {/* Placeholder */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm opacity-75">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d97706]/[0.12] to-[#d97706]/[0.03] ring-1 ring-[#d97706]/15 flex items-center justify-center flex-shrink-0">
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
