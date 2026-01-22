-- SQL Trigger to Call process-enrollment-lead Edge Function
-- Run this in your Supabase SQL Editor

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
  -- Get service role key from environment or config
  -- Option 1: Try to get from app_config table (if using config table approach)
  SELECT value INTO service_role_key
  FROM app_config
  WHERE key = 'service_role_key'
  LIMIT 1;
  
  -- Option 2: If not in config table, you can hardcode it here (less secure)
  -- service_role_key := 'YOUR_SERVICE_ROLE_KEY_HERE';  -- Replace with actual key
  
  IF service_role_key IS NULL OR service_role_key = '' THEN
    RAISE WARNING 'Service role key not configured. Please set it in app_config table or in the function.';
    RETURN NEW;
  END IF;
  
  -- Construct the Edge Function URL
  -- Replace 'hjwdjlgtotsvxdnjxhmr' with your actual Supabase project reference ID if different
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
