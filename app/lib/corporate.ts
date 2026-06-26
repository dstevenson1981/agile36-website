import type { SupabaseClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';

export type CorporateAccountRow = {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  contact_title: string | null;
  corp_code: string;
  stripe_customer_id: string;
  stripe_payment_method_id: string | null;
  status: 'pending' | 'active' | 'inactive';
  setup_session_id: string | null;
  authorized_email_domains: string[];
  terms_version: string | null;
  terms_accepted_at: string | null;
  terms_accepted_by_name: string | null;
  terms_accepted_by_title: string | null;
  terms_accepted_by_email: string | null;
  welcome_email_sent_at: string | null;
  created_at?: string;
  updated_at?: string;
};

const CORP_CODE_PREFIX = 'AGILE-';

/** Parse comma/newline-separated domains (e.g. "acme.com, @acme.com"). */
export function parseAuthorizedEmailDomains(raw: string): string[] {
  const parts = raw
    .split(/[,;\s]+/)
    .map((p) => p.trim().toLowerCase().replace(/^@+/, ''))
    .filter(Boolean);
  return [...new Set(parts)];
}

export function extractEmailDomain(email: string): string | null {
  const normalized = email.trim().toLowerCase();
  const at = normalized.lastIndexOf('@');
  if (at < 1 || at === normalized.length - 1) return null;
  return normalized.slice(at + 1);
}

export function employeeEmailAllowedForCorporateAccount(
  account: CorporateAccountRow,
  employeeEmail: string,
): boolean {
  const domains = account.authorized_email_domains ?? [];
  if (domains.length === 0) return true;
  const domain = extractEmailDomain(employeeEmail);
  if (!domain) return false;
  return domains.includes(domain);
}

export function assertEmployeeEmailAllowedForCorporateAccount(
  account: CorporateAccountRow,
  employeeEmail: string,
): void {
  if (!employeeEmailAllowedForCorporateAccount(account, employeeEmail)) {
    const allowed = (account.authorized_email_domains ?? []).map((d) => `@${d}`).join(', ');
    throw new Error(
      `This corporate billing code requires a company email (${allowed}). Use your work email or contact your billing admin.`,
    );
  }
}

export function normalizeCorporateCode(raw: string | null | undefined): string | null {
  const code = raw?.trim().toUpperCase() ?? '';
  if (!code) return null;
  return code;
}

export function isCorporateCodeFormat(code: string): boolean {
  return /^AGILE-[A-Z0-9]{6}$/.test(code);
}

export function generateCorporateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 6; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${CORP_CODE_PREFIX}${suffix}`;
}

export async function getActiveCorporateAccountByCode(
  supabase: SupabaseClient,
  rawCode: string,
): Promise<CorporateAccountRow | null> {
  const code = normalizeCorporateCode(rawCode);
  if (!code || !isCorporateCodeFormat(code)) return null;

  const { data, error } = await supabase
    .from('corporate_accounts')
    .select('*')
    .eq('corp_code', code)
    .eq('status', 'active')
    .maybeSingle();

  if (error || !data) return null;
  return data as CorporateAccountRow;
}

export async function resolveCorporatePaymentMethod(
  stripe: Stripe,
  account: CorporateAccountRow,
): Promise<string | null> {
  if (account.stripe_payment_method_id) return account.stripe_payment_method_id;

  const customer = await stripe.customers.retrieve(account.stripe_customer_id);
  if (customer.deleted) return null;

  const defaultPm = customer.invoice_settings?.default_payment_method;
  if (typeof defaultPm === 'string') return defaultPm;

  const methods = await stripe.paymentMethods.list({
    customer: account.stripe_customer_id,
    type: 'card',
    limit: 1,
  });
  return methods.data[0]?.id ?? null;
}

export async function activateCorporateAccountFromSetupSession(
  stripe: Stripe,
  supabase: SupabaseClient,
  session: Stripe.Checkout.Session,
): Promise<CorporateAccountRow | null> {
  const accountId = session.metadata?.corporate_account_id;
  if (!accountId || session.mode !== 'setup') return null;

  const setupIntentId =
    typeof session.setup_intent === 'string'
      ? session.setup_intent
      : session.setup_intent?.id;
  if (!setupIntentId) return null;

  const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);
  const paymentMethodId =
    typeof setupIntent.payment_method === 'string'
      ? setupIntent.payment_method
      : setupIntent.payment_method?.id;
  if (!paymentMethodId) return null;

  const customerId =
    typeof session.customer === 'string' ? session.customer : session.customer?.id;
  if (!customerId) return null;

  await stripe.customers.update(customerId, {
    invoice_settings: { default_payment_method: paymentMethodId },
  });

  const { data, error } = await supabase
    .from('corporate_accounts')
    .update({
      status: 'active',
      stripe_payment_method_id: paymentMethodId,
      setup_session_id: session.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', accountId)
    .select('*')
    .single();

  if (error || !data) return null;
  return data as CorporateAccountRow;
}
