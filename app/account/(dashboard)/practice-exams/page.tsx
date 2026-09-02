import Image from 'next/image';
import Link from 'next/link';
import {
  hasPopmProAccess,
  hasApmProAccess,
  hasLpmProAccess,
  hasLeadingSafeProAccess,
  hasScrumMasterProAccess,
  hasAdvancedScrumMasterProAccess,
  hasProPlanEnrollmentForCourse,
  getRegisteredCourseSlugs,
  practiceExamCoursesFromRegistrations,
  hasRteProAccess,
} from '@/app/lib/practice-exams';
import { hasAiProductManagementExamAccess } from '@/app/lib/exams/ai-product-management-access';
import UpgradeSuccessBanner from './UpgradeSuccessBanner';
import {
  isPracticeExamsHubEnabled,
  isProPracticeExamExpiredForCourse,
} from '@/app/lib/pro-practice-exams-enabled';
import { BADGES } from '@/app/combo-courses/data';
import { AI_PRODUCT_MANAGEMENT_PRACTICE_QUESTIONS } from './ai-product-management/questions';
import { RTE_QUESTIONS } from './rte/questions';

export const metadata = {
  title: 'Pro Practice Exams | My Account | Agile36',
  description:
    'Pro practice exams for Agile36 enrollees — Leading SAFe, POPM, Agile Product Management, LPM, SSM, and Advanced Scrum Master. Sign-in and enrollment required.',
  robots: 'noindex, nofollow',
};

type ExamCard = {
  courseSlug: string;
  title: string;
  shortLabel: string;
  description: string;
  questionCount: string;
  badge: string;
  testHref: string;
  unlocked: boolean;
  hasProPlan: boolean;
  skipExpiration?: boolean;
};

