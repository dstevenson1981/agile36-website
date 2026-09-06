/** Site-wide 100OFF Labor Day sale */

export const BANNER_COUPON_CODE = "100OFF";

/** Dollar amount shown in the banner / checkout clip UI. */
export const BANNER_DISCOUNT_AMOUNT = 100;

/** Marketing urgency copy (not enforced at checkout). Used by CouponDisplayModal if shown elsewhere. */
export const PROMO_CODE_EXPIRES_IN = "Monday morning";

/**
 * Labor Day 2026 — Monday 9:00 AM America/New_York (EDT).
 * Checkout also enforces this via promo_codes.expires_at.
 */
export const PROMO_ENDS_AT_ISO = "2026-09-07T09:00:00-04:00";
export const PROMO_ENDS_AT_MS = Date.parse(PROMO_ENDS_AT_ISO);

/** Banner headline shown in PromoBanner. */
export const PROMO_BANNER_TITLE = "Labor Day Sale";

export type PromoCountdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

/** Remaining time until Monday morning. Zeroed once the sale ends. */
export function getPromoCountdown(nowMs: number = Date.now()): PromoCountdown {
  const totalMs = Math.max(0, PROMO_ENDS_AT_MS - nowMs);
  const totalSecs = Math.floor(totalMs / 1000);
  return {
    days: Math.floor(totalSecs / 86400),
    hours: Math.floor((totalSecs % 86400) / 3600),
    minutes: Math.floor((totalSecs % 3600) / 60),
    seconds: totalSecs % 60,
    totalMs,
  };
}

/** Banner stays visible until Monday morning. */
export function isSitePromoActive(nowMs: number = Date.now()): boolean {
  return nowMs < PROMO_ENDS_AT_MS;
}
