'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/client';

function AuthConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'error'>('verifying');

  useEffect(() => {
    const supabase = createClient();
    // Password-reset emails pass next=/account/reset-password; signup should pass next=/account.
    const rawNext = searchParams.get('next');
    const next =
      rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/account';

    async function handleAuth() {
      let flowType: string | null = searchParams.get('type');

      // Flow 1: Hash fragment (legacy) - access_token & refresh_token
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.slice(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        flowType = flowType ?? params.get('type');
        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (!error) {
            window.history.replaceState(null, '', window.location.pathname);
            router.replace(next);
            return;
          }
        }
      }

      // Flow 2: Query params (PKCE) - token_hash & type
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as 'recovery' | 'signup' | 'invite' | 'magiclink' | 'email_change',
        });
        if (!error) {
          router.replace(next);
          return;
        }
      }

      // Flow 3: Query param code (PKCE auth code exchange)
      const code = searchParams.get('code');
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          router.replace(next);
          return;
        }
      }

      // Some links can fail verifyOtp after session has already been established.
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.replace(next);
        return;
      }

      const isRecoveryFlow = flowType === 'recovery';
      setStatus('error');
      if (isRecoveryFlow) {
        router.replace('/account/forgot-password?error=invalid_link');
      } else {
        router.replace('/account/login?error=invalid_or_expired_link');
      }
    }

    handleAuth();
  }, [router, searchParams]);

  if (status === 'error') {
    return null; // Redirecting
  }

  return (
    <div className="min-h-[60vh] bg-black text-[#1f2c4a] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[#475569]">Verifying your link...</p>
        <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-[#d97706] mx-auto" />
      </div>
    </div>
  );
}

/**
 * Auth callback for email links (signup confirmation, password reset).
 * Handles both formats Supabase may use:
 * 1. Hash fragment: #access_token=...&refresh_token=...&type=recovery (legacy)
 * 2. Query params: ?token_hash=...&type=recovery (PKCE)
 */
export default function AuthConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] bg-black flex items-center justify-center">
        <p className="text-[#475569]">Loading...</p>
      </div>
    }>
      <AuthConfirmContent />
    </Suspense>
  );
}
