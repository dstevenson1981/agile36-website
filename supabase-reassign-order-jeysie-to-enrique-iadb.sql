/* Reassign one enrollment from purchaser (Jeysie) to participant (Enrique) so the receipt
   shows under enriquesan@iadb.org in Account → Orders & Receipts.
   Run in Supabase SQL Editor (service role / postgres). Review the SELECTs first. */

-- 1) Preview orders currently tied to the purchaser email
SELECT id,
       created_at,
       course_slug,
       course_name,
       plan,
       amount,
       customer_email,
       customer_name,
       payment_intent_id
FROM orders
WHERE lower(trim(customer_email)) = lower(trim('jeysies@iadb.org'))
ORDER BY created_at DESC;

-- 2) If more than one row appears, pick the correct order id and run ONLY this scoped update:
/*
UPDATE orders
SET customer_email = lower(trim('enriquesan@iadb.org'))
WHERE id = 'PASTE_ORDER_UUID_HERE';
*/

-- 3) If Jeysie was the only order and you are sure all her orders should move to Enrique, use:
/*
UPDATE orders
SET customer_email = lower(trim('enriquesan@iadb.org'))
WHERE lower(trim(customer_email)) = lower(trim('jeysies@iadb.org'));
*/

-- 4) Optional: move Pro access rows from Jeysie’s auth user to Enrique’s (practice exams / user_access).
--    Skip if you only changed orders and user_access was never created for Jeysie.
--    If Enrique already has a row for the same course_id, this can conflict; run the SELECT first.

SELECT ua.id, ua.course_id, ua.plan_type, u.email AS user_email
FROM user_access ua
JOIN auth.users u ON u.id = ua.user_id
WHERE lower(u.email) = lower(trim('jeysies@iadb.org'));

/*
WITH jeysie AS (
  SELECT id FROM auth.users WHERE lower(email) = lower(trim('jeysies@iadb.org'))
),
enrique AS (
  SELECT id FROM auth.users WHERE lower(email) = lower(trim('enriquesan@iadb.org'))
)
UPDATE user_access ua
SET user_id = (SELECT id FROM enrique)
WHERE ua.user_id = (SELECT id FROM jeysie);
*/

-- If the UPDATE above fails on unique (user_id, course_id), delete Jeysie’s row after merging manually, or:
-- INSERT ... ON CONFLICT for each course as needed.
