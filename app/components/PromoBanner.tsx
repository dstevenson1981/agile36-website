"use client";

import { useState } from "react";
import CouponModal from "@/app/components/CouponModal";
import CouponDisplayModal from "@/app/components/CouponDisplayModal";

const BANNER_COUPON_CODE = "100OFF";

/** Hide after end of May 18, 2026 UTC (same instant on server and client). */
const PROMO_BANNER_EXPIRED = () => Date.now() > Date.UTC(2026, 4, 18, 23, 59, 59, 999);

/**
 * Promo banner — click to open email + course form; reveals promo code after submit.
 */
export default function PromoBanner() {
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCouponDisplay, setShowCouponDisplay] = useState(false);

  if (PROMO_BANNER_EXPIRED()) {
    return null;
  }

  const handleClaimCoupon = (_email: string, _course: string) => {
    setShowCouponModal(false);
    setShowCouponDisplay(true);
  };

  return (
    <>
      <div className="w-full max-w-[100vw] box-border bg-black py-2.5 sm:py-2.5 overflow-x-hidden overflow-y-visible">
        {/* &lt;sm: single full-width column — no squeezed two-column row on narrow viewports */}
        <div
          className="max-w-7xl mx-auto w-full min-w-0 sm:hidden flex flex-col items-stretch gap-2.5
          pl-[max(0.75rem,env(safe-area-inset-left,0px))]
          pr-[max(0.75rem,env(safe-area-inset-right,0px))]"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 min-w-0 text-center">
            <div className="bg-[#fa4a23] px-2 py-0.5 -rotate-[-4deg] shrink-0">
              <span className="text-white font-bold text-xs uppercase tracking-wide leading-tight">
                FutureYou
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 min-w-0">
              <span className="text-white font-bold text-sm leading-tight">SALE!</span>
            </div>
          </div>
          <p className="text-center text-balance text-[#fa4a23] font-bold italic text-sm leading-snug max-w-prose mx-auto min-w-0">
            <span>Level up today. Win tomorrow.</span>
            <span className="inline-block align-middle text-[#fa4a23]">
              <svg
                className="w-3.5 h-3.5 inline -mt-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M7 14l5-5 5 5H7z" />
              </svg>
            </span>
          </p>
          <button
            type="button"
            onClick={() => setShowCouponModal(true)}
            className="w-full min-h-[2.75rem] flex flex-col items-center justify-center
              border-2 border-[#fa4a23] bg-white rounded-md px-3 py-2
              hover:bg-orange-50 active:bg-orange-100 transition-colors touch-manipulation"
          >
            <span className="font-bold text-black text-sm leading-tight">Get $100 OFF</span>
            <span className="text-[#fa4a23] font-semibold text-xs leading-tight">Clip code</span>
          </button>
          <p className="text-center text-white text-xs font-semibold text-balance opacity-95">
            Discount code expires on May 18th
          </p>
        </div>

        {/* sm+: horizontal band (640px+ = Tailwind `sm`) */}
        <div
          className="max-w-7xl mx-auto hidden w-full min-w-0 sm:flex sm:flex-wrap sm:items-center sm:justify-between
          gap-3 sm:gap-4
          sm:pl-[max(1rem,env(safe-area-inset-left,0px))]
          sm:pr-[max(1rem,env(safe-area-inset-right,0px))]"
        >
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="flex items-center gap-2">
              <div className="bg-[#fa4a23] px-2 py-1 sm:px-3 sm:py-1.5 -rotate-[-4deg]">
                <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide">
                  FutureYou
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white font-bold text-sm sm:text-base">SALE!</span>
              </div>
            </div>
            <div className="w-px h-6 bg-white/40" />
            <span className="text-white font-bold text-sm">Discount code expires on May 18th</span>
          </div>

          <div className="flex-1 min-w-0 text-center w-full sm:w-auto">
            <span className="text-[#fa4a23] font-bold italic text-sm sm:text-lg md:text-xl">
              Level up today. Win tomorrow.
            </span>
            <span className="inline-block ml-1 text-[#fa4a23] align-middle">
              <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14l5-5 5 5H7z" />
              </svg>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setShowCouponModal(true)}
              className="border-2 border-[#fa4a23] bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-left hover:bg-orange-50 transition-colors"
            >
              <div className="font-bold text-black text-sm sm:text-base">Get $100 OFF</div>
              <div className="text-[#fa4a23] font-semibold text-xs sm:text-sm">Clip coupon code</div>
            </button>
            <div className="w-px h-6 bg-white/40" />
            <span className="text-white font-bold text-sm sm:text-base">Discount code expires on May 18th</span>
          </div>
        </div>
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
