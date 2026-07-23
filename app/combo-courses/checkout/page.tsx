"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { findComboById, type Combo } from "../data";
import ComboPaymentForm from "./ComboPaymentForm";
import InternationalPhoneInput from "@/app/components/InternationalPhoneInput";
import { useCheckoutStepScroll } from "@/app/hooks/useCheckoutStepScroll";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function ComboCheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const comboId = searchParams.get("combo");
  const schedulesParam = searchParams.get("schedules") || "";
  const selectionsParam = searchParams.get("selections") || "";

  const [combo, setCombo] = useState<Combo | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useCheckoutStepScroll(currentStep, clientSecret);

  const [formData, setFormData] = useState({
    enrollingFor: "myself" as "myself" | "someoneElse",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    alternativeContact: "",
  });

  const scheduleIds = schedulesParam ? schedulesParam.split(",").filter(Boolean) : [];
  const parsedSelections: Record<string, { scheduleId: string; displayDate?: string; courseName?: string }> = (() => {
    if (!selectionsParam) return {};
    try {
      const parsed = JSON.parse(decodeURIComponent(selectionsParam));
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  })();

  const isDetailsComplete =
    Boolean(formData.firstName?.trim()) &&
    Boolean(formData.lastName?.trim()) &&
    Boolean(formData.phone?.trim()) &&
    Boolean(formData.email?.trim());

  useEffect(() => {
    const found = comboId ? findComboById(comboId) : undefined;
    setCombo(found || null);
  }, [comboId]);

  const createPaymentIntent = async () => {
    if (!combo || scheduleIds.length === 0) return;

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
          // Explicitly omit promo / corporate — combos never accept discounts
          promoCode: "",
          promoDiscount: 0,
          enrollmentData: {
            ...formData,
            scheduleIds: scheduleIds.join(","),
            comboScheduleMap: Object.fromEntries(
              Object.entries(parsedSelections).map(([slug, value]) => [slug, value?.scheduleId || ""])
            ),
            comboScheduleDates: Object.fromEntries(
              Object.entries(parsedSelections).map(([slug, value]) => [slug, value?.displayDate || ""])
            ),
            comboCourseNames: Object.fromEntries(
              Object.entries(parsedSelections).map(([slug, value]) => [slug, value?.courseName || ""])
            ),
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create payment intent");
      if (!data.clientSecret) throw new Error("No client secret returned");
      setClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntentId);
      setCurrentStep(2);
    } catch (err: unknown) {
      setPaymentError(err instanceof Error ? err.message : "Failed to initialize payment");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const saveEnrollmentLeads = async () => {
    // Match single-course checkout: persist enrollment_leads + create Stripe customer
    // when Basic Details are entered (abandoned-cart / lead tracking). One Stripe
    // customer for the shopper; one lead row per selected class/date for attribution.
    const selectionEntries = Object.entries(parsedSelections).filter(
      ([, value]) => Boolean(value?.scheduleId)
    );

    const leadTargets =
      selectionEntries.length > 0
        ? selectionEntries.map(([slug, value]) => ({
            scheduleId: value.scheduleId,
            courseSlug: slug,
            courseName: value.courseName || slug,
          }))
        : scheduleIds.map((scheduleId) => ({
            scheduleId,
            courseSlug: `combo-${comboId}`,
            courseName: combo?.name || `combo-${comboId}`,
          }));

    for (let i = 0; i < leadTargets.length; i++) {
      const target = leadTargets[i];
      try {
        const response = await fetch("/api/save-enrollment-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            scheduleId: target.scheduleId,
            courseSlug: target.courseSlug,
            courseName: target.courseName,
            enrollingFor: formData.enrollingFor,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            alternativeContact: formData.alternativeContact,
            comboId,
            // Only the first call creates the Stripe Customer (same as single-course timing)
            createStripeCustomer: i === 0,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          console.error("Error saving combo enrollment lead:", data.error);
        }
      } catch (error) {
        console.error("Error saving combo enrollment lead:", error);
        // Don't block checkout — same pattern as single-course pages
      }
    }
  };

  const handleContinue = async () => {
    if (currentStep !== 1) return;

    if (!isDetailsComplete) {
      setFormError("Please fill in all required fields to continue.");
      return;
    }
    setFormError(null);
    await saveEnrollmentLeads();
    await createPaymentIntent();
  };

  if (!comboId || !combo) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#64748b] mb-4">Combo not found.</p>
          <Link href="/combo-courses" className="text-[#d97706] font-medium hover:underline">
            Back to Combo Courses
          </Link>
        </div>
      </main>
    );
  }

  if (scheduleIds.length === 0) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#64748b] mb-4">Please select schedules first.</p>
          <Link href={`/combo-courses/schedule?combo=${comboId}`} className="text-[#d97706] font-medium hover:underline">
            Choose schedules
          </Link>
        </div>
      </main>
    );
  }

  const orderSummary = (
    <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6 sticky top-4">
      <h3 className="text-lg font-medium text-[#1f2c4a] mb-4">Order Summary</h3>
      <p className="font-semibold text-[#1f2c4a] mb-2">{combo.name}</p>
      <div className="space-y-2 mb-4">
        {combo.courses.map((c) => (
          <p key={c.id} className="text-sm text-[#64748b]">
            • {c.name}
          </p>
        ))}
      </div>
      <div className="border-t border-[#1f2c4a]/15 pt-4 flex justify-between items-center">
        <span className="font-bold text-[#1f2c4a]">Total</span>
        <span className="text-xl font-bold text-[#d97706]">USD {combo.comboPrice.toLocaleString()}</span>
      </div>
      <div className="mt-4 rounded-lg border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.04] px-3 py-2.5">
        <p className="text-sm text-[#475569]">
          Promo codes, coupons, and corporate or group discounts are not applicable to combo courses.
        </p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-[#1f2c4a]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? "text-[#d97706]" : "text-[#64748b]"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= 1 ? "bg-[#d97706] text-white" : "bg-[#1f2c4a]/10 text-[#64748b]"
                  }`}
                >
                  1
                </div>
                <span className="font-medium">Details</span>
              </div>
              <div className="w-12 h-0.5 bg-[#1f2c4a]/20" />
              <div className={`flex items-center gap-2 ${currentStep >= 2 ? "text-[#d97706]" : "text-[#64748b]"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= 2 ? "bg-[#d97706] text-white" : "bg-[#1f2c4a]/10 text-[#64748b]"
                  }`}
                >
                  2
                </div>
                <span className="font-medium">Payment</span>
              </div>
            </div>

            {currentStep === 1 && (
              <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                <h2 className="text-xl font-normal text-[#1f2c4a] tracking-[-0.03em] mb-6">Your Details</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.enrollingFor === "myself"}
                        onChange={() => setFormData({ ...formData, enrollingFor: "myself" })}
                        className="w-4 h-4 accent-[#d97706]"
                      />
                      <span className="text-sm text-[#475569]">Myself</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.enrollingFor === "someoneElse"}
                        onChange={() => setFormData({ ...formData, enrollingFor: "someoneElse" })}
                        className="w-4 h-4 accent-[#d97706]"
                      />
                      <span className="text-sm text-[#475569]">Someone else</span>
                    </label>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#475569] mb-2">
                        First Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData({ ...formData, firstName: e.target.value });
                          setFormError(null);
                        }}
                        className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:outline-none focus:border-[#1f2c4a]/50"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#475569] mb-2">
                        Last Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData({ ...formData, lastName: e.target.value });
                          setFormError(null);
                        }}
                        className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:outline-none focus:border-[#1f2c4a]/50"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-2">
                      Phone <span className="text-red-600">*</span>
                    </label>
                    <InternationalPhoneInput
                      value={formData.phone}
                      onChange={(v) => {
                        setFormData({ ...formData, phone: v });
                        setFormError(null);
                      }}
                      required
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#475569] mb-2">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setFormError(null);
                      }}
                      className="w-full px-4 py-2 bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 rounded-lg text-[#1f2c4a] placeholder-[#94a3b8] focus:outline-none focus:border-[#1f2c4a]/50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                {(formError || paymentError) && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-600 rounded-lg">
                    {formError || paymentError}
                  </div>
                )}
                <button
                  onClick={handleContinue}
                  disabled={!isDetailsComplete || isProcessingPayment}
                  className="w-full mt-6 bg-[#d97706] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#b45309] transition-colors disabled:bg-[#fed7aa] disabled:text-[#9a3412] disabled:cursor-not-allowed disabled:hover:bg-[#fed7aa]"
                >
                  {isProcessingPayment ? "Preparing payment..." : "Continue to Payment"}
                </button>
              </div>
            )}

            {currentStep === 2 && clientSecret && paymentIntentId && (
              <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                <h2 className="text-xl font-normal text-[#1f2c4a] tracking-[-0.03em] mb-2">Secure Payment</h2>
                <p className="text-sm text-[#64748b] mb-6">
                  Promo codes and other discounts cannot be applied to combo courses. You will be charged the combo
                  price of USD {combo.comboPrice.toLocaleString()}.
                </p>
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#d97706",
                        colorBackground: "#ffffff",
                        colorText: "#1f2937",
                        colorDanger: "#ef4444",
                        fontFamily: "system-ui, sans-serif",
                        spacingUnit: "4px",
                        borderRadius: "8px",
                      },
                    },
                  }}
                >
                  <ComboPaymentForm
                    onSuccess={() => {
                      const params = new URLSearchParams({
                        combo: comboId || "",
                        amount: combo.comboPrice.toString(),
                      });
                      router.push(`/combo-courses/checkout/success?${params.toString()}`);
                    }}
                    onCancel={() => {
                      setClientSecret(null);
                      setPaymentIntentId(null);
                      setCurrentStep(1);
                    }}
                    enrollmentData={formData}
                    paymentIntentId={paymentIntentId}
                    amount={combo.comboPrice}
                    returnUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/combo-courses/checkout/success?combo=${comboId}&amount=${combo.comboPrice}`}
                  />
                </Elements>
              </div>
            )}

            {currentStep === 2 && !clientSecret && (
              <div className="rounded-2xl border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.06] p-6">
                <h2 className="text-xl font-normal text-[#1f2c4a] tracking-[-0.03em] mb-4">Payment</h2>
                {paymentError ? (
                  <>
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-600 rounded-lg">
                      {paymentError}
                    </div>
                    <button
                      onClick={() => {
                        setCurrentStep(1);
                        setPaymentError(null);
                      }}
                      className="w-full bg-[#d97706] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#b45309] transition-colors"
                    >
                      Back to Details
                    </button>
                  </>
                ) : (
                  <p className="text-[#64748b]">Preparing secure payment…</p>
                )}
              </div>
            )}
          </div>

          <div className="lg:w-96 flex-shrink-0">{orderSummary}</div>
        </div>
      </div>
    </main>
  );
}

export default function ComboCheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d97706]" />
        </main>
      }
    >
      <ComboCheckoutContent />
    </Suspense>
  );
}
