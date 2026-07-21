"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  type Combo,
  combosForCourseSlug,
  COMBO_COURSES,
} from "@/app/combo-courses/data";

function initialComboIndex(combos: Combo[], slug: string | undefined): number {
  if (combos.length === 0 || !slug) return 0;
  const i = combos.findIndex((c) => c.courses.some((x) => x.slug === slug));
  return i === -1 ? 0 : i;
}

function ComboCard({ combo }: { combo: Combo }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm ring-1 ring-black/[0.04]">
      <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {combo.courses.map((course, idx) => (
          <div key={course.id} className="flex items-center gap-1.5 sm:gap-2">
            {idx > 0 && <span className="text-lg font-black text-slate-500 sm:text-xl">+</span>}
            <div className="h-11 w-11 overflow-hidden rounded-lg bg-gray-100 ring-1 ring-slate-200/80 sm:h-12 sm:w-12">
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
      <h3 className="mb-2 text-center text-sm font-bold leading-snug text-gray-900 sm:text-left sm:text-[0.95rem]">
        {combo.name}
      </h3>
      {combo.enrolled ? (
        <p className="mb-3 text-center text-xs text-gray-500 sm:text-left">
          {combo.enrolled} enrolled • Live Classroom
        </p>
      ) : null}
      <div className="mb-4 flex flex-wrap items-baseline justify-center gap-2 sm:justify-start">
        <span className="text-xl font-bold text-[#fa4a23]">USD {combo.comboPrice.toLocaleString()}</span>
        <span className="text-sm text-gray-400 line-through">USD {combo.originalPrice.toLocaleString()}</span>
        <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
          {combo.discount.toLocaleString()} off
        </span>
      </div>
      <Link
        href={`/combo-courses/schedule?combo=${combo.id}`}
        className="inline-flex w-full items-center justify-center rounded-md bg-[#fa4a23] py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#e03d1a]"
      >
        Enroll now
      </Link>
    </div>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
  );
}

type Props = {
  /** Used to pick the same combo tab as `/combo-courses` and default the carousel. */
  courseSlug?: string | null;
  className?: string;
};

const SWIPE_MIN_PX = 48;

/** Same combo list + ordering as `/combo-courses`; scan with arrows, swipe, or dots. */
export default function CourseComboDealsPanel({ courseSlug, className = "" }: Props) {
  const slug = courseSlug ?? undefined;
  const combos = useMemo(() => {
    if (!slug) return COMBO_COURSES;
    const matching = combosForCourseSlug(slug);
    return matching.length > 0 ? matching : COMBO_COURSES;
  }, [slug]);
  const [index, setIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    setIndex(initialComboIndex(combos, slug));
  }, [combos, slug]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + combos.length) % combos.length);
  }, [combos.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % combos.length);
  }, [combos.length]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (combos.length < 2) return;
    const t = e.changedTouches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }, [combos.length]);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (combos.length < 2 || !touchStart.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStart.current.x;
      const dy = t.clientY - touchStart.current.y;
      touchStart.current = null;
      if (Math.abs(dx) < SWIPE_MIN_PX) return;
      if (Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) goNext();
      else goPrev();
    },
    [combos.length, goNext, goPrev],
  );

  if (combos.length === 0) return null;
  const safeIndex = Math.min(index, combos.length - 1);
  const active = combos[safeIndex];
  const multi = combos.length > 1;

  return (
    <div className={className}>
      <h2 className="mb-3 text-center text-lg font-bold text-slate-900 sm:text-left sm:text-xl">Our combo deals</h2>
      <div className="relative rounded-xl border border-amber-300/80 bg-amber-50/90 p-2.5 shadow-sm">
        {multi ? (
          <>
            <button
              type="button"
              aria-label="Previous combo"
              onClick={goPrev}
              className="absolute left-1 top-[42%] z-10 -translate-y-1/2 rounded-full border border-slate-200/90 bg-white/95 p-2 text-slate-700 shadow-md transition hover:bg-white hover:text-[#01203d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01203d] sm:left-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next combo"
              onClick={goNext}
              className="absolute right-1 top-[42%] z-10 -translate-y-1/2 rounded-full border border-slate-200/90 bg-white/95 p-2 text-slate-700 shadow-md transition hover:bg-white hover:text-[#01203d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01203d] sm:right-2"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
        <div
          className={multi ? "px-9 sm:px-10" : undefined}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div key={active.id}>
            <ComboCard combo={active} />
          </div>
        </div>
      </div>
      {multi ? (
        <div className="mt-3 space-y-2">
          <p className="text-center text-xs font-medium text-slate-500 sm:text-left">
            Combo {safeIndex + 1} of {combos.length} · swipe or use arrows
          </p>
          <div className="flex items-center justify-center gap-1.5">
            {combos.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show combo ${i + 1} of ${combos.length}`}
                aria-current={i === safeIndex ? "true" : undefined}
                onClick={() => setIndex(i)}
                className={`h-2 min-h-[8px] rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01203d] ${
                  i === safeIndex ? "w-8 bg-slate-800" : "w-2 bg-slate-400 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      ) : null}
      <div className="mt-3 text-center sm:text-left">
        <Link
          href="/combo-courses"
          className="text-sm font-semibold text-[#01203d] underline underline-offset-2 hover:text-[#fa4a23]"
        >
          Explore our combos →
        </Link>
      </div>
    </div>
  );
}
