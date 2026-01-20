# N8N Webhook Integration Setup

## Summary

**Answer to your question:** No, the checkout did NOT previously send webhooks to n8n. I've now added webhook calls to trigger n8n workflows when:

1. ✅ **Enrollment leads are created** (abandoned checkout)
2. ✅ **Orders are created** (new order upsell)
3. ✅ **Assessment emails are created** (high score follow-up)

## Changes Made

### 1. Enrollment Leads Webhook (`app/api/save-enrollment-lead/route.ts`)
- **Added:** Webhook call to n8n after successfully saving enrollment lead
- **Triggers:** Workflow 1 - Abandoned Checkout Recovery
- **Data sent:** Lead ID, email, name, course info, checkout link

### 2. Orders Webhook (`app/api/confirm-payment/route.ts`)
- **Added:** Webhook call to n8n after successfully creating order
- **Triggers:** Workflow 2 - New Order Upsell
- **Data sent:** Order ID, customer info, course info, payment details

### 3. Assessment Emails Webhook (`app/api/store-email/route.ts`)
- **Added:** Webhook call to n8n after successfully saving assessment email
- **Triggers:** Workflow 3 - High Assessment Score Follow-up
- **Data sent:** Assessment ID, email, name, exam score, exam name

## Required Environment Variables

Add these to your `.env.local` and Vercel environment variables:

```env
# N8N Webhook URLs (get these from n8n after importing workflows)
N8N_WEBHOOK_URL_ENROLLMENT_LEADS=https://your-n8n-instance.com/webhook/enrollment-leads
N8N_WEBHOOK_URL_NEW_ORDER=https://your-n8n-instance.com/webhook/new-order
N8N_WEBHOOK_URL_ASSESSMENT_EMAILS=https://your-n8n-instance.com/webhook/assessment-emails
N8N_WEBHOOK_URL_COUPON_LEADS=https://your-n8n-instance.com/webhook/coupon-leads

# Site URL (for generating links in webhooks)
NEXT_PUBLIC_SITE_URL=https://agile36.com
```

## Setup Steps

### Step 1: Import n8n Workflows
1. Import all 5 workflow JSON files into n8n
2. Activate each workflow
3. Copy the webhook URLs from each workflow's webhook node

### Step 2: Get Webhook URLs
For each workflow:
1. Open the workflow in n8n
2. Click on the webhook node (e.g., "Webhook - New Enrollment Lead")
3. Copy the webhook URL shown
4. Add it to your environment variables

### Step 3: Set Environment Variables
1. Add all 4 webhook URLs to `.env.local`
2. Add all 4 webhook URLs to Vercel environment variables
3. Redeploy if needed

### Step 4: Test
Test each webhook:

**Test Enrollment Lead:**
```bash
curl -X POST http://localhost:3000/api/save-enrollment-lead \
  -H "Content-Type: application/json" \
  -d '{
    "scheduleId": "123",
    "courseSlug": "leading-safe",
    "courseName": "Leading SAFe",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@company.com",
    "phone": "555-1234"
  }'
```

**Test Assessment Email:**
```bash
curl -X POST http://localhost:3000/api/store-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@company.com",
    "exam_name": "SAFe Practice Exam",
    "exam_score": 85
  }'
```

## How It Works

### Enrollment Leads (Abandoned Checkout)
1. User fills out checkout form → `save-enrollment-lead` API called
2. Lead saved to Supabase `enrollment_leads` table
3. **NEW:** Webhook sent to n8n with lead data
4. n8n workflow triggers:
   - Enriches via Apollo (if corporate email)
   - Searches for lookalikes
   - Waits 1 hour
   - Sends recovery email

### Orders (New Purchase)
1. Payment succeeds → `confirm-payment` API called
2. Order saved to Supabase `orders` table
3. **NEW:** Webhook sent to n8n with order data
4. n8n workflow triggers:
   - Enriches via Apollo (if corporate email)
   - Searches for lookalikes
   - Waits 30 days
   - Sends upsell email

### Assessment Emails (High Score)
1. User submits assessment → `store-email` API called
2. Assessment saved to Supabase `assessment_emails` table
3. **NEW:** Webhook sent to n8n with assessment data
4. n8n workflow triggers:
   - Enriches via Apollo (if corporate email & score >= 80)
   - Searches for lookalikes
   - Sends follow-up email

## Important Notes

1. **Non-blocking:** Webhook calls are "fire and forget" - they don't slow down the API response
2. **Error handling:** If webhook fails, it's logged but doesn't fail the main request
3. **Missing webhook URL:** If environment variable is not set, webhook is skipped (graceful degradation)
4. **Data format:** Webhook payloads match what n8n workflows expect

## Troubleshooting

### Webhooks not triggering
1. Check environment variables are set correctly
2. Verify webhook URLs are correct (copy from n8n)
3. Check n8n workflow is active
4. Check browser console / server logs for errors

### Webhook errors in logs
- Check n8n workflow is running
- Verify webhook URL is accessible
- Check n8n execution logs for errors

### Missing data in n8n
- Verify webhook payload structure matches workflow expectations
- Check n8n workflow node configurations
- Review webhook data in n8n execution logs

## Next Steps

1. ✅ Code changes complete
2. ⏳ Import workflows into n8n
3. ⏳ Get webhook URLs from n8n
4. ⏳ Set environment variables
5. ⏳ Test each webhook
6. ⏳ Monitor n8n execution logs
