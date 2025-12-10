# 🚀 Quick Start - Deploy to Production

**Get your site live at `www.agile36.com` in 6 steps!**

---

## ⚡ Step 1: Update Promo Codes (2 minutes)

Run this in **Supabase SQL Editor**:

```sql
UPDATE promo_codes
SET expires_at = '2026-12-31 23:59:59', updated_at = NOW()
WHERE code IN ('150OFF', 'SAVE25');
```

---

## ⚡ Step 2: Deploy to Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your repository (or upload `agile36-site` folder)
4. Click **"Deploy"**
5. Wait for build to complete

✅ You'll get a URL like: `your-site.vercel.app`

---

## ⚡ Step 3: Add Environment Variables (3 minutes)

In **Vercel** → **Settings** → **Environment Variables**, add:

### Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Stripe (USE LIVE KEYS!):
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### General:
```
NODE_ENV=production
```

**Then:** Click **"Redeploy"** in Vercel

---

## ⚡ Step 4: Set Up Stripe Webhook (3 minutes)

1. Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. URL: `https://www.agile36.com/api/webhooks`
4. Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `checkout.session.completed`
5. Copy the **signing secret**
6. Add to Vercel as `STRIPE_WEBHOOK_SECRET`
7. Redeploy

---

## ⚡ Step 5: Test on Vercel URL (10 minutes)

Test these on `your-site.vercel.app`:

- [ ] Homepage loads
- [ ] Course pages load
- [ ] Schedules load from Supabase
- [ ] Checkout flow works (use test card: `4242 4242 4242 4242`)
- [ ] Promo code `150OFF` works
- [ ] Contact forms work
- [ ] Mobile responsive

**If everything works, proceed to Step 6!**

---

## ⚡ Step 6: Connect Custom Domain (15-60 minutes)

### A. Add Domain in Vercel:
1. **Vercel** → **Settings** → **Domains**
2. Add: `www.agile36.com` and `agile36.com`

### B. Update DNS Records:

Go to your domain registrar (GoDaddy, Namecheap, etc.) and add:

**A Records:**
```
Type: A
Name: @
Value: 76.76.19.19
```

```
Type: A
Name: www
Value: 76.76.19.19
```

### C. Wait for DNS Propagation:
- **Fast**: 10-30 minutes
- **Typical**: 1-2 hours
- **Max**: 24-48 hours

### D. Verify:
- Vercel will auto-verify and issue SSL certificate
- Visit `https://www.agile36.com`
- Test all functionality again

---

## ✅ Done!

Your site is now live at:
- ✅ `https://www.agile36.com`
- ✅ Old URLs automatically redirect to new structure
- ✅ SSL certificate active
- ✅ Ready to accept payments

---

## 📊 Post-Launch Monitoring

### First 24 Hours:
- [ ] Monitor Stripe dashboard for payments
- [ ] Check Vercel analytics
- [ ] Test from different devices
- [ ] Monitor for errors

### First Week:
- [ ] Check email deliverability
- [ ] Review course enrollment data
- [ ] Gather user feedback
- [ ] Fix any issues

---

## 🚨 Troubleshooting

### Domain not connecting?
- Wait longer (DNS can take 24-48 hours)
- Check DNS records for typos
- Use [whatsmydns.net](https://www.whatsmydns.net) to check propagation

### Promo code not working?
- Did you run `UPDATE_PROMO_CODES.sql`?
- Check Supabase connection
- Verify service role key in Vercel

### Stripe not working?
- Confirm using **LIVE keys** (not test keys)
- Check webhook URL is correct
- Verify webhook secret matches

### Need Help?
- Check: `PRODUCTION_DEPLOYMENT_GUIDE.md`
- Check: `PRE_DEPLOYMENT_CHECKLIST.md`
- Check: `ENVIRONMENT_VARIABLES.md`

---

## 📞 Support Resources

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Supabase**: [supabase.com/support](https://supabase.com/support)
- **Stripe**: [support.stripe.com](https://support.stripe.com)

---

**🎉 Congratulations on launching your site!**









