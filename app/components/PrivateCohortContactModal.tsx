"use client";

import { type FormEvent, useEffect, useState } from "react";

declare global {
  interface Window {
    $crisp?: unknown[];
  }
}

type Props = {
  open: boolean;
  onClose: () => void;
  courseSlug: string;
  courseLabel?: string;
};

export default function PrivateCohortContactModal({
  open,
  onClose,
  courseSlug,
  courseLabel = "this private cohort",
}: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  useEffect(() => {
    if (!open) return;
    setEmail("");
    setName("");
    setStatus("idle");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  async function onSubmit(e: FormEvent) {
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
          name: name.trim() || null,
          source: `Private cohort inquiry — ${courseSlug}`,
          exam_name: courseLabel,
          message: `Private cohort registration interest for ${courseLabel} (${courseSlug}).`,
        }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function speakWithAgent() {
    if (typeof window !== "undefined" && window.$crisp) {
      window.$crisp.push(["do", "chat:open"]);
      onClose();
      return;
    }
    window.location.href = `/contact?course=${encodeURIComponent(courseSlug)}`;
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="private-cohort-contact-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-[#94a3b8] transition hover:bg-[#1f2c4a]/[0.06] hover:text-[#1f2c4a]"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-gradient-to-r from-[#1f2c4a] to-[#33415f] px-6 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
            Private cohort
          </p>
          <h2
            id="private-cohort-contact-title"
            className="mt-1 text-xl font-semibold text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            Contact us to register
          </h2>
        </div>

        <div className="p-6">
          {status === "success" ? (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-[#475569]">
                Thanks — we received your email and will follow up shortly about{" "}
                <span className="font-semibold text-[#1f2c4a]">{courseLabel}</span>.
              </p>
              <button
                type="button"
                onClick={speakWithAgent}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#1f2c4a]/20 px-4 py-2.5 text-sm font-semibold text-[#1f2c4a] transition hover:bg-[#1f2c4a]/[0.06]"
              >
                Or speak with an agent now
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-lg bg-[#1f2c4a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16243f]"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm leading-relaxed text-[#64748b]">
                Leave your email and we&apos;ll reach out about dates and pricing for{" "}
                {courseLabel}.
              </p>
              <form onSubmit={onSubmit} className="space-y-3">
                <div>
                  <label htmlFor="private-cohort-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="private-cohort-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name (optional)"
                    className="w-full rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.04] px-4 py-2.5 text-sm text-[#1f2c4a] placeholder:text-[#94a3b8] focus:border-[#1f2c4a]/40 focus:outline-none focus:ring-2 focus:ring-[#1f2c4a]/15"
                  />
                </div>
                <div>
                  <label htmlFor="private-cohort-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="private-cohort-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Email address *"
                    className="w-full rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/[0.04] px-4 py-2.5 text-sm text-[#1f2c4a] placeholder:text-[#94a3b8] focus:border-[#1f2c4a]/40 focus:outline-none focus:ring-2 focus:ring-[#1f2c4a]/15"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-lg bg-[#1f2c4a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16243f] disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Submit email"}
                </button>
                {status === "error" ? (
                  <p className="text-sm text-red-600" role="alert">
                    Please enter a valid email, or try again in a moment.
                  </p>
                ) : null}
              </form>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#1f2c4a]/10" />
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#94a3b8]">
                  or
                </span>
                <div className="h-px flex-1 bg-[#1f2c4a]/10" />
              </div>

              <button
                type="button"
                onClick={speakWithAgent}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#1f2c4a]/20 px-4 py-2.5 text-sm font-semibold text-[#1f2c4a] transition hover:bg-[#1f2c4a]/[0.06]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                Speak with an agent
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
