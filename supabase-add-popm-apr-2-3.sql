/* Update SAFe Product Owner/Product Manager class Apr 2-3 to $555. Run in Supabase SQL Editor. */

UPDATE course_schedules
SET
  price = 555.00,
  original_price = 1110.00,
  updated_at = NOW()
WHERE course_slug = 'product-owner-manager'
  AND start_date >= '2026-04-02'::timestamptz
  AND start_date < '2026-04-03'::timestamptz;
