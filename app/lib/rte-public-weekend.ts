/**
 * RTE registration stays open. There is no time gate.
 */
export function isRtePublicEnrollmentOpen(_now = Date.now()): boolean {
  return true;
}

/**
 * Direct schedule link: /courses/release-train-engineer/schedule
 * true = that page lists dates and accepts registration at any hour.
 */
export const RTE_SCHEDULE_LINK_ENABLED = true;
