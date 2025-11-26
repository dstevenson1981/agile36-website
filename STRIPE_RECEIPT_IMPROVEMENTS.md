# Stripe Receipt Improvements

## Issues Fixed

### 1. **Customer Records Now Created**
- ✅ Stripe customer is created or retrieved before payment
- ✅ Customer name, email, and phone are stored
- ✅ Customer is attached to payment intent
- ✅ You'll see customer records in Stripe Dashboard > Customers
- ✅ Existing customers are updated with latest information

### 2. **Receipt Emails Now Sent**
- ✅ `receipt_email` is set on payment intent
- ✅ Stripe automatically sends receipt emails
- ✅ Email includes payment details and description

### 3. **Detailed Receipt Description**
- ✅ Description includes course name
- ✅ Description includes plan (Basic/Pro)
- ✅ Description includes class dates
- ✅ Description includes quantity
- ✅ Format: "Leading SAFe® 6.0 Training - Pro Plan (Class: Nov 21 - Nov 22, 2025) - 1 enrollment"

### 4. **Complete Metadata**
- ✅ All customer information stored in metadata
- ✅ Course details (name, slug, schedule)
- ✅ Enrollment details (plan, quantity, dates, times)
- ✅ Contact information (phone, alternative contact)

## What You'll See in Stripe Now

### Customers Tab
- Customer name and email
- Phone number (if provided)
- All payment history linked to customer
- Click on customer to see all their enrollments

### Payments Tab
- **Description**: "Leading SAFe® 6.0 Training - Pro Plan (Class: Nov 21 - Nov 22, 2025) - 1 enrollment"
- **Customer**: Your name (clickable to see customer details)
- **Receipt**: Email sent automatically with full details
- **Metadata**: All course and enrollment information

### Receipt Email
The customer will receive an email with:
- Receipt number
- Amount paid
- Date paid
- Payment method
- **Description showing exactly what course and class they registered for**
- Customer support contact info

## Testing

1. Make a new payment
2. Check Stripe Dashboard > **Customers** - you should see your customer with name
3. Check your email - you should receive a receipt
4. Check Stripe Dashboard > **Payments** - click on payment to see:
   - Customer name and email
   - Detailed description of what was purchased
   - All metadata with course and class information

## Key Changes Made

### `/api/create-payment-intent`
1. **Creates/retrieves Stripe customer** by email
2. **Updates existing customers** with latest name and phone
3. **Sets `receipt_email`** on payment intent
4. **Attaches `customer`** to payment intent
5. **Adds detailed `description`** field with course, plan, dates, and quantity
6. **Sets `statement_descriptor`** for card statements
7. **Stores comprehensive metadata** including schedule dates and times

### `/api/confirm-payment`
1. **Stores customer_id** from payment intent
2. **Retrieves payment method details** for tracking
3. **Better error handling**

### Checkout Page
1. **Sends schedule date and time** to payment intent API
2. **Sends duration and timezone** information
3. **Formats dates properly** for receipt description



