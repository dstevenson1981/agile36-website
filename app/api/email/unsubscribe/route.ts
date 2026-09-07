import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

function normalizeEmail(value: unknown): string {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function getDatabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')?.trim() || '';
  if (!token) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const config = getDatabaseConfig();
  if (!config) {
    return NextResponse.json({ valid: false }, { status: 500 });
  }

  const supabase = createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase
    .from('email_unsubscribes')
    .select('id')
    .eq('token', token)
    .limit(1);

  if (error) {
    console.error('Error validating unsubscribe token:', error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }

  return NextResponse.json({ valid: Boolean(data?.length) });
}

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json();
    const incomingToken = typeof token === 'string' ? token.trim() : '';
    const incomingEmail = normalizeEmail(email);

    if (!incomingToken && !incomingEmail) {
      return NextResponse.json(
        { error: 'Token or email is required' },
        { status: 400 }
      );
    }

    const config = getDatabaseConfig();
    if (!config) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(config.url, config.key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    let unsubscribeEmail = incomingEmail;

    if (incomingToken) {
      const { data: unsubscribeRecord } = await supabase
        .from('email_unsubscribes')
        .select('email, unsubscribed_at')
        .eq('token', incomingToken)
        .limit(1);

      const row = unsubscribeRecord?.[0];
      if (!row?.email) {
        return NextResponse.json(
          { error: 'Invalid unsubscribe token' },
          { status: 404 }
        );
      }
      unsubscribeEmail = normalizeEmail(row.email);
    }

    if (!unsubscribeEmail) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const { error: updateError } = await supabase
      .from('email_contacts')
      .update({ subscribed: false })
      .ilike('email', unsubscribeEmail);

    if (updateError) {
      console.error('Error updating contact:', updateError);
    }

    if (incomingToken) {
      await supabase
        .from('email_unsubscribes')
        .update({
          email: unsubscribeEmail,
          unsubscribed_at: now,
        })
        .eq('token', incomingToken);
    } else {
      const { data: existing } = await supabase
        .from('email_unsubscribes')
        .select('id')
        .ilike('email', unsubscribeEmail)
        .not('unsubscribed_at', 'is', null)
        .limit(1);

      if (!existing?.length) {
        await supabase.from('email_unsubscribes').insert({
          email: unsubscribeEmail,
          token: crypto.randomBytes(32).toString('hex'),
          unsubscribed_at: now,
        });
      }
    }

    return NextResponse.json({
      success: true,
      email: unsubscribeEmail,
      message: 'Successfully unsubscribed',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to unsubscribe';
    console.error('Error processing unsubscribe:', error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
