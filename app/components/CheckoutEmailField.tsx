"use client";

import { useEffect, useRef } from "react";
import {
  captureCheckoutLead,
  isValidCheckoutEmail,
  type CheckoutLeadPayload,
} from "@/app/lib/checkout-lead";

const DEFAULT_CLASS =
  "w-full px-4 py-2 bg-[#111111]/10 border border-[#111111]/20 rounded-lg text-[#111111] placeholder-[#94a3b8] focus:outline-none focus:border-[#111111]/50";

type CaptureContext = Omit<CheckoutLeadPayload, "email" | "createStripeCustomer">;

export default function CheckoutEmailField({
  value,
  onChange,
  capture,
  className = DEFAULT_CLASS,
  placeholder = "your.email@example.com",
}: {
  value: string;
  onChange: (email: string) => void;
  capture: CaptureContext;
  className?: string;
  placeholder?: string;
}) {
  const captureRef = useRef(capture);

  useEffect(() => {
    captureRef.current = capture;
  }, [capture]);

  const save = (email: string) => {
    captureCheckoutLead({
      ...captureRef.current,
      email,
      createStripeCustomer: false,
    });
  };

  useEffect(() => {
    if (!isValidCheckoutEmail(value)) return;
    save(value);
  }, [value]);

  return (
    <input
      type="email"
      required
      autoComplete="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => save(value)}
      className={className}
      placeholder={placeholder}
    />
  );
}
