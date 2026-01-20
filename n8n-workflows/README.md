# N8N AI Sales Agent Workflows for Agile36

This directory contains 5 production-ready n8n workflows for automated sales outreach, lead enrichment, and expansion opportunity generation.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Workflow Overview](#workflow-overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Testing](#testing)
- [Monitoring](#monitoring)

## Prerequisites

- n8n instance (cloud or self-hosted)
- Supabase account with service role key
- Apollo.io API key: `D2fPk6LElk4FnK7PAVSx3g`
- SendGrid API credentials
- Slack webhook URL (optional, for alerts)

## Database Setup

**STEP 1: Create database tables**

Run the SQL file in Supabase SQL Editor:

```bash
# File location:
create-n8n-tables.sql
```

This creates:
- `expansion_opportunities` - Stores lookalike prospects and expansion opportunities
- `outreach_log` - Logs all email outreach attempts
- Adds enrichment columns to `enrollment_leads`, `orders`, and `assessment_emails`

**Verify tables were created:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_name IN ('expansion_opportunities', 'outreach_log');
```

## Environment Variables

Add these environment variables to your n8n instance:

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Apollo.io (hardcoded in workflows)
APOLLO_API_KEY=D2fPk6LElk4FnK7PAVSx3g

# SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key

# Slack (optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

**How to set in n8n:**
1. Go to Settings → Environment Variables
2. Add each variable
3. Restart n8n if needed

## Workflow Overview

### Workflow 1: Abandoned Checkout Recovery + Lookalike Generation

**Trigger:** Webhook `POST /enrollment-leads`

**Process:**
1. Checks if corporate email (not Gmail/Yahoo/Hotmail/Outlook/AOL)
2. Enriches via Apollo Person API
3. Updates `enrollment_leads` with enrichment data
4. If Director+ & company_size >= 1000: Sends Slack alert
5. Searches Apollo for 10-20 lookalikes
6. Saves lookalikes to `expansion_opportunities`
7. Waits 1 hour
8. Sends recovery email via SendGrid
9. Logs to `outreach_log`

**Email Template:**
- Subject: "Complete your order - $200 OFF inside"
- Body: "Hi [name], You started checking out but didn't complete your order. Here's $200 OFF to finish: Code 200OFF. Complete your order: [checkout_link]"

### Workflow 2: New Order Upsell + Lookalike Generation

**Trigger:** Webhook `POST /new-order`

**Process:**
1. Checks if corporate email
2. Enriches via Apollo Person API
3. Updates `orders` with enrichment data
4. Searches Apollo for 10-15 lookalikes at same company
5. Saves to `expansion_opportunities` with source='customer_lookalike'
6. Waits 30 days
7. Sends upsell email via SendGrid
8. Updates `orders` set `upsell_offered=true`
9. Logs to `outreach_log`

**Email Template:**
- Subject: "Ready for your next certification?"
- Body: "Hi [name], Congrats on completing [course_name]! Ready to level up? Get [next_recommended_course] with $150 OFF: Code 150OFF. Enroll here: [course_link]"

### Workflow 3: High Assessment Score Follow-up

**Trigger:** Webhook `POST /assessment-emails` (where `exam_score >= 80`)

**Process:**
1. Checks if corporate email
2. Enriches via Apollo Person API
3. Updates `assessment_emails` with enrichment data
4. If Director+ & company_size >= 500: Sends Slack alert
5. Searches Apollo for 5-10 lookalikes
6. Saves to `expansion_opportunities` with source='assessment_lookalike'
7. Sends follow-up email via SendGrid
8. Logs to `outreach_log`

**Email Template:**
- Subject: "Great score! Here's your next step"
- Body: "Hi [name], You scored [exam_score]% on the practice exam - great work! Ready to get certified? View courses: [course_catalog_link]"

### Workflow 4: Coupon Lead Immediate Follow-up

**Trigger:** Webhook `POST /coupon-leads`

**Process:**
1. Immediately sends email via SendGrid (no enrichment - low intent)
2. Logs to `outreach_log`

**Email Template:**
- Subject: "Your $150 OFF code is ready"
- Body: "Hi [name], Here's your exclusive discount: Code 150OFF. Class starts [cohort_date]. Save your spot: [course_link]"

### Workflow 5: Daily Expansion Batch (Multi-Source)

**Trigger:** Cron schedule - Daily at 9:00 AM

**Sources:**

**Source 1: New Customer Companies (Priority 1)**
- Queries `orders` from last 30 days
- Filters corporate emails with `company_name`
- Groups by company
- Searches Apollo for 15 prospects per company
- Saves to `expansion_opportunities` with source='new_customer_expansion'

**Source 4: High-Value Customer Expansion (Priority 4)**
- Queries `customers` where `total_spend >= 1000`
- Filters corporate emails with `company_name`
- Searches Apollo for 10 prospects per company
- Saves to `expansion_opportunities` with source='high_value_expansion'

**Final Steps:**
1. Analyzes results from last 24 hours
2. Generates Slack alerts for companies with 5+ prospects
3. Sends aggregated alerts to Slack

## Installation

### Step 1: Import Workflows

For each workflow JSON file:

1. Open n8n
2. Click **"Workflows"** → **"Import from File"**
3. Select the JSON file (e.g., `workflow-1-abandoned-checkout.json`)
4. Click **"Import"**

Repeat for all 5 workflows:
- `workflow-1-abandoned-checkout.json`
- `workflow-2-new-order-upsell.json`
- `workflow-3-high-assessment-score.json`
- `workflow-4-coupon-lead.json`
- `workflow-5-daily-expansion-batch.json`

### Step 2: Configure Credentials

**SendGrid:**
1. Go to n8n → Credentials → Add Credential
2. Select "SendGrid API"
3. Enter your SendGrid API key
4. Name it: "SendGrid API"
5. Save

**Supabase:**
- Uses environment variables (already set)
- No separate credential needed

**Apollo.io:**
- Hardcoded in workflows: `D2fPk6LElk4FnK7PAVSx3g`
- No separate credential needed

**Slack:**
- Uses environment variable: `SLACK_WEBHOOK_URL`

### Step 3: Activate Workflows

1. Open each workflow
2. Toggle **"Active"** switch to ON
3. Workflows are now live and listening for triggers

## Configuration

### Webhook URLs

After importing, each webhook workflow will have a unique URL:

1. **Workflow 1:** Copy webhook URL from "Webhook - New Enrollment Lead" node
2. **Workflow 2:** Copy webhook URL from "Webhook - New Order" node
3. **Workflow 3:** Copy webhook URL from "Webhook - New Assessment" node
4. **Workflow 4:** Copy webhook URL from "Webhook - New Coupon Lead" node

**Integration:**
- Set up webhooks in your application to POST to these URLs when events occur
- Workflow 5 uses cron and doesn't need a webhook

### Rate Limiting

**Apollo API:**
- Max 100 requests per minute
- Workflows include 600ms delay between Apollo calls
- Monitored via `waitBetweenItems` option

**Error Handling:**
- All Apollo calls wrapped in try-catch (via n8n error handling)
- Failed enrichments are logged but don't stop workflow
- Check `outreach_log` for error messages

### Email Variables

All workflows support these variables in email templates:

- `[name]` - Full name
- `[first_name]` - First name only
- `[last_name]` - Last name only
- `[email]` - Email address
- `[course_name]` - Course name
- `[next_recommended_course]` - Recommended next course
- `[course_link]` - Course enrollment link
- `[exam_score]` - Assessment score
- `[cohort_date]` - Course start date
- `[checkout_link]` - Checkout URL
- `[cart_value]` - Cart total value
- `[course_catalog_link]` - Link to all courses

## Testing

### Manual Testing

**Test Workflow 1 (Abandoned Checkout):**
```bash
curl -X POST https://your-n8n-instance.com/webhook/enrollment-leads \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "email": "test@company.com",
    "name": "Test User",
    "cart_value": 299,
    "checkout_link": "https://agile36.com/checkout"
  }'
```

**Test Workflow 2 (New Order):**
```bash
curl -X POST https://your-n8n-instance.com/webhook/new-order \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "email": "test@company.com",
    "name": "Test User",
    "course_name": "Leading SAFe",
    "next_recommended_course": "SAFe RTE",
    "course_link": "https://agile36.com/courses/rte"
  }'
