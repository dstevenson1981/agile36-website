import Link from 'next/link';

type Props = {
  unlocked: boolean;
  hasProPlan: boolean;
  testHref: string;
  upgradeSlug: string;
};

/** Start Test, locked (Pro, not yet unlocked), or Basic upgrade CTA. */
export default function PracticeExamAccessCta({
  unlocked,
  hasProPlan,
  testHref,
  upgradeSlug,
}: Props) {
  if (unlocked) {
    return (
      <Link
        href={testHref}
        className="px-4 py-2 bg-[#fa4a23] text-white rounded-lg font-medium hover:bg-[#e8431f] transition-colors flex-shrink-0"
      >
        Start Test
      </Link>
    );
  }

  if (hasProPlan) {
    return (
      <div className="flex-shrink-0 text-right max-w-[11rem]">
        <p className="text-sm text-slate-600 font-medium">Unlocks on the last day of class</p>
        <p className="text-xs text-slate-500 mt-0.5">Your instructor will enable access</p>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 text-right">
      <p className="text-sm text-amber-600 font-medium">Upgrade to Pro for $50</p>
      <p className="text-xs text-slate-500 mt-0.5">Practice exam included</p>
      <Link
        href={`/account/practice-exams/upgrade/${upgradeSlug}`}
        className="text-sm text-[#fa4a23] font-medium hover:underline mt-1 inline-block"
      >
        Upgrade to access →
      </Link>
    </div>
  );
}
