/** Site-wide 100OFF promo */

export const BANNER_COUPON_CODE = "100OFF";

/** Dollar amount shown in the banner / checkout clip UI. */
export const BANNER_DISCOUNT_AMOUNT = 100;

/** Marketing urgency copy (not enforced at checkout). Used by CouponDisplayModal if shown elsewhere. */
export const PROMO_CODE_EXPIRES_IN = "30 mins";

/** Rolling urgency window: clock never hits a hard end — it resets every 4 hours. */
export const PROMO_WINDOW_MS = 4 * 60 * 60 * 1000;

/** Banner headline shown in PromoBanner. */
export const PROMO_BANNER_TITLE = "August Flash Sale";

export type PromoCountdown = {
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

/**
 * Remaining time in the current 4-hour window.
 * Windows are aligned to the Unix epoch so every client ticks the same clock.
 * When the remainder would be 0, the next window starts immediately (never a 00:00:00 end state).
 */
export function getPromoCountdown(nowMs: number = Date.now()): PromoCountdown {
  const elapsedInWindow = nowMs % PROMO_WINDOW_MS;
  const totalMs =
    elapsedInWindow === 0 ? PROMO_WINDOW_MS : PROMO_WINDOW_MS - elapsedInWindow;
  const totalSecs = Math.max(1, Math.floor(totalMs / 1000));
  return {
    hours: Math.floor(totalSecs / 3600),
    minutes: Math.floor((totalSecs % 3600) / 60),
    seconds: totalSecs % 60,
    totalMs,
  };
}

/** Banner stays visible while this returns true. Rolling window — always active. */
export function isSitePromoActive(): boolean {
  return true;
}
