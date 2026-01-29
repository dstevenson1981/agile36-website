-- Update SAFe core courses (Leading SAFe, POPM, Scrum Master) to $555
-- Sets original_price to $1110 (50% discount)

UPDATE course_schedules
SET
  price = '555.00',
  original_price = '1110.00'
WHERE
  course_slug IN ('leading-safe', 'product-owner-manager', 'scrum-master')
  AND status = 'active';

-- Verify
SELECT
  id,
  course_slug,
  course_name,
  start_date,
  price,
  original_price,
  status
FROM course_schedules
WHERE course_slug IN ('leading-safe', 'product-owner-manager', 'scrum-master')
ORDER BY course_slug, start_date;

