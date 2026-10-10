/**
 * RTE stays a private cohort except for this sales window.
 * Open until Monday, October 12, 2026, 9:00 AM Eastern.
 * At that moment it is private again. Combo pages still list it.
 * October 2026 is Eastern Daylight Time (UTC−4), so 9:00 AM Eastern is 13:00 UTC.
 */
const RTE_PUBLIC_UNTIL_MS = Date.parse("2026-10-12T13:00:00.000Z");

export function isRtePublicEnrollmentOpen(now = Date.now()): boolean {
  return now < RTE_PUBLIC_UNTIL_MS;
}
