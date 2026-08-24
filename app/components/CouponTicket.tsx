"use client";

import { useState } from "react";
import { BANNER_COUPON_CODE, BANNER_DISCOUNT_AMOUNT } from "@/app/lib/site-promo";

/**
 * Ticket-style coupon card with site banner discount and copy button (not shown site-wide).
 * Uses Agile36 brand colors (#fa4a23, #01203d).
 * Semi-circular notches on left/right for ticket aesthetic.
 */
export default function CouponTicket() {
  const [copied, setCopied] = useState(false);
  const code = BANNER_COUPON_CODE;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {/* Ticket notches - circles that "cut out" the sides (match common page bg) */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-50 -translate-x-1/2 z-10 border-r border-[#01203d]/10"
        aria-hidden
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-50 translate-x-1/2 z-10 border-l border-[#01203d]/10"
        aria-hidden
      />
      <div className="relative flex items-center justify-between gap-4 rounded-xl border-2 border-[#01203d]/20 bg-[#fef7f5] px-5 py-4">
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <span className="text-[#01203d] font-bold text-lg">${BANNER_DISCOUNT_AMOUNT} OFF</span>
          <span className="text-[#01203d] text-sm">Coupon Code &quot;{code}&quot;</span>
          <span className="text-[#01203d]/80 text-xs">Limited time · Ends soon</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 flex items-center gap-2 bg-[#fa4a23] text-white px-4 py-2.5 rounded-full font-semibold text-sm hover:bg-[#e03d1a] transition-colors shadow-sm"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
