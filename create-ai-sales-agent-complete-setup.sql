-- Complete AI Sales Agent Setup SQL
-- This script creates all 4 required components:
-- 1. email_queue table
-- 2. expansion_opportunities table
-- 3. Database trigger for enrollment_leads
-- 4. pg_cron job for send-scheduled-emails

-- ============================================================================
-- PART 1: Create email_queue table
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email text NOT NULL,
  recipient_name text,
  subject text NOT NULL,
  body text NOT NULL,
  html_body text,
  scheduled_for timestamp NOT NULL,
  sent_at timestamp,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  error_message text,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW()
);

-- Add indexes for email_queue
CREATE INDEX IF NOT EXISTS idx_email_queue_pending ON email_queue(status, scheduled_for);
CREATE INDEX IF NOT EXISTS idx_email_queue_recipient ON email_queue(recipient_email);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_email_queue_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER email_queue_updated_at
  BEFORE UPDATE ON email_queue
  FOR EACH ROW
  EXECUTE FUNCTION update_email_queue_updated_at();

-- ============================================================================
-- PART 2: Create expansion_opportunities table
-- ============================================================================

CREATE TABLE IF NOT EXISTS expansion_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  first_name text,
  last_name text,
  job_title text,
  company_name text NOT NULL,
  company_size int,
  seniority text,
  linkedin_url text,
  source text NOT NULL,
  source_email text,
  contacted boolean DEFAULT false,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW()
);

-- Add indexes for expansion_opportunities
CREATE UNIQUE INDEX IF NOT EXISTS idx_expansion_email_source ON expansion_opportunities(email, source);
CREATE INDEX IF NOT EXISTS idx_expansion_company ON expansion_opportunities(company_name);
CREATE INDEX IF NOT EXISTS idx_expansion_source ON expansion_opportunities(source);
CREATE INDEX IF NOT EXISTS idx_expansion_contacted ON expansion_opportunities(contacted);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_expansion_opportunities_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER expansion_opportunities_updated_at
  BEFORE UPDATE ON expansion_opportunities
  FOR EACH ROW
  EXECUTE FUNCTION update_expansion_opportunities_updated_at();

-- ============================================================================
-- PART 3: Create database trigger for enrollment_leads
-- ============================================================================

-- Step 1: Enable pg_net extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Step 2: Create function that calls the Edge Function
CREATE OR REPLACE FUNCTION trigger_process_enrollment_lead()
RETURNS TRIGGER AS $$
DECLARE
  edge_function_url text;
  service_role_key text;
  payload jsonb;
BEGIN
  -- Get service role key from Supabase secrets
  -- You need to set this in Supabase Dashboard > Settings > API > Service Role Key
  -- For now, we'll use current_setting to get it from a config or use a placeholder
  -- IMPORTANT: Replace 'YOUR_SERVICE_ROLE_KEY' with your actual service role key
  -- Or better: Store it in Supabase secrets and retrieve it
  
  -- Option 1: Try to get from app_config table (if it exists)
  BEGIN
    SELECT value INTO service_role_key
    FROM app_config
    WHERE key = 'service_role_key'
    LIMIT 1;
  EXCEPTION
    WHEN undefined_table THEN
      service_role_key := NULL;
  END;
  
  -- Option 2: If not in config, you'll need to set it manually
  -- You can get your service role key from: Supabase Dashboard > Settings > API
  IF service_role_key IS NULL OR service_role_key = '' THEN
    -- For now, we'll use a placeholder - YOU MUST REPLACE THIS
    RAISE WARNING 'Service role key not configured. Please update the trigger function with your actual service role key.';
    RAISE WARNING 'Get your service role key from: Supabase Dashboard > Settings > API > Service Role Key';
    -- Uncomment and replace with your actual key:
    -- service_role_key := 'YOUR_SERVICE_ROLE_KEY_HERE';
    RETURN NEW;
  END IF;
  
  -- Construct the Edge Function URL
  -- Replace 'slvpmjewohyncpmvjdkc' with your actual Supabase project reference ID
  edge_function_url := 'https://slvpmjewohyncpmvjdkc.supabase.co/functions/v1/process-enrollment-lead';
  
  -- Build the payload with the new row data
  payload := jsonb_build_object(
    'record', jsonb_build_object(
      'id', NEW.id,
      'email', NEW.email,
      'first_name', NEW.first_name,
      'last_name', NEW.last_name,
      'created_at', NEW.created_at,
      'job_title', NEW.job_title,
      'company_name', NEW.company_name,
      'company_size', NEW.company_size,
      'seniority', NEW.seniority,
      'enriched_at', NEW.enriched_at
    )
  );
  
  -- Make async HTTP POST request to Edge Function
  -- Using pg_net.http_post for async execution (doesn't block the INSERT)
  PERFORM
    net.http_post(
      url := edge_function_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_role_key
      ),
      body := payload::text
    );
  
  -- Return the new row (trigger continues normally)
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the INSERT
    RAISE WARNING 'Error calling process-enrollment-lead Edge Function: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Create trigger that fires on INSERT
