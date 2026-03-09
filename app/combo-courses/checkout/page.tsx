"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { COMBO_COURSES, type Combo } from "../data";
import ComboPaymentForm from "./ComboPaymentForm";
import InternationalPhoneInput from "@/app/components/InternationalPhoneInput";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function ComboCheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const comboId = searchParams.get("combo");
  const schedulesParam = searchParams.get("schedules") || "";

  const [combo, setCombo] = useState<Combo | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    enrollingFor: "myself" as "myself" | "someoneElse",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    alternativeContact: "",
  });

  const scheduleIds = schedulesParam ? schedulesParam.split(",").filter(Boolean) : [];

  useEffect(() => {
    const found = COMBO_COURSES.find((c) => c.id === comboId);
    setCombo(found || null);
  }, [comboId]);

  const handleContinue = async () => {
    if (currentStep === 1) {
      if (!formData.firstName?.trim() || !formData.lastName?.trim() || !formData.phone?.trim() || !formData.email?.trim()) {
        return;
      }
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2 && combo && scheduleIds.length > 0) {
      setIsProcessingPayment(true);
      setPaymentError(null);
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: combo.comboPrice,
            scheduleIds,
            comboId,
            courseSlug: `combo-${comboId}`,
            courseName: combo.name,
            selectedPlan: "basic",
            quantity: 1,
            customerEmail: formData.email,
            customerName: `${formData.firstName} ${formData.lastName}`,
            isCombo: true,
            enrollmentData: {
              ...formData,
              scheduleIds: scheduleIds.join(","),
            },
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create payment intent");
        if (!data.clientSecret) throw new Error("No client secret returned");
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
        setCurrentStep(3);
      } catch (err: unknown) {
        setPaymentError(err instanceof Error ? err.message : "Failed to initialize payment");
      } finally {
        setIsProcessingPayment(false);
      }
    }
  };

  if (!comboId || !combo) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Combo not found.</p>
          <Link href="/combo-courses" className="text-[#fa4a23] font-medium hover:underline">
            Back to Combo Courses
          </Link>
        </div>
      </main>
    );
  }

  if (scheduleIds.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please select schedules first.</p>
          <Link href={`/combo-courses/schedule?combo=${comboId}`} className="text-[#fa4a23] font-medium hover:underline">
            Choose schedules
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-[#fa4a23]" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 1 ? "bg-[#fa4a23] text-white" : "bg-gray-200 text-gray-600"}`}>1</div>
                <span className="font-medium">Details</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300" />
              <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-[#fa4a23]" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? "bg-[#fa4a23] text-white" : "bg-gray-200 text-gray-600"}`}>2</div>
                <span className="font-medium">Payment</span>
              </div>
            </div>

            {currentStep === 1 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Details</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={formData.enrollingFor === "myself"} onChange={() => setFormData({ ...formData, enrollingFor: "myself" })} className="w-4 h-4 text-[#fa4a23]" />
                      <span>Myself</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={formData.enrollingFor === "someoneElse"} onChange={() => setFormData({ ...formData, enrollingFor: "someoneElse" })} className="w-4 h-4 text-[#fa4a23]" />
                      <span>Someone else</span>
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23]" placeholder="First name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input type="text" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23]" placeholder="Last name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <InternationalPhoneInput value={formData.phone} onChange={(v) => setFormData({ ...formData, phone: v })} required placeholder="Phone number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fa4a23]" placeholder="your@email.com" />
                  </div>
                </div>
                <button onClick={handleContinue} className="w-full mt-6 bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-900">
                  Continue to Payment
                </button>
              </div>
            )}

            {currentStep === 2 && !clientSecret && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Review & Pay</h2>
                {paymentError && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">{paymentError}</div>}
                <p className="text-gray-600 mb-6">Click below to proceed to secure payment. Combo courses cannot use promo codes.</p>
                <button onClick={handleContinue} disabled={isProcessingPayment} className="w-full bg-[#fa4a23] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#e03d1a] disabled:opacity-50">
                  {isProcessingPayment ? "Processing..." : `Pay $${combo.comboPrice.toFixed(2)}`}
                </button>
              </div>
            )}

            {currentStep === 3 && clientSecret && paymentIntentId && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Secure Payment</h2>
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: { colorPrimary: "#fa4a23", colorBackground: "#ffffff", colorText: "#1f2937", colorDanger: "#ef4444", borderRadius: "8px" },
                    },
                  }}
                >
                  <ComboPaymentForm
                    onSuccess={() => {
                      const params = new URLSearchParams({ combo: comboId || "", amount: combo.comboPrice.toString() });
                      router.push(`/combo-courses/checkout/success?${params.toString()}`);
                    }}
                    onCancel={() => { setClientSecret(null); setPaymentIntentId(null); setCurrentStep(2); }}
                    enrollmentData={formData}
                    paymentIntentId={paymentIntentId}
                    amount={combo.comboPrice}
                    returnUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/combo-courses/checkout/success?combo=${comboId}&amount=${combo.comboPrice}`}
                  />
                </Elements>
              </div>
            )}
          </div>

          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              <p className="text-gray-700 mb-2">{combo.name}</p>
              <div className="space-y-2 mb-4">
                {combo.courses.map((c) => (
                  <p key={c.id} className="text-sm text-gray-600">• {c.name}</p>
                ))}
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-[#fa4a23]">USD {combo.comboPrice.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500 mt-4">Promo codes are not applicable to combo courses.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ComboCheckoutPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fa4a23]" /></main>}>
      <ComboCheckoutContent />
    </Suspense>
  );
}
