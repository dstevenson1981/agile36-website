"use client";

import { useEffect, useMemo, useState } from "react";
import ScheduleCard from "@/app/components/schedule/ScheduleCard";
import type { CourseScheduleRow } from "@/app/lib/schedule-display";

type Filters = {
  thisMonth: boolean;
  nextMonth: boolean;
  weekdays: boolean;
  weekend: boolean;
};

const EMPTY_FILTERS: Filters = {
  thisMonth: false,
  nextMonth: false,
  weekdays: false,
  weekend: false,
};

type Props = {
  courseSlug: string;
  courseName: string;
  brochureHref?: string;
  showSafeBadges?: boolean;
  initialCount?: number;
  initialSchedules?: CourseScheduleRow[];
};

function calendarDayUtc(startDate: string): number {
  const dateStr = String(startDate).split("T")[0] || String(startDate).slice(0, 10);
  return new Date(`${dateStr}T12:00:00Z`).getUTCDay();
}

function quantitiesFrom(rows: CourseScheduleRow[]): Record<string, number> {
  const initial: Record<string, number> = {};
  rows.forEach((row) => {
    initial[row.id] = 1;
  });
  return initial;
}

export default function CourseScheduleEmbed({
  courseSlug,
  courseName,
  brochureHref,
  showSafeBadges = false,
  initialCount = 6,
  initialSchedules = [],
}: Props) {
  const [schedules, setSchedules] = useState<CourseScheduleRow[]>(initialSchedules);
  const [isLoading, setIsLoading] = useState(initialSchedules.length === 0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [displayedCount, setDisplayedCount] = useState(initialCount);
  const [quantity, setQuantity] = useState<Record<string, number>>(() =>
    quantitiesFrom(initialSchedules)
  );
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [showGroupInquiry, setShowGroupInquiry] = useState(false);
  const [inquirySchedule, setInquirySchedule] = useState<CourseScheduleRow | null>(null);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (initialSchedules.length === 0) setIsLoading(true);
      setLoadError(null);
      try {
        const response = await fetch(
          `/api/course-schedules?course_slug=${encodeURIComponent(courseSlug)}&status=active&_t=${Date.now()}`
        );
        const result = await response.json();
        if (cancelled) return;
        if (!result.success) {
          if (initialSchedules.length === 0) {
            setLoadError(result.error || "Could not load dates.");
            setSchedules([]);
          }
          return;
        }
        const data: CourseScheduleRow[] = result.data || [];
        setSchedules(data);
        setQuantity(quantitiesFrom(data));
      } catch (error) {
        console.error("Error fetching schedules:", error);
        if (!cancelled && initialSchedules.length === 0) {
          setLoadError("Could not load dates. Refresh and try again.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [courseSlug]);

  const filtered = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.start_date);
      if (filters.thisMonth) {
        if (
          scheduleDate.getMonth() !== currentMonth ||
          scheduleDate.getFullYear() !== currentYear
        ) {
          return false;
        }
      }
      if (filters.nextMonth) {
        const nextMonth = (currentMonth + 1) % 12;
        const nextYear = nextMonth === 0 ? currentYear + 1 : currentYear;
        if (scheduleDate.getMonth() !== nextMonth || scheduleDate.getFullYear() !== nextYear) {
          return false;
        }
      }
      if (filters.weekdays) {
        const day = calendarDayUtc(schedule.start_date);
        if (day < 1 || day > 5) return false;
      }
      if (filters.weekend) {
        const day = calendarDayUtc(schedule.start_date);
        if (day !== 0 && day !== 6) return false;
      }
      return true;
    });
  }, [filters, schedules]);

  function toggleFilter(name: keyof Filters) {
    setFilters((prev) => {
      const next = { ...prev, [name]: !prev[name] };
      if (name === "weekdays" && next.weekdays) next.weekend = false;
      if (name === "weekend" && next.weekend) next.weekdays = false;
      if (name === "thisMonth" && next.thisMonth) next.nextMonth = false;
      if (name === "nextMonth" && next.nextMonth) next.thisMonth = false;
      return next;
    });
    setDisplayedCount(initialCount);
  }

  function updateQuantity(scheduleId: string, delta: number) {
    setQuantity((prev) => ({
      ...prev,
      [scheduleId]: Math.max(1, (prev[scheduleId] || 1) + delta),
    }));
  }

  async function handleGroupInquirySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inquiryEmail.includes("@") || !inquiryName.trim()) {
      alert("Please enter your full name and a valid email address.");
      return;
    }
    setIsSubmittingInquiry(true);
    try {
      const response = await fetch("/api/store-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryName.trim(),
          email: inquiryEmail.trim(),
          source: "Group Inquiry - 5+ Participants",
          exam_name: inquirySchedule
            ? `${courseName} - ${inquirySchedule.start_date}`
            : courseName,
        }),
      });
      if (response.ok) {
        alert("Thank you for your inquiry. We will contact you shortly about group pricing.");
        setShowGroupInquiry(false);
        setInquiryName("");
        setInquiryEmail("");
        setInquirySchedule(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error || "Failed to submit inquiry. Please try again.");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmittingInquiry(false);
    }
  }

  const hasActiveFilters = Object.values(filters).some(Boolean);
  const visible = filtered.slice(0, displayedCount);

  const chip = (key: keyof Filters, label: string) => (
    <button
      type="button"
      onClick={() => toggleFilter(key)}
      className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
        filters[key]
          ? "bg-[#d97706] text-white"
          : "bg-[#1f2c4a]/10 text-[#475569] hover:bg-[#1f2c4a]/20"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {chip("thisMonth", "This month")}
        {chip("nextMonth", "Next month")}
        {chip("weekdays", "Weekdays")}
        {chip("weekend", "Weekend")}
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={() => {
              setFilters(EMPTY_FILTERS);
              setDisplayedCount(initialCount);
            }}
            className="px-3 py-1.5 text-sm font-medium text-[#475569] hover:text-[#d97706]"
          >
            Clear
          </button>
        ) : null}
        <p className="ml-auto text-sm text-[#64748b]">
          {filtered.length} upcoming {filtered.length === 1 ? "cohort" : "cohorts"}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#d97706]" />
        </div>
      ) : loadError ? (
        <div className="rounded-lg border border-[#1f2c4a]/10 bg-white px-6 py-12 text-center">
          <p className="font-medium text-[#1f2c4a]">{loadError}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="liquid-glass rounded-2xl px-6 py-12 text-center">
          <p className="font-medium text-[#1f2c4a]">No dates match those filters</p>
          <p className="mt-1 text-sm text-[#64748b]">Clear the filters to see every upcoming cohort.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              courseSlug={courseSlug}
              quantity={quantity[schedule.id] || 1}
              onQuantityChange={(delta) => updateQuantity(schedule.id, delta)}
              onGroupInquiry={() => {
                setInquirySchedule(schedule);
                setShowGroupInquiry(true);
              }}
              brochureHref={brochureHref}
              showSafeBadges={showSafeBadges}
            />
          ))}
          {displayedCount < filtered.length ? (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() =>
                  setDisplayedCount((prev) => Math.min(prev + initialCount, filtered.length))
                }
                className="liquid-glass rounded-lg border border-[#1f2c4a]/20 px-8 py-3 text-sm font-medium text-[#1f2c4a] transition-colors hover:bg-[#1f2c4a] hover:text-white"
              >
                View more dates
              </button>
            </div>
          ) : null}
        </div>
      )}

      {showGroupInquiry ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f2c4a]/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8">
            <button
              type="button"
              onClick={() => {
                setShowGroupInquiry(false);
                setInquirySchedule(null);
              }}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#1f2c4a]/10 text-[#334155] hover:bg-[#1f2c4a]/20"
              aria-label="Close"
            >
              ×
            </button>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
              Groups of 5+
            </p>
            <h3 className="mt-2 text-xl font-normal tracking-[-0.03em] text-[#1f2c4a]">
              Request group pricing
            </h3>
            <p className="mt-2 text-sm text-[#475569]">
              25% off for five or more seats. Tell us who to contact and we will send dates and pricing.
            </p>
            <form onSubmit={handleGroupInquirySubmit} className="mt-5 space-y-4">
              <div>
                <label htmlFor="embed-inquiry-name" className="mb-1.5 block text-sm font-medium text-[#475569]">
                  Full name
                </label>
                <input
                  id="embed-inquiry-name"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full rounded-lg border border-[#1f2c4a]/20 bg-[#1f2c4a]/[0.04] px-4 py-2 text-[#1f2c4a] placeholder:text-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="embed-inquiry-email" className="mb-1.5 block text-sm font-medium text-[#475569]">
                  Email
                </label>
                <input
                  id="embed-inquiry-email"
                  type="email"
                  required
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#1f2c4a]/20 bg-[#1f2c4a]/[0.04] px-4 py-2 text-[#1f2c4a] placeholder:text-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none"
                  placeholder="you@company.com"
                />
              </div>
              {inquirySchedule ? (
                <p className="rounded-lg bg-[#1f2c4a]/[0.06] px-3 py-2 text-sm text-[#475569]">
                  {courseName} · {inquirySchedule.start_date.slice(0, 10)}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={isSubmittingInquiry}
                className="w-full rounded-lg bg-[#1f2c4a] py-3 text-sm font-medium text-white hover:bg-[#16243f] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmittingInquiry ? "Sending…" : "Request group pricing"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
