/* Manual order: Stripe Payment Link (not via website). Leading SAFe Pro, Apr 11–12, 2026.
   Customer: enriquesan@iadb.org (Enrique)
   Run in Supabase SQL Editor.
   - Replace payment_intent_id with the real Stripe PaymentIntent id (pi_…) or Checkout Session
     payment id if you have it — must stay UNIQUE. If you use the manual id below, leave it as-is once. */

INSERT INTO orders (
  payment_intent_id,
  stripe_customer_id,
  schedule_id,
  course_slug,
  course_name,
  plan,
  quantity,
  amount,
  currency,
  customer_email,
  customer_name,
  enrolling_for,
  payment_status,
  schedule_date,
  schedule_time,
  duration,
  timezone
) VALUES (
  'manual-link-enriquesan-iadb-leading-safe-pro-2026-04-11', -- change to pi_xxx if you prefer
  NULL, -- optional: cus_xxx from Stripe
  'manual-leading-safe-2026-04-11-12',
  'leading-safe',
  'AI-Empowered Leading SAFe® / SAFe Agilist',
  'pro',
  1,
  477.25,
  'usd',
  lower(trim('enriquesan@iadb.org')),
  'Enrique',
  'myself',
  'succeeded',
  'Apr 11 - Apr 12, 2026',
  NULL,
  NULL,
  NULL
);

/* Optional: Pro practice exam uses user_access, not only orders. Run if Enrique already has an auth account. */
/*
INSERT INTO user_access (user_id, course_id, plan_type)
SELECT id, 'leading-safe', 'pro'
FROM auth.users
WHERE lower(trim(email)) = lower(trim('enriquesan@iadb.org'))
ON CONFLICT (user_id, course_id)
DO UPDATE SET plan_type = 'pro';
*/
