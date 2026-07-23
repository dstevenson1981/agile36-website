/** Soft-private RTE enrollment — not linked from public course pages. */
export const RTE_PRIVATE_SCHEDULE_PATH = "/private/rte";
export const RTE_PRIVATE_CHECKOUT_PATH = "/private/rte/checkout";
export const RTE_PRIVATE_CHECKOUT_SUCCESS_PATH = "/private/rte/checkout/success";
export const RTE_COURSE_SLUG = "release-train-engineer";

export function rtePrivateCheckoutUrl(scheduleId: string, quantity = 1): string {
  const params = new URLSearchParams({
    schedule: scheduleId,
    course: RTE_COURSE_SLUG,
    quantity: String(quantity),
  });
  return `${RTE_PRIVATE_CHECKOUT_PATH}?${params.toString()}`;
}
