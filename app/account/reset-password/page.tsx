'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/app/lib/supabase/client';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function init() {
      // Flow 1: Hash fragment (legacy) - access_token & refresh_token in URL hash
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.slice(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const type = params.get('type');
        if (type === 'recovery' && accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (!sessionError) {
            window.history.replaceState(null, '', '/account/reset-password');
            setReady(true);
            return;
          }
        }
      }

      // Flow 2: Session from /auth/confirm (PKCE) - user already has session after verifyOtp
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setReady(true);
        return;
      }

      setError('Invalid or expired reset link. Please request a new one.');
      setReady(true);
    }
    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    setTimeout(() => router.push('/account'), 2000);
  };

  if (!ready) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <p className="text-slate-600">Verifying your reset link...</p>
        </div>
      </div>
    );
  }

  if (error && !success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Link expired</h1>
            <p className="text-slate-600 mb-6">{error}</p>
            <Link
              href="/account/forgot-password"
              className="inline-block w-full py-3 px-4 bg-[#fa4a23] text-white font-semibold rounded-lg hover:bg-[#e03d1a] text-center transition"
            >
              Request a new reset link
            </Link>
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

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Password updated</h1>
            <p className="text-slate-600 mb-6">
              Your password has been reset. Redirecting you to your account...
            </p>
            <Link href="/account" className="text-[#fa4a23] font-medium hover:underline">
              Go to account now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Set a new password</h1>
          <p className="text-slate-600 mb-6">
            Enter your new password below. Use at least 6 characters.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                New password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#fa4a23] focus:border-[#fa4a23] outline-none transition"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-slate-700 mb-1">
                Confirm password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#fa4a23] focus:border-[#fa4a23] outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg text-sm bg-red-50 text-red-800">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#fa4a23] text-white font-semibold rounded-lg hover:bg-[#e03d1a] disabled:opacity-50 transition"
            >
              {loading ? 'Updating...' : 'Update password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
