-- Corporate billing accounts: card on file via Stripe Checkout (setup mode) + corp code for employee checkout.
-- Run in Supabase SQL Editor.

CREATE TABLE IF NOT EXISTS corporate_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  corp_code TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT NOT NULL UNIQUE,
  stripe_payment_method_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  setup_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_corporate_accounts_code ON corporate_accounts (UPPER(corp_code));
CREATE INDEX IF NOT EXISTS idx_corporate_accounts_email ON corporate_accounts (LOWER(contact_email));

ALTER TABLE corporate_accounts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role manages corporate accounts" ON corporate_accounts;
CREATE POLICY "Service role manages corporate accounts" ON corporate_accounts
  FOR ALL
  USING (auth.role() = 'service_role');
