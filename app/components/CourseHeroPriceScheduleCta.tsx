import Link from "next/link";

type Props = {
  scheduleHref: string;
  currentUsd: number;
  originalUsd: number;
  buttonLabel?: string;
  className?: string;
  /** SAFe courses: label Tuition + all-inclusive copy under the price. */
  showSafeTuition?: boolean;
};

function formatUsdInt(n: number): string {
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

/** Compact pricing block for the sticky course card. */
export default function CourseHeroPriceScheduleCta({
  scheduleHref,
  currentUsd,
  originalUsd,
  buttonLabel = "View Schedules & Enroll",
  className = "",
  showSafeTuition = false,
}: Props) {
  const discountPct =
    originalUsd > 0 ? Math.round((100 * (originalUsd - currentUsd)) / originalUsd) : 0;

  return (
    <div className={className}>
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#94a3b8]">
        {showSafeTuition ? "Tuition" : "Starting from"}
      </p>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-[1.75rem] font-semibold leading-none text-[#1f2c4a]" style={{ letterSpacing: "-0.03em" }}>
          {formatUsdInt(currentUsd)}
        </span>
        <span className="text-sm text-[#94a3b8] line-through">{formatUsdInt(originalUsd)}</span>
        {discountPct > 0 ? (
          <span className="rounded-full bg-[#d97706]/10 px-2 py-0.5 text-[10px] font-bold text-[#d97706]">
            SAVE {discountPct}%
          </span>
        ) : null}
      </div>
      {showSafeTuition ? (
        <div className="mt-2.5">
          <p className="text-[13px] font-semibold leading-snug text-[#1f2c4a]">
            Simple pricing. Everything included.
          </p>
          <p className="mt-1 text-[12px] leading-snug text-[#64748b]">
            One fee covers your training, exam, courseware, credits, and a year of
            SAFe Studio.
          </p>
        </div>
      ) : null}
      <Link
        href={scheduleHref}
        className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#1f2c4a] py-2.5 text-center text-[13px] font-semibold text-white transition hover:bg-[#16243f]"
      >
        {buttonLabel}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-3.5 w-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
        </svg>
      </Link>
      <p className="mt-2 text-center text-[11px] leading-snug text-[#94a3b8]">
        Weekday & weekend cohorts · secure Stripe checkout
      </p>
    </div>
  );
}
