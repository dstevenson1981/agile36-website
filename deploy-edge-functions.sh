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

# Deploy the process-enrollment-lead function
echo ""
echo "📦 Deploying process-enrollment-lead function..."
npx supabase functions deploy process-enrollment-lead --project-ref "$PROJECT_REF"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Set environment variables in Supabase Dashboard:"
echo "   - Go to: Edge Functions → process-enrollment-lead → Settings → Secrets"
echo "   - Add: APOLLO_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY"
echo ""
echo "2. Test the function:"
echo "   - Go to: Edge Functions → process-enrollment-lead → Test"
echo ""
echo "3. Set up the database trigger:"
echo "   - Run create-enrollment-lead-trigger.sql in Supabase SQL Editor"