```

**Test Workflow 3 (High Assessment Score):**
```bash
curl -X POST https://your-n8n-instance.com/webhook/assessment-emails \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "email": "test@company.com",
    "name": "Test User",
    "exam_score": 85,
    "course_catalog_link": "https://agile36.com/courses"
  }'
```

**Test Workflow 4 (Coupon Lead):**
```bash
curl -X POST https://your-n8n-instance.com/webhook/coupon-leads \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "email": "test@company.com",
    "name": "Test User",
    "cohort_date": "2026-02-01",
    "course_link": "https://agile36.com/courses"
  }'
```

**Test Workflow 5 (Daily Batch):**
- Trigger manually via n8n UI: Click "Execute Workflow"
- Or wait for cron trigger (9 AM daily)

### Verify Results

**Check Outreach Log:**
```sql
SELECT * FROM outreach_log 
WHERE workflow_name = 'Abandoned Checkout Recovery'
ORDER BY created_at DESC 
LIMIT 10;
```

**Check Expansion Opportunities:**
```sql
SELECT company_name, source, COUNT(*) as prospect_count
FROM expansion_opportunities
WHERE created_at >= NOW() - INTERVAL '1 day'
GROUP BY company_name, source
ORDER BY prospect_count DESC;
```

## Monitoring

### Daily Checks

1. **Review Outreach Log:**
   ```sql
   SELECT workflow_name, status, COUNT(*) 
   FROM outreach_log 
   WHERE created_at >= CURRENT_DATE
   GROUP BY workflow_name, status;
   ```

2. **Check Apollo Credit Usage:**
   - Monitor Apollo dashboard for daily usage
   - Expected: ~300-400 credits/day
   - Alert if >500 credits/day

3. **Review Expansion Opportunities:**
   ```sql
   SELECT source, COUNT(*) as count, COUNT(DISTINCT company_name) as companies
   FROM expansion_opportunities
   WHERE created_at >= CURRENT_DATE
   GROUP BY source;
   ```

### Error Handling

**Failed Enrichments:**
- Check `outreach_log` for `error_message`
- Common issues:
  - Apollo rate limiting (wait 1 min, retry)
  - Invalid email format
  - Person not found in Apollo

**Failed Emails:**
- Check `outreach_log` for `status='failed'`
- Common issues:
  - Invalid SendGrid credentials
  - Invalid email address
  - SendGrid rate limiting

**Workflow Failures:**
- Check n8n execution log
- Review error nodes in workflow
- Common issues:
  - Missing environment variables
  - Supabase connection timeout
  - Invalid JSON in webhook payload

## Troubleshooting

### Webhook Not Triggering

1. Verify webhook URL is correct
2. Check webhook node is active in workflow
3. Verify POST request includes correct headers
4. Check n8n execution log for errors

### Apollo Enrichment Failing

1. Verify API key is correct: `D2fPk6LElk4FnK7PAVSx3g`
2. Check Apollo rate limits (100/min)
3. Verify email is corporate (not Gmail/Yahoo)
4. Check `waitBetweenItems: 600` is set

### SendGrid Email Not Sending

1. Verify SendGrid credentials in n8n
2. Check SendGrid API key is valid
3. Verify sender email is verified in SendGrid
4. Check SendGrid dashboard for delivery status

### Supabase Connection Issues

1. Verify `SUPABASE_URL` environment variable
2. Verify `SUPABASE_SERVICE_ROLE_KEY` environment variable
3. Check Supabase project is active
4. Verify RLS policies allow service role access

## Support

For issues or questions:
1. Check n8n execution logs
2. Review `outreach_log` table for errors
3. Verify all environment variables are set
4. Test each workflow individually

## Notes

- **No AI Generation:** All emails use template-based variables
- **Enrichment Purpose:** Used for lookalike finding and prioritization, NOT email personalization
- **Rate Limits:** Apollo max 100 req/min (600ms delay between calls)
- **Credit Budget:** ~300-400 Apollo credits/day expected
- **Corporate Emails Only:** Enrichment only for non-Gmail/Yahoo/Hotmail/Outlook/AOL emails
