-- Corporate accounts: terms acceptance, email domains, welcome email tracking.
-- Applied via Supabase migration corporate_accounts_terms_and_domains.

ALTER TABLE corporate_accounts
  ADD COLUMN IF NOT EXISTS contact_title TEXT,
  ADD COLUMN IF NOT EXISTS authorized_email_domains TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS terms_version TEXT,
  ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS terms_accepted_by_name TEXT,
  ADD COLUMN IF NOT EXISTS terms_accepted_by_title TEXT,
  ADD COLUMN IF NOT EXISTS terms_accepted_by_email TEXT,
  ADD COLUMN IF NOT EXISTS welcome_email_sent_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_corporate_accounts_status ON corporate_accounts (status);
