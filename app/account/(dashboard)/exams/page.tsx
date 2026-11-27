import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AI_PM_PORTAL_EXAM_OPEN,
  hasAiProductManagementExamAccess,
} from "@/app/lib/exams/ai-product-management-access";
import {
  AI_PM_EXAM_PASS_PERCENT,
  AI_PM_EXAM_QUESTIONS,
} from "@/app/lib/exams/ai-product-management-questions";

export const metadata = {
  title: "Course Exams | Agile36",
  description: "Course exams for enrolled Agile36 learners.",
  robots: "noindex, nofollow",
};

export default async function CourseExamsPage() {
  const hasAiPm = await hasAiProductManagementExamAccess();
  if (!hasAiPm) {
    redirect("/account");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">
          Course Exams
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Final assessments assigned to your account. These are scored exams, not
          practice drills.
        </p>
      </div>

      <div className="overflow-hidden rounded-sm border border-[#111111]/15 bg-white shadow-sm">
        <div className="border-b border-[#111111]/10 bg-[#111111]/[0.03] px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b]">
            Assigned to you
          </p>
        </div>
        <div className="divide-y divide-[#111111]/10">
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#111111]">
                AI Product Management Exam
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Closed book · {AI_PM_EXAM_QUESTIONS.length} questions ·{" "}
                {AI_PM_EXAM_PASS_PERCENT}% to pass · 75 minutes
              </p>
            </div>
            {AI_PM_PORTAL_EXAM_OPEN ? (
              <Link
                href="/account/exams/ai-product-management"
                className="inline-flex shrink-0 items-center justify-center rounded-sm bg-[#111111] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#000000]"
              >
                Open exam
              </Link>
            ) : (
              <span className="inline-flex shrink-0 items-center justify-center rounded-sm border border-[#111111]/15 bg-[#111111]/[0.04] px-5 py-2.5 text-sm font-semibold text-[#64748b]">
                Locked
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
