'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import UpgradePaymentForm from './UpgradePaymentForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function UpgradeCheckout({
  courseSlug,
  courseName,
}: {
  courseSlug: string;
  courseName: string;
}) {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createIntent = async () => {
      try {
        const res = await fetch('/api/create-practice-exam-upgrade-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseSlug }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Failed to initialize checkout');
          setLoading(false);
          return;
        }
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    createIntent();
  }, [courseSlug]);

  const handleSuccess = () => {
    router.push(`/account/practice-exams?upgraded=${courseSlug}`);
    router.refresh();
  };

  const handleCancel = () => {
    router.push('/account/practice-exams');
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-red-500/15 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
        <button
          onClick={() => router.push('/account/practice-exams')}
          className="text-[#fbbf24] font-medium hover:underline"
        >
          ← Back to Practice Exams
        </button>
      </div>
    );
  }

  if (!clientSecret || !paymentIntentId) {
    return null;
  }

  const options = {
    clientSecret,
    appearance: { theme: 'night' as const, variables: { colorPrimary: '#fbbf24' } },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <UpgradePaymentForm
        paymentIntentId={paymentIntentId}
        amount={50}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Elements>
  );
}
