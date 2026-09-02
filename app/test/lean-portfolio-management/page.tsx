import Link from 'next/link';
import LpmPublicPreviewExam from './LpmPublicPreviewExam';

export const metadata = {
  title: 'SAFe LPM Practice Test | Agile36',
  description:
    'Free SAFe Lean Portfolio Management (LPM) sample practice questions. Pro exams for enrolled students live in My Account.',
  robots: 'noindex, nofollow',
};

export default function LeanPortfolioManagementSamplePracticePage() {
  return (
    <>
      <div className="border-b border-[#1f2c4a]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-20">
          <p className="text-sm text-[#475569]">
            <strong className="text-[#1f2c4a]">Free sample practice</strong> — try the format and difficulty.
            Enrolled Pro students get the full LPM practice exam in{' '}
            <Link href="/account/login?next=/account/practice-exams" className="font-semibold text-[#d97706] underline">
              My Account → Pro Practice Exams
            </Link>
            .
          </p>
        </div>
      </div>
      <LpmPublicPreviewExam />
    </>
  );
}
