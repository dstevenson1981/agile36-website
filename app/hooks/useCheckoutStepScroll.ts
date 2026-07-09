"use client";

import { useEffect } from "react";

/** Keep checkout at the top when steps change so payment fields stay in view. */
export function scrollCheckoutToTop() {
  if (typeof window === "undefined") return;

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function useCheckoutStepScroll(step: number, paymentReadyKey?: string | null) {
  useEffect(() => {
    scrollCheckoutToTop();

    if (step === 3 && paymentReadyKey) {
      const t1 = window.setTimeout(scrollCheckoutToTop, 100);
      const t2 = window.setTimeout(scrollCheckoutToTop, 400);
      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }
  }, [step, paymentReadyKey]);
}