DROP TRIGGER IF EXISTS enrollment_leads_process_trigger ON enrollment_leads;

CREATE TRIGGER enrollment_leads_process_trigger
  AFTER INSERT ON enrollment_leads
  FOR EACH ROW
  EXECUTE FUNCTION trigger_process_enrollment_lead();

-- Verify the trigger was created
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'enrollment_leads_process_trigger';

-- ============================================================================
-- PART 4: Create pg_cron job for send-scheduled-emails
-- ============================================================================

-- Step 1: Enable pg_cron extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Step 2: Create a function that calls the Edge Function
CREATE OR REPLACE FUNCTION cron_send_scheduled_emails()
RETURNS void AS $$
DECLARE
  edge_function_url text;
  service_role_key text;
  response_status int;
  response_content text;
BEGIN
  -- Get service role key (same as trigger function)
  BEGIN
    SELECT value INTO service_role_key
    FROM app_config
    WHERE key = 'service_role_key'
    LIMIT 1;
  EXCEPTION
    WHEN undefined_table THEN
      service_role_key := NULL;
  END;
  
  IF service_role_key IS NULL OR service_role_key = '' THEN
    RAISE WARNING 'Service role key not configured for cron job.';
    RETURN;
  END IF;
  
  -- Construct the Edge Function URL
  edge_function_url := 'https://slvpmjewohyncpmvjdkc.supabase.co/functions/v1/send-scheduled-emails';
  
  -- Make HTTP POST request to Edge Function
  SELECT status, content INTO response_status, response_content
  FROM net.http_post(
    url := edge_function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body := '{}'::text
  );
  
  -- Log the response (optional)
  RAISE NOTICE 'Cron job executed. Status: %, Response: %', response_status, response_content;
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error in cron job send-scheduled-emails: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Schedule the cron job to run every hour
-- Remove existing job if it exists
SELECT cron.unschedule('send-scheduled-emails-hourly');

-- Schedule new job to run every hour at minute 0
SELECT cron.schedule(
  'send-scheduled-emails-hourly',
  '0 * * * *',  -- Every hour at minute 0 (cron format: minute hour day month weekday)
  $$SELECT cron_send_scheduled_emails()$$
);

-- Verify the cron job was created
SELECT 
  jobid,
  schedule,
  command,
  nodename,
  nodeport,
  database,
  username,
  active
FROM cron.job
WHERE jobname = 'send-scheduled-emails-hourly';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify tables exist
SELECT 
  table_name,
  table_type
FROM information_schema.tables
WHERE table_name IN ('email_queue', 'expansion_opportunities')
ORDER BY table_name;

-- Verify trigger exists
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'enrollment_leads_process_trigger';

-- Verify cron job exists
SELECT 
  jobid,
  jobname,
  schedule,
  active
FROM cron.job
WHERE jobname = 'send-scheduled-emails-hourly';

-- ============================================================================
-- IMPORTANT NOTES
-- ============================================================================

-- 1. SERVICE ROLE KEY SETUP:
--    - Go to Supabase Dashboard > Settings > API
--    - Copy your Service Role Key
--    - Update the trigger function and cron function with your actual key
--    - OR create an app_config table and store it there:
--      CREATE TABLE IF NOT EXISTS app_config (
--        key text PRIMARY KEY,
--        value text NOT NULL
--      );
--      INSERT INTO app_config (key, value) VALUES ('service_role_key', 'YOUR_KEY_HERE');

-- 2. PROJECT REFERENCE ID:
--    - Replace 'slvpmjewohyncpmvjdkc' with your actual Supabase project reference ID
--    - Find it in: Supabase Dashboard > Settings > General > Reference ID

-- 3. EDGE FUNCTIONS:
--    - Make sure 'process-enrollment-lead' and 'send-scheduled-emails' Edge Functions are deployed
--    - Deploy them using: npx supabase functions deploy process-enrollment-lead
--    - Deploy them using: npx supabase functions deploy send-scheduled-emails

-- 4. PERMISSIONS:
--    - The cron job function uses SECURITY DEFINER to run with elevated privileges
--    - Make sure pg_cron extension has proper permissions
--    - You may need to grant execute permissions on the cron function
