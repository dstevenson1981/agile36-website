import { redirect } from 'next/navigation';
import Link from 'next/link';
import { hasBasicPlanForCourse } from '@/app/lib/practice-exams';
import UpgradeCheckout from './UpgradeCheckout';

const COURSE_NAMES: Record<string, string> = {
  'leading-safe': 'AI-Empowered Leading SAFe® / SAFe Agilist',
  'product-owner-manager': 'AI-Empowered SAFe Product Owner/Product Manager (POPM)',
  'agile-product-management': 'Agile Product Management (APM)',
  'lean-portfolio-management': 'SAFe Lean Portfolio Management (LPM)',
  'scrum-master': 'AI-Empowered SAFe Scrum Master (SSM)',
  'advanced-scrum-master': 'AI-Empowered SAFe Advanced Scrum Master (SASM)',
  'release-train-engineer': 'AI-Empowered SAFe Release Train Engineer (RTE)',
};

export const metadata = {
  title: 'Upgrade to Pro - Practice Exam | Agile36',
  description:
    'Upgrade to Agile36 Pro for SAFe-aligned practice exams, retake support, and extended prep for your certification path.',
  robots: 'noindex, nofollow',
};

export default async function PracticeExamUpgradePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  if (
    ![
      'leading-safe',
      'product-owner-manager',
      'agile-product-management',
      'lean-portfolio-management',
      'scrum-master',
      'advanced-scrum-master',
      'release-train-engineer',
    ].includes(courseSlug)
  ) {
    redirect('/account/practice-exams');
  }

  const eligible = await hasBasicPlanForCourse(courseSlug);
  if (!eligible) {
    redirect('/account/practice-exams');
  }

  const courseName = COURSE_NAMES[courseSlug];

  return (
    <div>
      <div className="mb-6">
        <Link href="/account/practice-exams" className="text-[#64748b] hover:text-[#1f2c4a] text-sm transition-colors">
          ← Back to Practice Exams
        </Link>
      </div>
      <h1 className="text-2xl font-normal text-[#1f2c4a] mb-2" style={{ letterSpacing: '-0.03em' }}>Upgrade to Pro – Practice Exam</h1>
      <p className="text-[#64748b] mb-6">
        Unlock the {courseName} practice exam for $50. Includes full access to all practice questions.
      </p>
      <div className="rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 max-w-lg shadow-sm">
        <UpgradeCheckout courseSlug={courseSlug} courseName={courseName} />
      </div>
    </div>
  );
}
