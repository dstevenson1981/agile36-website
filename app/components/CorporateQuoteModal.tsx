"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useId, useState } from "react";
import { getCorporateQuoteCopy } from "@/app/lib/corporate-quote";

const COUNTRIES = [
  { code: "US", dial: "+1", flag: "🇺🇸", name: "United States" },
  { code: "CA", dial: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "IN", dial: "+91", flag: "🇮🇳", name: "India" },
  { code: "AU", dial: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "DE", dial: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "NL", dial: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "SG", dial: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "NZ", dial: "+64", flag: "🇳🇿", name: "New Zealand" },
] as const;

type FeatureIconName = "trend" | "bars" | "bulb" | "book";

function quoteFeatures(copy: {
  upskill: string;
  examIncluded: string;
}): { title: string; icon: FeatureIconName }[] {
  return [
    { title: copy.upskill, icon: "trend" },
    { title: "Private cohorts on your calendar", icon: "bars" },
    { title: "Volume pricing and purchase orders", icon: "bulb" },
    { title: copy.examIncluded, icon: "book" },
  ];
}

type Status = "idle" | "loading" | "success" | "error";

type Props = {
  open: boolean;
  onClose: () => void;
  courseSlug: string;
  courseLabel: string;
  contextLine?: string | null;
};

function FeatureIcon({ name }: { name: FeatureIconName }) {
  const common = {
    className: "h-3.5 w-3.5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  } as const;
  if (name === "trend") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 7h7v7" />
      </svg>
    );
  }
  if (name === "bars") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" d="M6 20V10M12 20V4M18 20v-7" />
      </svg>
    );
  }
  if (name === "bulb") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 18h6m-5 3h4M8 10a4 4 0 118 0c0 1.5-.8 2.6-1.7 3.5-.5.5-.8 1.1-.8 1.7v.3H10.5v-.3c0-.6-.3-1.2-.8-1.7C8.8 12.6 8 11.5 8 10z"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
      />
    </svg>
  );
}

function BoardIllustration() {
  return (
    <svg
      viewBox="0 0 280 150"
      className="mx-auto mt-8 w-full max-w-[240px]"
      aria-hidden
    >
      <rect x="88" y="78" width="104" height="58" rx="10" fill="#1f2c4a" />
      <rect x="96" y="86" width="88" height="42" rx="4" fill="#f8fafc" />
      <rect x="104" y="94" width="44" height="6" rx="2" fill="#cbd5e1" />
      <rect x="104" y="106" width="28" height="6" rx="2" fill="#e2e8f0" />
      <circle cx="78" cy="58" r="22" fill="#fff" stroke="#f1d4a8" strokeWidth="1.5" />
      <path d="M78 42a16 16 0 0116 16H78z" fill="#d97706" />
      <path d="M78 42a16 16 0 00-10 28 16 16 0 0010-12z" fill="#fbbf24" />
      <rect x="168" y="28" width="72" height="52" rx="8" fill="#fff" stroke="#ead7b7" />
      <rect x="178" y="38" width="18" height="8" rx="2" fill="#d97706" />
      <rect x="200" y="38" width="18" height="8" rx="2" fill="#e2e8f0" />
      <rect x="222" y="38" width="8" height="8" rx="2" fill="#e2e8f0" />
      <rect x="178" y="50" width="52" height="6" rx="2" fill="#cbd5e1" />
      <rect x="178" y="60" width="36" height="6" rx="2" fill="#e2e8f0" />
      <rect x="28" y="36" width="56" height="70" rx="8" fill="#fff" stroke="#ead7b7" />
      <rect x="38" y="46" width="36" height="5" rx="2" fill="#1f2c4a" />
      <rect x="38" y="58" width="28" height="4" rx="2" fill="#cbd5e1" />
      <rect x="38" y="68" width="36" height="16" rx="3" fill="#fef3c7" />
      <rect x="38" y="88" width="36" height="10" rx="3" fill="#e2e8f0" />
    </svg>
  );
}

