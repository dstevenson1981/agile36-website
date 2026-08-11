export type CourseScheduleRow = {
  id: string;
  start_date: string;
  end_date: string;
  start_time?: string;
  end_time?: string;
  timezone?: string;
  duration?: string;
  is_weekend?: boolean;
  instructor_name?: string | null;
  instructor_image?: string | null;
  language?: string | null;
  exam_included?: boolean | null;
  price: string;
  original_price?: string | null;
  /** Paid enrollments for this cohort (incremented on successful checkout). */
  total_registrants?: number | null;
  total_seats?: number | null;
};

export function formatDateRange(
  startDate: string,
  endDate: string,
  timezone?: string
): string {
  try {
    const tz =
      timezone === "IST"
        ? "Asia/Kolkata"
        : timezone || undefined;
    const opts: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      ...(tz ? { timeZone: tz } : {}),
    };

    // Prefer the class timezone so IST cohorts don't shift a day in US browsers.
    if (tz) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const startFormatted = start.toLocaleDateString("en-US", opts);
      const endFormatted = end.toLocaleDateString("en-US", opts);
      const startKey = start.toLocaleDateString("en-CA", { timeZone: tz });
      const endKey = end.toLocaleDateString("en-CA", { timeZone: tz });
      if (startKey === endKey) return startFormatted;
      const startMonth = start.toLocaleDateString("en-US", {
        month: "short",
        timeZone: tz,
      });
      const endMonth = end.toLocaleDateString("en-US", {
        month: "short",
        timeZone: tz,
      });
      const endDay = end.toLocaleDateString("en-US", {
        day: "numeric",
        timeZone: tz,
      });
      if (startMonth === endMonth && startKey.slice(0, 4) === endKey.slice(0, 4)) {
        return `${startFormatted} - ${endDay}`;
      }
      return `${startFormatted} - ${endFormatted}`;
    }

    // Fallback: calendar date from ISO prefix (avoids browser-local day shifts).
    const start = parseCalendarDate(startDate);
    const end = parseCalendarDate(endDate);
    if (!start || !end) return "Date TBA";
    const startFormatted = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    const endFormatted = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    if (start.toDateString() === end.toDateString()) return startFormatted;
    if (
      start.getUTCMonth() === end.getUTCMonth() &&
      start.getUTCFullYear() === end.getUTCFullYear()
    ) {
      return `${startFormatted} - ${end.getUTCDate()}`;
    }
    return `${startFormatted} - ${endFormatted}`;
  } catch {
    return "Date TBA";
  }
}

/** Compact date range for selectors, e.g. "Aug 12–14" or "Aug 28–Sep 1". */
export function formatDateRangeCompact(startDate: string, endDate: string): string {
  const start = parseCalendarDate(startDate);
  const end = parseCalendarDate(endDate || startDate);
  if (!start) return "Date TBA";
  if (!end || end.getTime() === start.getTime()) {
    return start.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  }

  const startMonth = start.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const startDay = start.getUTCDate();
  const endMonth = end.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const endDay = end.getUTCDate();

  if (start.getUTCFullYear() === end.getUTCFullYear() && start.getUTCMonth() === end.getUTCMonth()) {
    return `${startMonth} ${startDay}–${endDay}`;
  }
  return `${startMonth} ${startDay}–${endMonth} ${endDay}`;
}

/** Inclusive calendar-day count between start and end (UTC date parts). */
export function getInclusiveDayCount(startDate: string, endDate: string): number | null {
  const start = parseCalendarDate(startDate);
  const end = parseCalendarDate(endDate || startDate);
  if (!start || !end || end < start) return null;
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((end.getTime() - start.getTime()) / msPerDay) + 1;
}

/**
 * Combo schedule dropdown label from schedule fields.
 * e.g. "Aug 12–14 · 3 days · Weekday" or "Aug 15–16 · 2 days · Weekend"
 */
export function formatComboScheduleOptionLabel(schedule: {
  start_date: string;
  end_date?: string | null;
  duration?: string | null;
  is_weekend?: boolean | null;
}): string {
  const endDate = schedule.end_date || schedule.start_date;
  const datePart = formatDateRangeCompact(schedule.start_date, endDate);

  const fromField = formatDurationLabel(schedule.duration);
  let durationPart: string | null = null;
  if (fromField) {
    durationPart = fromField.replace(/\bDays?\b/g, (m) => m.toLowerCase()).replace(/\bHrs?\b/g, (m) => m.toLowerCase());
  } else {
    const days = getInclusiveDayCount(schedule.start_date, endDate);
    if (days) durationPart = `${days} ${days === 1 ? "day" : "days"}`;
  }

  const batchPart = schedule.is_weekend === true ? "Weekend" : "Weekday";

  return [datePart, durationPart, batchPart].filter(Boolean).join(" · ");
}

export function formatTimezoneLabel(timezone?: string): string {
  if (!timezone) return "EST";
  if (timezone === "America/New_York") return "EST";
  if (timezone === "Asia/Kolkata" || timezone === "IST") return "IST";
  return timezone;
}

