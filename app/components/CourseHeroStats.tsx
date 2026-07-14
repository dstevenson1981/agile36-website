import type { ReactNode } from "react";

export type CourseHeroStat = {
  value: string;
  label: string;
  /** Optional — omit for a cleaner number-first tile without iconography. */
  icon?: "users" | "star" | "clock" | "calendar";
};

const ICONS: Record<NonNullable<CourseHeroStat["icon"]>, ReactNode> = {
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6-4a3 3 0 11-3-3" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2l2.9 6.26 6.86.6-5.2 4.5 1.56 6.7L12 16.5 5.88 20.06l1.56-6.7-5.2-4.5 6.86-.6L12 2z" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 2" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path strokeLinecap="round" d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  ),
};

/** Infographic-style stat tiles for course hero sections (enrolled / rating / hours / days). */
export default function CourseHeroStats({ stats, className = "" }: { stats: CourseHeroStat[]; className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-2.5 sm:grid-cols-4 ${className}`}>
      {stats.map((s) => (
        <div key={s.label} className="liquid-glass rounded-xl p-3">
          {s.icon ? (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#d97706]/10 text-[#d97706] [&_svg]:h-4 [&_svg]:w-4">
              {ICONS[s.icon]}
            </span>
          ) : null}
          <p
            className={`text-lg font-semibold tabular-nums text-[#1f2c4a] ${s.icon ? "mt-2" : ""}`}
            style={{ letterSpacing: "-0.02em" }}
          >
            {s.value}
          </p>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-[#64748b]">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
