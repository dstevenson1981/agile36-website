"use client";

import { useState } from "react";
import CouponModal from "@/app/components/CouponModal";
import CouponDisplayModal from "@/app/components/CouponDisplayModal";

export const BANNER_COUPON_CODE = "100OFF";

/** Bar height (50px) + brand accent under the strip (used to offset sticky nav). */
export const PROMO_BANNER_STICKY_OFFSET_PX = 54;

/** Hide after end of May 18, 2026 UTC (same instant on server and client). */
export function isPromoBannerVisible(): boolean {
  return Date.now() <= Date.UTC(2026, 4, 18, 23, 59, 59, 999);
}

/**
 * Thin promo strip — orange gradient, one line, sticky at top; opens email flow then shows code.
 */
export default function PromoBanner() {
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCouponDisplay, setShowCouponDisplay] = useState(false);

  if (!isPromoBannerVisible()) {
    return null;
  }

  const handleClaimCoupon = (_email: string, _course: string) => {
    setShowCouponModal(false);
    setShowCouponDisplay(true);
  };

  return (
    <>
      <div className="sticky top-0 z-[60] shadow-[0_1px_0_rgba(0,0,0,.06)]">
        <div
          className="relative box-border flex h-[50px] min-h-[50px] max-h-[50px] w-full max-w-[100vw] items-center gap-2 overflow-x-auto overflow-y-hidden border-b border-orange-500/25 bg-gradient-to-r from-[#ff7a2e] via-[#ff9a45] to-[#ffc06a] px-3 sm:gap-3 sm:px-4"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_140%_at_20%_0%,rgba(255,255,255,.22),transparent_50%)]"
            aria-hidden
          />
          <p className="relative min-w-0 flex-1 text-[13px] font-semibold leading-tight tracking-tight text-neutral-900 sm:text-sm">
            <span className="whitespace-nowrap">
              <span aria-hidden>🎉 </span>
              Limited time: <strong className="font-extrabold">$100 off</strong> with code{" "}
              <span className="rounded bg-white/90 px-1 py-0.5 font-mono text-[12px] font-bold text-neutral-950 shadow-sm ring-1 ring-black/10 sm:text-[13px]">
                {BANNER_COUPON_CODE}
              </span>
              {" — "}expires <time dateTime="2026-05-18">May 18</time>
            </span>
          </p>
          <button
            type="button"
            onClick={() => setShowCouponModal(true)}
            className="relative shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-neutral-900 shadow-md ring-1 ring-black/[0.07] transition hover:bg-orange-50/95 active:scale-[0.99] sm:px-3.5 sm:text-sm"
          >
            Claim
          </button>
        </div>
        <div className="h-1 w-full shrink-0 bg-[#fa4a23]" aria-hidden />
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
