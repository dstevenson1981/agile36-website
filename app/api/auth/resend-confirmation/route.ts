import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { getAuthSiteUrl, signupConfirmRedirectUrl } from '@/app/lib/auth-site-url';

/**
 * Resend signup confirmation email.
 * Use when a user gets "Invalid login credentials" because they haven't confirmed yet.
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const supabase = await createClient();
    const emailRedirectTo = signupConfirmRedirectUrl(getAuthSiteUrl(request));

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim(),
      options: {
        emailRedirectTo,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Confirmation email sent. Check your inbox and spam folder.',
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
