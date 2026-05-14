import Link from "next/link";

type Props = {
  scheduleHref: string;
  currentUsd: number;
  originalUsd: number;
  /** Defaults to phrasing from design reference */
  buttonLabel?: string;
  className?: string;
};

function formatUsd(n: number): string {
  return `USD ${n.toLocaleString("en-US")}`;
}

/** “Starting from” strikethrough list + sale price + primary schedule button (hero column). */
export default function CourseHeroPriceScheduleCta({
  scheduleHref,
  currentUsd,
  originalUsd,
  buttonLabel = "View all schedules",
  className = "",
}: Props) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      <p className="text-left text-[13px] leading-snug text-slate-600 sm:text-sm">
        <span className="font-medium text-slate-600">Starting from </span>
        <span className="font-bold text-slate-800 line-through decoration-slate-400">{formatUsd(originalUsd)}</span>{" "}
        <span className="font-bold text-[#fa4a23]">{formatUsd(currentUsd)}</span>
      </p>
      <Link
        href={scheduleHref}
        className="block w-full rounded-lg bg-[#fa4a23] py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[#e03d1a]"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
