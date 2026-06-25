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
            Add your company details here. You&apos;ll be redirected to Stripe to save a corporate card
            securely — Agile36 never sees your card number.
          </p>

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
              {loading ? 'Redirecting to Stripe…' : 'Continue to save card'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#94a3b8]">
            Powered by Stripe · PCI-compliant card capture
          </p>
        </div>
      </div>
    </div>
  );
}
