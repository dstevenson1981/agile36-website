"use client";

import { useState } from "react";
import CouponModal from "./CouponModal";
import CouponDisplayModal from "./CouponDisplayModal";

export const BANNER_COUPON_CODE = "100OFF";

/** Bar height + brand accent under the strip (used to offset sticky nav). */
export const PROMO_BANNER_STICKY_OFFSET_PX = 78;

const MEMORIAL_DAY_BANNER_IMAGE = "/promo/memorial-day-sale-banner.png";

/** Hide after promo end (aligns with 100OFF in promo_codes — Dec 31, 2026 UTC). */
export function isPromoBannerVisible(): boolean {
  return Date.now() <= Date.UTC(2026, 11, 31, 23, 59, 59, 999);
}

/**
 * Memorial Day sale strip — subscribe to reveal 100OFF (code not shown in-bar).
 */
export default function PromoBanner() {
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCouponDisplay, setShowCouponDisplay] = useState(false);

  if (!isPromoBannerVisible()) {
    return null;
  }

  const handleClaimCoupon = () => {
    setShowCouponModal(false);
    setShowCouponDisplay(true);
  };

  return (
    <>
      <div className="sticky top-0 z-[60] shadow-[0_2px_14px_rgba(26,35,126,.35)]">
        <button
          type="button"
          onClick={() => setShowCouponModal(true)}
          className="group relative box-border flex h-[72px] min-h-[72px] max-h-[72px] w-full max-w-[100vw] items-center justify-center overflow-hidden border-b border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a237e]"
          aria-label="Memorial Day Sale — subscribe for $100 off"
        >
          <span
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-[1.02]"
            style={{ backgroundImage: `url(${MEMORIAL_DAY_BANNER_IMAGE})` }}
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1a237e]/25 via-transparent to-[#b71c1c]/20"
            aria-hidden
          />
          <span className="sr-only">
            Memorial Day Sale — $100 off. Subscribe with your email to unlock your promo code.
          </span>
          <span className="relative z-10 hidden rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm sm:inline-block">
            Subscribe for $100 off →
          </span>
        </button>
        <div className="h-1 w-full shrink-0 bg-[#b71c1c]" aria-hidden />
      </div>

      <CouponModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onClaimCoupon={handleClaimCoupon}
        couponCode={BANNER_COUPON_CODE}
      />
      <CouponDisplayModal
        isOpen={showCouponDisplay}
        onClose={() => setShowCouponDisplay(false)}
        couponCode={BANNER_COUPON_CODE}
      />
    </>
  );
}
