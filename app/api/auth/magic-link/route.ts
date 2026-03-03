import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';

/**
 * Server-side magic link - bypasses corporate firewalls that block direct Supabase connections.
 */
export async function POST(request: Request) {
  try {
    const { email, redirectTo } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo || 'https://www.agile36.com/account',
      },
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
