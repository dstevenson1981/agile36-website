import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateCorporateCode } from '@/app/lib/corporate';
import { getSiteUrl, getStripe } from '@/app/lib/stripe-server';

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are required');
  }
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const companyName = String(body.companyName ?? '').trim();
    const contactName = String(body.contactName ?? '').trim();
    const contactEmail = String(body.contactEmail ?? '').trim().toLowerCase();
    const contactPhone = String(body.contactPhone ?? '').trim();

    if (!companyName || !contactName || !contactEmail) {
      return NextResponse.json(
        { error: 'Company name, contact name, and work email are required.' },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const stripe = getStripe();
    const supabase = getSupabase();
    const siteUrl = getSiteUrl(request);

    let corpCode = generateCorporateCode();
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const { data: existing } = await supabase
        .from('corporate_accounts')
        .select('id')
        .eq('corp_code', corpCode)
        .maybeSingle();
      if (!existing) break;
      corpCode = generateCorporateCode();
    }

    const customer = await stripe.customers.create({
      email: contactEmail,
      name: contactName,
      phone: contactPhone || undefined,
      metadata: {
        company_name: companyName,
        contact_name: contactName,
        corp_code: corpCode,
        source: 'corporate_onboard',
      },
    });

    const { data: account, error: insertError } = await supabase
      .from('corporate_accounts')
      .insert({
        company_name: companyName,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone || null,
        corp_code: corpCode,
        stripe_customer_id: customer.id,
        status: 'pending',
      })
      .select('id, corp_code')
      .single();

    if (insertError || !account) {
      return NextResponse.json(
        { error: insertError?.message ?? 'Failed to save corporate account' },
        { status: 500 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'setup',
      customer: customer.id,
      payment_method_types: ['card'],
      success_url: `${siteUrl}/corporate/onboard/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/corporate/onboard/cancel`,
      metadata: {
        corporate_account_id: account.id,
        corp_code: corpCode,
        company_name: companyName,
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Failed to create Stripe Checkout session' }, { status: 500 });
    }

    await supabase
      .from('corporate_accounts')
      .update({ setup_session_id: session.id, updated_at: new Date().toISOString() })
      .eq('id', account.id);

    return NextResponse.json({ url: session.url, corpCode: account.corp_code });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to start corporate onboarding';
    console.error('corporate onboard error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
