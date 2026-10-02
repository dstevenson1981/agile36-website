"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  COMBO_INCLUDE_HIDDEN_SCHEDULE_SLUGS,
  findComboById,
  type Combo,
} from "../data";
import {
  formatComboScheduleOptionLabel,
  formatTimeRange,
  formatTimezoneLabel,
} from "@/app/lib/schedule-display";

type ComboScheduleOption = {
  id: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time?: string;
  timezone?: string;
  duration?: string | null;
  is_weekend?: boolean | null;
  displayDate: string;
  displayTime: string;
};

function ComboScheduleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const comboId = searchParams.get("combo");
  const [combo, setCombo] = useState<Combo | null>(null);
  const [schedulesByCourse, setSchedulesByCourse] = useState<Record<string, ComboScheduleOption[]>>({});
  const [selectedSchedules, setSelectedSchedules] = useState<Record<string, string>>({});
  const [showAllDates, setShowAllDates] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = comboId ? findComboById(comboId) : undefined;
    setCombo(found || null);
  }, [comboId]);

  useEffect(() => {
    if (!combo) {
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      // Schedules come from Supabase course_schedules. Course slugs must match Supabase.
      // Deleted or cancelled classes (status != active) will not appear here.
      const result: Record<string, ComboScheduleOption[]> = {};
      for (const course of combo.courses) {
        try {
          const includeHidden = COMBO_INCLUDE_HIDDEN_SCHEDULE_SLUGS.has(course.slug)
            ? "&include_hidden=1"
            : "";
          const res = await fetch(
            `/api/course-schedules?course_slug=${course.slug}&status=active${includeHidden}`
          );
          const data = await res.json();
          const schedules = (data.data || []).map((s: {
            id: string;
            start_date: string;
            end_date?: string;
            start_time?: string;
            end_time?: string;
            timezone?: string;
            duration?: string | null;
            is_weekend?: boolean | null;
          }) => {
            const label = formatComboScheduleOptionLabel({
              start_date: s.start_date,
              end_date: s.end_date,
              duration: s.duration,
              is_weekend: s.is_weekend,
            });
            const timeRange = formatTimeRange(s.start_time, s.end_time);
            const tz = formatTimezoneLabel(s.timezone);
            return {
              id: s.id,
              start_date: s.start_date,
              end_date: s.end_date || s.start_date,
              start_time: s.start_time || "",
              end_time: s.end_time,
              timezone: s.timezone,
              duration: s.duration,
              is_weekend: s.is_weekend,
              displayDate: label,
              displayTime: timeRange ? `${timeRange} ${tz}` : "9am – 5pm EST",
            };
          });
          result[course.slug] = schedules;
        } catch {
          result[course.slug] = [];
        }
      }
      setSchedulesByCourse(result);
      setLoading(false);
    };

    fetchAll();
  }, [combo]);

  const handleProceed = () => {
    if (!combo) {
      router.push(`/contact?combo=${comboId}`);
      return;
    }

    const selectedByCourse: Record<string, { scheduleId: string; displayDate: string; courseName: string }> = {};
    for (const course of combo.courses) {
      const scheduleId = selectedSchedules[course.slug];
      if (!scheduleId) {
        return;
      }
      const schedule = (schedulesByCourse[course.slug] || []).find((s) => s.id === scheduleId);
      selectedByCourse[course.slug] = {
        scheduleId,
        displayDate: schedule?.displayDate || "",
        courseName: course.name,
      };
    }

    const scheduleIds = Object.values(selectedByCourse).map((item) => item.scheduleId);
    router.push(
      `/combo-courses/checkout?combo=${comboId}&schedules=${scheduleIds.join(",")}&selections=${encodeURIComponent(JSON.stringify(selectedByCourse))}`
    );
  };

  if (!comboId || !combo) {
    return (
      <main className="min-h-screen bg-black text-[#1f2c4a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#64748b] mb-4">Combo not found.</p>
          <Link href="/combo-courses" className="text-[#d97706] font-medium hover:underline">
            Back to Combo Courses
          </Link>
        </div>
      </main>
    );
  }

  const ready = combo.courses.every((course) => Boolean(selectedSchedules[course.slug]));
  const savePct =
    combo.originalPrice > combo.comboPrice
      ? Math.round((100 * (combo.originalPrice - combo.comboPrice)) / combo.originalPrice)
      : 0;

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      <section className="w-full border-b border-[#1f2c4a]/10 bg-black">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <nav className="mb-4 flex items-center gap-2 text-sm text-[#64748b]">
            <Link href="/" className="hover:text-[#1f2c4a]">
              Home
            </Link>
            <span>/</span>
            <Link href="/combo-courses" className="hover:text-[#1f2c4a]">
              Combo courses
            </Link>
            <span>/</span>
            <span className="text-[#334155]">Schedule</span>
          </nav>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[#d97706]">Combo schedule</p>
          <h1 className="text-2xl font-normal tracking-[-0.03em] text-[#1f2c4a] md:text-3xl">{combo.name}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#475569]">
            Pick one live date for each course. Both classes are on the same enrollment.
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-2xl font-semibold tracking-[-0.03em] text-[#1f2c4a]">
              ${combo.comboPrice.toLocaleString()}
            </span>
            <span className="text-sm text-[#94a3b8] line-through">${combo.originalPrice.toLocaleString()}</span>
            {savePct > 0 ? <span className="text-xs font-semibold text-[#d97706]">Save {savePct}%</span> : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-10 px-4 py-8 sm:px-6">
        {loading ? (
          <div className="space-y-3">
            {combo.courses.map((course) => (
              <div key={course.id} className="h-24 animate-pulse rounded-2xl bg-[#1f2c4a]/[0.06]" />
            ))}
          </div>
        ) : (
          combo.courses.map((course) => {
            const schedules = schedulesByCourse[course.slug] || [];
            const selectedId = selectedSchedules[course.slug];
            const visibleSchedules = showAllDates[course.slug] ? schedules : schedules.slice(0, 5);
            return (
              <div key={course.slug}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#1f2c4a]/10 bg-white">
                    <Image src={course.badge} alt="" width={48} height={48} className="h-full w-full object-cover" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-lg font-normal tracking-[-0.03em] text-[#1f2c4a]">{course.name}</h2>
                    <Link href={`/courses/${course.slug}`} className="text-sm font-medium text-[#d97706] hover:underline">
                      View course
                    </Link>
                  </div>
                </div>

                {schedules.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-[#1f2c4a]/20 px-4 py-6 text-sm text-[#64748b]">
                    No upcoming dates for this course.
                  </p>
                ) : (
                  <div className="space-y-2" role="radiogroup" aria-label={`${course.name} dates`}>
                    {visibleSchedules.map((schedule) => {
                      const selected = selectedId === schedule.id;
                      return (
                        <button
                          key={schedule.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() =>
                            setSelectedSchedules((prev) => ({ ...prev, [course.slug]: schedule.id }))
                          }
                          className={`flex w-full items-center justify-between gap-4 rounded-2xl border bg-white px-4 py-3.5 text-left transition-colors ${
                            selected
                              ? "border-[#1f2c4a]"
                              : "border-[#1f2c4a]/10 hover:border-[#1f2c4a]/30"
                          }`}
                        >
                          <span>
                            <span className="block text-[15px] font-medium tracking-[-0.02em] text-[#1f2c4a]">
                              {schedule.displayDate}
                            </span>
                            <span className="mt-0.5 block text-sm text-[#64748b]">{schedule.displayTime}</span>
                          </span>
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              selected ? "border-[#1f2c4a] bg-[#1f2c4a]" : "border-[#1f2c4a]/25"
                            }`}
                            aria-hidden
                          >
                            {selected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
                {schedules.length > 5 && !showAllDates[course.slug] ? (
                  <button
                    type="button"
                    onClick={() => setShowAllDates((prev) => ({ ...prev, [course.slug]: true }))}
                    className="mt-3 text-sm font-medium text-[#1f2c4a] underline-offset-2 hover:underline"
                  >
                    Show all {schedules.length} dates
                  </button>
                ) : null}
              </div>
            );
          })
        )}

        <div className="border-t border-[#1f2c4a]/10 pt-6">
          <button
            type="button"
            onClick={handleProceed}
            disabled={!ready}
            className="w-full rounded-lg bg-[#1f2c4a] px-6 py-3 font-medium text-white transition-colors hover:bg-[#16243f] disabled:cursor-not-allowed disabled:bg-[#1f2c4a]/30"
          >
            Continue to checkout
          </button>
          <p className="mt-4 text-center text-xs text-[#64748b]">
            By continuing, you agree to our{" "}
            <Link href="/privacy-policy" className="text-[#d97706] hover:underline">
              Privacy policy
            </Link>{" "}
            and{" "}
            <Link href="/refund-policy" className="text-[#d97706] hover:underline">
              Terms & Conditions
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

export default function ComboSchedulePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-[#1f2c4a] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d97706]" />
        </main>
      }
    >
      <ComboScheduleContent />
    </Suspense>
  );
}
