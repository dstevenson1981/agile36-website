import Link from "next/link";

type Props = {
  scheduleHref: string;
  currentUsd: number;
  originalUsd: number;
  buttonLabel?: string;
  className?: string;
};

function formatUsdInt(n: number): string {
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

/** Premium pricing block for the sticky course card — big price, savings pill, primary CTA. */
export default function CourseHeroPriceScheduleCta({
  scheduleHref,
  currentUsd,
  originalUsd,
  buttonLabel = "View Schedules & Enroll",
  className = "",
}: Props) {
  const discountPct =
    originalUsd > 0 ? Math.round((100 * (originalUsd - currentUsd)) / originalUsd) : 0;

  return (
    <div className={className}>
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#94a3b8]">Starting from</p>
      <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-4xl font-semibold text-[#1f2c4a]" style={{ letterSpacing: "-0.03em" }}>
          {formatUsdInt(currentUsd)}
        </span>
        <span className="text-base text-[#94a3b8] line-through">{formatUsdInt(originalUsd)}</span>
        {discountPct > 0 ? (
          <span className="rounded-full bg-[#d97706]/10 px-2.5 py-1 text-xs font-bold text-[#d97706]">
            SAVE {discountPct}%
          </span>
        ) : null}
      </div>
      <Link
        href={scheduleHref}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f2c4a] py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-[#1f2c4a]/20 transition hover:bg-[#16243f]"
      >
        {buttonLabel}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
        </svg>
      </Link>
      <p className="mt-2.5 text-center text-xs text-[#94a3b8]">
        Weekday & weekend cohorts · secure Stripe checkout
      </p>
    </div>
  );
}
