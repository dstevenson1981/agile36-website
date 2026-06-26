import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { finalizeCorporateActivation } from '@/app/lib/corporate-activation';
import { getSiteUrl, getStripe } from '@/app/lib/stripe-server';

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are required');
  }
  return createClient(supabaseUrl, supabaseKey);
}

/** Finalize setup after Stripe Checkout redirect (idempotent with webhook). */
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id')?.trim();
    if (!sessionId) {
      return NextResponse.json({ error: 'session_id is required' }, { status: 400 });
    }

    const stripe = getStripe();
    const supabase = getSupabase();
    const siteUrl = getSiteUrl(request);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.mode !== 'setup' || session.status !== 'complete') {
      return NextResponse.json({ error: 'Checkout session is not complete' }, { status: 400 });
    }

    const account = await finalizeCorporateActivation(stripe, supabase, session, siteUrl);
    if (!account) {
      return NextResponse.json({ error: 'Unable to activate corporate account' }, { status: 404 });
    }

    return NextResponse.json({
      companyName: account.company_name,
      corpCode: account.corp_code,
      contactEmail: account.contact_email,
      authorizedEmailDomains: account.authorized_email_domains ?? [],
      status: account.status,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to complete onboarding';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
