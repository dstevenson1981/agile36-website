"use client";

import { useState } from "react";
import CouponModal from "./CouponModal";
import CouponDisplayModal from "./CouponDisplayModal";
import {
  isSitePromoActive,
  PROMO_ENDS_SHORT,
  PROMO_EXPIRES_ISO,
  BANNER_COUPON_CODE,
} from "@/app/lib/site-promo";

export { BANNER_COUPON_CODE };

/** Bar height (50px) + brand accent under the strip (used to offset sticky nav). */
export const PROMO_BANNER_STICKY_OFFSET_PX = 54;

export function isPromoBannerVisible(): boolean {
  return isSitePromoActive();
}

function ConfettiLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M6 8c2 4 1 10-2 14M10 4c4 2 6 8 4 14M22 6c-1 5 2 11 6 14"
        stroke="url(#pb-gold)"
        strokeWidth={2.2}
        strokeLinecap="round"
        opacity={0.92}
      />
      <circle cx="32" cy="10" r="3" fill="#fde68a" opacity={0.95} />
      <circle cx="8" cy="26" r="2.5" fill="#fff" opacity={0.35} />
      <defs>
        <linearGradient id="pb-gold" x1="0" y1="0" x2="36" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fef9c3" />
          <stop offset="0.5" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SparkStar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M10 1.5l1.8 5.5h5.8l-4.7 3.4 1.8 5.5-4.7-3.4-4.7 3.4 1.8-5.5-4.7-3.4h5.8L10 1.5z"
        fill="url(#pb-spark)"
        opacity={0.9}
      />
      <defs>
        <linearGradient id="pb-spark" x1="4" y1="2" x2="16" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffbeb" />
          <stop offset="1" stopColor="#fcd34d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Promo strip — subscribe with email to reveal 100OFF (code not shown in-bar).
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
      <div className="sticky top-0 z-[60] bg-[#f8f7f3] px-2 py-2 sm:px-3">
        <button
          type="button"
          onClick={() => setShowCouponModal(true)}
          className="relative mx-auto box-border flex min-h-[58px] w-full max-w-[1260px] items-center justify-between gap-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white px-3 py-2 shadow-[0_1px_0_rgba(0,0,0,.03)] transition hover:border-[#fa4a23]/40 hover:shadow-[0_2px_8px_rgba(250,74,35,.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fa4a23] focus-visible:ring-offset-2 sm:gap-4 sm:px-6"
          aria-label="Subscribe for $100 off — enter your email to unlock your promo code"
        >
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <ConfettiLeft className="hidden h-7 w-8 shrink-0 opacity-75 sm:block" />
            <SparkStar className="h-4 w-4 shrink-0 text-[#fa4a23]" />
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-bold leading-tight text-neutral-900 sm:text-base">
                Build Skills. Build Your Future.
              </p>
              <p className="truncate text-xs font-medium text-neutral-600 sm:text-sm">
                Ends soon • Save <span className="font-bold text-[#fa4a23]">$100 off</span> — subscribe to unlock
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden text-sm font-semibold text-neutral-700 sm:block">
              Ends <time dateTime={PROMO_EXPIRES_ISO}>{PROMO_ENDS_SHORT}</time>
            </div>
            <div className="h-7 w-px bg-neutral-200" aria-hidden />
            <div className="text-right">
              <span className="inline-flex cursor-pointer items-center rounded-full border border-[#fa4a23]/70 bg-[#fa4a23] px-3 py-1.5 text-xs font-extrabold tracking-wide text-white transition group-hover:bg-[#e8431f] sm:px-4 sm:text-sm">
                Subscribe for $100 off →
              </span>
              <p className="mt-0.5 text-[11px] font-medium text-neutral-500">email to unlock code</p>
            </div>
          </div>
        </button>
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
