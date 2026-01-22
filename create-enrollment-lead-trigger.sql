-- SQL Trigger to Call process-enrollment-lead Edge Function
-- Run this in your Supabase SQL Editor

-- Step 1: Enable pg_net extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Step 2: Create function that calls the Edge Function
CREATE OR REPLACE FUNCTION trigger_process_enrollment_lead()
RETURNS TRIGGER AS $$
DECLARE
  edge_function_url text;
  payload jsonb;
BEGIN
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
  -- Note: You may need to set the service role key or use a different auth method
  PERFORM
    net.http_post(
      url := edge_function_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || coalesce(
          current_setting('app.settings.service_role_key', true),
          'your_service_role_key_here'  -- Replace with actual key or use env var
        )
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
