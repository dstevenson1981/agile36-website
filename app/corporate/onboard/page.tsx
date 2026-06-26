'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function CorporateOnboardPage() {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/corporate/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, contactName, contactEmail, contactPhone }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Could not start card setup');
      }
      window.location.href = data.url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f3] py-16 px-4">
      <div className="mx-auto max-w-xl">
        <Link href="/corporate" className="text-sm font-medium text-[#64748b] hover:text-[#1f2c4a]">
          ← Back to Corporate
        </Link>

        <div className="mt-6 rounded-2xl border border-[#1f2c4a]/10 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#d97706]">Corporate billing</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#1f2c4a]">Set up company billing</h1>
          <p className="mt-3 text-[#64748b] leading-relaxed">
            For billing contacts and procurement only. You&apos;ll save a corporate card on file, then
            receive a code your employees use at checkout — they never enter your card details.
          </p>

          <div className="mt-6 rounded-xl border border-[#1f2c4a]/10 bg-[#1f2c4a]/[0.03] p-5">
            <p className="text-sm font-semibold text-[#1f2c4a]">How it works</p>
            <ol className="mt-3 space-y-3 text-sm text-[#64748b] leading-relaxed">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f2c4a] text-xs font-semibold text-white">
                  1
                </span>
                <span>Enter your company details below.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f2c4a] text-xs font-semibold text-white">
                  2
                </span>
                <span>
                  On the next screen, save your corporate card on{' '}
                  <strong className="font-medium text-[#475569]">Stripe&apos;s secure checkout</strong> — the
                  same PCI Level 1 platform used by millions of businesses.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f2c4a] text-xs font-semibold text-white">
                  3
                </span>
                <span>
                  You&apos;ll receive a unique billing code (e.g.{' '}
                  <span className="font-mono text-[#475569]">AGILE-XXXXXX</span>).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f2c4a] text-xs font-semibold text-white">
                  4
                </span>
                <span>
                  Share that code with <strong className="font-medium text-[#475569]">employees only</strong>.
                  They enter it at course checkout; enrollments bill to your company card automatically.
                </span>
              </li>
            </ol>
          </div>

          <div className="mt-4 flex gap-3 rounded-lg border border-emerald-200/80 bg-emerald-50/80 px-4 py-3">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <div className="text-sm text-[#475569] leading-relaxed">
              <p className="font-medium text-[#1f2c4a]">Your card is PCI-safe</p>
              <p className="mt-1">
                Card entry happens entirely on Stripe. Agile36 never sees, stores, or processes your full
                card number — Stripe handles all payment data under PCI DSS standards.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-[#475569]">
                Company name *
              </label>
              <input
                id="companyName"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/5 px-4 py-3 text-[#1f2c4a] focus:border-[#1f2c4a]/40 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contactName" className="mb-2 block text-sm font-medium text-[#475569]">
                Billing contact name *
              </label>
              <input
                id="contactName"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/5 px-4 py-3 text-[#1f2c4a] focus:border-[#1f2c4a]/40 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contactEmail" className="mb-2 block text-sm font-medium text-[#475569]">
                Work email *
              </label>
              <input
                id="contactEmail"
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/5 px-4 py-3 text-[#1f2c4a] focus:border-[#1f2c4a]/40 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contactPhone" className="mb-2 block text-sm font-medium text-[#475569]">
                Phone
              </label>
              <input
                id="contactPhone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full rounded-lg border border-[#1f2c4a]/15 bg-[#1f2c4a]/5 px-4 py-3 text-[#1f2c4a] focus:border-[#1f2c4a]/40 focus:outline-none"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#1f2c4a] py-4 font-medium text-white transition-colors hover:bg-[#16243f] disabled:opacity-60"
            >
              {loading ? 'Redirecting to Stripe…' : 'Continue to secure card setup'}
            </button>
            <p className="text-center text-xs text-[#94a3b8] leading-relaxed">
              You&apos;ll leave this page briefly to enter your card on Stripe. When setup is complete,
              you&apos;ll return here with your employee billing code.
            </p>
          </form>

          <p className="mt-6 text-center text-xs text-[#94a3b8]">
            Powered by Stripe · PCI DSS Level 1 certified
          </p>
        </div>
      </div>
    </div>
  );
}
