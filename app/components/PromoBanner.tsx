"use client";

import { useEffect, useState } from "react";
import CouponModal from "./CouponModal";
import CouponDisplayModal from "./CouponDisplayModal";
import {
  isSitePromoActive,
  getPromoCountdown,
  BANNER_COUPON_CODE,
  BANNER_DISCOUNT_AMOUNT,
  PROMO_UNLOCK_EVENT,
  PROMO_UNLOCK_KEY,
  PROMO_BANNER_TITLE,
  PROMO_BANNER_CTA,
  PROMO_CODE_EXPIRES_IN,
  type PromoCountdown,
} from "@/app/lib/site-promo";

export { BANNER_COUPON_CODE };

/** Bar height + padding under the strip (used to offset sticky nav). */
export const PROMO_BANNER_STICKY_OFFSET_PX = 72;

export function isPromoBannerVisible(): boolean {
  return isSitePromoActive();
}

/** Live promo visibility — used to offset sticky nav while the banner is showing. */
export function usePromoBannerActive(): boolean {
  const [active, setActive] = useState(isSitePromoActive);

  useEffect(() => {
    const tick = () => setActive(isSitePromoActive());
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return active;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function ClockOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 8.25V12l2.75 1.65"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatHms(countdown: PromoCountdown): string {
  const clock = `${pad2(countdown.hours)}:${pad2(countdown.minutes)}:${pad2(countdown.seconds)}`;
  if (countdown.days > 0) {
    return `${countdown.days}d ${clock}`;
  }
  return clock;
}

function PromoCountdownDisplay({ countdown }: { countdown: PromoCountdown }) {
  const clock = formatHms(countdown);
  return (
    <div
      className="flex shrink-0 items-center gap-1.5 sm:gap-2"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Sale ends in ${clock}`}
    >
      <ClockOutlineIcon className="h-4 w-4 shrink-0 text-[#F5B942] sm:h-[18px] sm:w-[18px]" />
      <span className="text-xs font-normal text-white sm:text-sm">Sale Ends In:</span>
      <span className="text-base font-extrabold tabular-nums tracking-tight text-[#F5B942] sm:text-xl">
        {clock}
      </span>
    </div>
  );
}

/**
 * Black Friday strip — subscribe with email to reveal 150OFF. Hidden after 4:00 PM EST.
 */
export default function PromoBanner() {
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCouponDisplay, setShowCouponDisplay] = useState(false);
  const [countdown, setCountdown] = useState<PromoCountdown | null>(null);

  useEffect(() => {
    const tick = () => setCountdown(getPromoCountdown());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!isSitePromoActive()) {
    return null;
  }

  const handleClaimCoupon = () => {
    setShowCouponModal(false);
    setShowCouponDisplay(true);
    try {
      sessionStorage.setItem(PROMO_UNLOCK_KEY, "1");
    } catch {
      /* private mode */
    }
    window.dispatchEvent(new Event(PROMO_UNLOCK_EVENT));
  };

  return (
    <>
      <div className="sticky top-0 z-[80] bg-[#111111] px-3 py-2 sm:px-6">
        <button
          type="button"
          onClick={() => setShowCouponModal(true)}
          className="relative mx-auto box-border flex min-h-[64px] w-full max-w-[1260px] items-center justify-between gap-2 bg-[#111111] px-1 py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] sm:gap-4"
          aria-label={`${PROMO_BANNER_TITLE}, $${BANNER_DISCOUNT_AMOUNT} off. ${PROMO_BANNER_CTA}. Code expires ${PROMO_CODE_EXPIRES_IN}.`}
        >
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-md bg-[#E10600] text-[9px] font-extrabold leading-none tracking-wide text-white">
              <span>BLACK</span>
              <span>FRIDAY</span>
            </span>
            <p className="min-w-0 truncate text-sm font-extrabold leading-tight text-white sm:text-base">
              <span className="text-[#F5B942]">{PROMO_BANNER_TITLE.toUpperCase()}</span>
              <span className="font-medium text-white/80"> | </span>
              <span>${BANNER_DISCOUNT_AMOUNT} OFF</span>
            </p>
          </div>

          <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">
            {countdown ? (
              <PromoCountdownDisplay countdown={countdown} />
            ) : (
              <div className="h-6 w-[9.5rem] shrink-0 sm:h-7 sm:w-[11.5rem]" aria-hidden />
            )}
            <span className="inline-flex items-center gap-1 rounded-md bg-[#E10600] px-3 py-2 text-xs font-extrabold tracking-wide text-white sm:px-4 sm:text-sm">
              {PROMO_BANNER_CTA}
              <span aria-hidden>↗</span>
            </span>
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
