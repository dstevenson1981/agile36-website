"use client";

import { useState, FormEvent } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PaymentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  enrollmentData: any;
  paymentIntentId: string;
  amount: number;
}

export default function PaymentForm({ onSuccess, onCancel, enrollmentData, paymentIntentId, amount }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || 'Payment form validation failed');
        setIsProcessing(false);
        return;
      }

      // Confirm payment
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/courses/ai-agent-builder/schedule/checkout/success?payment_intent=${paymentIntentId}`,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed');
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Store order in database
        try {
          const response = await fetch('/api/confirm-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id,
              enrollmentData,
            }),
          });

          if (!response.ok) {
            console.error('Failed to store order, but payment succeeded');
          }
        } catch (err) {
          console.error('Error storing order:', err);
        }

        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentElement 
          options={{
            layout: 'tabs',
          }}
        />
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-[#1f2c4a]/20 rounded-lg text-[#475569] font-medium hover:bg-[#1f2c4a]/10 transition-colors"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="flex-1 bg-[#1f2c4a] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#16243f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </button>
        </div>
      </form>

      {/* Security & Trust Indicators */}
      <div className="border-t border-[#1f2c4a]/15 pt-6 space-y-4">
        {/* Security Message */}
        <div className="text-sm text-[#64748b] text-center">
          <p className="mb-2">
            Transactions on this site are safe, secure & PCI-DSS compliant as indicated by the secure lock in your address bar.
          </p>
          <p className="font-semibold text-[#1f2c4a]">
            Over <span className="text-[#d97706]">500,000+</span> users like you have enrolled for courses
          </p>
        </div>

        {/* PCI Compliance Image */}
        <div className="flex justify-center py-4">
          <Image
            src="/PCI.jpg"
            alt="PCI-DSS Compliant"
            width={400}
            height={200}
            className="max-w-full h-auto"
          />
        </div>

      </div>
    </div>
  );
}

