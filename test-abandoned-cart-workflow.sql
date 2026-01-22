-- Test Abandoned Cart Workflow End-to-End
-- Run this in Supabase SQL Editor

-- Step 1: Verify the database trigger is active
SELECT 
  tgname as trigger_name,
  tgrelid::regclass as table_name,
  tgenabled as enabled,
  tgisinternal as is_internal
FROM pg_trigger 
WHERE tgname = 'enrollment_leads_process_trigger'
   OR tgname LIKE '%enrollment%lead%';

-- If no trigger found, check all triggers on enrollment_leads table
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement,
  action_timing
FROM information_schema.triggers
WHERE event_object_table = 'enrollment_leads';

-- Step 2: Clean up any previous test data (optional)
-- DELETE FROM expansion_opportunities WHERE source_email = 'test@cisco.com';
-- DELETE FROM email_queue WHERE recipient_email = 'test@cisco.com';
-- DELETE FROM enrollment_leads WHERE email = 'test@cisco.com';

-- Step 3: Insert a test enrollment lead
-- This should trigger the Edge Function automatically
INSERT INTO enrollment_leads (
  schedule_id,
  course_slug,
  course_name,
  enrolling_for,
  first_name,
  last_name,
  email,
  phone,
  status,
  created_at
) VALUES (
  'test-schedule-123',
  'leading-safe',
  'Leading SAFe',
  'myself',
  'John',
  'Doe',
  'test@cisco.com',
  '555-1234',
  'pending',
  NOW()
)
RETURNING id, email, first_name, course_name, created_at;

-- Step 4: Wait a few seconds for the Edge Function to process, then check results

-- Check if the enrollment lead was created
SELECT 
  id,
  email,
  first_name,
  last_name,
  course_name,
  job_title,
  company_name,
  company_size,
  seniority,
  enriched_at,
  created_at
FROM enrollment_leads 
WHERE email = 'test@cisco.com'
ORDER BY created_at DESC
LIMIT 1;

-- Step 5: Check if email was added to email_queue
SELECT 
  id,
  recipient_email,
  recipient_name,
  subject,
  scheduled_for,
  status,
  error_message,
  created_at
FROM email_queue 
WHERE recipient_email = 'test@cisco.com'
ORDER BY created_at DESC
LIMIT 5;

-- Step 6: Check if enrichment happened (for corporate email)
SELECT 
  email,
  first_name,
  job_title,
  company_name,
  company_size,
  seniority,
  enriched_at,
  CASE 
    WHEN enriched_at IS NOT NULL THEN '✓ Enriched'
    WHEN job_title IS NOT NULL OR company_name IS NOT NULL THEN '⚠ Partially enriched'
    ELSE '✗ Not enriched'
  END as enrichment_status
FROM enrollment_leads 
WHERE email = 'test@cisco.com';

-- Step 7: Check if lookalikes were saved
SELECT 
  id,
  email,
  first_name,
  last_name,
  job_title,
  company_name,
  company_size,
  seniority,
  source,
  source_email,
  created_at
FROM expansion_opportunities 
WHERE source_email = 'test@cisco.com'
ORDER BY created_at DESC
LIMIT 10;

-- Step 8: Summary of test results
SELECT 
  'Enrollment Lead' as check_type,
  COUNT(*) as count,
  MAX(created_at) as latest_record
FROM enrollment_leads 
WHERE email = 'test@cisco.com'

UNION ALL

SELECT 
  'Email Queue' as check_type,
  COUNT(*) as count,
  MAX(created_at) as latest_record
FROM email_queue 
WHERE recipient_email = 'test@cisco.com'

UNION ALL

SELECT 
  'Expansion Opportunities' as check_type,
  COUNT(*) as count,
  MAX(created_at) as latest_record
FROM expansion_opportunities 
WHERE source_email = 'test@cisco.com';

-- Step 9: Check Edge Function logs (Note: You'll need to check Supabase Dashboard for this)
-- Go to: Supabase Dashboard → Edge Functions → process-enrollment-lead → Logs
-- Look for recent entries with the test email
