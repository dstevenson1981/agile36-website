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
 * Competitor-style white promo strip with tap-to-copy 100OFF badge.
 */
export default function PromoBanner() {
  const [copied, setCopied] = useState(false);

  if (!isPromoBannerVisible()) {
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

  const handleClipCode = async (event: React.MouseEvent | React.PointerEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const ok = await copyToClipboard(BANNER_COUPON_CODE);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="sticky top-0 z-[60] bg-[#f8f7f3] px-2 py-2 sm:px-3">
      <div
        className="relative mx-auto box-border flex min-h-[58px] w-full max-w-[1260px] items-center justify-between gap-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white px-3 py-2 shadow-[0_1px_0_rgba(0,0,0,.03)] sm:gap-4 sm:px-6"
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <ConfettiLeft className="hidden h-7 w-8 shrink-0 opacity-75 sm:block" />
          <SparkStar className="h-4 w-4 shrink-0 text-[#fa4a23]" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight text-neutral-900 sm:text-base">
              Build Skills. Build Your Future.
            </p>
            <p className="truncate text-xs font-medium text-neutral-600 sm:text-sm">
              Ends soon • Save <span className="font-bold text-[#fa4a23]">$100 off</span> with code
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden text-sm font-semibold text-neutral-700 sm:block">
            Ends <time dateTime={PROMO_EXPIRES_ISO}>{PROMO_ENDS_SHORT}</time>
          </div>
          <div className="h-7 w-px bg-neutral-200" aria-hidden />
          <div className="text-right">
            <button
              type="button"
              onClick={handleClipCode}
              onPointerDown={(event) => event.stopPropagation()}
              className="inline-flex cursor-pointer items-center rounded-full border border-[#fa4a23]/70 bg-white px-3 py-1.5 font-mono text-xs font-extrabold tracking-wide text-[#e8431f] transition hover:bg-[#fff7f4] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fa4a23] focus-visible:ring-offset-1 sm:px-4 sm:text-sm"
              aria-label={copied ? "Promo code copied" : `Copy promo code ${BANNER_COUPON_CODE}`}
              translate="no"
            >
              {copied ? "Copied!" : `${BANNER_COUPON_CODE} · $100 off`}
            </button>
            <p className="mt-0.5 text-[11px] font-medium text-neutral-500">tap to copy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
