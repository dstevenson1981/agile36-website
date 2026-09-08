"use client";

import React from "react";
import { BANNER_DISCOUNT_AMOUNT, PROMO_CODE_EXPIRES_IN } from "@/app/lib/site-promo";

export type AvailablePromo = {
  code: string;
  label: string;
};

/** 100OFF is email-gated via the site banner subscribe flow — not clipped at checkout. */
const DEFAULT_PROMOS: AvailablePromo[] = [];

type Props = {
  availablePromos?: AvailablePromo[];
  appliedPromoCode: string | null;
  onSelectCode: (code: string) => void;
  isValidatingPromo: boolean;
};

export function SubscribePromoHint() {
  return (
    <p className="mb-3 rounded-lg border border-orange-100 bg-orange-50/80 px-3 py-2 text-xs text-gray-600">
      <span className="font-semibold text-[#e8431f]">${BANNER_DISCOUNT_AMOUNT} off:</span>{" "}
      Click the banner at the top of the site, subscribe with your email, and we&apos;ll reveal
      your promo code. It expires {PROMO_CODE_EXPIRES_IN}. Enter it below at checkout.
    </p>
  );
}

export default function AvailablePromoCodes({
  availablePromos = DEFAULT_PROMOS,
  appliedPromoCode,
  onSelectCode,
  isValidatingPromo,
}: Props) {
  if (availablePromos.length === 0) {
    return <SubscribePromoHint />;
  }

  return (
    <div className="mb-3">
      <p className="mb-2 text-sm font-medium text-gray-900">Clip Coupon Code</p>
      <div className="space-y-2">
        {availablePromos.map((promo) => {
          const isSelected = appliedPromoCode?.toUpperCase() === promo.code.toUpperCase();
          return (
            <button
              key={promo.code}
              type="button"
              onClick={() => onSelectCode(promo.code)}
              disabled={isValidatingPromo}
              className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 p-3 text-left transition-colors hover:border-gray-300 hover:bg-gray-50/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded border-2 border-dashed border-orange-400 bg-orange-50 px-2 py-0.5 text-sm font-bold text-orange-600">
                  {promo.code}
                </span>
                <span className="font-semibold text-gray-900">{promo.label}</span>
              </div>
              <div className="flex-shrink-0">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
