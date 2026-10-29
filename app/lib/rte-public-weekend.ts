/**
 * RTE stays a private cohort except during recurring registration hours.
 *
 * Eastern time (America/New_York):
 * - Weekdays: open from 8:30 PM until 10:00 AM the next morning.
 * - Saturday and Sunday: open the entire day.
 *
 * Tuesday, October 27, 2026 stays open through 8:30 PM Eastern so registration
 * is available during the midday gap. After that, the hours above apply.
 * Combo pages do not list it.
 */
const EASTERN = "America/New_York";
const OPEN_UNTIL_MINUTES = 10 * 60;
const OPEN_FROM_MINUTES = 20 * 60 + 30;
/** 8:30 PM Eastern on Oct 27, 2026. October is still EDT (UTC−4). */
const OPEN_NOW_UNTIL_MS = Date.parse("2026-10-28T00:30:00.000Z");

function easternClock(now: number): { weekend: boolean; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(now));
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const weekday = value("weekday");
  const hour = Number(value("hour")) % 24;
  const minute = Number(value("minute"));
  return {
    weekend: weekday === "Sat" || weekday === "Sun",
    minutes: hour * 60 + minute,
  };
}

export function isRtePublicEnrollmentOpen(now = Date.now()): boolean {
  if (now < OPEN_NOW_UNTIL_MS) return true;
  const { weekend, minutes } = easternClock(now);
  if (weekend) return true;
  return minutes < OPEN_UNTIL_MINUTES || minutes >= OPEN_FROM_MINUTES;
}

/**
 * Direct schedule link: /courses/release-train-engineer/schedule
 * true = that page lists dates and accepts registration at any hour.
 * The course page and catalog still follow the hours above.
 */
export const RTE_SCHEDULE_LINK_ENABLED = true;
