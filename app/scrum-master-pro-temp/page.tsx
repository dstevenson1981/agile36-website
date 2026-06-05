import ScrumMasterPracticeTest from '@/app/account/(dashboard)/practice-exams/scrum-master/ScrumMasterPracticeTest';
import { SCRUM_MASTER_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/scrum-master/questions';

export const metadata = {
  title: 'SAFe Scrum Master Pro Practice Exam | Agile36',
  description:
    'SAFe Scrum Master (SSM) Pro practice exam — full question set for Pro students.',
  robots: 'noindex, nofollow',
};

const n = SCRUM_MASTER_QUESTIONS.length;

/** Public SSM Pro practice exam — no login or access key required. */
export default function ScrumMasterProTempPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Scrum Master (SSM) Pro Practice Exam</h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SAFe Scrum Master certification exam. Answer all questions, then
        submit to see your score and review.
      </p>
      <ScrumMasterPracticeTest />
    </div>
  );
}
