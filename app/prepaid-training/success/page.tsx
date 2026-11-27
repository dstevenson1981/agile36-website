"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessBody() {
  const params = useSearchParams();
  const paymentIntentId = params.get("payment_intent") || "";
  const email = params.get("email") || "";
  const [ready, setReady] = useState(false);
  const loginHref = `/account/login?next=${encodeURIComponent("/account")}${email ? `&email=${encodeURIComponent(email)}` : ""}`;
  const signupHref = `/account/signup?next=${encodeURIComponent("/account")}${email ? `&email=${encodeURIComponent(email)}` : ""}`;

  useEffect(() => {
    if (!paymentIntentId) {
      setReady(true);
      return;
    }
    fetch("/api/confirm-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId }),
    }).finally(() => setReady(true));
  }, [paymentIntentId]);

  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8860B]">Payment received</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#111111]">Your course is paid. The date is still open.</h1>
      <p className="mt-3 text-base leading-7 text-[#374151]">
        Create an account or log in with the same email you just used. My Account will show a credit for this course. Choose a date there. You will not be charged again.
      </p>
      {ready && paymentIntentId ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={signupHref} className="inline-flex rounded-lg bg-[#F5B942] px-5 py-3 text-sm font-bold text-[#111111]">
            Create an account
          </Link>
          <Link href={loginHref} className="inline-flex rounded-lg border border-[#EAEAEA] px-5 py-3 text-sm font-semibold text-[#111111]">
            Log in
          </Link>
        </div>
      ) : (
        <p className="mt-6 text-sm text-[#6B6B6B]">{paymentIntentId ? "Saving your payment…" : "Missing payment reference."}</p>
      )}
    </main>
  );
}

export default function PrepaidSuccessPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-xl px-4 py-16 text-[#374151]">Loading…</main>}>
      <SuccessBody />
    </Suspense>
  );
}
