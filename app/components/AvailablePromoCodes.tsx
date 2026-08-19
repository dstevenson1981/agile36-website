"use client";

import React, { useEffect, useState } from "react";
import {
  isSitePromoActive,
  PROMO_ENDS_SHORT,
  BANNER_COUPON_CODE,
  BANNER_DISCOUNT_AMOUNT,
} from "@/app/lib/site-promo";

export type AvailablePromo = {
  code: string;
  label: string;
};

/** Clip coupons at checkout — $50 off while the site flash sale is active. */
const DEFAULT_PROMOS: AvailablePromo[] = [
  { code: BANNER_COUPON_CODE, label: `$${BANNER_DISCOUNT_AMOUNT} Off` },
];

type Props = {
  availablePromos?: AvailablePromo[];
  appliedPromoCode: string | null;
  onSelectCode: (code: string) => void;
  isValidatingPromo: boolean;
};

export default function AvailablePromoCodes({
  availablePromos,
  appliedPromoCode,
  onSelectCode,
  isValidatingPromo,
}: Props) {
  const [promoLive, setPromoLive] = useState(() => isSitePromoActive());

  useEffect(() => {
    const tick = () => setPromoLive(isSitePromoActive());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const promos =
    availablePromos ??
    (promoLive ? DEFAULT_PROMOS : []);

  if (promos.length === 0) {
    return null;
  }

  const showingDefaultFlashSale =
    availablePromos == null && promoLive && promos.some((p) => p.code === BANNER_COUPON_CODE);

  return (
    <div className="mb-3">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-sm font-medium text-gray-900">Clip Coupon Code</p>
        {showingDefaultFlashSale && (
          <p className="text-xs font-semibold text-[#fa4a23]">
            Limited time · ends {PROMO_ENDS_SHORT}
          </p>
        )}
      </div>
      <div className="space-y-2">
        {promos.map((promo) => {
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
