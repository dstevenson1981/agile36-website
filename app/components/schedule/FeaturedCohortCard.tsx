"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EnrollNowLink from "@/app/components/schedule/EnrollNowLink";
import { COURSE_HERO_SCHEDULE_LIST_USD } from "@/app/lib/course-hero-schedule-pricing";
import {
  calculateDiscount,
  formatDateRange,
  formatDaysOfWeek,
  formatTimeRange,
  formatTimezoneLabel,
  getScheduleUrgency,
  type CourseScheduleRow,
} from "@/app/lib/schedule-display";
import { getScheduleInstructorProfile } from "@/app/lib/schedule-instructors";

type Props = {
  courseSlug: string;
  allDatesHref?: string;
  initialSchedule?: CourseScheduleRow | null;
};

function usd(amount: number): string {
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function formatHeaderDate(startDate: string, endDate: string, timezone?: string): string {
  const range = formatDateRange(startDate, endDate, timezone).replace(" - ", " to ");
  const yearMatch = startDate.match(/^(\d{4})/);
  const year = yearMatch ? yearMatch[1] : "";
  return year && !range.includes(year) ? `${range}, ${year}` : range;
}

export default function FeaturedCohortCard({
  courseSlug,
  allDatesHref = "#upcoming-dates",
  initialSchedule = null,
}: Props) {
  const list = COURSE_HERO_SCHEDULE_LIST_USD[courseSlug];
  const [schedule, setSchedule] = useState<CourseScheduleRow | null>(initialSchedule);
  const [isLoading, setIsLoading] = useState(!initialSchedule);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!initialSchedule) setIsLoading(true);
      try {
        const response = await fetch(
          `/api/course-schedules?course_slug=${encodeURIComponent(courseSlug)}&status=active&_t=${Date.now()}`
        );
        const result = await response.json();
        if (cancelled) return;
        const rows: CourseScheduleRow[] = result.success ? result.data || [] : [];
        const soonest = [...rows].sort(
          (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        )[0];
        setSchedule(soonest ?? null);
      } catch (error) {
        console.error("Error fetching featured cohort:", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [courseSlug, initialSchedule]);

  const instructorName = schedule?.instructor_name?.trim() || "Martina Svoboda";
  const instructorProfile = getScheduleInstructorProfile(instructorName);
  const timeRange = schedule
    ? formatTimeRange(schedule.start_time, schedule.end_time)?.replace(" — ", " to ")
    : null;
  const tz = schedule ? formatTimezoneLabel(schedule.timezone) : null;
  const daysOfWeek = schedule
    ? formatDaysOfWeek(schedule.start_date, schedule.end_date)
    : null;
  const currentPrice = schedule ? parseFloat(schedule.price) : list?.current;
  const originalPrice = schedule?.original_price
    ? parseFloat(schedule.original_price)
    : list?.original;
  const saved =
    typeof currentPrice === "number" &&
    typeof originalPrice === "number" &&
    originalPrice > currentPrice
      ? originalPrice - currentPrice
      : 0;
  const discount =
    currentPrice && originalPrice && originalPrice > currentPrice
      ? calculateDiscount(originalPrice, currentPrice)
      : 0;
  const urgency = schedule ? getScheduleUrgency(schedule) : null;

  return (
    <article className="overflow-hidden rounded-2xl border border-[#1f2c4a]/10 bg-white shadow-[0_12px_40px_rgba(31,44,74,0.1)]">
      <div className="flex items-start justify-between gap-3 bg-[#1f2c4a] px-5 py-4 text-white">
        <div>
          <p className="text-[11px] font-medium tracking-wide text-white/70">Selected class date</p>
          {isLoading ? (
            <div className="mt-2 h-6 w-40 animate-pulse rounded bg-white/20" />
          ) : schedule ? (
            <p className="mt-1 text-lg font-semibold tracking-[-0.02em]">
              {formatHeaderDate(schedule.start_date, schedule.end_date, schedule.timezone)}
            </p>
          ) : (
            <p className="mt-1 text-lg font-semibold tracking-[-0.02em]">Upcoming dates</p>
          )}
        </div>
        <a
          href={allDatesHref}
          className="shrink-0 pt-0.5 text-[13px] font-medium text-white/80 hover:text-white"
        >
          View other dates ›
        </a>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-start gap-3">
          <Image
            src="/POPM.jpg"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-md object-contain"
          />
          <div>
            <p className="font-semibold text-[#1f2c4a]">SAFe® POPM Certification</p>
            <p className="mt-0.5 text-sm text-[#64748b]">2-Day Live Online · Instructor-Led</p>
          </div>
        </div>

        <div className="my-4 border-t border-dashed border-[#1f2c4a]/15" />

        {isLoading ? (
          <div className="space-y-3" aria-hidden>
            <div className="h-4 w-56 animate-pulse rounded bg-[#1f2c4a]/10" />
            <div className="h-4 w-32 animate-pulse rounded bg-[#1f2c4a]/10" />
            <div className="h-8 w-48 animate-pulse rounded bg-[#1f2c4a]/10" />
          </div>
        ) : (
          <ul className="space-y-3 text-sm text-[#1f2c4a]">
            {timeRange ? (
              <li className="flex items-start gap-3">
                <ClockIcon />
                <span>
                  {timeRange} {tz}
                </span>
              </li>
            ) : null}
            {daysOfWeek ? (
              <li className="flex items-start gap-3">
                <CalendarIcon />
                <span>{daysOfWeek}</span>
              </li>
            ) : (
              <li className="flex items-start gap-3">
                <CalendarIcon />
                <span>Live online</span>
              </li>
            )}
            <li className="flex items-start gap-3">
              <ShieldIcon />
              <span>
                <span className="font-medium">Led by {instructorName}</span>
                {instructorProfile?.title ? (
                  <span className="mt-0.5 block text-[13px] font-normal leading-snug text-[#64748b]">
                    {instructorProfile.title}
                  </span>
                ) : null}
              </span>
            </li>
          </ul>
        )}

        {urgency?.show ? (
          <p className="mt-4 flex items-center gap-2 rounded-lg border border-[#d97706]/25 bg-[#d97706]/10 px-3 py-2 text-sm font-medium text-[#b45309]">
            <ClockIcon className="text-[#d97706]" />
            {urgency.message}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-end gap-2">
          {typeof currentPrice === "number" ? (
            <p className="text-2xl font-semibold leading-none tracking-[-0.03em] text-[#1f2c4a]">
              {usd(currentPrice)}
            </p>
          ) : null}
          {typeof originalPrice === "number" && originalPrice > (currentPrice ?? 0) ? (
            <span className="pb-1 text-sm text-[#94a3b8] line-through">{usd(originalPrice)}</span>
          ) : null}
          {saved > 0 ? (
            <span className="mb-0.5 rounded-full bg-[#1f2c4a] px-2.5 py-1 text-[11px] font-semibold text-white">
              Save {usd(saved)}
              {discount > 0 ? ` · ${discount}%` : ""}
            </span>
          ) : null}
        </div>

        {schedule ? (
          <EnrollNowLink
            courseSlug={courseSlug}
            scheduleId={schedule.id}
            quantity={1}
            label="Reserve This Class"
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#d97706] py-3 text-sm font-semibold text-white transition hover:bg-[#b45309]"
          />
        ) : (
          <a
            href={allDatesHref}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#d97706] py-3 text-sm font-semibold text-white transition hover:bg-[#b45309]"
          >
            See dates & enroll
          </a>
        )}

        <p className="mt-3 text-center text-[12px] leading-relaxed text-[#64748b]">
          Includes exam (first two attempts), official courseware, 16 PDUs · 16 SEUs &amp; 1-year
          SAFe Studio access.
        </p>
      </div>
    </article>
  );
}

function ClockIcon({ className = "text-[#1f2c4a]" }: { className?: string }) {
  return (
    <svg className={`mt-0.5 h-4 w-4 shrink-0 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="8" strokeWidth="1.8" />
      <path strokeLinecap="round" strokeWidth="1.8" d="M12 8v4l2.5 1.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#1f2c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" strokeWidth="1.8" />
      <path strokeLinecap="round" strokeWidth="1.8" d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#1f2c4a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
      />
    </svg>
  );
}
