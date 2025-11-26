# Stripe Customer Name and Email Fix

## Issue
Customer name and email were not being stored properly in Stripe customer records. Users could see email in transactions but not the name in the customer record.

## Root Cause
- Customer creation/update was not always setting the name field
- Existing "Guest" customers might not have email/name
- No validation to ensure customer has both email and name before proceeding

## Fixes Applied

### 1. **Always Set Email and Name**
- ✅ Email is always set on customer creation and update
- ✅ Name is always set if provided (firstName + lastName from form)
- ✅ Both fields are trimmed and validated

### 2. **Update Existing Customers**
- ✅ When finding existing customer by email, always update with latest info
- ✅ Always set email to ensure it's current
- ✅ Always set name if provided to ensure it's stored
- ✅ Update phone if provided

### 3. **Double-Check Before Payment**
- ✅ After customer creation/update, verify email and name are set
- ✅ If missing, update customer again
- ✅ Throw error if email is missing (required)
- ✅ Log warnings if name is missing (should be provided from form)

### 4. **Console Logging**
- ✅ Added detailed console logs for debugging
- ✅ Logs customer creation, updates, and final state
- ✅ Helps identify if name/email are being passed correctly

## What to Check

When testing, check the server logs for:
```
Creating/retrieving customer: { email: '...', name: '...' }
Found existing customer: cus_... email name
Updating customer with: { email: '...', name: '...' }
Customer updated: cus_... email name
```

Or for new customers:
```
Creating new customer with: { email: '...', name: '...' }
Customer created: cus_... email name
```

## Expected Result

After making a payment:
1. **Stripe Dashboard > Customers** - Should see customer with:
   - Name: "First Last"
   - Email: customer email
   - Phone: if provided

2. **Stripe Dashboard > Payments** - Click on payment:
   - Customer field should show the customer name
   - Email should be visible
   - Description shows course details

3. **Receipt Email** - Should include:
   - Customer name
   - Course description
   - Payment details

## Testing

1. Fill out checkout form with first name, last name, email, phone
2. Complete payment
3. Check Stripe Dashboard > Customers
4. Verify customer has name and email
5. Check server logs for customer creation/update messages



