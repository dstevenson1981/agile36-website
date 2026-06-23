/** Site-wide 100OFF promo */
export const BANNER_COUPON_CODE = "100OFF";

/** Marketing urgency copy shown on banner/modals (display only — not enforced at checkout). */
export const PROMO_MARKETING_ENDS_ISO = "2026-06-30";
export const PROMO_MARKETING_ENDS_LABEL = "June 30, 2026";
export const PROMO_MARKETING_ENDS_SHORT = "June 30";

/** @deprecated Use PROMO_MARKETING_* — kept for existing imports */
export const PROMO_EXPIRES_ISO = PROMO_MARKETING_ENDS_ISO;
/** @deprecated Use PROMO_MARKETING_* — kept for existing imports */
export const PROMO_EXPIRES_LABEL = PROMO_MARKETING_ENDS_LABEL;
/** @deprecated Use PROMO_MARKETING_* — kept for existing imports */
export const PROMO_ENDS_SHORT = PROMO_MARKETING_ENDS_SHORT;

/** Banner visibility cutoff only — 100OFF checkout validity is separate (see promo_codes in Supabase). */
export const PROMO_EXPIRES_AT_MS = Date.UTC(2026, 5, 30, 23, 59, 59, 999);

export function isSitePromoActive(now = Date.now()): boolean {
  return now <= PROMO_EXPIRES_AT_MS;
}
