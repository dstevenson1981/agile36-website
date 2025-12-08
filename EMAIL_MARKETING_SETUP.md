# Email Marketing System Setup Guide

## Overview

This email marketing system integrates SendGrid API with Supabase for managing contacts, campaigns, and analytics.

## Prerequisites

1. **SendGrid Account**: Sign up at [SendGrid](https://sendgrid.com)
2. **SendGrid API Key**: Create an API key with "Mail Send" permissions
3. **Supabase Database**: Run the SQL migration to create tables
4. **Environment Variables**: Configure SendGrid and site URL

## Setup Steps

### 1. Run Supabase Migration

Execute the SQL file in your Supabase SQL Editor:

```sql
-- File: supabase-email-marketing-tables.sql
```

This creates:
- `email_contacts` - Stores contact information
- `email_campaigns` - Stores email campaigns
- `email_sends` - Tracks individual email sends
- `email_unsubscribes` - Manages unsubscribe tokens

### 2. Configure Environment Variables

Add to your Vercel project or `.env.local`:

```
SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_FROM_EMAIL=noreply@agile36.com
NEXT_PUBLIC_SITE_URL=https://agile36.com
```

### 3. Set Up SendGrid Webhook

1. Go to [SendGrid Event Webhook Settings](https://app.sendgrid.com/settings/mail_settings)
2. Click **"Event Webhook"**
3. Enter webhook URL: `https://agile36.com/api/email/track`
4. Enable events:
   - ✅ `open` - Track email opens
   - ✅ `click` - Track link clicks
   - ✅ `bounce` - Track bounces
   - ✅ `unsubscribe` - Track unsubscribes
5. Click **"Save"**

### 4. Verify Sender Email

In SendGrid:
1. Go to **Settings** → **Sender Authentication**
2. Verify your domain or single sender email
3. Use verified email in `SENDGRID_FROM_EMAIL`

## Using the System

### Access Admin Panel

Navigate to: `/admin/email`

### Features

#### 1. Contact Management
- **Add Contacts**: Manually add contacts with tags
- **Import CSV**: Upload CSV files with columns: `email`, `first_name`, `last_name`, `tags`
- **Filter & Search**: Filter by tags, subscription status, or search by email/name
- **Edit/Delete**: Manage individual contacts

#### 2. Campaign Composer
- **Create Campaign**: Write email subject and HTML content
- **Preview**: See how email will look before sending
- **Recipients**: Select all contacts or filter by tags
- **Save as Draft**: Save for later editing
- **Send**: Send immediately or schedule

#### 3. Campaign Management
- **View Campaigns**: See all campaigns with status
- **Send Campaigns**: Send draft campaigns
- **Track Status**: See sent count and dates

#### 4. Analytics Dashboard
- **Total Sent**: Number of emails sent
- **Open Rate**: Percentage of opened emails
- **Click Rate**: Percentage of clicked emails
- **Bounce Rate**: Percentage of bounced emails

## API Endpoints

### `/api/email/contacts`
- `GET`: Fetch contacts (with filters)
- `POST`: Create new contact

### `/api/email/contacts/[id]`
- `DELETE`: Delete contact

### `/api/email/campaigns`
- `GET`: Fetch all campaigns
- `POST`: Create new campaign

### `/api/email/send-campaign`
- `POST`: Send campaign to selected contacts

### `/api/email/import-contacts`
- `POST`: Import contacts from CSV file

### `/api/email/track`
- `POST`: Webhook endpoint for SendGrid events

### `/api/email/unsubscribe`
- `POST`: Handle unsubscribe requests

## Public Pages

### `/unsubscribe/[token]`
Public unsubscribe page that:
- Processes unsubscribe tokens from email links
- Allows manual unsubscribe by email
- Confirms successful unsubscription

## CSV Import Format

CSV file should have these columns:
- `email` (required)
- `first_name` (optional)
- `last_name` (optional)
- `tags` (optional, comma-separated)
- `subscribed` (optional, true/false, defaults to true)

Example:
```csv
email,first_name,last_name,tags,subscribed
john@example.com,John,Doe,"newsletter,customer",true
jane@example.com,Jane,Smith,"newsletter",true
```

## Rate Limiting

The system includes rate limiting:
- **50 emails per second** (conservative limit)
- **1 second delay** between batches
- Prevents hitting SendGrid rate limits

## Unsubscribe Links

Every email automatically includes:
- **HTML version**: Styled unsubscribe footer
- **Text version**: Plain text unsubscribe link
- **Unique token**: Per contact/campaign for tracking

## Security Features

- **Row Level Security (RLS)**: Enabled on all tables
- **Service Role Key**: Required for admin operations
- **Token-based Unsubscribe**: Secure unsubscribe links
- **Email Validation**: Validates email format before sending

## Troubleshooting

### Emails Not Sending
- Check `SENDGRID_API_KEY` is set correctly
- Verify sender email is verified in SendGrid
- Check SendGrid account limits/quota
- Review SendGrid activity logs

### Webhook Not Working
- Verify webhook URL is correct
- Check webhook is enabled in SendGrid
- Ensure events are selected
- Check server logs for errors

### Contacts Not Importing
- Verify CSV format matches expected columns
- Check email format is valid
- Review API response for errors

### Analytics Not Updating
- Ensure webhook is configured correctly
- Check SendGrid is sending events
- Verify `email_sends` table is being updated
- Review webhook logs in SendGrid

## Best Practices

1. **Segment Contacts**: Use tags to organize contacts
2. **Test First**: Send test campaigns before large sends
3. **Monitor Analytics**: Track open/click rates
4. **Respect Unsubscribes**: Never email unsubscribed contacts
5. **Clean Lists**: Regularly remove bounced/invalid emails
6. **Comply with Laws**: Follow CAN-SPAM, GDPR, etc.

## Support

For issues or questions:
- Check SendGrid documentation
- Review Supabase logs
- Check server error logs
- Contact support if needed




