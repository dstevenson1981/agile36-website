'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function PracticeExamUpsellBannerInner({
  courseSlug,
  schedulePath,
}: {
  courseSlug: string;
  schedulePath: string;
}) {
  const searchParams = useSearchParams();
  if (searchParams.get('practice_exam_required') !== '1') return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <p className="text-amber-900 text-sm">
          <strong>Account practice link</strong> needs the right plan. The <strong>same full LPM exam</strong> is always
          here: <strong>agile36.com/test/lean-portfolio-management</strong>
        </p>
        <Link
          href={schedulePath}
          className="text-[#fa4a23] font-medium hover:underline text-sm whitespace-nowrap"
        >
          View schedule and enroll →
        </Link>
      </div>
    </div>
  );
}

export default function PracticeExamUpsellBanner({
  courseSlug,
  schedulePath,
}: {
  courseSlug: string;
  schedulePath: string;
}) {
  return (
    <Suspense fallback={null}>
      <PracticeExamUpsellBannerInner courseSlug={courseSlug} schedulePath={schedulePath} />
    </Suspense>
  );
}
