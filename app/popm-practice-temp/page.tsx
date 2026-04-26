import Link from 'next/link';
import PopmPracticeTest from '@/app/account/(dashboard)/practice-exams/popm/PopmPracticeTest';

const TEMP_POPM_ACCESS_KEY = 'a36-popm-temp-2026-04-26-disable-soon';

export const metadata = {
  title: 'Temporary POPM Practice Access | Agile36',
  description: 'Temporary direct access route for POPM practice exam.',
  robots: 'noindex, nofollow',
};

export default async function PopmPracticeTempPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const isAuthorized = key === TEMP_POPM_ACCESS_KEY;

  if (!isAuthorized) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">POPM Practice Test</h1>
        <p className="text-slate-600 mb-6">This temporary link is invalid.</p>
        <Link href="/" className="text-[#fa4a23] font-medium hover:underline">
          Back to Agile36
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">SAFe POPM Practice Test</h1>
      <p className="text-slate-600 mb-8">
        Temporary direct access link. Disable by removing this page or changing the key.
      </p>
      <PopmPracticeTest />
    </div>
  );
}
