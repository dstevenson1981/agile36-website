"use client";

import { useState } from "react";
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

function GiftRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="6" y="14" width="24" height="18" rx="2" fill="url(#pb-gift-box)" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
      <path d="M18 14V32M6 20h24" stroke="rgba(255,255,255,.25)" strokeWidth="1" />
      <path d="M12 14c0-4 3.5-7 6-7s6 3 6 7H12z" fill="url(#pb-gift-ribbon)" />
      <ellipse cx="18" cy="14" rx="10" ry="3.5" fill="url(#pb-gift-ribbon)" opacity={0.95} />
      <defs>
        <linearGradient id="pb-gift-box" x1="8" y1="14" x2="30" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="pb-gift-ribbon" x1="10" y1="7" x2="26" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde68a" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Orange promo strip — Agile36 style with tap-to-copy 100OFF badge.
 */
export default function PromoBanner() {
  const [copied, setCopied] = useState(false);

  if (!isPromoBannerVisible()) {
    return null;
  }

  const handleClipCode = async () => {
    try {
      await navigator.clipboard.writeText(BANNER_COUPON_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* ignore — badge still shows the code */
    }
  };

  return (
    <div className="sticky top-0 z-[60] shadow-[0_2px_12px_rgba(185,60,0,.28)]">
      <div
        className="relative box-border flex h-[50px] min-h-[50px] max-h-[50px] w-full max-w-[100vw] items-center justify-center gap-2 overflow-x-auto overflow-y-hidden border-b border-white/15 px-2 sm:gap-3 sm:px-5"
        style={{
          background: "linear-gradient(105deg, #ff9f5c 0%, #ff7a2e 38%, #fa5a1e 72%, #ea3d12 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_160%_at_12%_0%,rgba(255,255,255,.38),transparent_45%),radial-gradient(80%_100%_at_90%_100%,rgba(0,0,0,.12),transparent_40%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/25" aria-hidden />

        <ConfettiLeft className="relative hidden h-8 w-10 shrink-0 opacity-[0.92] sm:block" />
        <SparkStar className="relative h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />

        <p className="relative max-w-[min(100%,52rem)] text-center text-sm font-semibold leading-snug tracking-tight text-neutral-950 sm:text-base sm:leading-tight md:text-[1.0625rem]">
          <span className="inline sm:whitespace-nowrap">
            <span aria-hidden className="mr-0.5 sm:mr-1">
              🎉
            </span>
            <span className="font-semibold text-neutral-950">Save</span>{" "}
            <strong className="font-extrabold text-neutral-950 underline decoration-neutral-950 decoration-2 underline-offset-[3px]">
              $100
            </strong>{" "}
            <span className="hidden sm:inline font-semibold text-neutral-950">on any course —</span>
            <span className="font-semibold text-neutral-950"> code</span>{" "}
            <button
              type="button"
              onClick={handleClipCode}
              className="inline-block cursor-pointer rounded-md border-2 border-dashed border-neutral-900/35 bg-white px-2 py-0.5 align-middle font-mono text-[11px] font-extrabold tracking-wide text-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,.15)] transition hover:bg-neutral-50 hover:shadow-[0_2px_6px_rgba(0,0,0,.18)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-1 sm:text-xs"
              aria-label={copied ? "Promo code copied" : `Copy promo code ${BANNER_COUPON_CODE}`}
              translate="no"
            >
              {copied ? "Copied!" : BANNER_COUPON_CODE}
            </button>{" "}
            <span className="text-neutral-900/80">·</span>{" "}
            <span className="font-semibold text-neutral-950">ends</span>{" "}
            <time className="font-bold text-neutral-950" dateTime={PROMO_EXPIRES_ISO}>
              {PROMO_ENDS_SHORT}
            </time>
          </span>
        </p>

        <GiftRight className="relative hidden h-8 w-8 shrink-0 opacity-95 sm:block" />
      </div>
      <div className="h-1 w-full shrink-0 bg-[#fa4a23]" aria-hidden />
    </div>
  );
}
