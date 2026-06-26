'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [corpCode, setCorpCode] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setError('Missing checkout session.');
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/corporate/complete?session_id=${encodeURIComponent(sessionId)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Could not finalize setup');
        setCorpCode(data.corpCode);
        setCompanyName(data.companyName);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Setup could not be confirmed');
      }
    })();
  }, [sessionId]);

  const copyCode = async () => {
    if (!corpCode) return;
    await navigator.clipboard.writeText(corpCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f3] py-16 px-4">
      <div className="mx-auto max-w-xl rounded-2xl border border-[#1f2c4a]/10 bg-white p-8 shadow-sm text-center">
        {error && (
          <>
            <h1 className="text-2xl font-semibold text-[#1f2c4a]">Setup incomplete</h1>
            <p className="mt-3 text-[#64748b]">{error}</p>
            <Link href="/corporate/onboard" className="mt-6 inline-block text-[#fa4a23] font-medium hover:underline">
              Try again
            </Link>
          </>
        )}

        {!error && !corpCode && (
          <p className="text-[#64748b]">Confirming your card setup…</p>
        )}

        {!error && corpCode && (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
              ✓
            </div>
            <h1 className="text-2xl font-semibold text-[#1f2c4a]">Corporate billing is active</h1>
            {companyName && <p className="mt-2 text-[#64748b]">{companyName}</p>}

            <p className="mt-6 text-sm text-[#64748b]">
              Share this code with your team at checkout. Enrollments bill to your saved card. A confirmation
              email has also been sent to your billing contact.
            </p>

            <button
              type="button"
              onClick={copyCode}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-[#fa4a23]/60 bg-white px-6 py-3 font-mono text-xl font-bold tracking-wide text-[#e8431f]"
            >
              {corpCode}
              <span className="text-sm font-sans font-medium text-[#64748b]">
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </button>

            <p className="mt-8 text-left text-sm text-[#64748b] leading-relaxed">
              At course checkout, enter this code in the <strong>Corporate billing code</strong> field.
              The employee completes enrollment; your corporate card is charged automatically.
            </p>

            <Link
              href="/courses"
              className="mt-8 inline-block rounded-lg bg-[#1f2c4a] px-8 py-3 font-medium text-white hover:bg-[#16243f]"
            >
              Browse courses
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function CorporateOnboardSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f7f3] py-16 text-center text-[#64748b]">Loading…</div>}>
      <SuccessContent />
    </Suspense>
  );
}
