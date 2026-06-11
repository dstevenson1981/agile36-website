import Image from "next/image";
import type { ReactNode } from "react";

/** Adult headshots from `public/Images` (overlapping stack); avoid Avatars stock that included minors. */
const ENROLLED_AVATAR_FILENAMES = [
  "image 120.png",
  "image 137.png",
  "image 247.png",
  "image 476.png",
] as const;

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
      className={`liquid-glass flex flex-col gap-4 rounded-2xl px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3 ${className}`}
    >
      {/* Enrollment */}
      <div className="flex items-center gap-3.5">
        <div className="flex -space-x-2.5" aria-hidden>
          {ENROLLED_AVATAR_FILENAMES.map((name) => (
            <Image
              key={name}
              src={`/Images/${encodeURIComponent(name)}`}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full border-2 border-white object-cover shadow-sm"
              sizes="40px"
            />
          ))}
        </div>
        <div className="leading-tight">
          <p className="text-base font-bold tracking-tight text-[#1f2c4a] sm:text-lg">{enrolledLabel}</p>
          <p className="text-xs text-[#64748b]">in live cohorts</p>
        </div>
      </div>

      <span className="hidden h-9 w-px bg-[#1f2c4a]/15 sm:block" aria-hidden />

      {/* Rating */}
      <div className="leading-tight">
        <p className="text-sm tracking-[0.15em] text-[#d97706]" aria-hidden>
          ★★★★★
        </p>
        <p className="text-sm font-semibold text-[#1f2c4a]">
          4.94 · <span className="font-medium text-[#475569]">#1-rated on Scaled Agile</span>
        </p>
      </div>

      {trailing ? <div className="flex flex-wrap items-center gap-2 sm:ml-auto">{trailing}</div> : null}
    </div>
  );
}
