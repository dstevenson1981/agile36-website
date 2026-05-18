import { NextResponse } from 'next/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { createClient } from '@/app/lib/supabase/server';
import { getAuthSiteUrl, passwordResetRedirectUrl } from '@/app/lib/auth-site-url';
import { sendPasswordResetEmail } from '@/app/lib/send-password-reset-email';

/**
 * Server-side password reset — sends via SendGrid when configured (reliable delivery),
 * otherwise falls back to Supabase Auth email.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body?.email;
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const trimmedEmail = email.trim();
    const redirectTo = passwordResetRedirectUrl(getAuthSiteUrl(request));

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceKey && process.env.SENDGRID_API_KEY) {
      const admin = createServiceClient(supabaseUrl, serviceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { data, error } = await admin.auth.admin.generateLink({
        type: 'recovery',
        email: trimmedEmail,
        options: { redirectTo },
      });

      if (!error && data?.properties?.action_link) {
        const sent = await sendPasswordResetEmail(trimmedEmail, data.properties.action_link);
        if (sent.ok) {
          return NextResponse.json({ success: true });
        }
        console.error('[forgot-password] SendGrid failed:', sent.reason);
      } else if (error) {
        console.error('[forgot-password] generateLink:', error.message);
      }
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo,
    });

    if (error) {
      console.error('[forgot-password] resetPasswordForEmail:', error.message);
      if (/redirect|url/i.test(error.message)) {
        return NextResponse.json(
          {
            error:
              'Password reset is temporarily unavailable. Please contact support@agile36.com.',
          },
          { status: 503 },
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[forgot-password] unexpected:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    );
  }
}
