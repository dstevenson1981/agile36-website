"use client";

import { useEffect, useState } from "react";
import CouponModal from "./CouponModal";
import CouponDisplayModal from "./CouponDisplayModal";
import {
  isSitePromoActive,
  getPromoCountdown,
  BANNER_COUPON_CODE,
  BANNER_DISCOUNT_AMOUNT,
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
  // Start false so SSR + first client paint match (avoid hydration mismatch).
  const [active, setActive] = useState(false);

  useEffect(() => {
    const tick = () => setActive(isSitePromoActive());
    const id = window.setInterval(tick, 1000);
    const raf = window.requestAnimationFrame(tick);
    return () => {
      window.clearInterval(id);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return active;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
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
      <circle cx="8" cy="26" r="2.5" fill="#fa4a23" opacity={0.45} />
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
      <ClockOutlineIcon className="h-4 w-4 shrink-0 text-[#64748b] sm:h-[18px] sm:w-[18px]" />
      <span className="text-xs font-normal text-[#475569] sm:text-sm">Sale Ends In:</span>
      <span className="text-base font-extrabold tabular-nums tracking-tight text-[#d97706] sm:text-xl">
        {clock}
      </span>
    </div>
  );
}

/**
 * Promo strip — subscribe with email to reveal 100OFF. Code is not shown in-bar.
 */
export default function PromoBanner() {
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showCouponDisplay, setShowCouponDisplay] = useState(false);
  // Defer live countdown until after mount so SSR HTML matches the first client paint.
  const [countdown, setCountdown] = useState<PromoCountdown | null>(null);
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const tick = () => {
      setMounted(true);
      const nextActive = isSitePromoActive();
      setActive(nextActive);
      setCountdown(nextActive ? getPromoCountdown() : null);
    };
    const id = window.setInterval(tick, 1000);
    const raf = window.requestAnimationFrame(tick);
    return () => {
      window.clearInterval(id);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  if (!mounted || !active || !countdown) {
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
          className="animate-promo-banner-gradient relative mx-auto box-border flex min-h-[64px] w-full max-w-[1260px] items-center justify-between gap-2 overflow-hidden rounded-2xl border border-[#fa4a23]/25 px-3 py-2 text-left shadow-[0_2px_12px_rgba(250,74,35,.12)] transition hover:border-[#fa4a23]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fa4a23] focus-visible:ring-offset-2 sm:gap-4 sm:px-6"
          style={{
            backgroundImage:
              "linear-gradient(105deg, #fff7f4 0%, #ffffff 28%, #fff1eb 55%, #ffe8df 78%, #fff7f4 100%)",
          }}
          aria-label={`${PROMO_BANNER_CTA}. Enter your email to unlock your promo code. Code expires ${PROMO_CODE_EXPIRES_IN}.`}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_140%_at_8%_0%,rgba(250,74,35,.10),transparent_42%),radial-gradient(70%_100%_at_92%_100%,rgba(250,74,35,.08),transparent_45%)]"
            aria-hidden
          />

          <div className="relative flex min-w-0 items-center gap-2 sm:gap-3">
            <ConfettiLeft className="animate-promo-confetti hidden h-7 w-8 shrink-0 opacity-90 sm:block" />
            <SparkStar className="animate-promo-spark h-4 w-4 shrink-0 text-[#fa4a23]" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold leading-tight text-[#1f2c4a] sm:text-base">
                {PROMO_BANNER_TITLE}
              </p>
              <p className="truncate text-xs font-medium text-[#475569] sm:text-sm">
                Save{" "}
                <span className="font-bold text-[#d97706]">${BANNER_DISCOUNT_AMOUNT} off</span>
                {" — "}
                code expires {PROMO_CODE_EXPIRES_IN}
              </p>
            </div>
          </div>

          <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">
            <PromoCountdownDisplay countdown={countdown} />
            <div className="hidden h-8 w-px bg-[#fa4a23]/20 sm:block" aria-hidden />
            <div className="text-right">
              <span className="animate-promo-cta inline-flex items-center rounded-full border border-[#fa4a23]/70 bg-[#fa4a23] px-3 py-1.5 text-xs font-extrabold tracking-wide text-white sm:px-4 sm:text-sm">
                {PROMO_BANNER_CTA}
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
