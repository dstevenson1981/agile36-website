'use client';

import Link from 'next/link';

const COURSE_NAMES: Record<string, string> = {
  'leading-safe': 'Leading SAFe',
  'product-owner-manager': 'POPM',
  'lean-portfolio-management': 'LPM',
  'scrum-master': 'SSM',
  'advanced-scrum-master': 'SASM',
};

const EXAM_PATHS: Record<string, string> = {
  'leading-safe': '/account/practice-exams/leading-safe',
  'product-owner-manager': '/account/practice-exams/popm',
  'lean-portfolio-management': '/account/practice-exams/lpm',
  'scrum-master': '/account/practice-exams/scrum-master',
  'advanced-scrum-master': '/account/practice-exams/advanced-scrum-master',
};

export default function UpgradeSuccessBanner({ courseSlug }: { courseSlug: string }) {
  const courseName = COURSE_NAMES[courseSlug] || courseSlug;
  const examPath = EXAM_PATHS[courseSlug];

  return (
    <div className="bg-green-400/15 border border-green-400/30 rounded-2xl p-4 mb-6">
      <p className="text-green-300 font-medium">
        Upgrade complete. You now have access to the {courseName} practice exam.
      </p>
      {examPath && (
        <Link
          href={examPath}
          className="inline-block mt-2 text-[#fbbf24] font-medium hover:underline"
        >
          Start practice exam →
        </Link>
      )}
    </div>
  );
}
