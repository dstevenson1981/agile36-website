export const CHECKOUT_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CheckoutLeadPayload = {
  email: string;
  courseSlug: string;
  courseName?: string;
  scheduleId?: string | null;
  firstName?: string;
  lastName?: string;
  phone?: string;
  enrollingFor?: string;
  alternativeContact?: string;
  referralCode?: string;
  comboId?: string;
  createStripeCustomer?: boolean;
};

export function isValidCheckoutEmail(email: string): boolean {
  return CHECKOUT_EMAIL_RE.test(email.trim());
}

const sentKeys = new Set<string>();

function leadKey(payload: CheckoutLeadPayload): string {
  return [
    payload.email.trim().toLowerCase(),
    payload.courseSlug,
    payload.scheduleId || "",
    payload.firstName?.trim() || "",
    payload.lastName?.trim() || "",
    payload.phone?.trim() || "",
  ].join("|");
}

/** Fire-and-forget. Safe to call from blur / as-you-type. Never blocks checkout. */
export function captureCheckoutLead(payload: CheckoutLeadPayload): void {
  const email = payload.email.trim();
  if (!payload.courseSlug || !isValidCheckoutEmail(email)) return;

  const key = leadKey({ ...payload, email });
  if (sentKeys.has(key)) return;
  sentKeys.add(key);

  void fetch("/api/save-enrollment-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      email,
      scheduleId: payload.scheduleId || "unknown",
      firstName: payload.firstName || "",
      lastName: payload.lastName || "",
      phone: payload.phone || "",
      createStripeCustomer: payload.createStripeCustomer === true,
    }),
    keepalive: true,
  }).catch(() => {
    sentKeys.delete(key);
  });
}
