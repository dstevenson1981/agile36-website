import ScrumMasterPracticeTest from '@/app/account/(dashboard)/practice-exams/scrum-master/ScrumMasterPracticeTest';
import { SCRUM_MASTER_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/scrum-master/questions';

export const metadata = {
  title: 'Temporary Scrum Master Pro Access | Agile36',
  description: 'Temporary direct access route for Scrum Master Pro practice exam.',
  robots: 'noindex, nofollow',
};

export default function ScrumMasterProTempPage() {
  const n = SCRUM_MASTER_QUESTIONS.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe Scrum Master (SSM) Practice Test</h1>
      <p className="text-slate-600 mb-8">
        {n} questions to help you prepare for the SAFe Scrum Master certification exam. This is a temporary
        public link; delete this route later to return 404.
      </p>
      <ScrumMasterPracticeTest />
    </div>
  );
}
