import Image from "next/image";
import type { ReactNode } from "react";
import CourseHeroPriceScheduleCta from "@/app/components/CourseHeroPriceScheduleCta";
import { COURSE_HERO_SCHEDULE_LIST_USD } from "@/app/lib/course-hero-schedule-pricing";

type Props = {
  courseSlug: string;
  children: ReactNode;
};

/** Premium sticky pricing card: ribbon, price block, what's-included, trust footer. */
export default function CourseHeroRightColumn({ courseSlug, children }: Props) {
  const list = COURSE_HERO_SCHEDULE_LIST_USD[courseSlug];
  const scheduleHref = `/courses/${courseSlug}/schedule?course=${courseSlug}`;

  return (
    <div className="lg:flex lg:justify-end">
      <div className="w-full max-w-md space-y-6">
        {list ? (
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-[#1f2c4a]/15 ring-1 ring-[#1f2c4a]/10 lg:sticky lg:top-24">
            {/* Ribbon */}
            <div className="bg-gradient-to-r from-[#1f2c4a] to-[#33415f] px-6 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
              Live, instructor-led cohort
            </div>

            <div className="p-6">
              <CourseHeroPriceScheduleCta
                scheduleHref={scheduleHref}
                currentUsd={list.current}
                originalUsd={list.original}
              />

              {children != null && children !== false ? (
                <div className="mt-6 border-t border-[#1f2c4a]/10 pt-5">
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[#94a3b8]">
                    What&apos;s included
                  </p>
                  <div className="[&>*:first-child]:!mt-0">{children}</div>
                </div>
              ) : null}

              {/* Trust footer */}
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#1f2c4a]/[0.04] px-4 py-3">
                <Image
                  src="/Silver.png"
                  alt="Scaled Agile Silver Partner"
                  width={36}
                  height={36}
                  className="h-9 w-9 shrink-0 object-contain"
                />
                <p className="text-xs leading-snug text-[#475569]">
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
