# Environment Variables Setup

## 📋 Required Environment Variables for Production

Copy these variables to your **Vercel Project Settings** → **Environment Variables**

---

## 🔐 Supabase Configuration

Get these from: [Supabase Project Settings](https://app.supabase.com/project/_/settings/api)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

**Important Notes:**
- ✅ Use your **production Supabase project** (not a test project)
- ✅ Ensure RLS (Row Level Security) policies are properly configured
- ✅ Make sure all tables are created and populated with data

---

## 💳 Stripe Configuration (PRODUCTION KEYS)

Get these from: [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key_here
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**⚠️ CRITICAL:** 
- ❌ DO NOT use test keys (`pk_test_...` or `sk_test_...`) in production!
- ✅ Use LIVE keys (`pk_live_...` and `sk_live_...`)
- ✅ Real charges will be processed with live keys

### Setting up Stripe Webhook:

1. Go to: [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Enter endpoint URL: `https://www.agile36.com/api/webhooks`
4. Select these events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`
5. Click **"Add endpoint"**
6. Copy the **Signing secret** (starts with `whsec_...`)
7. Add it to Vercel as `STRIPE_WEBHOOK_SECRET`

---

## 🌍 General Configuration

```
NODE_ENV=production
```

---

## 📝 How to Add in Vercel

### Option 1: Vercel Dashboard (Recommended)

1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. For each variable:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value**: Your actual value
   - **Environment**: Select **Production**, **Preview**, and **Development**
4. Click **"Save"**
5. **Redeploy** your site for changes to take effect

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
```

---

## ✅ Verification Checklist

After adding environment variables:

- [ ] All 6 required variables are added in Vercel
- [ ] Variables are saved for **Production** environment
- [ ] Using **LIVE Stripe keys** (not test keys)
- [ ] Supabase connection works (test by loading course schedules)
- [ ] Stripe webhook is created at `https://www.agile36.com/api/webhooks`
- [ ] Webhook secret is added to Vercel
- [ ] Site is redeployed after adding variables
- [ ] Test checkout flow end-to-end
- [ ] Test promo code validation (`150OFF`)
- [ ] Test consultation form submissions

---

## 🚨 Security Best Practices

1. **Never commit** environment variables to Git
2. **Never expose** service role keys or secret keys in client-side code
3. **Rotate keys** if they're accidentally exposed
4. **Use different keys** for development, preview, and production
5. **Monitor** Stripe dashboard for suspicious activity
6. **Enable** Stripe radar for fraud detection
7. **Set up** email notifications for successful payments

---

## 🔄 Updating Variables

If you need to change a variable:

1. Update in Vercel → Settings → Environment Variables
2. Click **"Save"**
3. **Redeploy** the site (changes don't apply automatically)

Or use CLI:
```bash
vercel env rm VARIABLE_NAME production
vercel env add VARIABLE_NAME production
```

---

## 🧪 Testing Before Production

**Before going live:**

1. Deploy to Vercel preview URL first
2. Test with Stripe **test mode** on preview URL
3. Verify all functionality works
4. Switch to **live keys** when ready
5. Test with real card (small amount)
6. Then connect custom domain

**Stripe Test Cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.

---

## 📞 Troubleshooting

### Variables not loading?
- Redeploy after adding variables
- Check spelling and capitalization
- Verify they're added to "Production" environment
- Clear browser cache

### Supabase connection failing?
- Check URL format (should include `https://`)
- Verify project is not paused
- Check RLS policies allow read access
- Test query in Supabase SQL editor

### Stripe not working?
- Confirm using **live keys** (start with `pk_live_` and `sk_live_`)
- Verify webhook is pointing to production URL
- Check webhook secret matches exactly
- View webhook logs in Stripe dashboard

### Need to test without deploying?
Create `.env.local` file locally (NOT committed to Git):
```bash
# Copy from ENVIRONMENT_VARIABLES.md
NEXT_PUBLIC_SUPABASE_URL=...
# etc.
```

Run locally: `npm run dev`

