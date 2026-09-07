/** Admin and account — never replay these screens. */
export function isHiddenWatchPath(path: string | null | undefined): boolean {
  return /^\/(admin|account|api|popm-workshop)/.test(path || "");
}

/** Checkout / payment — show the page, mask card numbers. */
export function isCheckoutPath(path: string | null | undefined): boolean {
  return /checkout|confirm-payment|create-payment|payment-intent|payment_intent/i.test(path || "");
}

/** Completely private: hide from live watch. Checkout is not in this set. */
export function isPrivatePath(path: string | null | undefined): boolean {
  return isHiddenWatchPath(path);
}
