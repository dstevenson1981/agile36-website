"use client";

import React from "react";

export type AvailablePromo = {
  code: string;
  label: string;
};

/** Clip coupons at checkout — 100OFF is email-gated via Memorial Day banner only. */
const DEFAULT_PROMOS: AvailablePromo[] = [];

type Props = {
  availablePromos?: AvailablePromo[];
  appliedPromoCode: string | null;
  onSelectCode: (code: string) => void;
  isValidatingPromo: boolean;
};

export function MemorialDayPromoHint() {
  return (
    <p className="text-xs text-gray-600 mb-3 rounded-lg border border-blue-100 bg-blue-50/80 px-3 py-2">
      <span className="font-semibold text-[#1a237e]">Memorial Day Sale — $100 off:</span>{" "}
      Click the banner at the top of the site, subscribe with your email, and we&apos;ll reveal your promo code.
      Enter it below at checkout.
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
    return <MemorialDayPromoHint />;
  }

  return (
    <div className="mb-3">
      <p className="text-sm font-medium text-gray-900 mb-2">Clip Coupon Code</p>
      <div className="space-y-2">
        {availablePromos.map((promo) => {
          const isSelected = appliedPromoCode?.toUpperCase() === promo.code.toUpperCase();
          return (
            <button
              key={promo.code}
              type="button"
              onClick={() => onSelectCode(promo.code)}
              disabled={isValidatingPromo}
              className="w-full flex items-center justify-between gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50/50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent text-left"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded border-2 border-dashed border-orange-400 bg-orange-50 text-orange-600 font-bold text-sm">
                  {promo.code}
                </span>
                <span className="font-semibold text-gray-900">{promo.label}</span>
              </div>
              <div className="flex-shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
