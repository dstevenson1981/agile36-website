'use client';

import { useEffect, useRef } from 'react';

/**
 * Calls /api/grant-access when success page loads with payment_intent and plan=pro.
 * Grants practice exam access without needing webhooks.
 */
export default function GrantAccessOnSuccess({
  paymentIntentId,
  plan,
}: {
  paymentIntentId: string | null;
  plan: string | null;
}) {
  const called = useRef(false);

  useEffect(() => {
    if (!paymentIntentId || plan !== 'pro' || called.current) return;
    called.current = true;

    fetch('/api/grant-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payment_intent_id: paymentIntentId }),
    }).catch((err) => console.error('Grant access:', err));
  }, [paymentIntentId, plan]);

  return null;
}
