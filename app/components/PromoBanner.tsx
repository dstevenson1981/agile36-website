"use client";

import { useState } from "react";
import CouponModal from "@/app/components/CouponModal";
import CouponDisplayModal from "@/app/components/CouponDisplayModal";

const BANNER_COUPON_CODE = "100OFF";

/** Hide after end of May 18, 2026 UTC (same instant on server and client). */
const PROMO_BANNER_EXPIRED = () => Date.now() > Date.UTC(2026, 4, 18, 23, 59, 59, 999);

function BooksDiplomaIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="8" y="18" width="44" height="8" rx="1.5" fill="#4f8ff7" />
      <rect x="10" y="26" width="44" height="8" rx="1.5" fill="#f5c542" />
      <rect x="12" y="34" width="44" height="8" rx="1.5" fill="#3db8e8" />
      <rect x="14" y="42" width="44" height="8" rx="1.5" fill="#ec6aa0" />
      <path
        d="M44 10 L58 8 L58 22 L44 20 Z"
        fill="#fffbeb"
        stroke="#dc2626"
        strokeWidth="1.2"
      />
      <path d="M50 9 Q54 12 50 15" stroke="#dc2626" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function RocketIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M22 4 L32 18 L24 20 L18 8 Z" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1" />
      <path d="M18 8 L12 22 L20 24 L24 20 Z" fill="#f8fafc" stroke="#0369a1" strokeWidth="1" />
      <ellipse cx="20" cy="26" rx="4" ry="7" fill="#fb923c" stroke="#c2410c" strokeWidth="0.8" />
      <path d="M20 33 L18 38 L22 38 Z" fill="#94a3b8" />
    </svg>
  );
}

function TicketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 14" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 2h16v10H2V2zm1.5 1.5v7h13v-7h-13zm2 0h1.5v7H5.5v-7zm4.5 0h1.5v7H10v-7zm4.5 0H16v7h-1.5v-7z"
      />
    </svg>
  );
}

function SaleCluster() {
  return (
    <div className="relative flex shrink-0 items-end gap-2.5">
      <div className="relative pb-1">
        <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-950 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white shadow sm:text-[9px]">
          Limited time
        </div>
        <div
          className="relative rounded-md bg-[#dc2626] px-3.5 py-1.5 shadow-lg shadow-red-900/25 sm:px-4 sm:py-2"
          style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0% 100%)" }}
        >
          <span className="block text-center text-sm font-black uppercase tracking-wide text-white drop-shadow-sm sm:text-base">
            Sale
          </span>
        </div>
      </div>
      <BooksDiplomaIllustration className="h-11 w-14 shrink-0 drop-shadow sm:h-[3.25rem] sm:w-[4.25rem]" />
    </div>
  );
}

function DiscountSeal() {
  return (
    <div className="flex shrink-0 flex-col items-center">
      <div
        className="relative flex h-[3.35rem] w-[3.35rem] items-center justify-center rounded-full bg-gradient-to-b from-[#ef4444] to-[#dc2626] text-center shadow-lg shadow-red-900/30 ring-2 ring-white/90 sm:h-[3.65rem] sm:w-[3.65rem]"
        style={{
          boxShadow:
            "0 3px 10px rgba(185,28,28,.35), inset 0 1px 0 rgba(255,255,255,.25), 0 0 0 1px rgba(0,0,0,.06)",
        }}
      >
        <div className="leading-none">
          <div className="text-[11px] font-black uppercase leading-tight text-white sm:text-xs">$100</div>
          <div className="text-[10px] font-bold uppercase leading-tight text-white/95 sm:text-[11px]">off</div>
        </div>
      </div>
      <div className="-mt-1 flex justify-center">
        <div className="rounded-b-md bg-white px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wide text-neutral-900 shadow-md sm:text-[9px]">
          Discount
        </div>
      </div>
    </div>
  );
}

function ExpiryLine({ className }: { className?: string }) {
  return (
    <p
      className={`text-center font-semibold leading-snug text-neutral-900 ${className ?? ""}`}
    >
      <span className="text-neutral-800">Discount code </span>
      <span className="rounded-md bg-white/85 px-1.5 py-0.5 font-mono text-[0.8125rem] font-bold tracking-wide text-neutral-950 shadow-sm ring-1 ring-black/8 sm:text-sm">
        {BANNER_COUPON_CODE}
      </span>
      <span className="text-neutral-800"> expires </span>
      <time className="font-bold text-neutral-950" dateTime="2026-05-18">
        May 18th, 2026
      </time>
      <span className="text-neutral-700">.</span>
    </p>
  );
}

/**
 * Promo banner — orange campaign strip; opens email + course form; reveals code after submit.
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
      <div
        className="relative w-full max-w-[100vw] box-border overflow-x-hidden overflow-y-visible border-b border-orange-500/20
        bg-gradient-to-r from-[#ff7a2e] via-[#ff9a45] to-[#ffc06a] py-3 sm:py-4"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_120%_at_50%_-30%,rgba(255,255,255,.28),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-90"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))] sm:px-[max(1rem,env(safe-area-inset-left,0px))] sm:pr-[max(1rem,env(safe-area-inset-right,0px))]">
          {/* Main row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:gap-10">
            <div className="flex items-end justify-between gap-3 sm:justify-start sm:gap-4">
              <SaleCluster />
              <div className="shrink-0 sm:hidden">
                <DiscountSeal />
              </div>
            </div>

            <div className="min-w-0 flex-1 text-center sm:px-2">
              <p className="text-balance text-[0.9375rem] font-semibold leading-snug tracking-tight text-neutral-900 sm:text-base md:text-lg">
                <span className="border-b-[2.5px] border-neutral-900/90 pb-0.5 font-extrabold">
                  Get $100 savings on course fee
                </span>
                <span className="mt-1.5 block text-[13px] font-medium leading-relaxed text-neutral-800 sm:text-sm md:text-[0.9375rem]">
                  Unlock premium knowledge. Build skills that pay.
                </span>
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 sm:shrink-0 sm:justify-end md:gap-4">
              <RocketIllustration className="h-9 w-9 shrink-0 opacity-95 sm:h-10 sm:w-10" />
              <div className="hidden sm:block">
                <DiscountSeal />
              </div>
              <button
                type="button"
                onClick={() => setShowCouponModal(true)}
                className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-neutral-900 shadow-lg shadow-orange-950/10 ring-1 ring-black/[0.06] transition hover:bg-orange-50/90 hover:shadow-md active:scale-[0.99] sm:min-h-0 sm:px-5 sm:py-3 sm:text-base"
              >
                Claim coupon
                <TicketIcon className="h-3.5 w-3.5 opacity-75 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>

          {/* Expiry — always visible; code + date are explicit */}
          <div className="mt-2.5 flex justify-center border-t border-neutral-950/10 pt-2.5 sm:mt-3 sm:pt-3">
            <div className="max-w-xl sm:max-w-2xl">
              <ExpiryLine className="text-xs sm:text-sm" />
            </div>
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
