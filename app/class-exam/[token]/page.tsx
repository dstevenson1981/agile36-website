import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClassExamDefinition } from "@/app/lib/class-exam-catalog";
import { getActiveClassExamByPath } from "@/app/lib/pro-practice-exam-links";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ token: string }>;
};

function pathFromToken(token: string): string {
  const trimmed = token.replace(/^\/+/, "").replace(/\/+$/, "");
  return `/${trimmed}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params;
  const link = await getActiveClassExamByPath(pathFromToken(token));
  const exam = link ? getClassExamDefinition(link.course_slug) : null;
  return {
    title: exam?.title ?? "Practice Test | Agile36",
    description: "Temporary class link for a Pro practice exam. Not linked from the public site.",
    robots: { index: false, follow: false },
  };
}

export default async function ClassExamPage({ params }: PageProps) {
  const { token } = await params;
  const link = await getActiveClassExamByPath(pathFromToken(token));
  const exam = link ? getClassExamDefinition(link.course_slug) : null;
  if (!link || !exam) notFound();

  const Test = exam.Test;
  const n = exam.questionCount;

  return (
    <div className="min-h-screen bg-[#f6f9fd]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <main className="min-w-0 rounded-2xl border border-[#1f2c4a]/10 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="mb-2 text-2xl font-bold text-slate-900">{exam.heading}</h1>
          <p className="mb-8 text-slate-600">
            {n} {exam.description}
          </p>
          <Test backHref="/" backLabel="Agile36 home" />
        </main>
      </div>
    </div>
  );
}
