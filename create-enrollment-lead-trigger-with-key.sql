-- ALTERNATIVE: SQL Trigger with Service Role Key from Environment Variable
-- This version uses a custom configuration approach
-- Run this AFTER setting your service role key in the config table

-- Step 1: Create a config table to store the service role key (one-time setup)
CREATE TABLE IF NOT EXISTS app_config (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamp DEFAULT NOW()
);

-- Insert your service role key (REPLACE 'your_actual_service_role_key' with real key)
-- Get this from: Supabase Dashboard → Settings → API → service_role key
INSERT INTO app_config (key, value)
VALUES ('service_role_key', 'your_actual_service_role_key')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- Step 2: Enable pg_net extension
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Step 3: Create function that calls the Edge Function
CREATE OR REPLACE FUNCTION trigger_process_enrollment_lead()
RETURNS TRIGGER AS $$
DECLARE
  edge_function_url text;
  service_role_key text;
  payload jsonb;
BEGIN
  -- Get service role key from config table
  SELECT value INTO service_role_key
  FROM app_config
  WHERE key = 'service_role_key';
  
  IF service_role_key IS NULL OR service_role_key = '' THEN
    RAISE WARNING 'Service role key not configured in app_config table';
    RETURN NEW;
  END IF;
  
  -- Construct the Edge Function URL
  edge_function_url := 'https://hjwdjlgtotsvxdnjxhmr.supabase.co/functions/v1/process-enrollment-lead';
  
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
  PERFORM
    net.http_post(
      url := edge_function_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_role_key
      ),
      body := payload::text
    );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error calling process-enrollment-lead Edge Function: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Create trigger
DROP TRIGGER IF EXISTS enrollment_leads_process_trigger ON enrollment_leads;

CREATE TRIGGER enrollment_leads_process_trigger
  AFTER INSERT ON enrollment_leads
  FOR EACH ROW
  EXECUTE FUNCTION trigger_process_enrollment_lead();
