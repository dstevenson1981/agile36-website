"use client";

import Image from "next/image";
import { getScheduleInstructorProfile } from "@/app/lib/schedule-instructors";

type Props = {
  instructorName?: string | null;
  instructorImage?: string | null;
  language?: string | null;
  examIncluded?: boolean | null;
  /** Override exam line when schedule rows use a fixed label (e.g. devops). */
  examLabel?: string;
  variant?: "default" | "prominent";
  /** Controlled expand state for rich instructor profiles (e.g. Deadra). */
  isExpanded?: boolean;
  onToggleExpand?: () => void;
};

function examLineText(examIncluded: boolean | null | undefined, examLabel?: string): string {
  if (examLabel) return examLabel;
  return examIncluded ? "Exam Included" : "No Exam";
}

/** Instructor avatar, name, and language/exam row on course schedule cards. */
export default function ScheduleInstructorRow({
  instructorName,
  instructorImage,
  language,
  examIncluded,
  examLabel,
  variant = "default",
  isExpanded = false,
  onToggleExpand,
}: Props) {
  const name = instructorName?.trim() || "Martina Svoboda";
  const profile = getScheduleInstructorProfile(name);
  const image = (instructorImage?.trim() || profile?.image || "/martina.jpg").trim();
  const examText = examLineText(examIncluded, examLabel);
  const avatarSize = variant === "prominent" ? 48 : 40;
  const avatarClass = variant === "prominent" ? "h-12 w-12 ring-2 ring-white shadow-sm" : "h-10 w-10";
  const canExpand = Boolean(profile && onToggleExpand);

  return (
    <div className="flex items-center gap-3">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={avatarSize}
          height={avatarSize}
          className={`${avatarClass} shrink-0 rounded-full object-cover`}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div className={`flex ${avatarClass} shrink-0 items-center justify-center rounded-full bg-gray-200`}>
          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      )}
      <div className="min-w-0">
        <div className={`font-semibold text-gray-900 ${variant === "prominent" ? "text-base" : ""}`}>{name}</div>
        {canExpand && (
          <button
            type="button"
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
            className={`mt-1.5 inline-flex items-center gap-1.5 rounded-md border border-[#1a56db] px-2.5 py-1 text-xs font-semibold text-[#1a56db] transition-colors hover:bg-[#eff6ff] ${
              isExpanded ? "" : "animate-learn-more-bob"
            }`}
          >
            Learn More
            <svg
              className={`h-3.5 w-3.5 text-[#e85d4c] transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
        <div className={`flex items-center gap-2 text-gray-600 ${canExpand ? "mt-1.5" : "mt-0.5"} ${variant === "prominent" ? "text-sm" : "text-sm"}`}>
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span>
            Language: {language || "English"} • {examText}
          </span>
        </div>
      </div>
    </div>
  );
}
