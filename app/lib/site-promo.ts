/** Site-wide 100OFF flash sale */

export const BANNER_COUPON_CODE = "100OFF";

/** Dollar amount shown in the banner / checkout clip UI. */
export const BANNER_DISCOUNT_AMOUNT = 100;

/** Marketing urgency copy (not enforced at checkout). Used by CouponDisplayModal if shown elsewhere. */
export const PROMO_CODE_EXPIRES_IN = "in 2 hours";

/**
 * Rolling urgency window: clock never hits a hard end — it resets every 2 hours.
 * Checkout does not use this; 100OFF stays valid in promo_codes until we turn it off.
 */
export const PROMO_WINDOW_MS = 2 * 60 * 60 * 1000;

/** Banner headline shown in PromoBanner. */
export const PROMO_BANNER_TITLE = "Flash Sale";

export type PromoCountdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

function remainingInWindowMs(nowMs: number): number {
  const elapsedInWindow = nowMs % PROMO_WINDOW_MS;
  return elapsedInWindow === 0 ? PROMO_WINDOW_MS : PROMO_WINDOW_MS - elapsedInWindow;
}

/**
 * Remaining time in the current 2-hour window.
 * Windows are aligned to the Unix epoch so every client ticks the same clock.
 * When the remainder would be 0, the next window starts immediately (never a 00:00:00 end state).
 */
export function getPromoCountdown(nowMs: number = Date.now()): PromoCountdown {
  const totalMs = remainingInWindowMs(nowMs);
  const totalSecs = Math.max(1, Math.floor(totalMs / 1000));
  return {
    days: Math.floor(totalSecs / 86400),
    hours: Math.floor((totalSecs % 86400) / 3600),
    minutes: Math.floor((totalSecs % 3600) / 60),
    seconds: totalSecs % 60,
    totalMs,
  };
}

/** ISO of the current visual window end (rolls every 2 hours). */
export function getPromoEndsAtIso(nowMs: number = Date.now()): string {
  return new Date(nowMs + remainingInWindowMs(nowMs)).toISOString();
}

/** Banner stays visible while this returns true. Rolling window — always active. */
export function isSitePromoActive(): boolean {
  return true;
}
