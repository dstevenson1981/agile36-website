"use client";

import Image from "next/image";
import { useState } from "react";
import CouponModal from "./CouponModal";
import CouponDisplayModal from "./CouponDisplayModal";

export const BANNER_COUPON_CODE = "100OFF";

/** Bar height + brand accent under the strip (used to offset sticky nav). */
export const PROMO_BANNER_STICKY_OFFSET_PX = 78;

const MEMORIAL_DAY_BANNER_IMAGE = "/promo/memorial-day-sale-banner-2x.png";
const MEMORIAL_DAY_BANNER_WIDTH = 3072;
const MEMORIAL_DAY_BANNER_HEIGHT = 114;

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
          className="group relative box-border flex h-[72px] min-h-[72px] max-h-[72px] w-full max-w-[100vw] items-stretch overflow-hidden border-b border-white/20 bg-gradient-to-r from-[#1a237e] via-[#283593] to-[#b71c1c] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a237e]"
          aria-label="Memorial Day Sale — subscribe for $100 off"
        >
          {/* Art at native height — avoids stretching a 1024×38 asset across the viewport */}
          <span className="relative flex h-full min-w-0 flex-1 items-center overflow-hidden pr-[10.5rem] sm:pr-[13.5rem] md:pr-[15.5rem]">
            <Image
              src={MEMORIAL_DAY_BANNER_IMAGE}
              alt=""
              width={MEMORIAL_DAY_BANNER_WIDTH}
              height={MEMORIAL_DAY_BANNER_HEIGHT}
              priority
              unoptimized
              className="h-full w-auto max-w-none shrink-0 object-contain object-left"
              sizes="(max-width: 768px) 100vw, 1940px"
            />
          </span>

          <span
            className="pointer-events-none absolute inset-y-0 right-0 w-[min(42%,280px)] bg-gradient-to-l from-[#b71c1c] via-[#b71c1c]/85 to-transparent"
            aria-hidden
          />

          <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-5 md:right-8">
            <span className="inline-flex items-center rounded-full border-2 border-white/50 bg-[#1a237e]/90 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg transition-colors group-hover:bg-[#283593] sm:px-5 sm:py-2.5 sm:text-sm md:px-6 md:text-base">
              Subscribe for $100 off →
            </span>
          </span>

          <span className="sr-only">
            Memorial Day Sale — $100 off. Subscribe with your email to unlock your promo code.
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
