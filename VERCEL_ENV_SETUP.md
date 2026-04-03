# Vercel Environment Variables Setup

## Quick Setup Instructions

Add these environment variables to your Vercel project:

### 1. Go to Vercel Dashboard
1. Navigate to your project: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**

### 2. Add SendGrid Variables

Add these three variables:

**Variable 1:**
- **Key**: `SENDGRID_API_KEY`
- **Value**: `[Your SendGrid API Key - get from SendGrid dashboard]`
- **Environment**: Select all (Production, Preview, Development)

**Variable 2:**
- **Key**: `SENDGRID_FROM_EMAIL`
- **Value**: `m.ball@agile36.com`
- **Environment**: Select all (Production, Preview, Development)

**Variable 3:**
- **Key**: `NEXT_PUBLIC_SITE_URL`
- **Value**: `https://agile36.com`
- **Environment**: Select all (Production, Preview, Development)

### 3. Save and Redeploy

1. Click **"Save"** after adding each variable
2. Go to **Deployments** tab
3. Click **"Redeploy"** on the latest deployment (or trigger a new deployment)

### 4. Verify Setup

After redeploying, test the email system:
1. Go to `/admin/email`
2. Add a test contact
3. Create a test campaign
4. Send a test email to yourself

## Important Security Notes

⚠️ **NEVER commit API keys to Git!**
- The API key is sensitive and should only be in Vercel environment variables
- Do not add it to `.env.local` if you're committing that file
- If accidentally committed, rotate the API key in SendGrid immediately

## Next Steps

After adding environment variables:

1. ✅ Run the Supabase migration: `supabase-email-marketing-tables.sql`
2. ✅ Configure SendGrid webhook: `https://agile36.com/api/email/track`
3. ✅ Verify sender email `m.ball@agile36.com` in SendGrid
4. ✅ Test the email system

## SendGrid Webhook Setup

1. Go to: https://app.sendgrid.com/settings/mail_settings
2. Click **"Event Webhook"**
3. Enter webhook URL: `https://agile36.com/api/email/track`
4. Enable these events:
   - ✅ `open`
   - ✅ `click`
   - ✅ `bounce`
   - ✅ `unsubscribe`
5. Click **"Save"**

## LPM Pro practice test (no login)

Share the full Pro LPM practice test via a secret URL (questions are not indexed; keep the key private).

1. Add **`LPM_PRO_PRACTICE_ACCESS_KEY`** in Vercel → Environment Variables (Production). Use a long random string (e.g. `openssl rand -hex 32`).
2. Redeploy.
3. Link format: `https://www.agile36.com/lpm-pro-practice?key=<same value as the env var>`

If the key is missing or wrong, the route returns **404**.

## Troubleshooting

### Variables not working?
- Make sure you **redeployed** after adding variables
- Check variable names match exactly (case-sensitive)
- Verify variables are enabled for the correct environment

### Emails not sending?
- Check SendGrid API key has "Mail Send" permissions
- Verify `m.ball@agile36.com` is verified in SendGrid
- Check SendGrid activity logs for errors

### Webhook not receiving events?
- Verify webhook URL is correct: `https://agile36.com/api/email/track`
- Check webhook is enabled in SendGrid
- Review SendGrid webhook logs

