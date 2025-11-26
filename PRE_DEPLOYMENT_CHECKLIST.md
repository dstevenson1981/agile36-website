# Pre-Deployment Checklist ✅

Complete this checklist before deploying to production at `www.agile36.com`

---

## 📊 Database Setup (Supabase)

### Tables Created:
- [ ] `course_schedules` table exists
- [ ] `promo_codes` table exists
- [ ] `orders` table exists (if using)

### Data Populated:
- [ ] Leading SAFe schedules loaded
- [ ] Product Owner/Manager schedules loaded
- [ ] Lean Portfolio Management schedules loaded
- [ ] Scrum Master schedules loaded
- [ ] Advanced Scrum Master schedules loaded
- [ ] SAFe for Teams schedules loaded
- [ ] DevOps schedules loaded
- [ ] Responsible AI schedules loaded
- [ ] Value Stream Mapping schedules loaded
- [ ] AI-Driven Scrum Master schedules loaded
- [ ] Executive GenAI Leadership schedules loaded
- [ ] Generative AI for Project Managers schedules loaded
- [ ] Certified GenAI Practitioner schedules loaded
- [ ] AI Agent Builder schedules loaded
- [ ] Certified AI Product Manager schedules loaded
- [ ] PMP Certification schedules loaded
- [ ] Agile Product Management schedules loaded

### Promo Codes:
- [ ] `150OFF` promo code exists
- [ ] Expiration date is `2026-12-31` (not 2024!)
- [ ] Run `UPDATE_PROMO_CODES.sql` if needed
- [ ] Test promo code validation works

### Security:
- [ ] RLS (Row Level Security) is enabled
- [ ] RLS policies allow public read access to schedules
- [ ] Service role key is secure and not exposed
- [ ] Test schedules load on frontend

---

## 💳 Stripe Setup

### Account Configuration:
- [ ] Stripe account is in **Live mode** (not test mode)
- [ ] Business information is complete
- [ ] Bank account is connected for payouts
- [ ] Email receipts are enabled

### API Keys:
- [ ] Have **live** publishable key (`pk_live_...`)
- [ ] Have **live** secret key (`sk_live_...`)
- [ ] Keys are stored securely (not in code)
- [ ] Test keys are NOT being used in production

### Webhooks:
- [ ] Webhook endpoint created at `https://www.agile36.com/api/webhooks`
- [ ] Events selected: `payment_intent.succeeded`, `payment_intent.payment_failed`, `checkout.session.completed`
- [ ] Webhook signing secret saved (`whsec_...`)
- [ ] Webhook is in **Live mode**

### Testing:
- [ ] Test a small payment ($1) before launch
- [ ] Verify email receipts are sent
- [ ] Check payment appears in Stripe dashboard
- [ ] Verify webhook events are received

---

## 🌐 Domain & DNS

### Domain Ownership:
- [ ] You own `agile36.com`
- [ ] Have access to domain registrar account
- [ ] Domain is not expired

### DNS Setup Ready:
- [ ] Know how to access DNS settings
- [ ] Ready to add A records
- [ ] Ready to add CNAME records (if needed)
- [ ] Understand DNS propagation may take time

---

## ⚙️ Environment Variables

### All Variables Ready:
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (LIVE)
- [ ] `STRIPE_SECRET_KEY` (LIVE)
- [ ] `STRIPE_WEBHOOK_SECRET`
- [ ] `NODE_ENV=production`

### Documentation:
- [ ] Variables are documented
- [ ] Know where to find each value
- [ ] Have backup of all keys (securely stored)

---

## 🖼️ Assets & Content

### Images:
- [ ] All instructor photos uploaded (`/marcus.jpeg`, etc.)
- [ ] Course thumbnails uploaded (`/GenAI_2.png`, etc.)
- [ ] `frame_group.png` uploaded
- [ ] All images optimized (not too large)

### Content Review:
- [ ] All course descriptions are accurate
- [ ] Pricing is correct on all pages
- [ ] Contact information is correct (phone: 310-620-7966, email: d.stevenson@agile36.com)
- [ ] No placeholder text remains
- [ ] No test data visible
- [ ] All links work correctly

---

## 🔧 Configuration Files

### Next.js Config:
- [ ] `next.config.ts` has URL redirects configured
- [ ] All old URLs map to new structure
- [ ] Test build runs successfully: `npm run build`

