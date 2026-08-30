import ScrumMasterPracticeTest from '@/app/account/(dashboard)/practice-exams/scrum-master/ScrumMasterPracticeTest';
import { SCRUM_MASTER_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/scrum-master/questions';

export const metadata = {
  title: 'SAFe Scrum Master Pro Practice Test | Agile36',
  description:
    'Temporary class link for the SAFe Scrum Master Pro practice exam. Not linked from the public site.',
  robots: 'noindex, nofollow',
};

/** Temporary class-only Pro exam URL — not linked publicly. Free /test exam unchanged. */
export default function ScrumMasterProClassPage() {
  const n = SCRUM_MASTER_QUESTIONS.length;

  return (
    <div className="min-h-screen bg-[#f6f9fd]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <main className="min-w-0 rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="mb-2 text-2xl font-bold text-slate-900">
            SAFe Scrum Master (SSM) Practice Test
          </h1>
          <p className="mb-8 text-slate-600">
            {n} questions to help you prepare for the SAFe Scrum Master certification exam. Answer all
            questions, then submit to see your score and review.
          </p>
          <ScrumMasterPracticeTest backHref="/" backLabel="Agile36 home" />
        </main>
      </div>
    </div>
  );
}
