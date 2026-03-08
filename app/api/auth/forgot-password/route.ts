import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';

/**
 * Server-side password reset request - bypasses corporate firewalls.
 * Sends a password reset email via Supabase.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body?.email;
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const supabase = await createClient();
    const redirectTo =
      body.redirectTo ||
      `${process.env.NEXT_PUBLIC_SITE_URL || request.headers.get('origin') || 'https://www.agile36.com'}/account/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
