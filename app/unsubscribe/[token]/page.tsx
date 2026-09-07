'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Status = 'checking' | 'ready' | 'submitting' | 'success' | 'invalid' | 'error';

export default function UnsubscribePage() {
  const params = useParams();
  const router = useRouter();
  const token = typeof params.token === 'string' ? params.token : '';
  const [status, setStatus] = useState<Status>(() => token ? 'checking' : 'invalid');
  const checkedToken = useRef(false);

  useEffect(() => {
    if (!token || checkedToken.current) return;
    checkedToken.current = true;

    const validate = async () => {
      try {
        const response = await fetch(`/api/email/unsubscribe?token=${encodeURIComponent(token)}`, {
          method: 'GET',
          cache: 'no-store',
        });
        const data = await response.json();
        setStatus(response.ok && data.valid ? 'ready' : 'invalid');
      } catch (error) {
        console.error('Error validating unsubscribe link:', error);
        setStatus('error');
      }
    };

    void validate();
  }, [token]);

  const confirmUnsubscribe = async () => {
    if (!token || status !== 'ready') return;
    setStatus('submitting');
    try {
      const response = await fetch('/api/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      setStatus(response.ok && data.success ? 'success' : 'error');
    } catch (error) {
      console.error('Error unsubscribing:', error);
      setStatus('error');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef3f8] p-4 text-[#1f2c4a]">
      <section className="relative w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-[#1f2c4a]/15 bg-white p-7 shadow-[0_28px_70px_-45px_rgba(31,44,74,.65)] sm:p-10">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#1f2c4a]" />
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d97706]">Email preferences</p>
          <h1 className="mt-3 text-3xl font-normal tracking-[-0.04em]">Unsubscribe</h1>
        </div>

        {status === 'checking' || status === 'submitting' ? (
          <div className="py-12 text-center" aria-live="polite">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#1f2c4a]/10 border-t-[#d97706]" />
            <p className="mt-4 text-sm text-[#64748b]">
              {status === 'checking' ? 'Checking your secure link…' : 'Updating your preferences…'}
            </p>
          </div>
        ) : null}

        {status === 'ready' ? (
          <div className="py-9 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#fff7ed] text-[#d97706]">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4zM4 7l8 6 8-6" />
              </svg>
            </span>
            <h2 className="mt-5 text-2xl font-normal tracking-[-0.03em]">Confirm your request</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#64748b]">
              You will stop receiving Agile36 marketing emails. Course confirmations and purchase receipts are not affected.
            </p>
            <button
              type="button"
              onClick={confirmUnsubscribe}
              className="mt-7 min-h-12 w-full rounded-xl bg-[#1f2c4a] px-5 text-sm font-semibold text-white transition hover:bg-[#16243f]"
            >
              Confirm unsubscribe
            </button>
            <button type="button" onClick={() => router.push('/')} className="mt-4 text-sm font-semibold text-[#64748b] hover:text-[#1f2c4a]">
              Keep me subscribed
            </button>
          </div>
        ) : null}

        {status === 'success' ? (
          <div className="py-9 text-center" aria-live="polite">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
              </svg>
            </span>
            <h2 className="mt-5 text-2xl font-normal tracking-[-0.03em]">You are unsubscribed</h2>
            <p className="mt-3 text-sm leading-6 text-[#64748b]">Your email preferences have been updated.</p>
            <button type="button" onClick={() => router.push('/')} className="mt-7 min-h-11 rounded-xl border border-[#1f2c4a]/15 px-5 text-sm font-semibold hover:bg-[#eef3f8]">
              Return home
            </button>
          </div>
        ) : null}

        {status === 'invalid' || status === 'error' ? (
          <div className="py-9 text-center" aria-live="polite">
            <h2 className="text-2xl font-normal tracking-[-0.03em]">
              {status === 'invalid' ? 'This link is not valid' : 'We could not update your preferences'}
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#64748b]">
              {status === 'invalid'
                ? 'Nothing was changed. Use the unsubscribe link in the most recent Agile36 email if you intended to leave the list.'
                : 'Nothing was changed. Please try again from your most recent Agile36 email.'}
            </p>
            <button type="button" onClick={() => router.push('/')} className="mt-7 min-h-11 rounded-xl bg-[#1f2c4a] px-5 text-sm font-semibold text-white hover:bg-[#16243f]">
              Return home
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
