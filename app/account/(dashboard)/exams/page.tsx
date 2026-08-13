import Link from "next/link";
import { hasAiProductManagementExamAccess } from "@/app/lib/exams/ai-product-management-access";
import {
  AI_PM_EXAM_PASS_PERCENT,
  AI_PM_EXAM_QUESTIONS,
} from "@/app/lib/exams/ai-product-management-questions";

export const metadata = {
  title: "Course Exams | Agile36",
  description: "Secure course exams for enrolled Agile36 learners.",
  robots: "noindex, nofollow",
};

export default async function CourseExamsPage() {
  const hasAiPm = await hasAiProductManagementExamAccess();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#1f2c4a]">
          Course Exams
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Final assessments for enrolled courses. These are scored exams, not
          practice drills.
        </p>
      </div>

      <div className="overflow-hidden rounded-sm border border-[#1f2c4a]/15 bg-white shadow-sm">
        <div className="border-b border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.03] px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
            Available exams
          </p>
        </div>
        <div className="divide-y divide-[#1f2c4a]/10">
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#1f2c4a]">
                AI Product Management Exam
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {AI_PM_EXAM_QUESTIONS.length} questions ·{" "}
                {AI_PM_EXAM_PASS_PERCENT}% to pass · 75 minutes
              </p>
              {!hasAiPm && (
                <p className="mt-2 text-sm text-amber-800">
                  Enrollment in Certified AI Product Manager required.
                </p>
              )}
            </div>
            {hasAiPm ? (
              <Link
                href="/account/exams/ai-product-management"
                className="inline-flex shrink-0 items-center justify-center rounded-sm bg-[#1f2c4a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#16243f]"
              >
                Open exam
              </Link>
            ) : (
              <Link
                href="/courses/certified-ai-product-manager/schedule"
                className="inline-flex shrink-0 items-center justify-center rounded-sm border border-[#1f2c4a]/20 px-5 py-2.5 text-sm font-semibold text-[#1f2c4a] hover:bg-[#1f2c4a]/5"
              >
                View course
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
