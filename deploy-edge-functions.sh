#!/bin/bash

# Deploy Supabase Edge Functions
# 
# Prerequisites:
# 1. Get your Supabase access token from: https://supabase.com/dashboard/account/tokens
# 2. Set it as an environment variable: export SUPABASE_ACCESS_TOKEN=your_token_here
#    OR pass it as an argument: ./deploy-edge-functions.sh your_token_here

set -e

# Get access token from argument or environment variable
if [ -n "$1" ]; then
  export SUPABASE_ACCESS_TOKEN="$1"
elif [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
  echo "Error: SUPABASE_ACCESS_TOKEN not set"
  echo "Usage: $0 <access_token>"
  echo "   OR: export SUPABASE_ACCESS_TOKEN=your_token && $0"
  echo ""
  echo "Get your access token from: https://supabase.com/dashboard/account/tokens"
  exit 1
fi

PROJECT_REF="hjwdjlgtotsvxdnjxhmr"

echo "🚀 Deploying Supabase Edge Functions..."
echo "Project: $PROJECT_REF"
echo ""

# Link to project
echo "📎 Linking to project..."
npx supabase link --project-ref "$PROJECT_REF" || {
  echo "⚠️  Project may already be linked, continuing..."
}

# Abandoned-cart flow is handled by N8N (see N8N_ABANDONED_CART_SETUP.md).
echo ""
echo "📦 Deploying send-scheduled-emails function..."
npx supabase functions deploy send-scheduled-emails --project-ref "$PROJECT_REF"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo ""
echo "1. Set environment variables in Supabase Dashboard:"
echo "   - Go to: Edge Functions → [function-name] → Settings → Secrets"
echo "   - For send-scheduled-emails: SENDGRID_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY"
echo ""
echo "2. Set up cron schedule for send-scheduled-emails:"
echo "   - See SETUP_CRON_SCHEDULE.md for instructions"
echo "   - Recommended: Run every hour (0 * * * *)"
echo ""
echo "3. Abandoned cart (enrollment_leads) is handled by N8N:"
echo "   - See N8N_ABANDONED_CART_SETUP.md"
