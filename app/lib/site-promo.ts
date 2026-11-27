/** Black Friday banner — subscribe to reveal 150OFF. Ends 4:00 PM EST on Nov 27, 2026. */

export const BANNER_COUPON_CODE = "150OFF";

/** Set when the banner subscribe flow reveals the code. The course price listens for this. */
export const PROMO_UNLOCK_KEY = "agile36-promo-unlocked";
export const PROMO_UNLOCK_EVENT = "agile36-promo-unlocked";

/** Dollar amount shown in the banner, course price, and checkout clip UI. */
export const BANNER_DISCOUNT_AMOUNT = 150;

/** 4:00 PM Eastern on Friday, November 27, 2026. */
export const PROMO_ENDS_AT_ISO = "2026-11-27T16:00:00-05:00";
export const PROMO_ENDS_AT_MS = Date.parse(PROMO_ENDS_AT_ISO);

/** Shown next to the offer. Checkout enforces the same end on 150OFF. */
export const PROMO_CODE_EXPIRES_IN = "today at 4:00 PM EST";

/** Banner headline shown in PromoBanner. */
export const PROMO_BANNER_TITLE = "Black Friday";

/** Visible CTA on the promo strip. */
export const PROMO_BANNER_CTA = "Claim Coupon";

export type PromoCountdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

function remainingMs(nowMs: number): number {
  return Math.max(0, PROMO_ENDS_AT_MS - nowMs);
}

/**
 * Time left until 4:00 PM EST on November 27, 2026.
 * After that instant the clock is 0 and the banner hides.
 */
export function getPromoCountdown(nowMs: number = Date.now()): PromoCountdown {
  const totalMs = remainingMs(nowMs);
  const totalSecs = Math.floor(totalMs / 1000);
  return {
    days: Math.floor(totalSecs / 86400),
    hours: Math.floor((totalSecs % 86400) / 3600),
    minutes: Math.floor((totalSecs % 3600) / 60),
    seconds: totalSecs % 60,
    totalMs,
  };
}

/** ISO of the Black Friday end. */
export function getPromoEndsAtIso(): string {
  return PROMO_ENDS_AT_ISO;
}

/** Banner stays visible until 4:00 PM EST. */
export function isSitePromoActive(nowMs: number = Date.now()): boolean {
  return nowMs < PROMO_ENDS_AT_MS;
}
