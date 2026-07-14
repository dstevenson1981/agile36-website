-- Land-and-expand sales agent schema (v0)
-- Applied to production via Supabase MCP; kept here for repo history.
-- Source of truth for registrations: public.orders (upsell_signal_processed)

CREATE TABLE IF NOT EXISTS land_expand_agent_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  status text NOT NULL DEFAULT 'running'
    CHECK (status IN ('running', 'completed', 'failed')),
  orders_seen int NOT NULL DEFAULT 0,
  orders_processed int NOT NULL DEFAULT 0,
  opportunities_created int NOT NULL DEFAULT 0,
  errors jsonb NOT NULL DEFAULT '[]'::jsonb,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS land_expand_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  apollo_company_id text UNIQUE,
  name text NOT NULL,
  domain text,
  industry text,
  employee_count int,
  linkedin_url text,
  blocked boolean NOT NULL DEFAULT false,
  blocked_reason text,
  last_contacted_at timestamptz,
  cooldown_until timestamptz,
  prior_agile36_purchase_count int NOT NULL DEFAULT 0,
  customer_count int NOT NULL DEFAULT 0,
  fact_sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS land_expand_companies_domain_uidx
  ON land_expand_companies (lower(domain))
  WHERE domain IS NOT NULL;

CREATE TABLE IF NOT EXISTS land_expand_source_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text,
  course_slug text NOT NULL,
  course_name text NOT NULL,
  amount numeric NOT NULL,
  registered_at timestamptz NOT NULL,
  job_title text,
  department text,
  seniority text,
  linkedin_url text,
  apollo_person_id text,
  company_id uuid REFERENCES land_expand_companies(id),
  enrichment_status text NOT NULL DEFAULT 'pending'
    CHECK (enrichment_status IN (
      'pending', 'enriched', 'uncertain', 'skipped_personal_email',
      'skipped_no_employer', 'skipped_low_confidence', 'error'
    )),
  enrichment_confidence numeric,
  needs_human_review boolean NOT NULL DEFAULT false,
  skip_reason text,
  fact_sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  apollo_raw jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS land_expand_source_customers_email_idx
  ON land_expand_source_customers (lower(email));
CREATE INDEX IF NOT EXISTS land_expand_source_customers_company_idx
  ON land_expand_source_customers (company_id);

CREATE TABLE IF NOT EXISTS land_expand_prospects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES land_expand_companies(id) ON DELETE CASCADE,
  apollo_person_id text,
  email text,
  first_name text,
  last_name text,
  full_name text,
  job_title text,
  seniority text,
  department text,
  linkedin_url text,
  relevance_score numeric NOT NULL DEFAULT 0,
  blocked boolean NOT NULL DEFAULT false,
  blocked_reason text,
  opted_out boolean NOT NULL DEFAULT false,
  last_contacted_at timestamptz,
  cooldown_until timestamptz,
  fact_sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  apollo_raw jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (company_id, apollo_person_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS land_expand_prospects_email_uidx
  ON land_expand_prospects (lower(email))
  WHERE email IS NOT NULL;

CREATE TABLE IF NOT EXISTS land_expand_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_run_id uuid REFERENCES land_expand_agent_runs(id),
  source_customer_id uuid NOT NULL REFERENCES land_expand_source_customers(id) ON DELETE CASCADE,
  company_id uuid NOT NULL REFERENCES land_expand_companies(id),
  recommended_offer text NOT NULL,
  recommendation_reason text NOT NULL,
  opportunity_score numeric NOT NULL DEFAULT 0,
  supporting_evidence jsonb NOT NULL DEFAULT '[]'::jsonb,
  outreach_strategy text,
  estimated_seats int,
  status text NOT NULL DEFAULT 'pending_approval'
    CHECK (status IN (
      'pending_approval', 'approved', 'rejected', 'snoozed',
      'needs_review', 'executed', 'blocked'
    )),
  snooze_until timestamptz,
  review_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS land_expand_opportunity_prospects (
  opportunity_id uuid NOT NULL REFERENCES land_expand_opportunities(id) ON DELETE CASCADE,
  prospect_id uuid NOT NULL REFERENCES land_expand_prospects(id) ON DELETE CASCADE,
  PRIMARY KEY (opportunity_id, prospect_id)
);

CREATE TABLE IF NOT EXISTS land_expand_outreach_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid NOT NULL REFERENCES land_expand_opportunities(id) ON DELETE CASCADE,
  prospect_id uuid NOT NULL REFERENCES land_expand_prospects(id) ON DELETE CASCADE,
  subject text NOT NULL,
  body_text text NOT NULL,
  body_html text,
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN (
      'draft', 'pending_approval', 'approved', 'edited', 'rejected',
      'snoozed', 'queued', 'sent', 'replied', 'opted_out', 'failed'
    )),
  edited_subject text,
  edited_body_text text,
  scheduled_for timestamptz,
  sent_at timestamptz,
  email_queue_id uuid,
  response_at timestamptz,
  response_sentiment text,
  fact_sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (opportunity_id, prospect_id)
);

CREATE INDEX IF NOT EXISTS land_expand_outreach_status_idx
  ON land_expand_outreach_messages (status);

CREATE TABLE IF NOT EXISTS land_expand_conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES land_expand_opportunities(id),
  outreach_message_id uuid REFERENCES land_expand_outreach_messages(id),
  prospect_id uuid REFERENCES land_expand_prospects(id),
  company_id uuid REFERENCES land_expand_companies(id),
  conversion_type text NOT NULL
    CHECK (conversion_type IN (
      'reply', 'positive_reply', 'meeting', 'registration', 'revenue'
    )),
  course_slug text,
  order_id uuid REFERENCES orders(id),
  revenue_amount numeric,
  notes text,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE land_expand_agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE land_expand_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE land_expand_source_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE land_expand_prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE land_expand_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE land_expand_opportunity_prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE land_expand_outreach_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE land_expand_conversions ENABLE ROW LEVEL SECURITY;
