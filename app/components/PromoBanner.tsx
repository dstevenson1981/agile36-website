"use client";

import { useState } from "react";
import Link from "next/link";
import CouponModal from "./CouponModal";
import CouponDisplayModal from "./CouponDisplayModal";
import LevelUpSaleBannerArt from "./LevelUpSaleBannerArt";
import {
  isLevelUpSalePromoActive,
  LEVEL_UP_SALE_ENDS_SHORT,
  BANNER_COUPON_CODE,
} from "@/app/lib/level-up-sale-promo";

export { BANNER_COUPON_CODE };

/** Bar height + brand accent under the strip (used to offset sticky nav). */
export const PROMO_BANNER_STICKY_OFFSET_PX = 58;

/** Hide after Level Up Sale end (aligns with 100OFF in promo_codes). */
export function isPromoBannerVisible(): boolean {
  return isLevelUpSalePromoActive();
}

/**
 * Level Up Sale strip — 100OFF shown in-bar; subscribe optional for email capture.
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
      <div className="sticky top-0 z-[60] shadow-[0_2px_10px_rgba(15,23,42,.08)]">
        <div className="group relative box-border flex h-[54px] min-h-[54px] max-h-[54px] w-full max-w-[100vw] items-stretch overflow-hidden border-b border-[#111]/10">
          <Link
            href="/courses"
            className="relative flex h-full min-w-0 flex-1 items-stretch overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e53935] focus-visible:ring-inset"
            aria-label={`Level Up Sale — $100 off with ${BANNER_COUPON_CODE}, ends ${LEVEL_UP_SALE_ENDS_SHORT}`}
          >
            <LevelUpSaleBannerArt variant="strip" className="min-w-0" />
          </Link>

          <button
            type="button"
            onClick={() => setShowCouponModal(true)}
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-md border border-[#e53935]/40 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#e53935] shadow-sm transition-colors hover:bg-white sm:block sm:text-xs md:right-4"
          >
            Get code
          </button>
        </div>
        <div className="h-1 w-full shrink-0 bg-[#e53935]" aria-hidden />
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
