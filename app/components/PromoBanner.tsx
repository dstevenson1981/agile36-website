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
      <rect x="8" y="18" width="44" height="8" rx="1" fill="#60a5fa" />
      <rect x="10" y="26" width="44" height="8" rx="1" fill="#fbbf24" />
      <rect x="12" y="34" width="44" height="8" rx="1" fill="#38bdf8" />
      <rect x="14" y="42" width="44" height="8" rx="1" fill="#f472b6" />
      <path
        d="M44 10 L58 8 L58 22 L44 20 Z"
        fill="#fefce8"
        stroke="#e11d48"
        strokeWidth="1.2"
      />
      <path d="M50 9 Q54 12 50 15" stroke="#e11d48" strokeWidth="1.5" fill="none" />
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
      <ellipse cx="20" cy="26" rx="4" ry="7" fill="#f97316" stroke="#c2410c" strokeWidth="0.8" />
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
    <div className="relative flex shrink-0 items-end gap-2">
      <div className="relative pb-1">
        <div
          className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-sm bg-neutral-900 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm sm:text-[9px]"
        >
          Limited time
        </div>
        <div
          className="relative skew-x-[-6deg] rounded-sm bg-[#e11d48] px-3 py-1.5 shadow-md sm:px-4 sm:py-2"
          style={{ clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)" }}
        >
          <span className="block skew-x-[6deg] text-center text-sm font-black uppercase tracking-wide text-white sm:text-base">
            Sale
          </span>
        </div>
      </div>
      <BooksDiplomaIllustration className="h-11 w-14 shrink-0 sm:h-12 sm:w-16" />
    </div>
  );
}

function DiscountSeal() {
  return (
    <div className="flex flex-col items-center shrink-0">
      <div
        className="relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-[#e11d48] text-center shadow-md ring-2 ring-white/70 ring-offset-1 ring-offset-transparent sm:h-14 sm:w-14"
        style={{
          boxShadow: "0 2px 0 rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.2)",
        }}
      >
        <div className="skew-x-[-2deg] leading-none">
          <div className="text-[10px] font-black uppercase leading-tight text-white sm:text-xs">$100</div>
          <div className="text-[9px] font-bold uppercase leading-tight text-white/95 sm:text-[10px]">off</div>
        </div>
      </div>
      <div className="-mt-1 flex justify-center">
        <div className="rounded-b-sm bg-white px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wide text-neutral-900 shadow sm:text-[9px]">
          Discount
        </div>
      </div>
    </div>
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
        className="w-full max-w-[100vw] box-border overflow-x-hidden overflow-y-visible border-b border-orange-400/30
        bg-gradient-to-r from-[#ff8a3d] via-[#ff9f4a] to-[#ffb85c] py-3 sm:py-3.5"
      >
        {/* Mobile */}
        <div
          className="mx-auto flex w-full min-w-0 max-w-7xl flex-col gap-3 px-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))] sm:hidden"
        >
          <div className="flex items-end justify-between gap-2">
            <SaleCluster />
            <DiscountSeal />
          </div>
          <p className="text-center text-balance text-sm font-semibold leading-snug text-neutral-900 sm:text-base">
            <span className="border-b-2 border-neutral-900/80 pb-0.5 font-extrabold">
              Get $100 savings on course fee
            </span>
            <span className="mt-1 block text-[13px] font-medium text-neutral-800">
              Unlock premium knowledge. Build skills that pay.
            </span>
          </p>
          <div className="flex items-center justify-center gap-3">
            <RocketIllustration className="h-9 w-9 shrink-0" />
            <button
              type="button"
              onClick={() => setShowCouponModal(true)}
              className="inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-neutral-900 shadow-md ring-1 ring-black/5 transition hover:bg-orange-50 active:bg-orange-100"
            >
              Claim coupon
              <TicketIcon className="h-3.5 w-3.5 opacity-80" />
            </button>
          </div>
          <p className="text-center text-[11px] font-semibold text-neutral-900/80">
            Discount code expires on May 18th
          </p>
        </div>

        {/* sm+ */}
        <div
          className="mx-auto hidden min-w-0 max-w-7xl items-center gap-3 px-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:flex sm:gap-5 lg:gap-8"
        >
          <SaleCluster />

          <div className="min-w-0 flex-1 text-center">
            <p className="text-balance text-sm font-semibold text-neutral-900 md:text-base lg:text-lg">
              <span className="border-b-2 border-neutral-900/85 pb-0.5 font-extrabold decoration-neutral-900">
                Get $100 savings on course fee
              </span>
              <span className="mt-1 block text-xs font-medium text-neutral-800 md:text-sm">
                Unlock premium knowledge. Build skills that pay.
              </span>
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <RocketIllustration className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
            <DiscountSeal />
            <button
              type="button"
              onClick={() => setShowCouponModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-neutral-900 shadow-md ring-1 ring-black/5 transition hover:bg-orange-50 md:px-5 md:py-3 md:text-base"
            >
              Claim coupon
              <TicketIcon className="h-4 w-4 opacity-80" />
            </button>
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
