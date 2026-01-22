#!/bin/bash

# Quick Deploy Script for Edge Functions
# Usage: ./deploy-now.sh YOUR_ACCESS_TOKEN

set -e

if [ -z "$1" ]; then
  echo "❌ Error: Access token required"
  echo ""
  echo "Usage: $0 <access_token>"
  echo ""
  echo "Get your access token from:"
  echo "https://supabase.com/dashboard/account/tokens"
  echo ""
  echo "Or set it as environment variable:"
  echo "export SUPABASE_ACCESS_TOKEN=your_token"
  echo "$0"
  exit 1
fi

export SUPABASE_ACCESS_TOKEN="$1"
PROJECT_REF="hjwdjlgtotsvxdnjxhmr"

echo "🚀 Deploying Edge Functions to Supabase..."
echo "Project: $PROJECT_REF"
echo ""

# Link to project
echo "📎 Linking to project..."
npx supabase link --project-ref "$PROJECT_REF" --password "" 2>&1 || {
  echo "⚠️  Project may already be linked, continuing..."
}

# Deploy process-enrollment-lead
echo ""
echo "📦 Deploying process-enrollment-lead..."
npx supabase functions deploy process-enrollment-lead --project-ref "$PROJECT_REF" --no-verify-jwt 2>&1

if [ $? -eq 0 ]; then
  echo "✅ process-enrollment-lead deployed successfully!"
else
  echo "❌ Failed to deploy process-enrollment-lead"
  exit 1
fi

# Deploy send-scheduled-emails
echo ""
echo "📦 Deploying send-scheduled-emails..."
npx supabase functions deploy send-scheduled-emails --project-ref "$PROJECT_REF" --no-verify-jwt 2>&1

if [ $? -eq 0 ]; then
  echo "✅ send-scheduled-emails deployed successfully!"
else
  echo "❌ Failed to deploy send-scheduled-emails"
  exit 1
fi

echo ""
echo "🎉 All Edge Functions deployed successfully!"
echo ""
echo "Next steps:"
echo "1. Set environment variables in Supabase Dashboard:"
echo "   - Go to: Edge Functions → [function-name] → Settings → Secrets"
echo "   - For process-enrollment-lead:"
echo "     * APOLLO_API_KEY"
echo "     * SUPABASE_URL"
echo "     * SUPABASE_SERVICE_ROLE_KEY"
echo "   - For send-scheduled-emails:"
echo "     * SENDGRID_API_KEY"
echo "     * SUPABASE_URL"
echo "     * SUPABASE_SERVICE_ROLE_KEY"
echo ""
echo "2. Set up cron schedule for send-scheduled-emails:"
echo "   - See SETUP_CRON_SCHEDULE.md for instructions"
echo ""
echo "3. Test the functions:"
echo "   - Go to: Edge Functions → [function-name] → Test"
