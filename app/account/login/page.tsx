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
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();

  const handleResendConfirmation = async () => {
    if (!email.trim()) return;
    setResending(true);
    setMessage(null);
    try {
      const res = await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMessage({ type: 'success', text: data.message || 'Confirmation email sent. Check your inbox and spam folder.' });
        setNeedsConfirmation(false);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to resend' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to resend. Try again.' });
    }
    setResending(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setNeedsConfirmation(false);

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
        setNeedsConfirmation(!!data.needsConfirmation);
        setLoading(false);
        return;
      }

      router.push(nextUrl);
      router.refresh();
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'Connection failed. Try from a personal device or mobile hotspot.',
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] bg-black text-[#1f2c4a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="liquid-glass rounded-2xl p-8">
          <h1 className="text-2xl font-normal text-[#1f2c4a] mb-2" style={{ letterSpacing: '-0.03em' }}>Sign in to your account</h1>
          <p className="text-[#475569] mb-6">
            Access your orders, receipts, and practice exams.
          </p>
          <p className="text-sm text-[#64748b] mb-6 -mt-4">
            Use the same email you used when enrolling in a course to see your orders and receipts.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#475569] mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none transition"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-[#475569]">
                  Password
                </label>
                <Link
                  href="/account/forgot-password"
                  className="text-sm text-[#d97706] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  message.type === 'success' ? 'bg-green-500/10 text-green-700' : 'bg-red-500/10 text-red-600'
                }`}
              >
                {message.text}
                {message.type === 'error' && needsConfirmation && email.trim() && (
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    disabled={resending}
                    className="mt-2 block w-full text-left text-[#d97706] font-medium hover:underline disabled:opacity-50"
                  >
                    {resending ? 'Sending...' : 'Resend confirmation email'}
                  </button>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#1f2c4a] text-white font-medium rounded-lg hover:bg-[#16243f] disabled:opacity-50 transition"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>


          <p className="mt-6 text-center text-sm text-[#64748b]">
            New to Agile36?{' '}
            <Link href="/account/signup" className="text-[#d97706] font-medium hover:underline">
              Create account
            </Link>
            {' · '}
            <Link href="/" className="text-[#d97706] font-medium hover:underline">
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
    <Suspense fallback={<div className="min-h-[60vh] bg-black text-[#475569] flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
