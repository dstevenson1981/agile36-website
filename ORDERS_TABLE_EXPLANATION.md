# Orders Table - What Data Gets Stored

The `orders` table stores complete information about each course enrollment/payment transaction. Here's what goes in each field:

## Table Fields Explained

### Payment Information
- **`payment_intent_id`** (TEXT, UNIQUE, REQUIRED)
  - Stripe Payment Intent ID (e.g., `pi_1234567890`)
  - Used to track the payment in Stripe
  - Unique identifier for each payment

- **`stripe_customer_id`** (TEXT, OPTIONAL)
  - Stripe Customer ID if customer was created
  - Can be null if customer wasn't saved to Stripe

- **`payment_status`** (TEXT, REQUIRED)
  - Status from Stripe: `succeeded`, `processing`, `requires_payment_method`, etc.
  - Typically `succeeded` for completed orders

- **`amount`** (DECIMAL, REQUIRED)
  - Total amount paid in dollars (e.g., `515.00`)
  - Already converted from Stripe's cents format

- **`currency`** (TEXT, DEFAULT: 'usd')
  - Payment currency, usually `usd`

### Course & Schedule Information
- **`schedule_id`** (TEXT, REQUIRED)
  - ID of the specific course schedule/date they enrolled in
  - References the `course_schedules` table

- **`course_slug`** (TEXT, REQUIRED)
  - URL-friendly course identifier (e.g., `leading-safe`, `scrum-master`)

- **`course_name`** (TEXT, REQUIRED)
  - Full course name (e.g., `Leading SAFe® 6.0 Training`)

- **`plan`** (TEXT, REQUIRED)
  - Selected plan: `basic` or `pro`
  - Determines what's included in the enrollment

- **`quantity`** (INTEGER, DEFAULT: 1)
  - Number of enrollments (how many people)
  - Usually 1, but can be multiple for group enrollments

### Customer Information
- **`customer_email`** (TEXT, REQUIRED)
  - Primary email address of the person enrolling
  - Used for order lookup and communication

- **`customer_name`** (TEXT, OPTIONAL)
  - Full name: "First Last"
  - Can be null

- **`customer_phone`** (TEXT, OPTIONAL)
  - Phone number provided during checkout
  - Can be null

- **`alternative_contact`** (TEXT, OPTIONAL)
  - Alternative email or phone if provided
  - Can be null

- **`enrolling_for`** (TEXT, DEFAULT: 'myself')
  - Whether enrolling for `myself` or `someone-else`

### Additional Fields
- **`promo_code`** (TEXT, OPTIONAL)
  - Promo code applied (e.g., `50OFF`)
  - Can be null if no promo code used

- **`id`** (UUID, AUTO-GENERATED)
  - Unique database ID for the order
  - Primary key

- **`created_at`** (TIMESTAMP, AUTO-GENERATED)
  - When the order was created
  - Automatically set to current time

- **`updated_at`** (TIMESTAMP, AUTO-GENERATED)
  - Last update time
  - Automatically maintained

## Example Order Data

When someone completes a checkout, here's what gets stored:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "payment_intent_id": "pi_3ABC123xyz789",
  "stripe_customer_id": "cus_ABC123xyz",
  "schedule_id": "schedule_123",
  "course_slug": "leading-safe",
  "course_name": "Leading SAFe® 6.0 Training",
  "plan": "pro",
  "quantity": 1,
  "amount": 592.25,
  "currency": "usd",
  "customer_email": "john.doe@example.com",
  "customer_name": "John Doe",
  "customer_phone": "+14049217518",
  "alternative_contact": "",
  "enrolling_for": "myself",
  "payment_status": "succeeded",
  "promo_code": "50OFF",
  "created_at": "2024-11-21T16:30:00Z",
  "updated_at": "2024-11-21T16:30:00Z"
}
```

## When Data Gets Inserted

Data is inserted into this table:
1. **After successful Stripe payment** - When `payment_intent.status === 'succeeded'`
2. **Via `/api/confirm-payment` endpoint** - Called from the PaymentForm component
3. **One record per successful payment** - Each checkout creates one order

## What You Can Do With This Data

- Track all enrollments and payments
- Look up orders by customer email
- Find orders for a specific course schedule
- Calculate revenue by course, plan, or date
- Send confirmation emails
- Generate reports
- Handle refunds (update payment_status)
- Track promo code usage

## Indexes Created

The SQL also creates indexes for fast queries on:
- `payment_intent_id` - Look up by Stripe ID
- `customer_email` - Find all orders for a customer
- `schedule_id` - Find all enrollments for a schedule
- `created_at` - Time-based reports

## Security (RLS Policies)

- Service role can do everything (for API routes)
- Users can only view their own orders (by email matching)
- Prevents unauthorized access to order data



