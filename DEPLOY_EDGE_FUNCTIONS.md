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

# 3. Deploy all Edge Functions
npx supabase functions deploy process-enrollment-lead
```

### Option 2: Using Environment Variable

```bash
# Set access token
export SUPABASE_ACCESS_TOKEN=your_access_token_here

# Link to project
npx supabase link --project-ref hjwdjlgtotsvxdnjxhmr

# Deploy functions
npx supabase functions deploy process-enrollment-lead
```

### Option 3: Deploy All Functions at Once

```bash
# Deploy all functions in supabase/functions/
npx supabase functions deploy --project-ref hjwdjlgtotsvxdnjxhmr
```

## Verify Deployment

After deployment, check:
1. Supabase Dashboard → Edge Functions → `process-enrollment-lead`
2. Test the function with a sample request
3. Check function logs for any errors

## Set Environment Variables

Make sure to set these environment variables in Supabase Dashboard:
- `APOLLO_API_KEY` - Your Apollo API key
- `SUPABASE_URL` - https://hjwdjlgtotsvxdnjxhmr.supabase.co
- `SUPABASE_SERVICE_ROLE_KEY` - Your service role key

Go to: Supabase Dashboard → Edge Functions → `process-enrollment-lead` → Settings → Secrets
