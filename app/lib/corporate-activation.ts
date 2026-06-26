import type { SupabaseClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';
import {
  activateCorporateAccountFromSetupSession,
  type CorporateAccountRow,
} from '@/app/lib/corporate';
import { sendCorporateWelcomeEmail } from '@/app/lib/send-corporate-welcome-email';

/** Activate account and send welcome email once (idempotent). */
export async function finalizeCorporateActivation(
  stripe: Stripe,
  supabase: SupabaseClient,
  session: Stripe.Checkout.Session,
  siteUrl: string,
): Promise<CorporateAccountRow | null> {
  const account = await activateCorporateAccountFromSetupSession(stripe, supabase, session);
  if (!account || account.status !== 'active') return account;

  if (!account.welcome_email_sent_at) {
    const result = await sendCorporateWelcomeEmail(account, siteUrl);
    if (result.ok) {
      await supabase
        .from('corporate_accounts')
        .update({
          welcome_email_sent_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', account.id);
    } else {
      console.warn('[finalizeCorporateActivation] welcome email not sent:', result.reason);
    }
  }

  return account;
}
