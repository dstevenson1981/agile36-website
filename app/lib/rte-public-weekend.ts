/**
 * RTE stays a private cohort except for this sales window.
 * Open until Monday, October 19, 2026, 9:00 AM Eastern.
 * At that moment individual registration is private again. Combo pages do not list it.
 * October 2026 is Eastern Daylight Time (UTC−4), so 9:00 AM Eastern is 13:00 UTC.
 */
const RTE_PUBLIC_UNTIL_MS = Date.parse("2026-10-19T13:00:00.000Z");

export function isRtePublicEnrollmentOpen(now = Date.now()): boolean {
  return now < RTE_PUBLIC_UNTIL_MS;
}

/**
 * Direct schedule link: /courses/release-train-engineer/schedule
 * false = that page does not list dates or enrollment.
 * Set to true when that link should accept registration again.
 */
export const RTE_SCHEDULE_LINK_ENABLED = false;
