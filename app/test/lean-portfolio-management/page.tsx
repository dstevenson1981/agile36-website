import Link from 'next/link';
import { LPM_QUESTIONS } from '@/app/account/(dashboard)/practice-exams/lpm/questions';
import LpmPublicPreviewExam from './LpmPublicPreviewExam';

export const metadata = {
  title: 'SAFe LPM Sample Practice Test | Agile36',
  description:
    'Free sample LPM practice questions. Enroll with Pro for the full practice exam in your account.',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

const PREVIEW_COUNT = 45;
const PRO_COUNT = LPM_QUESTIONS.length;

export default function LeanPortfolioManagementSamplePracticePage() {
  return (
    <>
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-4">
          <p className="text-sm text-amber-950">
            <strong>Sample practice</strong> ({PREVIEW_COUNT} questions) — try the format and difficulty.{' '}
            <strong>Pro plan</strong> (at checkout) unlocks the full <strong>{PRO_COUNT}-question</strong>{' '}
            exam in your{' '}
            <Link href="/account/practice-exams/lpm" className="text-[#fa4a23] font-semibold underline">
              Agile36 account → Practice Exams → LPM
            </Link>
            . Those full questions are not the same as this public sample.
          </p>
        </div>
      </div>
      <LpmPublicPreviewExam />
    </>
  );
}
