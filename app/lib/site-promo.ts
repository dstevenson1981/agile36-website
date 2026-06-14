/** Site-wide 100OFF promo */
export const BANNER_COUPON_CODE = "100OFF";

/** Marketing urgency copy shown on banner/modals (display only — not enforced at checkout). */
export const PROMO_MARKETING_ENDS_ISO = "2026-06-20";
export const PROMO_MARKETING_ENDS_LABEL = "June 20, 2026";
export const PROMO_MARKETING_ENDS_SHORT = "June 20";

/** @deprecated Use PROMO_MARKETING_* — kept for existing imports */
export const PROMO_EXPIRES_ISO = PROMO_MARKETING_ENDS_ISO;
/** @deprecated Use PROMO_MARKETING_* — kept for existing imports */
export const PROMO_EXPIRES_LABEL = PROMO_MARKETING_ENDS_LABEL;
/** @deprecated Use PROMO_MARKETING_* — kept for existing imports */
export const PROMO_ENDS_SHORT = PROMO_MARKETING_ENDS_SHORT;

/** Real cutoff for banner visibility (align with promo_codes.expires_at in Supabase). */
export const PROMO_EXPIRES_AT_MS = Date.UTC(2026, 11, 31, 23, 59, 59, 999);

export function isSitePromoActive(now = Date.now()): boolean {
  return now <= PROMO_EXPIRES_AT_MS;
}
