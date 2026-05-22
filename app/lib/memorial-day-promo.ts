/** Memorial Day 100OFF — UI copy and banner visibility (align with promo_codes.expires_at). */
export const MEMORIAL_DAY_PROMO_EXPIRES_ISO = "2026-05-25";
export const MEMORIAL_DAY_PROMO_EXPIRES_LABEL = "May 25, 2026";
/** Short copy for the sticky promo banner. */
export const MEMORIAL_DAY_PROMO_ENDS_SHORT = "May 25th";
export const MEMORIAL_DAY_PROMO_EXPIRES_AT_MS = Date.UTC(2026, 4, 25, 23, 59, 59, 999);

export function isMemorialDayPromoActive(now = Date.now()): boolean {
  return now <= MEMORIAL_DAY_PROMO_EXPIRES_AT_MS;
}
