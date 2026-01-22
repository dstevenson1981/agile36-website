# Testing Abandoned Cart Workflow - Step by Step

## Prerequisites
1. Make sure the Edge Function `process-enrollment-lead` is deployed
2. Verify the database trigger is set up (run Step 1 below)
3. Ensure environment variables are set in Supabase Edge Function settings

## Test Steps

### Step 1: Verify Database Trigger
Run this in Supabase SQL Editor:
```sql
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'enrollment_leads';
```

**Expected Result:** You should see `enrollment_leads_process_trigger` listed.

**If trigger is missing:** Run `create-enrollment-lead-trigger.sql` in Supabase SQL Editor.

---

### Step 2: Insert Test Record
Run the INSERT statement from `test-abandoned-cart-workflow.sql`:
```sql
INSERT INTO enrollment_leads (
  schedule_id, course_slug, course_name, enrolling_for,
  first_name, last_name, email, phone, status, created_at
) VALUES (
  'test-schedule-123', 'leading-safe', 'Leading SAFe', 'myself',
  'John', 'Doe', 'test@cisco.com', '555-1234', 'pending', NOW()
);
```

**Expected Result:** The INSERT should succeed and return the new record ID.

**What happens next:** The trigger should automatically call the Edge Function.

---

### Step 3: Check Edge Function Logs
1. Go to: **Supabase Dashboard → Edge Functions → process-enrollment-lead → Logs**
2. Look for recent entries (within the last minute)
3. Check for:
   - "Processing enrollment lead: test@cisco.com"
   - "Enrichment successful" (if corporate email)
   - "Recovery email scheduled"

**Expected Result:** You should see log entries showing the function was triggered and processed.

**If no logs:** 
- Check if the trigger is actually firing
- Verify the Edge Function URL in the trigger matches your project
- Check Edge Function deployment status

---

### Step 4: Verify Email Queue
Run:
```sql
SELECT * FROM email_queue 
WHERE recipient_email = 'test@cisco.com'
ORDER BY created_at DESC LIMIT 5;
```

**Expected Result:** 
- One record with `status = 'pending'`
- `scheduled_for` should be approximately 1 hour from `created_at`
- `subject` should contain "Complete your order - $150 OFF inside"

**If missing:**
- Check Edge Function logs for errors
- Verify the function has access to `email_queue` table
- Check RLS policies on `email_queue`

---

### Step 5: Check Enrichment
Run:
```sql
SELECT 
  email, first_name, job_title, company_name, 
  company_size, seniority, enriched_at
FROM enrollment_leads 
WHERE email = 'test@cisco.com';
```

**Expected Result (for corporate email like @cisco.com):**
- `enriched_at` should have a timestamp
- `job_title` and/or `company_name` should be populated
- `company_size` may be populated

**If not enriched:**
- Check Apollo API key is set in Edge Function secrets
- Verify the email domain is not in the free email provider list
- Check Edge Function logs for Apollo API errors
- Note: Enrichment may take a few seconds

---

### Step 6: Check Lookalikes
Run:
```sql
SELECT * FROM expansion_opportunities 
WHERE source_email = 'test@cisco.com'
ORDER BY created_at DESC LIMIT 10;
```

**Expected Result:**
- Multiple records (up to 7) with similar job titles at the same company
- `source` = 'enrollment_lookalike'
- `source_email` = 'test@cisco.com'

**If missing:**
- Enrichment must succeed first (Step 5)
- Company name and job title must be available
- Check Edge Function logs for Apollo lookalike search errors

---

### Step 7: Test Email Sending (Manual)
To test if the scheduled email actually sends:

1. **Option A: Wait 1 hour** for the cron job to run
2. **Option B: Manually trigger send-scheduled-emails:**
   - Go to: Supabase Dashboard → Edge Functions → send-scheduled-emails → Test
   - Or update the email_queue record to schedule it earlier:
     ```sql
     UPDATE email_queue 
     SET scheduled_for = NOW() - INTERVAL '1 minute'
     WHERE recipient_email = 'test@cisco.com' AND status = 'pending';
     ```
   - Then manually trigger the send-scheduled-emails function

---

## Troubleshooting

### Trigger Not Firing
- Verify trigger exists: `SELECT * FROM information_schema.triggers WHERE event_object_table = 'enrollment_leads';`
- Check trigger is enabled: `SELECT * FROM pg_trigger WHERE tgname = 'enrollment_leads_process_trigger';`
- Re-run `create-enrollment-lead-trigger.sql`

### Edge Function Not Being Called
- Check the trigger function has the correct Edge Function URL
- Verify service role key is set in `app_config` table (if using config table approach)
- Check Supabase project reference ID matches

### Enrichment Not Working
- Verify `APOLLO_API_KEY` is set in Edge Function secrets
- Check Apollo API credits are available
- Review Edge Function logs for Apollo API errors
- Test email domain is corporate (not gmail.com, etc.)

### Email Queue Not Populated
- Check Edge Function logs for errors inserting into email_queue
- Verify RLS policies allow inserts
- Check table structure matches what the function expects

### Lookalikes Not Generated
- Enrichment must succeed first
- Company name and job title must be available from enrichment
- Check Apollo API credits for search operations
- Review Edge Function logs for lookalike search errors

---

## Clean Up Test Data
After testing, you can clean up:
```sql
DELETE FROM expansion_opportunities WHERE source_email = 'test@cisco.com';
DELETE FROM email_queue WHERE recipient_email = 'test@cisco.com';
DELETE FROM enrollment_leads WHERE email = 'test@cisco.com';
```
