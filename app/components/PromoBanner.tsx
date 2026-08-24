"use client";

import { useEffect, useState } from "react";
import {
  isSitePromoActive,
  getPromoCountdown,
  BANNER_COUPON_CODE,
  BANNER_DISCOUNT_AMOUNT,
  PROMO_BANNER_TITLE,
  PROMO_ENDS_SHORT,
  PROMO_EXPIRES_ISO,
  type PromoCountdown,
} from "@/app/lib/site-promo";

export { BANNER_COUPON_CODE };

/** Bar height + padding under the strip (used to offset sticky nav). */
export const PROMO_BANNER_STICKY_OFFSET_PX = 72;

export function isPromoBannerVisible(): boolean {
  return isSitePromoActive();
}

/** Live promo visibility — rechecks every second so sticky nav offset clears when the countdown ends. */
export function usePromoBannerActive(): boolean {
  // Start false so SSR + first client paint match (avoid hydration mismatch).
  const [active, setActive] = useState(false);

  useEffect(() => {
    const tick = () => setActive(isSitePromoActive());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
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

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-[1.75rem] flex-col items-center leading-none sm:min-w-[2rem]">
      <span className="font-mono text-[11px] font-extrabold tabular-nums text-[#01203d] sm:text-sm">
        {value}
      </span>
      <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wide text-neutral-500 sm:text-[9px]">
        {label}
      </span>
    </div>
  );
}

function PromoCountdownDisplay({ countdown }: { countdown: PromoCountdown }) {
  return (
    <div
      className="flex shrink-0 items-center gap-0.5 rounded-xl border border-[#fa4a23]/25 bg-white/80 px-1.5 py-1 shadow-[0_1px_0_rgba(250,74,35,.08)] sm:gap-1 sm:px-2.5"
      aria-live="polite"
      aria-atomic="true"
    >
      <CountdownUnit value={pad2(countdown.days)} label="days" />
      <span className="pb-2.5 text-[10px] font-bold text-[#fa4a23]/70" aria-hidden>
        :
      </span>
      <CountdownUnit value={pad2(countdown.hours)} label="hrs" />
      <span className="pb-2.5 text-[10px] font-bold text-[#fa4a23]/70" aria-hidden>
        :
      </span>
      <CountdownUnit value={pad2(countdown.minutes)} label="min" />
      <span className="pb-2.5 text-[10px] font-bold text-[#fa4a23]/70" aria-hidden>
        :
      </span>
      <CountdownUnit value={pad2(countdown.seconds)} label="sec" />
    </div>
  );
}

/**
 * Promo strip — tap to copy 100OFF (no email gate), with countdown + motion.
 */
export default function PromoBanner() {
  const [copied, setCopied] = useState(false);
  // Defer live countdown until after mount so SSR HTML matches the first client paint.
  const [countdown, setCountdown] = useState<PromoCountdown | null>(null);
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const nextActive = isSitePromoActive();
      setActive(nextActive);
      setCountdown(nextActive ? getPromoCountdown() : null);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!mounted || !active || !countdown) {
    return null;
  }

  const copyToClipboard = async (text: string): Promise<boolean> => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        /* fall through to legacy copy */
      }
    }

    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  };

  const handleClipCode = async () => {
    const ok = await copyToClipboard(BANNER_COUPON_CODE);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="sticky top-0 z-[60] bg-[#f8f7f3] px-2 py-2 sm:px-3">
      <div
        className="animate-promo-banner-gradient relative mx-auto box-border flex min-h-[64px] w-full max-w-[1260px] items-center justify-between gap-2 overflow-hidden rounded-2xl border border-[#fa4a23]/25 px-3 py-2 shadow-[0_2px_12px_rgba(250,74,35,.12)] sm:gap-4 sm:px-6"
        style={{
          backgroundImage:
            "linear-gradient(105deg, #fff7f4 0%, #ffffff 28%, #fff1eb 55%, #ffe8df 78%, #fff7f4 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_140%_at_8%_0%,rgba(250,74,35,.10),transparent_42%),radial-gradient(70%_100%_at_92%_100%,rgba(250,74,35,.08),transparent_45%)]"
          aria-hidden
        />

        <div className="relative flex min-w-0 items-center gap-2 sm:gap-3">
          <ConfettiLeft className="animate-promo-confetti hidden h-7 w-8 shrink-0 opacity-90 sm:block" />
          <SparkStar className="animate-promo-spark h-4 w-4 shrink-0 text-[#fa4a23]" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight text-neutral-900 sm:text-base">
              {PROMO_BANNER_TITLE}
            </p>
            <p className="truncate text-xs font-medium text-neutral-600 sm:text-sm">
              Ends{" "}
              <time dateTime={PROMO_EXPIRES_ISO} className="font-semibold text-[#fa4a23]">
                {PROMO_ENDS_SHORT}
              </time>{" "}
              • Save{" "}
              <span className="font-bold text-[#fa4a23]">${BANNER_DISCOUNT_AMOUNT} off</span> with
              code
            </p>
          </div>
        </div>

        <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">
          <PromoCountdownDisplay countdown={countdown} />
          <div className="hidden h-8 w-px bg-[#fa4a23]/20 sm:block" aria-hidden />
          <div className="text-right">
            <button
              type="button"
              onClick={handleClipCode}
              className="animate-promo-cta inline-flex cursor-pointer items-center rounded-full border border-[#fa4a23]/70 px-3 py-1.5 font-mono text-xs font-extrabold tracking-wide text-[#e8431f] transition hover:border-[#fa4a23] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fa4a23] focus-visible:ring-offset-1 sm:px-4 sm:text-sm"
              aria-label={copied ? "Promo code copied" : `Copy promo code ${BANNER_COUPON_CODE}`}
              translate="no"
            >
              {copied ? "Copied!" : `${BANNER_COUPON_CODE} · $${BANNER_DISCOUNT_AMOUNT} off`}
            </button>
            <p className="mt-0.5 text-[11px] font-medium text-neutral-500">tap to copy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
