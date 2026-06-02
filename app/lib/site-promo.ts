/** Site-wide 100OFF promo — UI copy and banner visibility (align with promo_codes.expires_at). */
export const BANNER_COUPON_CODE = "100OFF";
export const PROMO_EXPIRES_ISO = "2026-06-08";
export const PROMO_EXPIRES_LABEL = "June 8, 2026";
/** Short copy for the sticky promo banner. */
export const PROMO_ENDS_SHORT = "June 8";
export const PROMO_EXPIRES_AT_MS = Date.UTC(2026, 5, 8, 23, 59, 59, 999);

export function isSitePromoActive(now = Date.now()): boolean {
  return now <= PROMO_EXPIRES_AT_MS;
}
