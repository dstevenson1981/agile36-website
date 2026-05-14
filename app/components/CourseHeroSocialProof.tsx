import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SCALED_AGILE_FEEDBACK_SORT_URL } from "@/app/components/HeroTrustStrip";

/** Small learner avatars from `public/Avatars` (overlapping stack). */
const ENROLLED_AVATAR_FILENAMES = ["image 1.png", "image 10.png", "image 11.png", "image 12.png"] as const;

type Props = {
  /** e.g. "9K+ Enrolled", "25,000+ enrolled" — match each course page copy */
  enrolledLabel: string;
  /** Optional badges (e.g. exam included) shown on the same row when space allows */
  trailing?: ReactNode;
  className?: string;
};

/** Avatars + enrollment + Scaled Agile rating — prominent trust bar under H1 */
export default function CourseHeroSocialProof({ enrolledLabel, trailing, className = "" }: Props) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50 to-slate-100/80 px-4 py-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 sm:px-5 sm:py-3.5 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="flex -space-x-2.5" aria-hidden>
          {ENROLLED_AVATAR_FILENAMES.map((name) => (
            <Image
              key={name}
              src={`/Avatars/${encodeURIComponent(name)}`}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
              sizes="36px"
            />
          ))}
        </div>
        <span className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">{enrolledLabel}</span>
        <span className="hidden h-8 w-px bg-slate-300 sm:block" aria-hidden />
        <Link
          href={SCALED_AGILE_FEEDBACK_SORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-base font-bold text-[#01203d] underline decoration-2 underline-offset-4 transition hover:text-[#fa4a23] sm:text-lg"
        >
          <span className="text-amber-500" aria-hidden>
            ★
          </span>
          <span>4.94 · #1-rated on Scaled Agile</span>
          <span className="text-sm font-semibold opacity-80" aria-hidden>
            →
          </span>
        </Link>
      </div>
      {trailing ? <div className="flex flex-wrap items-center gap-2 sm:ml-auto">{trailing}</div> : null}
    </div>
  );
}
