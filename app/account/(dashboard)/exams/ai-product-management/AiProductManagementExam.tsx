"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AI_PM_EXAM_PASS_PERCENT,
  AI_PM_EXAM_QUESTIONS,
  AI_PM_EXAM_TIME_LIMIT_SECONDS,
} from "@/app/lib/exams/ai-product-management-questions";

type Phase = "rules" | "exam" | "confirm" | "results";

const LETTERS = ["A", "B", "C", "D"] as const;

function formatTime(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

export default function AiProductManagementExam() {
  const total = AI_PM_EXAM_QUESTIONS.length;
  const [phase, setPhase] = useState<Phase>("rules");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(AI_PM_EXAM_TIME_LIMIT_SECONDS);

  const question = AI_PM_EXAM_QUESTIONS[index];
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    if (phase !== "exam") return;
    const t = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.setTimeout(() => setPhase("results"), 0);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [phase]);

  const score = useMemo(() => {
    const correct = AI_PM_EXAM_QUESTIONS.filter(
      (q) => answers[q.id] === q.correctIndex
    ).length;
    return {
      correct,
      percent: Math.round((correct / total) * 100),
    };
  }, [answers, total]);

  const passed = score.percent >= AI_PM_EXAM_PASS_PERCENT;

  const startExam = () => {
    setPhase("exam");
    setIndex(0);
    setAnswers({});
    setFlagged({});
    setSecondsLeft(AI_PM_EXAM_TIME_LIMIT_SECONDS);
  };

  const submitExam = () => setPhase("results");

  if (phase === "rules") {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-sm border border-[#1a365d] bg-white shadow-xl">
          <div className="bg-[#0f2744] px-6 py-5 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#93c5fd]">
              Agile36 Secure Exam Delivery
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              AI Product Management Exam
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Final assessment · {total} questions · {AI_PM_EXAM_PASS_PERCENT}%
              required to pass
            </p>
          </div>

          <div className="space-y-5 px-6 py-7 text-[15px] leading-relaxed text-slate-700">
            <p className="font-semibold text-[#0f2744]">Before you begin</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                You have <strong>75 minutes</strong> to complete all {total}{" "}
                questions.
              </li>
              <li>
                Select one answer per question. You may navigate freely and flag
                items for review.
              </li>
              <li>
                A score of <strong>{AI_PM_EXAM_PASS_PERCENT}% or higher</strong>{" "}
                ({Math.ceil((AI_PM_EXAM_PASS_PERCENT / 100) * total)} correct) is
                required to pass.
              </li>
              <li>
                Once you end the exam, your answers are scored immediately. Do
                not refresh or close the browser during the session.
              </li>
              <li>
                This is an individual assessment. Complete it without outside
                assistance.
              </li>
            </ul>

            <div className="rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              By starting, you confirm you are the enrolled learner and will
              complete this exam honestly under the stated rules.
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={startExam}
                className="rounded-sm bg-[#0f2744] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#163556]"
              >
                Begin exam
              </button>
              <Link
                href="/account"
                className="rounded-sm border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="overflow-hidden rounded-sm border border-[#1a365d] bg-white shadow-xl">
          <div
            className={`px-6 py-5 text-white ${
              passed ? "bg-[#14532d]" : "bg-[#7f1d1d]"
            }`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
              Exam complete
            </p>
            <h2 className="mt-1 text-2xl font-semibold">
              {passed ? "Pass" : "Did not pass"}
            </h2>
            <p className="mt-1 text-sm text-white/85">
              AI Product Management Exam · Score {score.percent}% ({score.correct}{" "}
              / {total}) · Pass mark {AI_PM_EXAM_PASS_PERCENT}%
            </p>
          </div>

          <div className="space-y-4 px-6 py-6">
            <p className="text-sm text-slate-600">
              {passed
                ? "You met the passing threshold. Review any missed items below to reinforce the material."
                : "You did not reach the 75% passing score. Review the items below, then retake when ready."}
            </p>

            <div className="max-h-[55vh] space-y-3 overflow-y-auto pr-1">
              {AI_PM_EXAM_QUESTIONS.map((q) => {
                const user = answers[q.id];
                const ok = user === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={`rounded-sm border px-4 py-3 text-sm ${
                      ok
                        ? "border-emerald-200 bg-emerald-50/70"
                        : "border-red-200 bg-red-50/70"
                    }`}
                  >
                    <p className="font-medium text-slate-900">
                      {q.id}. {q.question}
                    </p>
                    <p className="mt-2 text-slate-700">
                      Your answer:{" "}
                      {user !== undefined
                        ? `${LETTERS[user]}. ${q.options[user]}`
                        : "No response"}
                    </p>
                    {!ok && (
                      <p className="mt-1 font-medium text-emerald-800">
                        Correct: {LETTERS[q.correctIndex]}.{" "}
                        {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={startExam}
                className="rounded-sm bg-[#0f2744] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#163556]"
              >
                Retake exam
              </button>
              <Link
                href="/account"
                className="rounded-sm border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Back to account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // exam + confirm overlay
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#e8eef5] text-slate-900">
      <header className="flex items-center justify-between border-b border-[#0f2744]/20 bg-[#0f2744] px-4 py-3 text-white sm:px-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#93c5fd]">
            Secure exam session
          </p>
          <h1 className="text-sm font-semibold sm:text-base">
            AI Product Management Exam
          </h1>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-300">
              Answered
            </p>
            <p className="font-semibold tabular-nums">
              {answeredCount}/{total}
            </p>
          </div>
          <div
            className={`min-w-[5.5rem] rounded-sm px-3 py-1.5 text-center font-mono text-lg font-semibold tabular-nums ${
              secondsLeft <= 300
                ? "bg-red-600 text-white"
                : "bg-white/10 text-white"
            }`}
          >
            {formatTime(secondsLeft)}
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 overflow-hidden p-3 sm:flex-row sm:p-5">
        <aside className="order-2 shrink-0 overflow-y-auto rounded-sm border border-slate-300 bg-white p-3 sm:order-1 sm:w-56">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Question navigator
          </p>
          <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-5">
            {AI_PM_EXAM_QUESTIONS.map((q, i) => {
              const answered = answers[q.id] !== undefined;
              const isCurrent = i === index;
              const isFlagged = flagged[q.id];
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`relative h-9 rounded-sm text-xs font-semibold transition ${
                    isCurrent
                      ? "bg-[#0f2744] text-white"
                      : answered
                        ? "bg-[#dbeafe] text-[#0f2744]"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  aria-label={`Question ${q.id}`}
                >
                  {q.id}
                  {isFlagged && (
                    <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-3 space-y-1 text-[11px] text-slate-500">
            <p>
              <span className="mr-1 inline-block h-2.5 w-2.5 bg-[#dbeafe]" />{" "}
              Answered
            </p>
            <p>
              <span className="mr-1 inline-block h-2.5 w-2.5 bg-slate-100" />{" "}
              Unanswered
            </p>
            <p>
              <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />{" "}
              Flagged
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPhase("confirm")}
            className="mt-4 w-full rounded-sm bg-[#b45309] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#92400e]"
          >
            End exam
          </button>
        </aside>

        <main className="order-1 flex min-h-0 flex-1 flex-col rounded-sm border border-slate-300 bg-white shadow-sm sm:order-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-6">
            <p className="text-sm font-semibold text-[#0f2744]">
              Question {index + 1} of {total}
            </p>
            <button
              type="button"
              onClick={() =>
                setFlagged((prev) => ({
                  ...prev,
                  [question.id]: !prev[question.id],
                }))
              }
              className={`rounded-sm border px-3 py-1.5 text-xs font-semibold ${
                flagged[question.id]
                  ? "border-amber-400 bg-amber-50 text-amber-900"
                  : "border-slate-300 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {flagged[question.id] ? "Flagged" : "Flag for review"}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
            <p className="text-lg font-medium leading-relaxed text-slate-900">
              {question.question}
            </p>
            <div className="mt-6 space-y-3">
              {question.options.map((opt, optIndex) => {
                const selected = answers[question.id] === optIndex;
                return (
                  <button
                    key={optIndex}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        [question.id]: optIndex,
                      }))
                    }
                    className={`flex w-full items-start gap-3 rounded-sm border px-4 py-3.5 text-left transition ${
                      selected
                        ? "border-[#0f2744] bg-[#eff6ff] ring-1 ring-[#0f2744]"
                        : "border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-sm font-bold ${
                        selected
                          ? "bg-[#0f2744] text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {LETTERS[optIndex]}
                    </span>
                    <span className="text-[15px] leading-relaxed text-slate-800">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 sm:px-6">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              className="rounded-sm border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 enabled:hover:bg-slate-50 disabled:opacity-40"
            >
              Previous
            </button>
            {index < total - 1 ? (
              <button
                type="button"
                onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
                className="rounded-sm bg-[#0f2744] px-5 py-2 text-sm font-semibold text-white hover:bg-[#163556]"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setPhase("confirm")}
                className="rounded-sm bg-[#b45309] px-5 py-2 text-sm font-semibold text-white hover:bg-[#92400e]"
              >
                Review & end
              </button>
            )}
          </div>
        </main>
      </div>

      {phase === "confirm" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-sm border border-slate-300 bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-[#0f2744]">
              End exam and submit?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              You have answered {answeredCount} of {total} questions.
              {answeredCount < total
                ? ` ${total - answeredCount} unanswered will be scored as incorrect.`
                : " All questions have a response."}
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPhase("exam")}
                className="rounded-sm border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Return to exam
              </button>
              <button
                type="button"
                onClick={submitExam}
                className="rounded-sm bg-[#0f2744] px-4 py-2 text-sm font-semibold text-white hover:bg-[#163556]"
              >
                Submit exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
