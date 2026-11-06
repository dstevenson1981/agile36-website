# Production Deployment Guide - Agile36

This guide will walk you through deploying your Agile36 website to production with your custom domain `www.agile36.com`.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- ✅ All environment variables documented
- ✅ Supabase database is set up and populated
- ✅ Stripe account configured (publishable and secret keys)
- ✅ All SQL scripts run in Supabase (including the UPDATE_PROMO_CODES.sql)
- ✅ Domain registrar access (to update DNS records)

---

## 🚀 Deployment Steps (Vercel Recommended)

### Step 1: Create Vercel Account & Import Project

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub/GitLab account
3. Click **"Add New Project"**
4. Import your repository (or upload the `agile36-site` folder)

### Step 2: Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (or `agile36-site` if you upload the whole repo)
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

### Step 3: Add Environment Variables

In Vercel Project Settings → Environment Variables, add:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Optional: For production optimizations
NODE_ENV=production
```

**Important**: 
- Use **Production keys** for Stripe (not test keys)
- Make sure Supabase RLS policies are enabled and configured correctly
- Save for **Production**, **Preview**, and **Development** environments

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-3 minutes)
3. You'll get a temporary URL like `your-site.vercel.app`
4. Test thoroughly on this URL before connecting your domain

---

## 🌐 Custom Domain Setup (www.agile36.com)

### Step 1: Add Domain in Vercel

1. Go to your Vercel project
2. Click **Settings** → **Domains**
3. Add these domains:
   - `agile36.com`
   - `www.agile36.com` (recommended primary)

### Step 2: Configure DNS Records

Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and add these DNS records:

#### Option A: Using Vercel DNS (Recommended - Fastest)

**A Records:**
```
Type: A
Name: @
Value: 76.76.19.19
TTL: Auto or 3600
```

```
Type: A
Name: www
Value: 76.76.19.19
TTL: Auto or 3600
```

**AAAA Records (for IPv6):**
```
Type: AAAA
Name: @
Value: 2606:4700:3034::6815:1333
TTL: Auto or 3600
```

```
Type: AAAA
Name: www
Value: 2606:4700:3034::6815:1333
TTL: Auto or 3600
```

#### Option B: Using CNAME (Alternative)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto or 3600
```

```
Type: A
Name: @
Value: 76.76.19.19
TTL: Auto or 3600
```

### Step 3: Verify Domain

1. After adding DNS records, wait 10-60 minutes for propagation
2. In Vercel, it will automatically verify and issue an SSL certificate
3. Set `www.agile36.com` as the **primary domain** (redirects naked domain)

---

## 🔒 SSL Certificate

Vercel automatically provides:
- ✅ Free SSL certificate from Let's Encrypt
- ✅ Auto-renewal
- ✅ HTTPS redirect
- ✅ HTTP/2 support

**No additional setup required!**

---

## 📊 Post-Deployment Verification

### Test These URLs:

1. **Homepage**: `https://www.agile36.com`
2. **Old URL redirects** (should redirect to new structure):
   - `https://www.agile36.com/safe-agilist-leading-safe` → `/courses/leading-safe`
   - `https://www.agile36.com/certified-genai-practitioner` → `/courses/certified-genai-practitioner`
3. **Course pages**:
   - `https://www.agile36.com/courses/leading-safe`
   - `https://www.agile36.com/courses/certified-ai-product-manager`
4. **Checkout flow**:
   - Select a course → View Schedule → Enroll Now → Complete checkout
   - Test with Stripe test card: `4242 4242 4242 4242`
5. **Promo codes**:
   - Test `150OFF` at checkout (after running UPDATE_PROMO_CODES.sql)
6. **Contact forms**:
   - Test consultation modal
   - Test contact page form
7. **Mobile responsiveness**:
   - Test on mobile devices

### Check Stripe Webhooks:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Update webhook URL to: `https://www.agile36.com/api/webhooks`
3. Ensure these events are enabled:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`

### Verify Supabase Connection:

1. Check course schedules are loading
2. Verify promo codes are validating
3. Test email storage for consultation forms

---

## 🎯 SEO & Analytics Setup (Optional)

### Google Search Console:

1. Add property for `https://www.agile36.com`
2. Submit sitemap: `https://www.agile36.com/sitemap.xml`
3. Request indexing for main pages

### Google Analytics:

The root layout already loads GA4 through `@next/third-parties` when this variable is set. Leave it unset until you have a real measurement ID. Do not paste a placeholder.

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
```

1. In Google Analytics, create a GA4 property for `https://www.agile36.com` and add a web data stream.
2. Copy the Measurement ID. It looks like `G-XXXXXXXX`.
3. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel for Production, and in `.env.local` if you want to check it locally. Do not commit the value.
4. Redeploy. The tag stays off until the value is a real `G-` ID.

---

## 🚨 Troubleshooting

### Domain not connecting?
- Wait 24-48 hours for full DNS propagation
- Clear browser cache
- Use [whatsmydns.net](https://www.whatsmydns.net) to check DNS propagation
- Verify DNS records are correct (no typos)

### Environment variables not working?
- Redeploy after adding env vars
- Check for typos in variable names
- Ensure they're saved for "Production" environment

### 404 errors?
- Check `next.config.ts` redirects are correct
- Clear Vercel cache: Settings → Data Cache → Clear
- Redeploy

### Stripe not working?
- Confirm you're using **production keys** (not test keys)
- Update webhook endpoint to production URL
- Check webhook secret matches `.env`

### Promo codes not working?
- Run `UPDATE_PROMO_CODES.sql` in Supabase
- Check Supabase connection in production
- Verify service role key is correct

---

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Check Supabase logs
4. Check Stripe dashboard for payment errors

---

## 🎉 You're Live!

Once deployed, your site will be live at:
- ✅ `https://www.agile36.com`
- ✅ `https://agile36.com` (redirects to www)

All your old URLs will automatically redirect to the new structure thanks to the `next.config.ts` redirects!

**Next Steps:**
1. Monitor Vercel analytics for traffic
2. Set up monitoring/alerts
3. Regularly check Stripe dashboard for enrollments
4. Back up Supabase database regularly



















