import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import type { EmailOtpType } from '@supabase/supabase-js';

/**
 * Auth callback for email links (signup confirmation, password reset).
 * Supabase redirects here with token_hash and type as query params (PKCE flow).
 * Verifies the OTP and redirects to the appropriate page.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/account/reset-password';

  if (!token_hash || !type) {
    return NextResponse.redirect(
      new URL('/account/forgot-password?error=invalid_link', request.url)
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  if (error) {
    console.error('Auth verifyOtp error:', error.message);
    return NextResponse.redirect(
      new URL('/account/forgot-password?error=expired', request.url)
    );
  }

  return NextResponse.redirect(new URL(next, request.url));
}