### Code Quality:
- [ ] No console errors in browser
- [ ] No TypeScript errors: `npm run lint`
- [ ] All components render correctly
- [ ] Mobile responsive design works

---

## 🧪 Functionality Testing

### Navigation:
- [ ] Header navigation works
- [ ] Footer links work
- [ ] Mega menu displays correctly
- [ ] Search functionality works
- [ ] Course filtering works

### Course Pages:
- [ ] All 17+ course pages load
- [ ] "View Schedule" button works
- [ ] "Download Brochure" opens consultation modal
- [ ] "Enroll Now" button works
- [ ] Pricing displays correctly
- [ ] Certification badges show for full-day courses

### Schedule Pages:
- [ ] Schedules load from Supabase
- [ ] Filters work (This Month, Next Month, Weekdays, Weekend)
- [ ] "Enroll Now" goes to checkout
- [ ] "Group Inquiry" modal works
- [ ] "Download Brochure" modal works

### Checkout Flow:
- [ ] Step 1: Basic details form works
- [ ] Step 2: Stripe payment form loads
- [ ] Promo code can be applied
- [ ] Only one promo code at a time
- [ ] Price calculation is correct
- [ ] Payment completes successfully
- [ ] Success page shows after payment
- [ ] Email receipt is sent

### Forms & Modals:
- [ ] Consultation modal opens
- [ ] Consultation form submits
- [ ] Group inquiry modal opens
- [ ] Group inquiry form submits
- [ ] Contact page form works

### Other Pages:
- [ ] Homepage loads
- [ ] Corporate page displays
- [ ] Contact page displays
- [ ] Blog section (if active)
- [ ] 404 page works

---

## 📱 Browser & Device Testing

### Desktop Browsers:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

### Mobile Devices:
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] Tablet view
- [ ] Responsive breakpoints work

### Performance:
- [ ] Pages load in under 3 seconds
- [ ] Images load properly
- [ ] No layout shifts
- [ ] Smooth scrolling

---

## 🔒 Security & Privacy

### SSL/HTTPS:
- [ ] Will be handled by Vercel (auto-configured)
- [ ] HTTPS redirect enabled

### Data Protection:
- [ ] No sensitive data in frontend code
- [ ] API keys are environment variables
- [ ] Service role key only used server-side
- [ ] Forms use HTTPS

### Stripe Security:
- [ ] Using Stripe Elements (PCI compliant)
- [ ] Not storing card details
- [ ] Webhook signature verification enabled

---

## 📊 Analytics & Monitoring

### Optional (Recommended):
- [ ] Google Analytics configured
- [ ] Google Search Console set up
- [ ] Stripe email notifications enabled
- [ ] Error monitoring (Sentry, etc.)

---

## 🚀 Deployment Plan

### Pre-Launch:
- [ ] All checklist items above completed
- [ ] Backup of current site (if migrating)
- [ ] Stakeholders informed of launch
- [ ] Support team ready

### Launch Day:
- [ ] Deploy to Vercel
- [ ] Test on Vercel URL thoroughly
- [ ] Add custom domain
- [ ] Configure DNS
- [ ] Wait for DNS propagation
- [ ] Test on custom domain
- [ ] Monitor for errors

### Post-Launch:
- [ ] Test all critical paths
- [ ] Monitor Stripe dashboard
- [ ] Monitor Vercel analytics
- [ ] Check email deliverability
- [ ] Fix any issues immediately
- [ ] Announce launch

---

## 📞 Emergency Contacts

Have these ready:
- [ ] Vercel support
- [ ] Supabase support
- [ ] Stripe support
- [ ] Domain registrar support
- [ ] Your developer contact

---

## 🎯 Success Criteria

Site is ready to launch when:
- ✅ All checkboxes above are checked
- ✅ Test payment completes successfully
- ✅ Promo code `150OFF` works
- ✅ All 17+ courses display correctly
- ✅ Schedules load from database
- ✅ Mobile site looks professional
- ✅ No console errors
- ✅ Team has tested thoroughly

---

## 🚦 Launch Status

**Current Status**: [ ] Ready to Launch | [ ] Needs Work

**Launch Date**: _______________

**Launched By**: _______________

**Notes**:
_________________________________________________
_________________________________________________
_________________________________________________

---

**🎉 Good luck with your launch!**

