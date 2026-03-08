'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next') || '/account';
  const nextUrl = nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/account';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Use server-side API to bypass corporate firewalls that block direct Supabase connections
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Login failed' });
        setLoading(false);
        return;
      }

      router.push(nextUrl);
      router.refresh();
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'Connection failed. If you\'re on a corporate network, try the "Email me a login link" option below, or use a personal device or mobile hotspot.',
      });
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          redirectTo: `${window.location.origin}${nextUrl}`,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Failed to send magic link' });
        setLoading(false);
        return;
      }

      setMessage({ type: 'success', text: 'Check your email for the login link!' });
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
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign in to your account</h1>
          <p className="text-slate-600 mb-6">
            Access your orders, receipts, and practice exams.
          </p>
          <p className="text-sm text-slate-500 mb-6 -mt-4">
            Use the same email you used when enrolling in a course to see your orders and receipts.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <Link
                  href="/account/forgot-password"
                  className="text-sm text-[#fa4a23] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#fa4a23] focus:border-[#fa4a23] outline-none transition"
                placeholder="••••••••"
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
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-2">
              No password yet?{' '}
              <Link href="/account/forgot-password" className="text-[#fa4a23] font-medium hover:underline">
                Reset it
              </Link>
              {' or get a login link:'}
            </p>
            <button
              type="button"
              onClick={handleMagicLink}
              disabled={loading || !email}
              className="w-full py-2 px-4 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 disabled:opacity-50 transition"
            >
              Email me a login link
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            New to Agile36?{' '}
            <Link href="/account/signup" className="text-[#fa4a23] font-medium hover:underline">
              Create account
            </Link>
            {' · '}
            <Link href="/" className="text-[#fa4a23] font-medium hover:underline">
              Browse courses
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
