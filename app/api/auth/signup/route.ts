import { NextResponse } from 'next/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { createClient } from '@/app/lib/supabase/server';
import { getAuthSiteUrl, signupConfirmRedirectUrl } from '@/app/lib/auth-site-url';
import { sendSignupConfirmationEmail } from '@/app/lib/send-signup-confirmation-email';

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

    const emailRedirectTo = signupConfirmRedirectUrl(getAuthSiteUrl(request));
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceKey && process.env.SENDGRID_API_KEY) {
      const admin = createServiceClient(supabaseUrl, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { data, error } = await admin.auth.admin.generateLink({
        type: 'signup',
        email,
        password,
        options: {
          data: { name, full_name: name },
          redirectTo: emailRedirectTo,
        },
      });

      if (error) {
        const alreadyRegistered =
          /already|registered|exists/i.test(error.message) ||
          error.code === 'email_exists' ||
          error.code === 'user_already_exists';

        return NextResponse.json(
          alreadyRegistered
            ? {
                error:
                  'An account with this email already exists. Sign in, or reset your password if needed.',
                alreadyExists: true,
              }
            : { error: error.message },
          { status: alreadyRegistered ? 409 : 400 }
        );
      }

      const actionLink = data?.properties?.action_link;
      if (actionLink) {
        const sent = await sendSignupConfirmationEmail(email, actionLink, name);
        if (sent.ok) {
          return NextResponse.json({ success: true, needsConfirmation: true });
        }
        console.error('[signup] SendGrid failed:', sent.reason);

        const supabase = await createClient();
        await supabase.auth.resend({
          type: 'signup',
          email,
          options: { emailRedirectTo },
        });

        return NextResponse.json({
          success: true,
          needsConfirmation: true,
          warning:
            'Account created, but the primary confirmation email provider failed. A backup confirmation email was requested.',
        });
      }
    }

    const supabase = await createClient();

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
