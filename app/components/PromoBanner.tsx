"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

/** Fallback bar height when the measured strip is not ready yet. Live height is --promo-banner-height. */
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
      className="flex min-w-0 items-center gap-1.5"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Sale ends in ${clock}`}
    >
      <ClockOutlineIcon className="h-4 w-4 shrink-0 text-[#F5B942]" />
      <span className="text-xs font-normal text-white sm:text-sm">Sale ends in</span>
      <span className="text-sm font-extrabold tabular-nums tracking-tight text-[#F5B942] sm:text-xl">
        {clock}
      </span>
    </div>
  );
}

/**
 * Black Friday strip — subscribe with email to reveal 150OFF. Hidden after 4:00 PM EST.
 */
export default function PromoBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCouponDisplay, setShowCouponDisplay] = useState(false);
  const [countdown, setCountdown] = useState<PromoCountdown | null>(null);
  const active = isSitePromoActive();

  useLayoutEffect(() => {
    const el = bannerRef.current;
    if (!active || !el) {
      document.documentElement.style.removeProperty("--promo-banner-height");
      return;
    }
    const apply = () => {
      document.documentElement.style.setProperty("--promo-banner-height", `${el.offsetHeight}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--promo-banner-height");
    };
  }, [active, countdown]);

  useEffect(() => {
    const tick = () => setCountdown(getPromoCountdown());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!active) {
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
      <div ref={bannerRef} className="sticky top-0 z-[80] bg-[#111111]">
        <button
          type="button"
          onClick={() => setShowCouponModal(true)}
          className="mx-auto flex w-full max-w-[1260px] flex-col gap-2.5 px-3 py-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] sm:min-h-[64px] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-2"
          aria-label={`${PROMO_BANNER_TITLE}, $${BANNER_DISCOUNT_AMOUNT} off. ${PROMO_BANNER_CTA}. Code expires ${PROMO_CODE_EXPIRES_IN}.`}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-md bg-[#E10600] text-[9px] font-extrabold leading-none tracking-wide text-white">
              <span>BLACK</span>
              <span>FRIDAY</span>
            </span>
            <p className="min-w-0 text-sm font-extrabold leading-tight text-white sm:truncate sm:text-base">
              <span className="text-[#F5B942]">{PROMO_BANNER_TITLE.toUpperCase()}</span>
              <span className="font-medium text-white/80"> | </span>
              <span className="whitespace-nowrap">${BANNER_DISCOUNT_AMOUNT} OFF</span>
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 sm:shrink-0 sm:justify-end">
            {countdown ? (
              <PromoCountdownDisplay countdown={countdown} />
            ) : (
              <div className="h-6 w-28 shrink-0 sm:h-7 sm:w-[11.5rem]" aria-hidden />
            )}
            <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md bg-[#E10600] px-3 py-2 text-xs font-extrabold tracking-wide text-white sm:px-4 sm:text-sm">
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
