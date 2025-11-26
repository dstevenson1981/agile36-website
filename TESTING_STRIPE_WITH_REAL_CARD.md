# Testing Stripe with Real Credit Card - $1 Test

## Steps to Test with Real Credit Card

### 1. Set Price to $1 in Supabase
1. Go to Supabase → SQL Editor
2. Copy and paste the contents of `supabase-set-price-to-1-dollar.sql`
3. **Choose ONE option:**
   - **Option 1**: Updates ALL active schedules to $1 (easiest)
   - **Option 2**: Updates only the first upcoming schedule (safer)
   - **Option 3**: Update a specific schedule by ID (most precise)
4. Run the SQL
5. Verify with the SELECT query at the bottom

### 2. Important Notes
- ⚠️ **Don't use the "50OFF" promo code** - it gives $50 off, which would make $1 price negative
- ✅ The checkout will show $1.00 (or $1.15 for Pro plan)
- ✅ Your real credit card will be charged $1.00
- ✅ Order will be stored in the `orders` table
- ✅ You'll receive a real Stripe receipt

### 3. Test the Flow
1. Start dev server: `npm run dev`
2. Go to `/courses/leading-safe/schedule`
3. Click "ENROLL NOW" on a $1 schedule
4. Complete Steps 1-3:
   - Step 1: Enter your real name, email, phone
   - Step 2: Choose Basic or Pro plan
   - Step 3: Enter your **real credit card** details
5. Submit payment
6. You should be charged $1.00 (or $1.15 for Pro)

### 4. Verify It Worked
Check these places:
- ✅ Stripe Dashboard → Payments (should see $1 charge)
- ✅ Supabase `orders` table (should have new order)
- ✅ Email receipt from Stripe
- ✅ Success page appears after payment

### 5. Restore Original Prices
After testing:
1. Go to Supabase → SQL Editor
2. Run `supabase-restore-original-prices.sql`
3. Or manually update prices back to original values
4. Check the `supabase-course-schedules-data.sql` file for original prices

## What to Look For
- ✅ Payment processes successfully
- ✅ Order appears in `orders` table with correct data
- ✅ Stripe shows the payment in dashboard
- ✅ Success page redirects correctly
- ✅ All customer and course data is stored correctly

## Troubleshooting
If payment fails:
- Check browser console for errors
- Check Stripe Dashboard for payment attempt
- Verify Stripe API keys are correct in `.env.local`
- Check Supabase `orders` table was created
- Ensure `course_schedules` table has the $1 price



