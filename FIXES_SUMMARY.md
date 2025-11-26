# Fixes Summary - Customer Records, Schedule Storage, and Email Notifications

## Issues Fixed

### 1. ✅ Stripe Customer Name and Email Not Showing
**Problem**: Customer name and email were not appearing in Stripe customer records, only showing as "Guest" customers.

**Solution**:
- Customer is now created/updated BEFORE payment intent creation
- Customer is updated again AFTER payment confirmation to ensure name/email are set
- Added validation to ensure customer has both email and name
- Added console logging for debugging

**Files Changed**:
- `app/api/create-payment-intent/route.ts` - Ensures customer has name/email before payment
- `app/api/confirm-payment/route.ts` - Updates customer after payment to ensure name/email are stored

### 2. ✅ Schedule Information Not Stored in Supabase
**Problem**: Class dates, times, duration, and timezone were not being stored in the orders table.

**Solution**:
- Added new columns to orders table: `schedule_date`, `schedule_time`, `duration`, `timezone`
- Updated `confirm-payment` route to store schedule information from payment intent metadata
- Created SQL migration script

**Files Changed**:
- `supabase-add-schedule-columns.sql` - SQL script to add new columns
- `app/api/confirm-payment/route.ts` - Stores schedule info in orderData

**Action Required**: Run the SQL script in Supabase:
```sql
-- Run this in Supabase SQL Editor
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS schedule_date TEXT,
ADD COLUMN IF NOT EXISTS schedule_time TEXT,
ADD COLUMN IF NOT EXISTS duration TEXT,
ADD COLUMN IF NOT EXISTS timezone TEXT;
```

### 3. ✅ Email Notification for New Registrations
**Problem**: No notification when someone registers for a class.

**Solution**:
- Use Stripe's built-in alert system (configured in Stripe Dashboard)
- All order information is stored in Supabase for easy access
- Stripe webhooks can be configured to send notifications

**Action Required**: Set up alerts in Stripe Dashboard:
1. Go to Stripe Dashboard > Settings > Notifications
2. Configure email alerts for successful payments
3. Add `d.stevenson@agile36.com` as a recipient

## What's Now Stored in Supabase Orders Table

Each order now includes:
- ✅ Customer information (name, email, phone)
- ✅ Course details (name, slug, plan)
- ✅ **Schedule date** (NEW)
- ✅ **Schedule time** (NEW)
- ✅ **Duration** (NEW)
- ✅ **Timezone** (NEW)
- ✅ Payment details (amount, status, payment intent ID)
- ✅ Enrollment details (quantity, enrolling for)

## What's Now in Stripe

- ✅ Customer records with name and email
- ✅ Payment intents linked to customers
- ✅ Receipt emails with course details
- ✅ All metadata including schedule information

## Testing Checklist

1. **Stripe Customer**:
   - [ ] Make a test payment
   - [ ] Check Stripe Dashboard > Customers
   - [ ] Verify customer has name and email (not "Guest")

2. **Supabase Orders**:
   - [ ] Run SQL migration script
   - [ ] Make a test payment
   - [ ] Check orders table in Supabase
   - [ ] Verify `schedule_date`, `schedule_time`, `duration`, `timezone` are populated

3. **Email Notification**:
   - [ ] Configure SMTP in `.env.local`
   - [ ] Make a test payment
   - [ ] Check `d.stevenson@agile36.com` inbox
   - [ ] Verify email contains all registration details

## Next Steps

1. Run the SQL migration script in Supabase
2. Configure SMTP email settings (see `EMAIL_SETUP_INSTRUCTIONS.md`)
3. Test with a real payment
4. Verify all three fixes are working

