/* Manual order: Leading SAFe Pro (Apr 11–12, 2026), enriquesan@iadb.org, $477.25
   Run each block in Supabase SQL Editor for the CORRECT project (Production). */

-- ---------------------------------------------------------------------------
-- 1) VERIFY — run this first. If a row appears, the insert already happened.
-- ---------------------------------------------------------------------------
SELECT id,
       created_at,
       customer_email,
       course_slug,
       plan,
       amount,
       payment_intent_id,
       course_name
FROM orders
WHERE customer_email ILIKE '%enriquesan@iadb.org%'
   OR payment_intent_id ILIKE '%enriquesan%'
ORDER BY created_at DESC
LIMIT 25;

-- ---------------------------------------------------------------------------
-- 2) CHECK — optional columns (if INSERT below errors on “column does not exist”)
-- ---------------------------------------------------------------------------
-- SELECT column_name, is_nullable, data_type
-- FROM information_schema.columns
-- WHERE table_schema = 'public' AND table_name = 'orders'
-- ORDER BY ordinal_position;

-- ---------------------------------------------------------------------------
-- 3) INSERT (full — includes schedule_* if your DB has those columns from migrations)
-- ---------------------------------------------------------------------------
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
  'manual-link-enriquesan-iadb-leading-safe-pro-2026-04-11',
  NULL,
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
)
RETURNING id, customer_email, amount, course_slug, payment_intent_id, created_at;

-- ---------------------------------------------------------------------------
-- 4) INSERT (minimal) — use ONLY if block 3 fails: unknown column schedule_date, etc.
--     Change payment_intent_id string if you already ran block 3 successfully once.
-- ---------------------------------------------------------------------------
/*
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
  payment_status
) VALUES (
  'manual-link-enriquesan-iadb-leading-safe-pro-2026-04-11-v2',
  NULL,
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
  'succeeded'
)
RETURNING id, customer_email, amount, payment_intent_id, created_at;
*/
