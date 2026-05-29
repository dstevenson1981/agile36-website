/** Level Up Sale 100OFF — UI copy and banner visibility (align with promo_codes.expires_at). */
export const BANNER_COUPON_CODE = "100OFF";
export const LEVEL_UP_SALE_EXPIRES_ISO = "2026-06-01";
export const LEVEL_UP_SALE_EXPIRES_LABEL = "June 1, 2026";
/** Short copy for the sticky promo banner. */
export const LEVEL_UP_SALE_ENDS_SHORT = "01 June";
export const LEVEL_UP_SALE_EXPIRES_AT_MS = Date.UTC(2026, 5, 1, 23, 59, 59, 999);

export function isLevelUpSalePromoActive(now = Date.now()): boolean {
  return now <= LEVEL_UP_SALE_EXPIRES_AT_MS;
}