/** Friendlier timezone label for schedule meta pills (e.g. "Eastern Time"). */
export function formatTimezonePillLabel(timezone?: string): string {
  if (!timezone || timezone === "America/New_York" || timezone === "EST" || timezone === "EDT") {
    return "Eastern Time";
  }
  if (timezone === "America/Chicago" || timezone === "CST" || timezone === "CDT") {
    return "Central Time";
  }
  if (timezone === "America/Denver" || timezone === "MST" || timezone === "MDT") {
    return "Mountain Time";
  }
  if (timezone === "America/Los_Angeles" || timezone === "PST" || timezone === "PDT") {
    return "Pacific Time";
  }
  if (timezone === "Asia/Kolkata" || timezone === "IST") {
    return "IST";
  }
  return timezone;
}

export function formatTimeShort(time: string): string {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

/** Prominent time range for schedule cards, e.g. "9:00 AM — 5:00 PM". */
export function formatTimeRange(startTime?: string, endTime?: string): string | null {
  const start = formatTimeShort(startTime || "");
  const end = formatTimeShort(endTime || "");
  if (!start || !end) return null;
  return `${start} — ${end}`;
}

/** Hours per day from start/end times, e.g. "8 hrs / day". */
export function formatHoursPerDay(startTime?: string, endTime?: string): string | null {
  if (!startTime || !endTime) return null;
  const [sh, sm = "0"] = startTime.split(":");
  const [eh, em = "0"] = endTime.split(":");
  const startMinutes = parseInt(sh, 10) * 60 + parseInt(sm, 10);
  const endMinutes = parseInt(eh, 10) * 60 + parseInt(em, 10);
  if (Number.isNaN(startMinutes) || Number.isNaN(endMinutes) || endMinutes <= startMinutes) {
    return null;
  }
  const hours = (endMinutes - startMinutes) / 60;
  const label = Number.isInteger(hours) ? String(hours) : String(Math.round(hours * 10) / 10);
  return `${label} hrs / day`;
}

/** Normalize duration strings like "02 days" → "2 Days". */
export function formatDurationLabel(duration?: string | null): string | null {
  if (!duration?.trim()) return null;
  const match = duration.trim().match(/^0*(\d+)\s*(days?|hrs?|hours?)$/i);
  if (match) {
    const count = match[1];
    const unit = match[2].toLowerCase().startsWith("h") ? (count === "1" ? "Hr" : "Hrs") : count === "1" ? "Day" : "Days";
    return `${count} ${unit}`;
  }
  return duration.trim();
}

const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/**
 * Inclusive day-of-week labels between start and end dates, e.g. "Mon, Tue".
 * Uses calendar dates (UTC date parts when ISO-like) to avoid TZ day shifts.
 */
export function formatDaysOfWeek(startDate: string, endDate: string): string | null {
  try {
    const start = parseCalendarDate(startDate);
    const end = parseCalendarDate(endDate);
    if (!start || !end || end < start) return null;

    const days: string[] = [];
    const cursor = new Date(start);
    // Cap at 14 days to avoid runaway loops on bad data
    for (let i = 0; i < 14 && cursor <= end; i++) {
      days.push(DAY_ABBR[cursor.getUTCDay()]);
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    return days.length ? days.join(", ") : null;
  } catch {
    return null;
  }
}

function parseCalendarDate(value: string): Date | null {
  // Prefer YYYY-MM-DD prefix so "2026-01-05 09:00:00-05:00" stays Jan 5
  const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()));
}

export function formatTime(time: string, timezone?: string): string {
  const short = formatTimeShort(time);
  if (!short) return "";
  const tz = formatTimezoneLabel(timezone);
  return `${short} (${tz})`;
}

export function calculateDiscount(originalPrice: number, salePrice: number): number {
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
}

export type ScheduleUrgency = {
  show: boolean;
  isWithinNext7Days: boolean;
  isWithin8to14Days: boolean;
  isLowSeats: boolean;
  message: string;
};

export function getScheduleUrgency(schedule: CourseScheduleRow): ScheduleUrgency {
  const startDate = new Date(schedule.start_date);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const sevenDaysFromNow = new Date(now);
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const fourteenDaysFromNow = new Date(now);
  fourteenDaysFromNow.setDate(fourteenDaysFromNow.getDate() + 14);

  const startDateOnly = new Date(startDate);
  startDateOnly.setHours(0, 0, 0, 0);

  const isWithinNext7Days = startDateOnly >= now && startDateOnly <= sevenDaysFromNow;
  const isWithin8to14Days = startDateOnly > sevenDaysFromNow && startDateOnly <= fourteenDaysFromNow;
  const totalSeats = schedule.total_seats ?? null;
  const registrants = schedule.total_registrants ?? 0;
  const seatsLeft =
    totalSeats !== null && totalSeats !== undefined
      ? Math.max(totalSeats - registrants, 0)
      : null;
  const isLowSeats =
    !isWithinNext7Days &&
    !isWithin8to14Days &&
    seatsLeft !== null &&
    seatsLeft > 0 &&
    seatsLeft <= 5;

  const show = isWithinNext7Days || isWithin8to14Days || isLowSeats;

  let message = "";
  if (isWithinNext7Days) message = "Only 3 seats left";
  else if (isWithin8to14Days) message = "Sales ending soon";
  else if (isLowSeats) message = `Only ${seatsLeft} seats left`;

  return { show, isWithinNext7Days, isWithin8to14Days, isLowSeats, message };
}
