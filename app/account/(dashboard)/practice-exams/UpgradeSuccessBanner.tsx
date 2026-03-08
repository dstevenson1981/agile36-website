'use client';

import Link from 'next/link';

const COURSE_NAMES: Record<string, string> = {
  'product-owner-manager': 'POPM',
  'lean-portfolio-management': 'LPM',
};

const EXAM_PATHS: Record<string, string> = {
  'product-owner-manager': '/account/practice-exams/popm',
  'lean-portfolio-management': '/account/practice-exams/lpm',
};

export default function UpgradeSuccessBanner({ courseSlug }: { courseSlug: string }) {
  const courseName = COURSE_NAMES[courseSlug] || courseSlug;
  const examPath = EXAM_PATHS[courseSlug];

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
      <p className="text-emerald-800 font-medium">
        Upgrade complete. You now have access to the {courseName} practice exam.
      </p>
      {examPath && (
        <Link
          href={examPath}
          className="inline-block mt-2 text-[#fa4a23] font-medium hover:underline"
        >
          Start practice exam →
        </Link>
      )}
    </div>
  );
}