function ExamAccessBlock({
  unlocked,
  hasProPlan,
  testHref,
  upgradeSlug,
}: {
  unlocked: boolean;
  hasProPlan: boolean;
  testHref: string;
  upgradeSlug: string;
}) {
  if (unlocked) {
    return (
      <>
        <Link
          href={testHref}
          className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#1f2c4a] py-2.5 text-center text-[13px] font-semibold text-white transition hover:bg-[#16243f]"
        >
          Start Practice Exam
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
          </svg>
        </Link>
        <p className="mt-2 text-center text-[11px] leading-snug text-[#94a3b8]">Pro access unlocked · timed practice set</p>
      </>
    );
  }

  if (hasProPlan) {
    return (
      <>
        <div className="mt-3.5 flex w-full items-center justify-center rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.04] py-2.5 text-center text-[13px] font-semibold text-[#1f2c4a]">
          Unlocks last day of class
        </div>
        <p className="mt-2 text-center text-[11px] leading-snug text-[#94a3b8]">
          Your instructor will enable access
        </p>
      </>
    );
  }

  return (
    <>
      <Link
        href={`/account/practice-exams/upgrade/${upgradeSlug}`}
        className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#1f2c4a] py-2.5 text-center text-[13px] font-semibold text-white transition hover:bg-[#16243f]"
      >
        Upgrade to Pro — $50
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
        </svg>
      </Link>
      <p className="mt-2 text-center text-[11px] leading-snug text-[#94a3b8]">
        Practice exam included with Pro
      </p>
    </>
  );
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

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
    hasAiPm,
    hasRtePro,
    registeredCourses,
    hasPopmProPlan,
    hasApmProPlan,
    hasLpmProPlan,
    hasLeadingSafeProPlan,
    hasSsmProPlan,
    hasAsmProPlan,
    hasRteProPlan,
  ] = await Promise.all([
    hasPopmProAccess(),
    hasApmProAccess(),
    hasLpmProAccess(),
    hasLeadingSafeProAccess(),
    hasScrumMasterProAccess(),
    hasAdvancedScrumMasterProAccess(),
    hasAiProductManagementExamAccess(),
    hasRteProAccess(),
    getRegisteredCourseSlugs(),
    hasProPlanEnrollmentForCourse('product-owner-manager'),
    hasProPlanEnrollmentForCourse('agile-product-management'),
    hasProPlanEnrollmentForCourse('lean-portfolio-management'),
    hasProPlanEnrollmentForCourse('leading-safe'),
    hasProPlanEnrollmentForCourse('scrum-master'),
    hasProPlanEnrollmentForCourse('advanced-scrum-master'),
    hasProPlanEnrollmentForCourse('release-train-engineer'),
  ]);

  const eligible = practiceExamCoursesFromRegistrations(registeredCourses);
  if (hasLeadingSafePro) eligible.add('leading-safe');
  if (hasPopmPro) eligible.add('product-owner-manager');
  if (hasApmPro) eligible.add('agile-product-management');
  if (hasLpmPro) eligible.add('lean-portfolio-management');
  if (hasSsmPro) eligible.add('scrum-master');
  if (hasAsmPro) eligible.add('advanced-scrum-master');
  if (hasAiPm) eligible.add('certified-ai-product-manager');
  if (hasRtePro) eligible.add('release-train-engineer');

  const exams: ExamCard[] = [
    {
      courseSlug: 'leading-safe',
      title: 'Leading SAFe / SAFe Agilist',
      shortLabel: 'SA',
      description: '45 questions covering key SAFe Agilist concepts',
      questionCount: '45 questions',
      badge: BADGES['leading-safe'],
      testHref: '/account/practice-exams/leading-safe',
      unlocked: hasLeadingSafePro,
      hasProPlan: hasLeadingSafeProPlan,
    },
    {
      courseSlug: 'product-owner-manager',
      title: 'SAFe Product Owner/Product Manager (POPM)',
      shortLabel: 'POPM',
      description: '45 questions covering key SAFe POPM concepts',
      questionCount: '45 questions',
      badge: BADGES['product-owner-manager'],
      testHref: '/account/practice-exams/popm',
      unlocked: hasPopmPro,
      hasProPlan: hasPopmProPlan,
    },
    {
      courseSlug: 'agile-product-management',
      title: 'Agile Product Management (APM)',
      shortLabel: 'APM',
      description: '51 questions derived from your APM preparation pack',
      questionCount: '51 questions',
      badge: BADGES['agile-product-management'],
      testHref: '/account/practice-exams/agile-product-management',
      unlocked: hasApmPro,
      hasProPlan: hasApmProPlan,
    },
    {
      courseSlug: 'certified-ai-product-manager',
      title: 'AI Product Management',
      shortLabel: 'AI PM',
      description: '45 scenario-based questions from the AI Product Management practice set',
      questionCount: `${AI_PRODUCT_MANAGEMENT_PRACTICE_QUESTIONS.length} questions`,
      badge: BADGES['certified-ai-product-manager'],
      testHref: '/account/practice-exams/ai-product-management',
      unlocked: hasAiPm,
      hasProPlan: hasAiPm,
      skipExpiration: true,
    },
    {
      courseSlug: 'scrum-master',
      title: 'SAFe Scrum Master (SSM)',
      shortLabel: 'SSM',
      description: 'Practice questions aligned to the SAFe Scrum Master certification exam',
      questionCount: 'Practice set',
      badge: BADGES['scrum-master'],
      testHref: '/account/practice-exams/scrum-master',
      unlocked: hasSsmPro,
      hasProPlan: hasSsmProPlan,
    },
    {
      courseSlug: 'advanced-scrum-master',
      title: 'SAFe Advanced Scrum Master (SASM)',
      shortLabel: 'SASM',
      description: '55 questions aligned to the AI-Empowered SASM practice set',
      questionCount: '55 questions',
      badge: BADGES['advanced-scrum-master'],
      testHref: '/account/practice-exams/advanced-scrum-master',
      unlocked: hasAsmPro,
      hasProPlan: hasAsmProPlan,
    },
    {
      courseSlug: 'lean-portfolio-management',
      title: 'SAFe Lean Portfolio Management (LPM)',
      shortLabel: 'LPM',
      description: '51 questions covering key SAFe LPM concepts',
      questionCount: '51 questions',
      badge: BADGES['lean-portfolio-management'],
      testHref: '/account/practice-exams/lpm',
      unlocked: hasLpmPro,
      hasProPlan: hasLpmProPlan,
      skipExpiration: true,
    },
    {
      courseSlug: 'release-train-engineer',
      title: 'SAFe Release Train Engineer (RTE)',
      shortLabel: 'RTE',
      description: 'Practice questions aligned to the SAFe RTE certification exam',
      questionCount: `${RTE_QUESTIONS.length} questions`,
      badge: BADGES['release-train-engineer'],
      testHref: '/account/practice-exams/rte',
      unlocked: hasRtePro,
      hasProPlan: hasRteProPlan,
    },
  ];

  const visibleExams = exams.filter((exam) => {
    if (!eligible.has(exam.courseSlug)) return false;
    if (exam.skipExpiration) return true;
    return !isProPracticeExamExpiredForCourse(exam.courseSlug);
  });
  const hasAnyExam = visibleExams.length > 0;

  return (
    <div>
      {upgraded && <UpgradeSuccessBanner courseSlug={upgraded} />}

      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">My Account · Enrolled students</p>
        <h1 className="text-2xl font-bold text-[#1f2c4a] md:text-3xl" style={{ letterSpacing: '-0.03em' }}>
          Pro Practice Exams
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#64748b]">
          Full Pro banks for your courses and combo bundles — not the free public mocks on the website.
          Pro exams unlock on the last day of class. Basic plan? Upgrade for $50. Looking for free practice?
          Use{' '}
          <Link href="/test" className="font-semibold text-[#d97706] underline">
            Practice Tests
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visibleExams.map((exam) => (
          <article
            key={exam.courseSlug}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#1f2c4a]/15 bg-white shadow-[0_12px_40px_-18px_rgba(31,44,74,0.35)] transition-shadow duration-300 hover:border-[#1f2c4a]/30 hover:shadow-[0_22px_50px_-16px_rgba(31,44,74,0.4)]"
          >
            <div className="bg-gradient-to-r from-[#1f2c4a] to-[#33415f] px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              {exam.unlocked ? 'Pro practice exam' : exam.hasProPlan ? 'Pro · locked until class end' : 'Basic · upgrade available'}
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="mb-4 flex justify-center">
                <div className="h-14 w-14 overflow-hidden rounded-xl border border-[#1f2c4a]/12 bg-[#f8fafc] shadow-sm transition duration-300 group-hover:scale-105">
                  <Image
                    src={exam.badge}
                    alt=""
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <h2 className="mb-1 text-center text-[0.95rem] font-semibold leading-snug text-[#1f2c4a]">
                {exam.title}
              </h2>
              <p className="mb-4 text-center text-xs text-[#94a3b8]">{exam.questionCount} · {exam.shortLabel}</p>

              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#94a3b8]">Access</p>
              <div className="mt-1">
                {exam.unlocked ? (
                  <span className="text-[1.35rem] font-semibold leading-none text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
                    Ready
                  </span>
                ) : exam.hasProPlan ? (
                  <span className="text-[1.35rem] font-semibold leading-none text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
                    Pending unlock
                  </span>
                ) : (
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-[1.35rem] font-semibold leading-none text-[#1f2c4a]" style={{ letterSpacing: '-0.03em' }}>
                      $50
                    </span>
                    <span className="rounded-full bg-[#d97706]/10 px-2 py-0.5 text-[10px] font-bold text-[#d97706]">
                      PRO UPGRADE
                    </span>
                  </div>
                )}
              </div>

              <ExamAccessBlock
                unlocked={exam.unlocked}
                hasProPlan={exam.hasProPlan}
                testHref={exam.testHref}
                upgradeSlug={exam.courseSlug}
              />

              <div className="mt-4 border-t border-[#1f2c4a]/10 pt-3.5">
                <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#94a3b8]">
                  What&apos;s included
                </p>
                <ul className="space-y-2.5">
                  {[exam.description, 'Scenario-style practice questions', 'Immediate feedback after submit'].map(
                    (item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] text-[#475569]">
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="mt-auto pt-4">
                <div className="flex items-center gap-2.5 rounded-lg bg-[#1f2c4a]/[0.04] px-3 py-2.5">
                  <Image
                    src="/Silver.png"
                    alt="Scaled Agile Silver Partner"
                    width={28}
                    height={28}
                    className="h-7 w-7 shrink-0 object-contain"
                  />
                  <p className="text-[11px] leading-snug text-[#475569]">
                    Official training under our{' '}
                    <span className="font-semibold text-[#1f2c4a]">Scaled Agile Silver Partnership</span>
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}

        {!hasAnyExam && (
          <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-[#1f2c4a]/20 bg-white/70 sm:col-span-2 xl:col-span-3">
            <div className="bg-[#1f2c4a]/10 px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
              No exams yet
            </div>
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-[#1f2c4a]/10 bg-[#f8fafc]">
                <svg className="h-6 w-6 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-[0.95rem] font-semibold text-[#1f2c4a]">
                No practice exams for this account
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-[#64748b]">
                Practice exams show up here after you enroll in a supported course. Pro plan
                includes the exam (unlocked on the last day of class); Basic plan can upgrade
                for $50. If you already paid under a different email, sign in with that address
                or contact support.
              </p>
              <Link
                href="/courses"
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-[#1f2c4a] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#16243f]"
              >
                Browse courses
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
