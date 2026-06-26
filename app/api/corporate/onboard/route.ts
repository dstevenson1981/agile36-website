import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  generateCorporateCode,
  parseAuthorizedEmailDomains,
  extractEmailDomain,
} from '@/app/lib/corporate';
import { CORPORATE_TERMS_VERSION } from '@/app/lib/corporate-terms';
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
    const contactTitle = String(body.contactTitle ?? '').trim();
    const contactEmail = String(body.contactEmail ?? '').trim().toLowerCase();
    const contactPhone = String(body.contactPhone ?? '').trim();
    const authorizedEmailDomainsRaw = String(body.authorizedEmailDomains ?? '').trim();
    const termsAccepted = body.termsAccepted === true;

    if (!companyName || !contactName || !contactEmail || !contactTitle) {
      return NextResponse.json(
        { error: 'Company name, billing contact name, title, and work email are required.' },
        { status: 400 },
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        { error: 'You must accept the Corporate Billing Terms & Conditions to continue.' },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    let authorizedEmailDomains = parseAuthorizedEmailDomains(authorizedEmailDomainsRaw);
    if (authorizedEmailDomains.length === 0) {
      const billingDomain = extractEmailDomain(contactEmail);
      if (billingDomain) authorizedEmailDomains = [billingDomain];
    }
    if (authorizedEmailDomains.length === 0) {
      return NextResponse.json(
        { error: 'Enter at least one authorized company email domain (e.g. company.com).' },
        { status: 400 },
      );
    }

    const billingDomain = extractEmailDomain(contactEmail);
    if (billingDomain && !authorizedEmailDomains.includes(billingDomain)) {
      return NextResponse.json(
        {
          error: `Your work email must use an authorized domain (${authorizedEmailDomains.map((d) => `@${d}`).join(', ')}).`,
        },
        { status: 400 },
      );
    }

    const stripe = getStripe();
    const supabase = getSupabase();
    const siteUrl = getSiteUrl(request);
    const termsAcceptedAt = new Date().toISOString();

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
        contact_title: contactTitle,
        contact_email: contactEmail,
        contact_phone: contactPhone || null,
        corp_code: corpCode,
        stripe_customer_id: customer.id,
        status: 'pending',
        authorized_email_domains: authorizedEmailDomains,
        terms_version: CORPORATE_TERMS_VERSION,
        terms_accepted_at: termsAcceptedAt,
        terms_accepted_by_name: contactName,
        terms_accepted_by_title: contactTitle,
        terms_accepted_by_email: contactEmail,
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
