import type { SupabaseClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';
import {
  assertEmployeeEmailAllowedForCorporateAccount,
  getActiveCorporateAccountByCode,
  normalizeCorporateCode,
  resolveCorporatePaymentMethod,
} from '@/app/lib/corporate';

type CorporateChargeInput = {
  corporateCode: string;
  amountDollars: number;
  currency?: string;
  description: string;
  employeeEmail: string;
  employeeName: string;
  metadata: Record<string, string>;
};

export async function chargeCorporateAccount(
  stripe: Stripe,
  supabase: SupabaseClient,
  input: CorporateChargeInput,
): Promise<{ paymentIntent: Stripe.PaymentIntent; corpCode: string; companyName: string }> {
  const code = normalizeCorporateCode(input.corporateCode);
  if (!code) {
    throw new Error('Corporate billing code is required');
  }

  const account = await getActiveCorporateAccountByCode(supabase, code);
  if (!account) {
    throw new Error('Invalid or inactive corporate billing code');
  }

  assertEmployeeEmailAllowedForCorporateAccount(account, input.employeeEmail.trim().toLowerCase());

  const paymentMethodId = await resolveCorporatePaymentMethod(stripe, account);
  if (!paymentMethodId) {
    throw new Error('Corporate account has no card on file. Ask your admin to complete setup.');
  }

  const amountCents = Math.round(input.amountDollars * 100);
  if (!Number.isFinite(amountCents) || amountCents <= 0) {
    throw new Error('Invalid payment amount');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: input.currency ?? 'usd',
    customer: account.stripe_customer_id,
    payment_method: paymentMethodId,
    off_session: true,
    confirm: true,
    description: input.description,
    receipt_email: input.employeeEmail,
    statement_descriptor: 'Agile36 Course',
    metadata: {
      ...input.metadata,
      corporateCode: code,
      corporateAccountId: account.id,
      companyName: account.company_name,
      billedTo: 'corporate',
      employeeEmail: input.employeeEmail,
      employeeName: input.employeeName,
    },
  });

  if (paymentIntent.status !== 'succeeded') {
    throw new Error(`Corporate charge failed (${paymentIntent.status})`);
  }

  return {
    paymentIntent,
    corpCode: code,
    companyName: account.company_name,
  };
}
