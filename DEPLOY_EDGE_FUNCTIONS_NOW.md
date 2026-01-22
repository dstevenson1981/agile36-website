# Deploy Edge Functions to Supabase - Quick Guide

## Step 1: Get Your Access Token

1. Go to: https://supabase.com/dashboard/account/tokens
2. Click "Generate new token"
3. Copy the token (you'll need it for the next step)

## Step 2: Deploy Using the Script

Run this command in your terminal:

```bash
cd "/Users/deadrastevenson/Desktop/Agile Redesign/agile36-site"
./deploy-now.sh YOUR_ACCESS_TOKEN_HERE
```

Replace `YOUR_ACCESS_TOKEN_HERE` with the token you copied.

## Alternative: Deploy Manually

If the script doesn't work, run these commands one by one:

```bash
# Set your access token
export SUPABASE_ACCESS_TOKEN=your_token_here

# Link to project
npx supabase link --project-ref hjwdjlgtotsvxdnjxhmr

# Deploy process-enrollment-lead
npx supabase functions deploy process-enrollment-lead --project-ref hjwdjlgtotsvxdnjxhmr

# Deploy send-scheduled-emails
npx supabase functions deploy send-scheduled-emails --project-ref hjwdjlgtotsvxdnjxhmr
```

## Step 3: Set Environment Variables

After deployment, set these secrets in Supabase Dashboard:

### For `process-enrollment-lead`:
1. Go to: **Supabase Dashboard → Edge Functions → process-enrollment-lead → Settings → Secrets**
2. Add:
   - `APOLLO_API_KEY` = `D2fPk6LElk4Fn7PAVSx3g`
   - `SUPABASE_URL` = `https://hjwdjlgtotsvxdnjxhmr.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = (your service role key)

### For `send-scheduled-emails`:
1. Go to: **Supabase Dashboard → Edge Functions → send-scheduled-emails → Settings → Secrets**
2. Add:
   - `SENDGRID_API_KEY` = (your SendGrid API key)
   - `SUPABASE_URL` = `https://hjwdjlgtotsvxdnjxhmr.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = (your service role key)

## Step 4: Verify Deployment

1. Go to: **Supabase Dashboard → Edge Functions**
2. You should see both functions listed:
   - `process-enrollment-lead`
   - `send-scheduled-emails`

## Troubleshooting

### "Access token not provided"
- Make sure you've set the `SUPABASE_ACCESS_TOKEN` environment variable
- Or pass it as an argument to the script

### "Project not found"
- Verify your project reference ID: `hjwdjlgtotsvxdnjxhmr`
- Check you're logged into the correct Supabase account

### "Function not found"
- Make sure the function folders exist in `supabase/functions/`
- Check the function names match exactly

### Deployment succeeds but functions don't appear
- Refresh the Supabase Dashboard
- Check if you're looking at the correct project
- Wait a few seconds for the dashboard to update
