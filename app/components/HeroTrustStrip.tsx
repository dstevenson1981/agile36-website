import Link from "next/link";

/** Scaled Agile class finder: sort by average instructor / feedback score (desc). */
export const SCALED_AGILE_FEEDBACK_SORT_URL =
  "https://training.scaledagile.com/?sort=feedbackScore&page=1&limit=25";

type Props = {
  className?: string;
};

export default function HeroTrustStrip({ className = "" }: Props) {
  return (
    <div className={className}>
      <Link
        href={SCALED_AGILE_FEEDBACK_SORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#01203d] hover:text-[#fa4a23] underline-offset-2 hover:underline transition-colors"
      >
        <span aria-hidden>★</span>
        <span>4.94 · #1-rated on Scaled Agile →</span>
      </Link>
    </div>
  );
}
