import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json();

    if (!token && !email) {
      return NextResponse.json(
        { error: 'Token or email is required' },
        { status: 400 }
      );
    }

    // Supabase setup
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Find unsubscribe record by token
    let unsubscribeEmail = email;

    if (token) {
      const { data: unsubscribeRecord, error: findError } = await supabase
        .from('email_unsubscribes')
        .select('email')
        .eq('token', token)
        .single();

      if (findError || !unsubscribeRecord) {
        return NextResponse.json(
          { error: 'Invalid unsubscribe token' },
          { status: 404 }
        );
      }

      unsubscribeEmail = unsubscribeRecord.email;
    }

    if (!unsubscribeEmail) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 400 }
      );
    }

    // Update contact subscription status
    const { error: updateError } = await supabase
      .from('email_contacts')
      .update({ subscribed: false })
      .eq('email', unsubscribeEmail);

    if (updateError) {
      console.error('Error updating contact:', updateError);
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      );
    }

    // Ensure unsubscribe record exists
    if (token) {
      await supabase
        .from('email_unsubscribes')
        .upsert({
          email: unsubscribeEmail,
          token: token,
          unsubscribed_at: new Date().toISOString(),
        }, {
          onConflict: 'token'
        });
    } else {
      await supabase
        .from('email_unsubscribes')
        .insert({
          email: unsubscribeEmail,
          token: crypto.randomBytes(32).toString('hex'),
          unsubscribed_at: new Date().toISOString(),
        });
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed',
    });
  } catch (error: any) {
    console.error('Error processing unsubscribe:', error);
    return NextResponse.json(
      { error: `Failed to unsubscribe: ${error.message}` },
      { status: 500 }
    );
  }
}

