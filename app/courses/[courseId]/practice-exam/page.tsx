import { redirect } from 'next/navigation';
import Link from 'next/link';
import { checkProAccess } from '@/app/lib/checkCourseAccess';
import PopmPracticeTest from '@/app/account/(dashboard)/practice-exams/popm/PopmPracticeTest';
import LpmPracticeTest from '@/app/account/(dashboard)/practice-exams/lpm/LpmPracticeTest';
import ScrumMasterPracticeTest from '@/app/account/(dashboard)/practice-exams/scrum-master/ScrumMasterPracticeTest';
import AdvancedScrumMasterPracticeTest from '@/app/account/(dashboard)/practice-exams/advanced-scrum-master/AdvancedScrumMasterPracticeTest';

const COURSE_PRACTICE_EXAMS: Record<string, { title: string; component: React.ComponentType }> = {
  'product-owner-manager': {
    title: 'SAFe POPM Practice Test',
    component: PopmPracticeTest,
  },
  'lean-portfolio-management': {
    title: 'SAFe LPM Practice Test',
    component: LpmPracticeTest,
  },
  'scrum-master': {
    title: 'SAFe Scrum Master Practice Test',
    component: ScrumMasterPracticeTest,
  },
  'advanced-scrum-master': {
    title: 'SAFe SASM Practice Test',
    component: AdvancedScrumMasterPracticeTest,
  },
};

export const metadata = {
  title: 'Practice Exam | Agile36',
  robots: 'noindex, nofollow',
};

export default async function PracticeExamPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const hasAccess = await checkProAccess(courseId);

  if (!hasAccess) {
    redirect(`/courses/${courseId}?practice_exam_required=1`);
  }

  const examConfig = COURSE_PRACTICE_EXAMS[courseId];
  if (!examConfig) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Practice Exam</h1>
        <p className="text-slate-600 mb-6">
          No practice exam available for this course yet.
        </p>
        <Link href={`/courses/${courseId}`} className="text-[#fa4a23] font-medium hover:underline">
          ← Back to course
        </Link>
      </div>
    );
  }

  const PracticeComponent = examConfig.component;
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{examConfig.title}</h1>
      <p className="text-slate-600 mb-8">
        Answer all questions, then submit to see your score and review.
      </p>
      <PracticeComponent />
    </div>
  );
}
