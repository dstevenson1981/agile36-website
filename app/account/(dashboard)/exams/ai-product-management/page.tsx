import Link from "next/link";
import { hasAiProductManagementExamAccess } from "@/app/lib/exams/ai-product-management-access";
import { AI_PM_EXAM_QUESTIONS } from "@/app/lib/exams/ai-product-management-questions";
import AiProductManagementExam from "./AiProductManagementExam";

export const metadata = {
  title: "AI Product Management Exam | Agile36",
  description:
    "Official AI Product Management final exam for enrolled Agile36 learners.",
  robots: "noindex, nofollow",
};

export default async function AiProductManagementExamPage() {
  const hasAccess = await hasAiProductManagementExamAccess();

  if (!hasAccess) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="overflow-hidden rounded-sm border border-[#1a365d] bg-white shadow-lg">
          <div className="bg-[#0f2744] px-6 py-5 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#93c5fd]">
              Course exam
            </p>
            <h1 className="mt-1 text-2xl font-semibold">
              AI Product Management Exam
            </h1>
          </div>
          <div className="space-y-4 px-6 py-6 text-sm text-slate-700">
            <p>
              This exam is available to learners enrolled in the Certified AI
              Product Manager course.
            </p>
            <p className="rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950">
              We could not find a matching enrollment on this account. If you
              recently registered, try signing in with the email used at
              checkout, or contact support.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/courses/certified-ai-product-manager/schedule"
                className="rounded-sm bg-[#0f2744] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#163556]"
              >
                View course schedule
              </Link>
              <Link
                href="/account/exams"
                className="rounded-sm border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Back to exams
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* SSR shell; client takes over with fullscreen exam chrome */}
      <p className="sr-only">
        AI Product Management Exam — {AI_PM_EXAM_QUESTIONS.length} questions
      </p>
      <AiProductManagementExam />
    </div>
  );
}
