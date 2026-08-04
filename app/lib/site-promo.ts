/** Site-wide 100OFF promo */

export const BANNER_COUPON_CODE = "100OFF";

/** Marketing urgency copy (not enforced at checkout). Used by CouponDisplayModal if shown elsewhere. */
export const PROMO_CODE_EXPIRES_IN = "30 mins";

/**
 * August Flash Sale ends Friday Aug 7, 2026 23:59:59 America/New_York (EDT, UTC-4).
 * ISO with offset so the instant is unambiguous in all runtimes.
 */
export const SITE_PROMO_END_ISO = "2026-08-07T23:59:59-04:00";

/** Alias used by PromoBanner `<time dateTime>`. */
export const PROMO_EXPIRES_ISO = SITE_PROMO_END_ISO;

/** Short label for banner copy (America/New_York end date). */
export const PROMO_ENDS_SHORT = "Fri Aug 7";

/** Banner headline shown in PromoBanner. */
export const PROMO_BANNER_TITLE = "August Flash Sale";
/** Epoch ms for SITE_PROMO_END_ISO */
export const SITE_PROMO_ENDS_AT_MS = new Date(SITE_PROMO_END_ISO).getTime();

export type PromoCountdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

/** Remaining time until promo ends, or null when expired. */
export function getPromoCountdown(nowMs: number = Date.now()): PromoCountdown | null {
  const totalMs = SITE_PROMO_ENDS_AT_MS - nowMs;
  if (totalMs <= 0) return null;
  const totalSecs = Math.floor(totalMs / 1000);
  return {
    days: Math.floor(totalSecs / 86400),
    hours: Math.floor((totalSecs % 86400) / 3600),
    minutes: Math.floor((totalSecs % 3600) / 60),
    seconds: totalSecs % 60,
    totalMs,
  };
}

/** Banner stays visible while this returns true. */
export function isSitePromoActive(nowMs: number = Date.now()): boolean {
  return nowMs < SITE_PROMO_ENDS_AT_MS;
}
