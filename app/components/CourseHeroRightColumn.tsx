import Image from "next/image";
import type { ReactNode } from "react";
import CourseHeroPriceScheduleCta from "@/app/components/CourseHeroPriceScheduleCta";
import { COURSE_HERO_SCHEDULE_LIST_USD } from "@/app/lib/course-hero-schedule-pricing";

type Props = {
  courseSlug: string;
  children: ReactNode;
};

/** Compact sticky pricing card: glass shell, price block, what's-included, trust footer. */
export default function CourseHeroRightColumn({ courseSlug, children }: Props) {
  const list = COURSE_HERO_SCHEDULE_LIST_USD[courseSlug];
  const scheduleHref = `/courses/${courseSlug}/schedule?course=${courseSlug}`;

  return (
    <div className="lg:flex lg:justify-end">
      <div className="w-full max-w-[20.5rem] space-y-4">
        {list ? (
          <div className="liquid-glass overflow-hidden rounded-2xl lg:sticky lg:top-24">
            <div className="bg-gradient-to-r from-[#1f2c4a] to-[#33415f] px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              Live, instructor-led cohort
            </div>

            <div className="p-4">
              <CourseHeroPriceScheduleCta
                scheduleHref={scheduleHref}
                currentUsd={list.current}
                originalUsd={list.original}
              />

              {children != null && children !== false ? (
                <div className="mt-4 border-t border-[#1f2c4a]/10 pt-3.5">
                  <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#94a3b8]">
                    What&apos;s included
                  </p>
                  <div className="space-y-2.5 text-[13px] text-[#475569] [&>div]:space-y-2.5 [&_svg]:h-4 [&_svg]:w-4 [&_.space-y-4]:!space-y-2.5 [&_span]:text-[13px]">
                    {children}
                  </div>
                </div>
              ) : null}

              <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-[#1f2c4a]/[0.04] px-3 py-2.5">
                <Image
                  src="/Silver.png"
                  alt="Scaled Agile Silver Partner"
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 object-contain"
                />
                <p className="text-[11px] leading-snug text-[#475569]">
                  Official training under our{" "}
                  <span className="font-semibold text-[#1f2c4a]">Scaled Agile Silver Partnership</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
