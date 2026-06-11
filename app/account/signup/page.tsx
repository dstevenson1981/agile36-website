'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
        setMessage({
          type: 'success',
          text: data.message || 'Confirmation email sent again. Check inbox and spam.',
        });
      } else {
        setMessage({ type: 'error', text: data.error || 'Could not resend. Try again in a few minutes.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Could not resend. Try again.' });
    }
    setResending(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setNeedsConfirmation(false);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password, name: name.trim() }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data?.alreadyExists) {
          setMessage({
            type: 'error',
            text: 'An account with this email already exists. Sign in below, or reset your password if you don\'t remember it.',
          });
        } else {
          setMessage({ type: 'error', text: data.error || 'Sign up failed' });
        }
        setLoading(false);
        return;
      }

      const confirm = !!data?.needsConfirmation;
      setNeedsConfirmation(confirm);
      setMessage({
        type: 'success',
        text: confirm
          ? 'Check your email to confirm your account. Click the link, then sign in. If nothing arrives in a few minutes, check spam or promotions — work inboxes (e.g. strict filters) may delay or block automated mail.'
          : 'Account created. You can sign in now.',
      });
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] bg-black text-[#1f2c4a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="liquid-glass rounded-2xl p-8">
          <h1 className="text-2xl font-normal text-[#1f2c4a] mb-2" style={{ letterSpacing: '-0.03em' }}>Create your account</h1>
          <p className="text-[#475569] mb-6">
            Sign up to access your orders, receipts, and learning resources.
          </p>
          <p className="text-sm text-[#64748b] mb-6 -mt-4">
            Use the same email you used when enrolling in a course to see your orders and receipts.
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#475569] mb-1">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#475569] mb-1">Email</label>
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
              <label htmlFor="password" className="block text-sm font-medium text-[#475569] mb-1">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg bg-[#1f2c4a]/10 border border-[#1f2c4a]/20 text-[#1f2c4a] placeholder-[#94a3b8] focus:border-[#1f2c4a]/50 focus:outline-none transition"
                placeholder="••••••••"
              />
              <p className="text-xs text-[#64748b] mt-1">At least 6 characters</p>
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  message.type === 'success' ? 'bg-green-500/10 text-green-700' : 'bg-red-500/10 text-red-600'
                }`}
              >
                {message.text}
                {message.type === 'success' && needsConfirmation && email.trim() && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleResendConfirmation}
                      disabled={resending}
                      className="text-[#d97706] font-medium hover:underline disabled:opacity-50"
                    >
                      {resending ? 'Sending…' : 'Resend confirmation email'}
                    </button>
                  </div>
                )}
                {message.type === 'error' && message.text.includes('already exists') && (
                  <div className="mt-2 flex gap-3">
                    <Link href="/account/login" className="text-[#d97706] font-medium hover:underline">
                      Sign in
                    </Link>
                    <Link href="/account/forgot-password" className="text-[#d97706] font-medium hover:underline">
                      Reset password
                    </Link>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#1f2c4a] text-white font-medium rounded-lg hover:bg-[#16243f] disabled:opacity-50 transition"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#64748b]">
            Already have an account?{' '}
            <Link href="/account/login" className="text-[#d97706] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
