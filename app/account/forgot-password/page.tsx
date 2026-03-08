'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'invalid_link' || error === 'expired') {
      setMessage({
        type: 'error',
        text: 'That reset link was invalid or has expired. Request a new one below.',
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          redirectTo: `${window.location.origin}/auth/confirm?next=/account/reset-password`,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to send reset email' });
        setLoading(false);
        return;
      }

      setSent(true);
      setMessage({
        type: 'success',
        text: 'Check your email for a link to reset your password. The link expires in 1 hour.',
      });
    } catch {
      setMessage({
        type: 'error',
        text: 'Connection failed. Try from a personal device or mobile hotspot.',
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Reset your password</h1>
          <p className="text-slate-600 mb-6">
            Enter the email address you used when creating your account. We&apos;ll send you a link to reset your password.
          </p>

          {sent ? (
            <>
              <div className="p-3 rounded-lg text-sm bg-emerald-50 text-emerald-800 mb-6">
                {message?.text}
              </div>
              <p className="text-sm text-slate-600 mb-6">
                Didn&apos;t receive the email? Check your spam folder, or{' '}
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-[#fa4a23] font-medium hover:underline"
                >
                  try again
                </button>
                .
              </p>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#fa4a23] focus:border-[#fa4a23] outline-none transition"
                  placeholder="you@company.com"
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                  }`}
                >
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#fa4a23] text-white font-semibold rounded-lg hover:bg-[#e03d1a] disabled:opacity-50 transition"
              >
                {loading ? 'Sending...' : 'Send reset link'}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            <Link href="/account/login" className="text-[#fa4a23] font-medium hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-slate-600">Loading...</div>
      </div>
    }>
      <ForgotPasswordForm />
    </Suspense>
  );
}
