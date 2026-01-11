# Clean Suppressions Script

This script fetches all suppressed emails from SendGrid API and deletes them from your Supabase database.

## What it does

1. Fetches suppressed emails from SendGrid:
   - Bounces
   - Spam Reports
   - Blocks
   - Invalid Emails

2. Combines all emails and removes duplicates

3. Deletes matching contacts from Supabase `email_contacts` table

4. Logs detailed statistics

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure your `.env.local` file has:
```env
SENDGRID_API_KEY=SG.your_api_key_here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Usage

Run the script:
```bash
npm run clean-suppressions
```

Or directly:
```bash
node clean-suppressions.js
```

## Output

The script will show:
- Progress for each suppression type
- Total counts per type
- Number of unique emails found
- Deletion progress
- Final summary with counts

Example output:
```
🚀 Starting clean-suppressions script...

📥 Fetching Bounces from SendGrid...
   Page 1: Found 366 emails (Total: 366)
✅ Total Bounces: 366 emails

📥 Fetching Spam Reports from SendGrid...
   Page 1: Found 5 emails (Total: 5)
✅ Total Spam Reports: 5 emails

📊 Summary:
   Bounces: 366
   Spam Reports: 5
   Blocks: 0
   Invalid Emails: 0
   Total (with duplicates): 371
   Unique emails: 371

🗑️  Deleting 371 emails from Supabase...
   Batch 1: Deleted 371 contacts

✅ Cleanup complete!
   Total emails processed: 371
   Deleted: 371
   Not found in database: 0
   Duration: 2.45s
```

## Notes

- The script handles pagination automatically (SendGrid returns max 500 per page)
- Emails are normalized (lowercased and trimmed) before deletion
- Deletion happens in batches of 1000 to avoid query size limits
- The script uses the Supabase service role key for deletion permissions
- A small delay is added between API calls to avoid rate limiting

## Safety

- The script only deletes contacts that match emails from SendGrid suppressions
- It logs all actions so you can verify what was deleted
- Consider running it in a test environment first if you're unsure













