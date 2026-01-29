# Deploy Supabase Edge Functions

## Prerequisites

1. **Get Supabase Access Token:**
   - Go to https://supabase.com/dashboard/account/tokens
   - Click "Generate new token"
   - Copy the token (you'll need it for the commands below)

## Deployment Steps

### Option 1: Using npx (Recommended)

```bash
# 1. Login to Supabase
npx supabase login --token YOUR_ACCESS_TOKEN

# 2. Link to your project
npx supabase link --project-ref hjwdjlgtotsvxdnjxhmr

# 3. Deploy Edge Functions (abandoned cart is N8N - see N8N_ABANDONED_CART_SETUP.md)
npx supabase functions deploy send-scheduled-emails
```

### Option 2: Using Environment Variable

```bash
# Set access token
export SUPABASE_ACCESS_TOKEN=your_access_token_here

# Link to project
npx supabase link --project-ref hjwdjlgtotsvxdnjxhmr

# Deploy functions
npx supabase functions deploy send-scheduled-emails
```

### Option 3: Deploy All Functions at Once

```bash
# Deploy all functions in supabase/functions/
npx supabase functions deploy --project-ref hjwdjlgtotsvxdnjxhmr
```

## Verify Deployment

After deployment, check:
1. Supabase Dashboard → Edge Functions → `send-scheduled-emails`
2. Test the function; check logs for errors.

## Set Environment Variables

For **send-scheduled-emails**, set in Dashboard → Edge Functions → send-scheduled-emails → Settings → Secrets:
- `SENDGRID_API_KEY` - Your SendGrid API key
- `SUPABASE_URL` - Your project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your service role key

**Abandoned cart (enrollment_leads):** handled by N8N. See `N8N_ABANDONED_CART_SETUP.md`.
