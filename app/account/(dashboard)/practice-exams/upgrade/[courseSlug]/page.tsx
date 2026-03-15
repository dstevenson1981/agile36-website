import { redirect } from 'next/navigation';
import Link from 'next/link';
import { hasBasicPlanForCourse } from '@/app/lib/practice-exams';
import UpgradeCheckout from './UpgradeCheckout';

const COURSE_NAMES: Record<string, string> = {
  'leading-safe': 'Leading SAFe / SAFe Agilist',
  'product-owner-manager': 'SAFe Product Owner/Product Manager (POPM)',
  'lean-portfolio-management': 'SAFe Lean Portfolio Management (LPM)',
};

export const metadata = {
  title: 'Upgrade to Pro - Practice Exam | Agile36',
  robots: 'noindex, nofollow',
};

export default async function PracticeExamUpgradePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  if (!['leading-safe', 'product-owner-manager', 'lean-portfolio-management'].includes(courseSlug)) {
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
        <Link href="/account/practice-exams" className="text-slate-600 hover:text-slate-900 text-sm">
          ← Back to Practice Exams
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Upgrade to Pro – Practice Exam</h1>
      <p className="text-slate-600 mb-6">
        Unlock the {courseName} practice exam for $50. Includes full access to all practice questions.
      </p>
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm max-w-lg">
        <UpgradeCheckout courseSlug={courseSlug} courseName={courseName} />
      </div>
    </div>
  );
}
