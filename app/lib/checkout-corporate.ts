/** Client-side helper after POST /api/create-payment-intent */
export type CreatePaymentIntentResult = {
  clientSecret?: string | null;
  paymentIntentId?: string;
  corporateCharge?: boolean;
  error?: string;
};

export async function handleCreatePaymentIntentResult(
  data: CreatePaymentIntentResult,
  opts: {
    enrollmentData: unknown;
    successUrl: (paymentIntentId: string) => string;
    onCardReady: (clientSecret: string, paymentIntentId: string) => void;
  },
): Promise<{ handled: boolean; error?: string }> {
  if (data.corporateCharge && data.paymentIntentId) {
    try {
      await fetch('/api/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId: data.paymentIntentId,
          enrollmentData: opts.enrollmentData,
        }),
      });
    } catch {
      // Payment succeeded in Stripe; order insert is best-effort here.
    }
    window.location.href = opts.successUrl(data.paymentIntentId);
    return { handled: true };
  }

  if (!data.clientSecret || !data.paymentIntentId) {
    return { handled: false, error: 'No client secret returned from server' };
  }

  opts.onCardReady(data.clientSecret, data.paymentIntentId);
  return { handled: true };
}
