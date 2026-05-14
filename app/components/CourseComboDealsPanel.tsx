"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { COMBO_COURSES, type Combo } from "@/app/combo-courses/data";

function pickCombos(courseSlug: string | null | undefined): Combo[] {
  if (courseSlug) {
    const related = COMBO_COURSES.filter((c) => c.courses.some((x) => x.slug === courseSlug));
    if (related.length > 0) return related;
  }
  const trendingSafe = COMBO_COURSES.filter((c) => c.category === "safe" && c.trending);
  if (trendingSafe.length > 0) return trendingSafe.slice(0, 6);
  return COMBO_COURSES.filter((c) => c.category === "safe").slice(0, 6);
}

function ComboCard({ combo }: { combo: Combo }) {
  return (
    <div className="rounded-xl border border-amber-300/80 bg-amber-50/90 p-2.5 shadow-sm">
      <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-black/[0.04]">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {combo.courses.map((course, idx) => (
            <div key={course.id} className="flex items-center gap-1.5 sm:gap-2">
              {idx > 0 && <span className="text-lg font-black text-slate-500 sm:text-xl">+</span>}
              <div className="h-11 w-11 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200/80 sm:h-12 sm:w-12">
                <Image
                  src={course.badge}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        <h3 className="mb-3 text-center text-sm font-bold leading-snug text-slate-900 sm:text-[0.95rem]">{combo.name}</h3>
        <div className="mb-4 flex flex-wrap items-baseline justify-center gap-2">
          <span className="text-2xl font-black text-slate-900 sm:text-[1.65rem]">
            USD {combo.comboPrice.toLocaleString()}
          </span>
          <span className="text-sm text-slate-500 line-through sm:text-base">
            USD {combo.originalPrice.toLocaleString()}
          </span>
        </div>
        <Link
          href={`/combo-courses/schedule?combo=${combo.id}`}
          className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#ff7a2e] to-[#fa4a23] py-3 text-center text-sm font-black uppercase tracking-wide text-white shadow-md transition hover:from-[#ff6a1e] hover:to-[#e63e1a]"
        >
          Enroll now
        </Link>
      </div>
    </div>
  );
}

type Props = {
  /** When set, combos that include this course slug are shown first; otherwise trending SAFe combos */
  courseSlug?: string | null;
  className?: string;
};

/** Same combo data as /combo-courses — sidebar-style card + carousel */
export default function CourseComboDealsPanel({ courseSlug, className = "" }: Props) {
  const combos = useMemo(() => pickCombos(courseSlug), [courseSlug]);
  const [index, setIndex] = useState(0);
  if (combos.length === 0) return null;
  const safeIndex = Math.min(index, combos.length - 1);
  const active = combos[safeIndex];

  return (
    <div className={className}>
      <h2 className="mb-3 text-center text-lg font-bold text-slate-900 sm:text-left sm:text-xl">Our combo deals</h2>
      <ComboCard combo={active} />
      {combos.length > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {combos.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show combo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === safeIndex ? "w-6 bg-slate-800" : "w-2 bg-slate-400 hover:bg-slate-500"}`}
            />
          ))}
        </div>
      ) : null}
      <div className="mt-3 text-center sm:text-left">
        <Link href="/combo-courses" className="text-sm font-semibold text-[#01203d] underline underline-offset-2 hover:text-[#fa4a23]">
          Explore our combos →
        </Link>
      </div>
    </div>
  );
}
