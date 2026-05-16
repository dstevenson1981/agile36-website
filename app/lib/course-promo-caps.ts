/** Per-course checkout caps enforced in validate-promo-code + create-payment-intent (not promo_codes table). */

export type CoursePromoCap = {
  code: string;
  courseSlug: string;
  pricePerSeat: number;
  description: string;
};

export const POPM_PROMO_CAP: CoursePromoCap = {
  code: "POPM",
  courseSlug: "product-owner-manager",
  pricePerSeat: 399,
  description: "POPM — $399 per seat",
};

export const SASM465_PROMO_CAP: CoursePromoCap = {
  code: "SASM465",
  courseSlug: "advanced-scrum-master",
  pricePerSeat: 465,
  description: "SASM — $465 per seat",
};

const CAP_BY_CODE = new Map<string, CoursePromoCap>([
  [POPM_PROMO_CAP.code, POPM_PROMO_CAP],
  [SASM465_PROMO_CAP.code, SASM465_PROMO_CAP],
]);

export function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

export function getCoursePromoCapByCode(code: string): CoursePromoCap | null {
  return CAP_BY_CODE.get(code.trim().toUpperCase()) ?? null;
}

export function linePricePerSeat(basic: number, selectedPlan: unknown): number {
  const plan = selectedPlan === "pro" ? "pro" : "basic";
  return plan === "pro" ? roundMoney(basic * 1.15) : roundMoney(basic);
}

export function discountPerSeatForCap(
  linePerSeat: number,
  cap: CoursePromoCap,
): { ok: true; discountPerSeat: number } | { ok: false } {
  if (linePerSeat <= cap.pricePerSeat) return { ok: false };
  return { ok: true, discountPerSeat: roundMoney(linePerSeat - cap.pricePerSeat) };
}
