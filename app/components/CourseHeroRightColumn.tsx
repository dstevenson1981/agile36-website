import type { ReactNode } from "react";
import CourseComboDealsPanel from "@/app/components/CourseComboDealsPanel";

type Props = {
  courseSlug: string;
  children: ReactNode;
};

/** Sticky-friendly column: combo deals (same catalog as /combo-courses) + pricing / CTA card */
export default function CourseHeroRightColumn({ courseSlug, children }: Props) {
  return (
    <div className="lg:flex lg:justify-end">
      <div className="w-full max-w-md space-y-6">
        <CourseComboDealsPanel courseSlug={courseSlug} />
        {children}
      </div>
    </div>
  );
}
