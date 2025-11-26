# Stripe Customer & Receipt Email Fix

## Issues Fixed

### 1. **Customer Records Now Created**
- ✅ Stripe customer is created or retrieved before payment
- ✅ Customer is attached to payment intent
- ✅ You'll see customer records in Stripe Dashboard > Customers
- ✅ Customer includes email, name, and phone

### 2. **Receipt Emails Now Sent**
- ✅ `receipt_email` is set on payment intent
- ✅ Stripe automatically sends receipt emails
- ✅ Email includes payment details and description

### 3. **Better Payment Tracking**
- ✅ Payment description includes course name, plan, and quantity
- ✅ Customer ID stored in metadata
- ✅ All customer details in payment metadata
- ✅ Orders table stores customer information

## What Changed

### `/api/create-payment-intent`
1. **Creates/retrieves Stripe customer** by email
2. **Sets `receipt_email`** on payment intent
3. **Attaches `customer`** to payment intent
4. **Adds `description`** field with course details
5. **Stores `customerId`** in metadata

### `/api/confirm-payment`
1. **Retrieves payment method details** for tracking
2. **Stores customer_id** from payment intent
3. **Better error handling**

### New: `/api/webhooks/stripe`
- Webhook endpoint for Stripe events
- Updates order status automatically
- Handles payment success/failure

## How to Test

1. Make a new payment
2. Check Stripe Dashboard > **Customers** - you should see your customer
3. Check your email - you should receive a receipt
4. Check Stripe Dashboard > **Payments** - click on payment to see:
   - Customer name and email
   - Description of what was purchased
   - All metadata

## Environment Variable (Optional)

If you want to set up webhooks, add to `.env.local`:
```
STRIPE_WEBHOOK_SECRET=whsec_...
```
Get this from Stripe Dashboard > Webhooks > Add endpoint > Copy signing secret

## What You'll See in Stripe Now

**Customers Tab:**
- Your name and email
- Phone number (if provided)
- All payment history linked to customer

**Payments Tab:**
- Description: "Leading SAFe® 6.0 Training - basic plan (1 enrollment)"
- Customer: Your name (clickable to see customer details)
- Receipt: Email sent automatically

**Orders Table (Supabase):**
- All customer information stored
- Payment intent ID for lookup
- Customer ID for Stripe lookup



