'use client';

import { useState } from 'react';
import { createClient } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, full_name: name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.agile36.com'}/account/login`,
      },
    });

    if (error) {
      if (error.message.toLowerCase().includes('already registered') || error.message.toLowerCase().includes('already exists')) {
        setMessage({
          type: 'error',
          text: 'An account with this email already exists. Sign in below, or reset your password if you don\'t remember it.',
        });
      } else {
        setMessage({ type: 'error', text: error.message });
      }
      setLoading(false);
      return;
    }

    // Supabase returns success with empty identities when email already exists (no error for security)
    const identities = data?.user?.identities ?? [];
    if (data?.user && identities.length === 0) {
      setMessage({
        type: 'error',
        text: 'An account with this email already exists. Sign in below, or reset your password if you don\'t remember it.',
      });
      setLoading(false);
      return;
    }

    const needsConfirmation = data?.user && !data?.session;
    setMessage({
      type: 'success',
      text: needsConfirmation
        ? 'Check your email to confirm your account. Click the link in the email, then sign in.'
        : 'Account created. You can sign in now.',
    });
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Create your account</h1>
          <p className="text-slate-600 mb-6">
            Sign up to access your orders, receipts, and learning resources.
          </p>
          <p className="text-sm text-slate-500 mb-6 -mt-4">
            Use the same email you used when enrolling in a course to see your orders and receipts.
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#fa4a23] focus:border-[#fa4a23] outline-none transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
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
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
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
              <p className="text-xs text-slate-500 mt-1">At least 6 characters</p>
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                }`}
              >
                {message.text}
                {message.type === 'error' && message.text.includes('already exists') && (
                  <div className="mt-2 flex gap-3">
                    <Link href="/account/login" className="text-[#fa4a23] font-medium hover:underline">
                      Sign in
                    </Link>
                    <Link href="/account/forgot-password" className="text-[#fa4a23] font-medium hover:underline">
                      Reset password
                    </Link>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#fa4a23] text-white font-semibold rounded-lg hover:bg-[#e03d1a] disabled:opacity-50 transition"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/account/login" className="text-[#fa4a23] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
