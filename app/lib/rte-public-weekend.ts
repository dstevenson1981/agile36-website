/**
 * RTE stays a private cohort except for this sales window.
 * Open through Sunday, October 4, 2026, 11:59pm Eastern.
 * Monday, October 5, 2026, 12:00am Eastern it is private again.
 * October 2026 is still Eastern Daylight Time (UTC−4).
 */
const RTE_PUBLIC_UNTIL_MS = Date.parse("2026-10-05T04:00:00.000Z");

export function isRtePublicEnrollmentOpen(now = Date.now()): boolean {
  return now < RTE_PUBLIC_UNTIL_MS;
}
