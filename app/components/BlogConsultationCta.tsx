"use client";

import { usePathname } from "next/navigation";
import { type FormEvent, useState } from "react";
import Link from "next/link";

export default function BlogConsultationCta() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/store-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "Blog — free consultation",
          name: null,
          exam_name: null,
          message: `Free consultation request from blog. Page: ${pathname || "/"}`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
      if (data?.message === "Email already exists") {
        setStatus("success");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      aria-labelledby="blog-consultation-heading"
      className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-md shadow-gray-200/60"
    >
      <h2
        id="blog-consultation-heading"
        className="text-xl sm:text-2xl font-bold text-gray-900 mb-5"
      >
        Get Free Consultation
      </h2>
      {status === "success" ? (
        <p className="text-gray-700 text-sm leading-relaxed">
          Thanks — we&apos;ll be in touch soon. You can also reach us at{" "}
          <a href="mailto:d.stevenson@agile36.com" className="font-semibold text-[#01203d] underline">
            d.stevenson@agile36.com
          </a>
          .
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="blog-consultation-email" className="sr-only">
              Email address (required)
            </label>
            <input
              id="blog-consultation-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Email Address *"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-[#01203d] focus:outline-none focus:ring-2 focus:ring-[#01203d]/20"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-[#fa4a23] px-4 py-3 text-base font-bold text-white shadow-sm transition hover:bg-[#e03d1a] disabled:opacity-60"
          >
            {status === "loading" ? "Submitting…" : "Submit"}
          </button>
          {status === "error" ? (
            <p className="text-sm text-red-600" role="alert">
              Please enter a valid email, or try again in a moment.
            </p>
          ) : null}
          <p className="text-center text-xs text-gray-600 leading-snug">
            By submitting, I accept the{" "}
            <Link href="/refund-policy" className="font-semibold text-gray-900 underline">
              T&amp;C
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="font-semibold text-gray-900 underline">
              Privacy Policy
            </Link>
          </p>
        </form>
      )}
    </section>
  );
}
