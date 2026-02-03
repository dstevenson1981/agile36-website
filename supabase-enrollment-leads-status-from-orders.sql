-- Cross-reference enrollment_leads with orders:
-- - Mark as 'completed' (and set order_id) when the same email + schedule_id appears in orders.
-- - Mark as 'abandoned' when there is no matching order.
-- Run in Supabase SQL Editor.

-- 1. Mark leads as completed where we have a matching order (same email + same schedule)
UPDATE enrollment_leads el
SET
  status = 'completed',
  order_id = o.id,
  updated_at = NOW()
FROM orders o
WHERE el.email = o.customer_email
  AND el.schedule_id = o.schedule_id
  AND el.status = 'pending';

-- 2. Mark remaining pending leads as abandoned (no matching order for that email + schedule)
UPDATE enrollment_leads
SET
  status = 'abandoned',
  updated_at = NOW()
WHERE status = 'pending';
