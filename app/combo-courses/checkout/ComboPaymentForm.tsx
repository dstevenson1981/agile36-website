"use client";

import { useState, FormEvent } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import Image from "next/image";

interface ComboPaymentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  enrollmentData: Record<string, unknown>;
  paymentIntentId: string;
  amount: number;
  returnUrl: string;
}

export default function ComboPaymentForm({
  onSuccess,
  onCancel,
  enrollmentData,
  paymentIntentId,
  amount,
  returnUrl,
}: ComboPaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || "Payment form validation failed");
        setIsProcessing(false);
        return;
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: returnUrl },
        redirect: "if_required",
      });

      if (confirmError) {
        setError(confirmError.message || "Payment failed");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        try {
          await fetch("/api/confirm-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentIntentId: paymentIntent.id, enrollmentData }),
          });
        } catch (err) {
          console.error("Failed to store order:", err);
        }
        onSuccess();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred during payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentElement options={{ layout: "tabs" }} />
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
        )}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="flex-1 bg-[#fa4a23] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#e03d1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </button>
        </div>
      </form>
      <div className="border-t border-gray-200 pt-6 text-sm text-gray-600 text-center">
        <p>Transactions are secure & PCI-DSS compliant.</p>
        <div className="flex justify-center py-4">
          <Image src="/PCI.jpg" alt="PCI-DSS Compliant" width={400} height={200} className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
