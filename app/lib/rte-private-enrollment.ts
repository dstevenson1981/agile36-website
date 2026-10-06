/** RTE dates use the same schedule URL shape as the other courses. */
export const RTE_PRIVATE_SCHEDULE_PATH = "/courses/release-train-engineer/schedule";
export const RTE_PRIVATE_CHECKOUT_PATH = "/courses/release-train-engineer/schedule/checkout";
export const RTE_PRIVATE_CHECKOUT_SUCCESS_PATH =
  "/courses/release-train-engineer/schedule/checkout/success";
export const RTE_COURSE_SLUG = "release-train-engineer";

export function rtePrivateCheckoutUrl(scheduleId: string, quantity = 1): string {
  const params = new URLSearchParams({
    schedule: scheduleId,
    course: RTE_COURSE_SLUG,
    quantity: String(quantity),
  });
  return `${RTE_PRIVATE_CHECKOUT_PATH}?${params.toString()}`;
}
