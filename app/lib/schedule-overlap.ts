export const COMBO_DATE_OVERLAP_MESSAGE =
  "These classes fall on the same days. Pick dates that don't overlap so you can attend both.";

export type ScheduleSpan = {
  start_date: string;
  end_date?: string | null;
  timezone?: string | null;
};

function calendarDay(iso: string, timeZone: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const zone = timeZone || "America/New_York";
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }
}

function spanDays(schedule: ScheduleSpan): { start: string; end: string } | null {
  const zone = schedule.timezone || "America/New_York";
  const start = calendarDay(schedule.start_date, zone);
  const end = calendarDay(schedule.end_date || schedule.start_date, zone);
  if (!start || !end) return null;
  return start <= end ? { start, end } : { start: end, end: start };
}

/** True when two live classes share at least one calendar day in their own time zones. */
export function scheduleSpansOverlap(a: ScheduleSpan, b: ScheduleSpan): boolean {
  const left = spanDays(a);
  const right = spanDays(b);
  if (!left || !right) return false;
  return left.start <= right.end && right.start <= left.end;
}

export function anySchedulesOverlap(schedules: ScheduleSpan[]): boolean {
  for (let i = 0; i < schedules.length; i++) {
    for (let j = i + 1; j < schedules.length; j++) {
      if (scheduleSpansOverlap(schedules[i], schedules[j])) return true;
    }
  }
  return false;
}
