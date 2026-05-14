import Link from "next/link";

type Props = {
  scheduleHref: string;
  currentUsd: number;
  originalUsd: number;
  buttonLabel?: string;
  className?: string;
};

function formatUsdInt(n: number): string {
  return `USD ${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

/** Pricing + schedule CTA — typography aligned with `CourseComboDealsPanel` / combo card inner white panel. */
export default function CourseHeroPriceScheduleCta({
  scheduleHref,
  currentUsd,
  originalUsd,
  buttonLabel = "View all schedules",
  className = "",
}: Props) {
  const discountPct =
    originalUsd > 0 ? Math.round((100 * (originalUsd - currentUsd)) / originalUsd) : 0;

  return (
    <div className={className}>
      <p className="mb-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-600">Starting from</p>
      <div className="mb-4 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
        <span className="text-2xl font-black text-slate-900 sm:text-[1.65rem]">{formatUsdInt(currentUsd)}</span>
        <span className="text-sm text-slate-500 line-through sm:text-base">{formatUsdInt(originalUsd)}</span>
        {discountPct > 0 ? (
          <span className="text-sm font-bold text-[#fa4a23] sm:text-base">{discountPct}% OFF</span>
        ) : null}
      </div>
      <Link
        href={scheduleHref}
        className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#ff7a2e] to-[#fa4a23] py-3 text-center text-sm font-bold text-white shadow-md transition hover:from-[#ff6a1e] hover:to-[#e63e1a]"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
