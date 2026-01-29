# Abandoned cart: N8N setup

When someone fills step 1 of checkout and leaves, a row is inserted into **`enrollment_leads`**. N8N handles what happens next.

## 1. Supabase: one webhook, no trigger

**Database webhook (sends new rows to N8N)**  
- Supabase Dashboard → **Database** → **Webhooks** → **Create a new webhook**  
- **Table:** `enrollment_leads`  
- **Events:** Insert  
- **URL:** your N8N webhook URL (e.g. `https://your-n8n.app/webhook/enrollment-lead`)  
- **HTTP method:** POST  
- **HTTP headers:** add `Content-Type: application/json` if needed  

**Remove the old trigger (so only N8N runs)**  
- Run this once in **SQL Editor** so the database does not also call an Edge Function:

```sql
DROP TRIGGER IF EXISTS trigger_process_enrollment_lead ON public.enrollment_leads;
DROP TRIGGER IF EXISTS enrollment_leads_process_trigger ON public.enrollment_leads;
```

## 2. N8N workflow

**Incoming payload** (Supabase sends the new row):  
- `record` (or the root) has: `id`, `email`, `first_name`, `last_name`, `created_at`, `course_slug`, `course_name`, etc.

**Steps:**

1. **Webhook node** – receives the Supabase webhook.
2. **Send email to the lead** – e.g. “Complete your order – use code 50OFF for $50 off” (SendGrid, Gmail, or your email node).
3. **If corporate email** – e.g. if domain is not gmail.com / yahoo.com / outlook.com etc.:  
   - Call Apollo (or your enrichment API) to find **10 people at same company with same role**.  
   - Save or send those contacts (e.g. to a sheet, CRM, or Supabase table).

Use the same logic you had before (corporate vs free domain, Apollo lookup, 10 lookalikes); it just lives in N8N instead of the Edge Function.

## 3. App (no changes)

The site still posts to `/api/save-enrollment-lead`, which inserts into `enrollment_leads`. That insert fires the Supabase webhook to N8N. No other code changes needed.