export default function CorporateQuoteModal({
  open,
  onClose,
  courseSlug,
  courseLabel,
  contextLine,
}: Props) {
  const formId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [countryIndex, setCountryIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  function resetForm() {
    setName("");
    setEmail("");
    setCompany("");
    setPhoneLocal("");
    setCountryIndex(0);
    setMessage("");
    setStatus("idle");
    setErrorText("");
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset on close, not on every handleClose identity change
  }, [open, onClose]);

  if (!open) return null;

  const copy = getCorporateQuoteCopy(courseSlug);
  const features = quoteFeatures(copy);
  const country = COUNTRIES[countryIndex] ?? COUNTRIES[0];

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setStatus("error");
      setErrorText("Enter your full name.");
      return;
    }
    if (!email.includes("@")) {
      setStatus("error");
      setErrorText("Enter a valid work email.");
      return;
    }
    if (phoneLocal.replace(/\D/g, "").length < 7) {
      setStatus("error");
      setErrorText("Enter a valid phone number.");
      return;
    }

    setStatus("loading");
    setErrorText("");
    const phone = `${country.dial} ${phoneLocal.replace(/\D/g, "")}`;
    const details = [
      `Corporate quote request for ${courseLabel} (${courseSlug}).`,
      company.trim() ? `Company: ${company.trim()}` : null,
      `Phone: ${phone}`,
      contextLine ? `Context: ${contextLine}` : null,
      message.trim() ? `Message: ${message.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/store-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source: `Corporate quote — ${courseSlug}`,
          exam_name: courseLabel,
          message: details,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorText(
          typeof data.error === "string"
            ? data.error
            : "Could not send the request. Try again in a moment."
        );
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorText("Could not send the request. Try again in a moment.");
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-[#1f2c4a]/15 bg-white px-3.5 py-2.5 text-sm text-[#1f2c4a] placeholder:text-[#94a3b8] focus:border-[#1f2c4a]/40 focus:outline-none focus:ring-2 focus:ring-[#1f2c4a]/15";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1f2c4a]/45 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${formId}-title`}
      onClick={handleClose}
    >
      <div
        className="relative grid max-h-[92vh] w-full max-w-[52rem] overflow-y-auto rounded-2xl bg-white shadow-[0_24px_80px_rgba(31,44,74,0.22)] md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 rounded-lg p-1.5 text-[#94a3b8] transition hover:bg-[#1f2c4a]/[0.06] hover:text-[#1f2c4a]"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <aside className="relative hidden overflow-hidden bg-gradient-to-b from-[#fde8c8]/90 via-[#fef6eb] to-[#fff8f0] px-7 py-8 md:block md:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1f2c4a] ring-1 ring-[#1f2c4a]/10">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" aria-hidden />
            Corporate solution
          </span>
          <h2
            className="mt-5 max-w-[16rem] text-[1.65rem] font-normal leading-[1.15] text-[#1f2c4a]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {copy.heading}
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#64748b]">
            We&apos;ll match you with a learning advisor who&apos;ll get back to you within 24 hours about {copy.shortName}.
          </p>
          <ul className="mt-6 space-y-3.5">
            {features.map((item) => (
              <li key={item.title} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#d97706] shadow-[0_1px_4px_rgba(31,44,74,0.08)]">
                  <FeatureIcon name={item.icon} />
                </span>
                <span className="text-sm font-medium text-[#1f2c4a]">{item.title}</span>
              </li>
            ))}
          </ul>
          <BoardIllustration />
        </aside>

        <div className="px-6 py-8 sm:px-8 md:max-h-[92vh] md:overflow-y-auto">
          {status === "success" ? (
            <div className="flex min-h-[22rem] flex-col justify-center">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#d97706]">
                Request received
              </p>
              <h2
                className="mt-2 text-2xl font-normal text-[#1f2c4a]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Thanks — a learning advisor will follow up within 24 hours.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                We have your details for a private {courseLabel} cohort
                {company.trim() ? ` at ${company.trim()}` : ""}.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-8 w-full rounded-lg bg-[#1f2c4a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#16243f]"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <h2
                id={`${formId}-title`}
                className="pr-8 text-[1.35rem] font-normal leading-snug text-[#1f2c4a] sm:text-[1.5rem]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Request a custom quote for {copy.shortName}
              </h2>
              <p className="mt-2 text-sm text-[#64748b]">
                Your learning advisor will get back to you within 24 hours about private {copy.shortName} training.
              </p>
              <p className="mt-5 text-sm font-semibold text-[#1f2c4a]">Your details</p>
              {contextLine ? (
                <p className="mt-1 text-xs text-[#64748b]">{contextLine}</p>
              ) : (
                <p className="mt-1 text-xs text-[#64748b]">{courseLabel}</p>
              )}

              <form onSubmit={onSubmit} className="mt-4 space-y-3.5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-medium text-[#475569]">
                      Full name <span className="text-[#b45309]">*</span>
                    </span>
                    <input
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={fieldClass}
                      placeholder="Full name"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-medium text-[#475569]">
                      Email <span className="text-[#b45309]">*</span>
                    </span>
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      className={fieldClass}
                      placeholder="Work email"
                    />
                  </label>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-medium text-[#475569]">
                      Company name
                    </span>
                    <input
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={fieldClass}
                      placeholder="Company name"
                    />
                  </label>
                  <div>
                    <span className="mb-1.5 block text-[13px] font-medium text-[#475569]">
                      Phone number <span className="text-[#b45309]">*</span>
                    </span>
                    <div className="flex overflow-hidden rounded-lg border border-[#1f2c4a]/15 focus-within:border-[#1f2c4a]/40 focus-within:ring-2 focus-within:ring-[#1f2c4a]/15">
                      <label className="sr-only" htmlFor={`${formId}-country`}>
                        Country code
                      </label>
                      <select
                        id={`${formId}-country`}
                        value={countryIndex}
                        onChange={(e) => setCountryIndex(Number(e.target.value))}
                        className="shrink-0 border-0 bg-[#1f2c4a]/[0.03] py-2.5 pl-2.5 pr-1 text-sm text-[#1f2c4a] focus:outline-none"
                      >
                        {COUNTRIES.map((c, i) => (
                          <option key={c.code} value={i} title={c.name}>
                            {c.flag} {c.dial}
                          </option>
                        ))}
                      </select>
                      <input
                        required
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        value={phoneLocal}
                        onChange={(e) => setPhoneLocal(e.target.value)}
                        className="min-w-0 flex-1 border-0 px-3 py-2.5 text-sm text-[#1f2c4a] placeholder:text-[#94a3b8] focus:outline-none"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-[#475569]">
                    Your message (optional)
                  </span>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${fieldClass} resize-none`}
                    placeholder={`Team size, preferred ${copy.shortName} dates, or anything we should know`}
                  />
                </label>

                {status === "error" && errorText ? (
                  <p className="text-sm text-[#b45309]" role="alert">
                    {errorText}
                  </p>
                ) : null}

                <p className="text-[11px] leading-relaxed text-[#94a3b8]">
                  By submitting this form, you agree to Agile36&apos;s{" "}
                  <Link href="/privacy-policy" className="font-medium text-[#1f2c4a] underline underline-offset-2">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/corporate/terms" className="font-medium text-[#1f2c4a] underline underline-offset-2">
                    Corporate Terms
                  </Link>
                  .
                </p>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-lg bg-[#1f2c4a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16243f] disabled:opacity-60 sm:w-auto sm:min-w-[11.5rem]"
                  >
                    {status === "loading" ? "Sending…" : "Get custom quote"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
