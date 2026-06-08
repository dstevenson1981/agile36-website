"use client";

import Image from "next/image";

type Props = {
  instructorName?: string | null;
  instructorImage?: string | null;
  language?: string | null;
  examIncluded?: boolean | null;
  /** Override exam line when schedule rows use a fixed label (e.g. devops). */
  examLabel?: string;
  variant?: "default" | "prominent";
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
}: Props) {
  const name = instructorName?.trim() || "Martina Svoboda";
  const image = instructorImage?.trim() || "/martina.jpg";
  const examText = examLineText(examIncluded, examLabel);
  const avatarSize = variant === "prominent" ? 48 : 40;
  const avatarClass = variant === "prominent" ? "h-12 w-12 ring-2 ring-white shadow-sm" : "h-10 w-10";

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
      <div>
        <div className={`font-semibold text-gray-900 ${variant === "prominent" ? "text-base" : ""}`}>{name}</div>
        <div className={`mt-0.5 flex items-center gap-2 text-gray-600 ${variant === "prominent" ? "text-sm" : "text-sm"}`}>
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
