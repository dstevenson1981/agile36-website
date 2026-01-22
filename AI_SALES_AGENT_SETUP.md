# AI Sales Agent Setup Guide

## Part 1: Database Tables

Run the SQL file `create-ai-sales-agent-tables.sql` in your Supabase SQL Editor. This will create:

1. **expansion_opportunities** table - Stores potential expansion leads
2. **email_queue** table - Manages email sending queue
3. Adds enrichment columns to existing tables:
   - `enrollment_leads` (job_title, company_name, company_size, seniority, enriched_at)
   - `orders` (job_title, company_name, company_size, seniority, enriched_at)
   - `assessment_emails` (job_title, company_name, company_size, seniority, enriched_at)

## Part 2: Environment Variables

Set these environment variables in your Supabase Edge Functions dashboard:

### Apollo API
- `APOLLO_API_KEY` = (your Apollo API key - see your API credentials)

### SendGrid API
- `SENDGRID_API_KEY` = (your SendGrid API key - see your API credentials)
- `SENDGRID_FROM_EMAIL` = `m.ball@agile36.com`
- `SENDGRID_FROM_NAME` = `Agile36`

### Supabase (automatically available)
- `SUPABASE_URL` = `https://hjwdjlgtotsvxdnjxhmr.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` = (your service role key)

**How to set environment variables in Supabase:**
1. Go to Supabase Dashboard → Project Settings → Edge Functions
2. Add each environment variable with its value
3. Redeploy your functions after adding variables

## Part 3: Shared Utilities

The shared utility functions are located in `supabase/functions/_shared/`:

### apollo-client.ts
Exports:
- `enrichPerson(email: string)` - Enrich a person by email
- `searchLookalikes(companyName, jobTitle, limit)` - Find similar people
- `searchExecutives(companyName, limit)` - Find VPs/Directors
- `searchPractitioners(companyName, roles, limit)` - Find specific roles
- `trackCredits(operation, creditsUsed)` - Track API credit usage

### sendgrid-client.ts
Exports:
- `sendEmail(to, name, subject, body, htmlBody?)` - Send email via SendGrid
- `sendEmailWithOptions(options)` - Send email with options object

### supabase-client.ts
Exports:
- `supabase` - Pre-configured Supabase client instance
- `getSupabaseClient()` - Get Supabase client

## Usage Example

```typescript
import { enrichPerson } from '../_shared/apollo-client.ts';
import { sendEmail } from '../_shared/sendgrid-client.ts';
import { supabase } from '../_shared/supabase-client.ts';

// Enrich a person
const person = await enrichPerson('john@example.com');

// Send an email
await sendEmail(
  'john@example.com',
  'John Doe',
  'Welcome to Agile36',
  'Thank you for enrolling!'
);

// Query database
const { data } = await supabase.from('expansion_opportunities').select('*');
```

## Next Steps

1. Run the SQL file in Supabase SQL Editor
2. Set environment variables in Supabase Edge Functions settings
3. Create your Edge Functions that use these shared utilities
4. Deploy your functions
