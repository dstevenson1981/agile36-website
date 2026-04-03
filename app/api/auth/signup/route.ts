import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';

/**
 * Server-side signup — same pattern as /api/auth/login so corporate networks
 * that block direct browser calls to Supabase can still register.
 * Confirmation links use /auth/confirm?next=/account (PKCE verifyOtp).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const name = typeof body?.name === 'string' ? body.name.trim() : '';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const supabase = await createClient();
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      request.headers.get('origin') ||
      'https://www.agile36.com';
    const emailRedirectTo = `${baseUrl}/auth/confirm?next=/account`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, full_name: name },
        emailRedirectTo,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const identities = data?.user?.identities ?? [];
    if (data?.user && identities.length === 0) {
      return NextResponse.json(
        {
          error:
            'An account with this email already exists. Sign in, or reset your password if needed.',
          alreadyExists: true,
        },
        { status: 409 }
      );
    }

    const needsConfirmation = !!(data?.user && !data?.session);
    return NextResponse.json({ success: true, needsConfirmation });
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
