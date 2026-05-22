import type { ReactNode } from "react";
import CourseHeroPriceScheduleCta from "@/app/components/CourseHeroPriceScheduleCta";
import { COURSE_HERO_SCHEDULE_LIST_USD } from "@/app/lib/course-hero-schedule-pricing";

type Props = {
  courseSlug: string;
  children: ReactNode;
};

/** Sticky-friendly column: schedule pricing + hero content (combo deals live under /combo-courses only). */
export default function CourseHeroRightColumn({ courseSlug, children }: Props) {
  const list = COURSE_HERO_SCHEDULE_LIST_USD[courseSlug];
  const scheduleHref = `/courses/${courseSlug}/schedule?course=${courseSlug}`;

  return (
    <div className="lg:flex lg:justify-end">
      <div className="w-full max-w-md space-y-6">
        {list ? (
          <div className="rounded-xl border border-amber-300/80 bg-amber-50/90 p-2.5 shadow-sm lg:sticky lg:top-24">
            <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-black/[0.04]">
              <CourseHeroPriceScheduleCta
                scheduleHref={scheduleHref}
                currentUsd={list.current}
                originalUsd={list.original}
              />
              {children != null && children !== false ? (
                <div className="mt-4 border-t border-slate-100 pt-4 [&>*:first-child]:!mt-0">
                  {children}
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
