"use client";

import { useState } from "react";
import CouponModal from "@/app/components/CouponModal";
import CouponDisplayModal from "@/app/components/CouponDisplayModal";

const BANNER_COUPON_CODE = "100OFF";

/**
 * Promo banner — click to open email + course form; reveals 100OFF after submit.
 */
export default function PromoBanner() {
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCouponDisplay, setShowCouponDisplay] = useState(false);

  const handleClaimCoupon = (_email: string, _course: string) => {
    setShowCouponModal(false);
    setShowCouponDisplay(true);
  };

  return (
    <>
      <div className="w-full bg-black py-2 sm:py-2.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#fa4a23] px-2 py-1 sm:px-3 sm:py-1.5 -rotate-[-4deg]">
                <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide">
                  FutureYou
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white font-bold text-sm sm:text-base">SALE!</span>
                <span className="text-white/90 text-sm" aria-hidden>
                  🚀
                </span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/40" />
            <span className="hidden sm:inline text-white font-bold text-sm">Only Until Mar 30</span>
          </div>

          <div className="flex-1 min-w-0 text-center order-last sm:order-none w-full sm:w-auto">
            <span className="text-[#fa4a23] font-bold italic text-base sm:text-lg md:text-xl">
              Level up today. Win tomorrow.
            </span>
            <span className="inline-block ml-1 text-[#fa4a23] align-middle">
              <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14l5-5 5 5H7z" />
              </svg>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => setShowCouponModal(true)}
              className="border-2 border-[#fa4a23] bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-left hover:bg-orange-50 transition-colors"
            >
              <div className="font-bold text-black text-sm sm:text-base">Get $100 OFF</div>
              <div className="text-[#fa4a23] font-semibold text-xs sm:text-sm">Enter email for code</div>
            </button>
            <div className="hidden sm:block w-px h-6 bg-white/40" />
            <span className="text-white font-bold text-sm sm:text-base">Ends Soon!</span>
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
