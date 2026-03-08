import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';

/**
 * Server-side login - bypasses corporate firewalls that block direct Supabase connections.
 * The auth request runs on Vercel's server, not the user's browser.
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });

    if (error) {
      // Supabase returns "Invalid login credentials" for unconfirmed emails (security).
      // Provide a helpful message so users know to check their inbox.
      const isInvalidCreds = error.message === 'Invalid login credentials' || error.code === 'invalid_credentials';
      const isEmailNotConfirmed = error.message === 'Email not confirmed' || error.code === 'email_not_confirmed';
      const helpfulMessage =
        isInvalidCreds || isEmailNotConfirmed
          ? 'Invalid login credentials. If you just signed up, check your email (and spam folder) for the confirmation link. Click it to verify your account, then try again.'
          : error.message;
      return NextResponse.json(
        { error: helpfulMessage, needsConfirmation: isInvalidCreds || isEmailNotConfirmed },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
