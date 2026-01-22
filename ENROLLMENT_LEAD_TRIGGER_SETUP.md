# Enrollment Lead Trigger Setup

## Overview
This trigger automatically calls the `process-enrollment-lead` Edge Function whenever a new row is inserted into the `enrollment_leads` table.

## Setup Instructions

### Step 1: Run the SQL
Execute the SQL file `create-enrollment-lead-trigger.sql` in your Supabase SQL Editor.

### Step 2: Set Service Role Key (if needed)
If the trigger fails with authentication errors, you may need to set the service role key:

```sql
-- Set the service role key (get this from Supabase Dashboard → Settings → API)
ALTER DATABASE postgres SET app.settings.service_role_key = 'your_service_role_key_here';
```

**OR** modify the trigger function to use an environment variable or hardcode the key temporarily for testing.

### Step 3: Test the Trigger

Insert a test enrollment lead:

```sql
INSERT INTO enrollment_leads (
  schedule_id,
  course_slug,
  course_name,
  first_name,
  last_name,
  email,
  phone,
  status
) VALUES (
  'test-schedule-123',
  'leading-safe',
  'Leading SAFe',
  'John',
  'Doe',
  'john.doe@example.com',
  '555-1234',
  'pending'
);
```

### Step 4: Verify

1. Check Edge Function logs in Supabase Dashboard → Edge Functions → process-enrollment-lead → Logs
2. Check if enrichment data was added to `enrollment_leads`
3. Check if lookalikes were inserted into `expansion_opportunities`
4. Check if recovery email was scheduled in `email_queue`

## How It Works

1. **Trigger fires** when a new row is inserted into `enrollment_leads`
2. **Function executes** `trigger_process_enrollment_lead()`
3. **HTTP POST** is made to the Edge Function with the new row data
4. **Edge Function processes**:
   - Enriches person (if corporate email)
   - Generates lookalikes
   - Schedules recovery email
5. **INSERT completes** (trigger doesn't block the original INSERT)

## Troubleshooting

### Trigger not firing?
- Check if trigger exists: `SELECT * FROM information_schema.triggers WHERE trigger_name = 'enrollment_leads_process_trigger';`
- Check Edge Function logs for errors
- Verify pg_net extension is enabled: `SELECT * FROM pg_extension WHERE extname = 'pg_net';`

### Authentication errors?
- Make sure service role key is set correctly
- Check Edge Function has proper authentication settings
- Verify the Edge Function URL is correct

### Edge Function not receiving data?
- Check the payload structure in the trigger function
- Verify the Edge Function is deployed
- Check Edge Function logs for incoming requests
