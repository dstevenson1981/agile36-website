/** Site-wide 100OFF promo */
export const BANNER_COUPON_CODE = "100OFF";

/** Shown on the reveal modal after subscribe (marketing urgency — not enforced at checkout). */
export const PROMO_CODE_EXPIRES_IN = "30 mins";

/** Banner stays visible while this returns true. */
export function isSitePromoActive(): boolean {
  return true;
}
