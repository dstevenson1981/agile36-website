"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { payLaterOffer } from "@/app/lib/pay-later";
import { BANNER_COUPON_CODE, BANNER_DISCOUNT_AMOUNT, isSitePromoActive } from "@/app/lib/site-promo";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function money(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

function CardStep({
  clientSecret,
  paymentIntentId,
  amount,
  email,
}: {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  email: string;
}) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CardForm paymentIntentId={paymentIntentId} amount={amount} email={email} />
    </Elements>
  );
}

function CardForm({
  paymentIntentId,
  amount,
  email,
}: {
  paymentIntentId: string;
  amount: number;
  email: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const pay = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    setError(null);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Check the card details.");
      setBusy(false);
      return;
    }
    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/prepaid-training/success?payment_intent=${paymentIntentId}`,
      },
      redirect: "if_required",
    });
    if (confirmError) {
      setError(confirmError.message || "Payment failed.");
      setBusy(false);
      return;
    }
    if (paymentIntent?.status === "succeeded") {
      await fetch("/api/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
      });
      window.location.assign(
        `/prepaid-training/success?payment_intent=${encodeURIComponent(paymentIntent.id)}&email=${encodeURIComponent(email)}`,
      );
    }
    setBusy(false);
  };

  return (
    <form onSubmit={pay} className="space-y-4">
      <p className="text-sm text-[#374151]">
        Card charge: <span className="font-semibold text-[#111111]">{money(amount)}</span>
      </p>
      <PaymentElement />
      {error ? <p className="text-sm text-[#9f1239]">{error}</p> : null}
      <button
        type="submit"
        disabled={!stripe || busy}
        className="w-full rounded-lg bg-[#F5B942] px-5 py-3 text-sm font-bold text-[#111111] disabled:opacity-50"
      >
        {busy ? "Processing…" : `Pay ${money(amount)}`}
      </button>
    </form>
  );
}

function PayLaterForm() {
  const params = useSearchParams();
  const slug = params.get("course") || "";
  const offer = useMemo(() => payLaterOffer(slug), [slug]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [payment, setPayment] = useState<{ clientSecret: string; paymentIntentId: string; amount: number } | null>(null);
  const saleOn = isSitePromoActive();

  if (!offer) return null;

  const startPayment = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dateLater: true,
          amount: offer.price,
          courseSlug: offer.slug,
          courseName: offer.courseName,
          customerEmail: email.trim(),
          customerName: `${firstName.trim()} ${lastName.trim()}`,
          quantity: 1,
          selectedPlan: "basic",
          promoCode: promo.trim(),
          enrollmentData: {
            enrollingFor: "myself",
            scheduleDate: "Date not chosen",
          },
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.clientSecret) {
        setError(data.error || "Could not start payment.");
        setBusy(false);
        return;
      }
      setPayment({
        clientSecret: data.clientSecret,
        paymentIntentId: data.paymentIntentId,
        amount: Number(data.amount),
      });
    } catch {
      setError("Could not start payment.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8860B]">Pay now. Pick your date later.</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#111111]">{offer.courseName}</h1>
      <p className="mt-3 text-base leading-7 text-[#374151]">
        You are paying {money(offer.price)} for the course. After payment, choose any upcoming date. You are not enrolled in a cohort until you pick one.
      </p>
      {saleOn ? (
        <p className="mt-3 text-sm text-[#374151]">
          Black Friday: enter {BANNER_COUPON_CODE} for {money(BANNER_DISCOUNT_AMOUNT)} off. The code ends today at 4:00 PM EST.
        </p>
      ) : null}

      {payment ? (
        <div className="mt-8 rounded-2xl border border-[#EAEAEA] bg-white p-5">
          <CardStep
            clientSecret={payment.clientSecret}
            paymentIntentId={payment.paymentIntentId}
            amount={payment.amount}
            email={email.trim()}
          />
        </div>
      ) : (
        <form onSubmit={startPayment} className="mt-8 space-y-4 rounded-2xl border border-[#EAEAEA] bg-white p-5">
          <label className="block text-sm font-medium text-[#111111]">
            First name
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[#EAEAEA] px-3 py-2"
              autoComplete="given-name"
              required
            />
          </label>
          <label className="block text-sm font-medium text-[#111111]">
            Last name
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[#EAEAEA] px-3 py-2"
              autoComplete="family-name"
              required
            />
          </label>
          <label className="block text-sm font-medium text-[#111111]">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[#EAEAEA] px-3 py-2"
              autoComplete="email"
              required
            />
          </label>
          <label className="block text-sm font-medium text-[#111111]">
            Promo code <span className="font-normal text-[#6B6B6B]">(optional)</span>
            <input
              value={promo}
              onChange={(event) => setPromo(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[#EAEAEA] px-3 py-2 uppercase"
              autoComplete="off"
            />
          </label>
          {error ? <p className="text-sm text-[#9f1239]">{error}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-[#F5B942] px-5 py-3 text-sm font-bold text-[#111111] disabled:opacity-50"
          >
            {busy ? "Checking…" : "Continue to payment"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function PayLaterPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-xl px-4 py-16 text-[#374151]">Loading…</main>}>
      <PayLaterForm />
    </Suspense>
  );
}
