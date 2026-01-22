# Setup Cron Schedule for send-scheduled-emails

## Overview
The `send-scheduled-emails` Edge Function needs to run every hour to process pending emails from the `email_queue` table.

## Setup Steps

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to Edge Functions:**
   - Navigate to: Supabase Dashboard → Edge Functions → `send-scheduled-emails`

2. **Set up Cron Schedule:**
   - Click on "Settings" or "Cron" tab
   - Add a new cron job with:
     - **Schedule:** `0 * * * *` (runs every hour at minute 0)
     - **Function:** `send-scheduled-emails`
     - **Method:** `POST` (or `GET` if your function supports it)

### Option 2: Using Supabase CLI

```bash
# Create a cron job configuration
npx supabase functions cron create send-scheduled-emails \
  --schedule "0 * * * *" \
  --project-ref hjwdjlgtotsvxdnjxhmr
```

### Option 3: Using SQL (pg_cron extension)

Run this SQL in Supabase SQL Editor:

```sql
-- Enable pg_cron extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the function to run every hour
SELECT cron.schedule(
  'send-scheduled-emails-hourly',
  '0 * * * *', -- Every hour at minute 0
  $$
  SELECT
    net.http_post(
      url := 'https://hjwdjlgtotsvxdnjxhmr.supabase.co/functions/v1/send-scheduled-emails',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY'
      ),
      body := '{}'::text
    ) AS request_id;
  $$
);
```

**Note:** Replace `YOUR_SERVICE_ROLE_KEY` with your actual service role key.

## Cron Schedule Examples

- `0 * * * *` - Every hour at minute 0 (00:00, 01:00, 02:00, etc.)
- `*/30 * * * *` - Every 30 minutes
- `0 */2 * * *` - Every 2 hours
- `0 9 * * *` - Daily at 9:00 AM

## Verify Cron Job

1. **Check cron job status:**
   ```sql
   SELECT * FROM cron.job WHERE jobname = 'send-scheduled-emails-hourly';
   ```

2. **View cron job history:**
   ```sql
   SELECT * FROM cron.job_run_details 
   WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'send-scheduled-emails-hourly')
   ORDER BY start_time DESC
   LIMIT 10;
   ```

3. **Test the function manually:**
   - Go to: Edge Functions → `send-scheduled-emails` → Test
   - Or use curl:
     ```bash
     curl -X POST \
       'https://hjwdjlgtotsvxdnjxhmr.supabase.co/functions/v1/send-scheduled-emails' \
       -H 'Authorization: Bearer YOUR_ANON_KEY'
     ```

## Troubleshooting

### Cron job not running?
- Check if `pg_cron` extension is enabled
- Verify the cron schedule syntax is correct
- Check function logs for errors
- Ensure the function is deployed and accessible

### Emails not sending?
- Verify `SENDGRID_API_KEY` is set in Edge Function secrets
- Check `email_queue` table for pending emails
- Review function logs for SendGrid errors
- Verify email addresses are valid

### Function timing out?
- The function processes up to 100 emails per run
- If you have more than 100 pending emails, the cron will process them in batches
- Consider running the cron more frequently if you have high email volume
