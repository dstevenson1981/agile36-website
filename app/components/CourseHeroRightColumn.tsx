import type { ReactNode } from "react";
import CourseComboDealsPanel from "@/app/components/CourseComboDealsPanel";
import CourseHeroPriceScheduleCta from "@/app/components/CourseHeroPriceScheduleCta";
import { COURSE_HERO_SCHEDULE_LIST_USD } from "@/app/lib/course-hero-schedule-pricing";

type Props = {
  courseSlug: string;
  children: ReactNode;
};

/** Sticky-friendly column: combo deals + list/sale price + schedule CTA, then page-specific content */
export default function CourseHeroRightColumn({ courseSlug, children }: Props) {
  const list = COURSE_HERO_SCHEDULE_LIST_USD[courseSlug];
  const scheduleHref = `/courses/${courseSlug}/schedule?course=${courseSlug}`;

  return (
    <div className="lg:flex lg:justify-end">
      <div className="w-full max-w-md space-y-6">
        <CourseComboDealsPanel courseSlug={courseSlug} />
        {list ? (
          <CourseHeroPriceScheduleCta
            scheduleHref={scheduleHref}
            currentUsd={list.current}
            originalUsd={list.original}
          />
        ) : null}
        {children}
      </div>
    </div>
  );
}
