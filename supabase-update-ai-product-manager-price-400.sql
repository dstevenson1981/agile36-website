/* Set Certified AI Product Manager course price to $400. Run in Supabase SQL Editor. */

UPDATE course_schedules
SET
  price = '400.00',
  original_price = '800.00'
WHERE
  course_slug = 'certified-ai-product-manager'
  AND status = 'active';

SELECT id, course_slug, course_name, start_date, price, original_price, status
FROM course_schedules
WHERE course_slug = 'certified-ai-product-manager'
ORDER BY start_date
LIMIT 5;
