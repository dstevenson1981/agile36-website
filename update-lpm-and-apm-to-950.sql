-- Update SAFe LPM + APM course prices to $950
-- Sets original_price to $1900 (50% discount)

UPDATE course_schedules
SET
  price = '950.00',
  original_price = '1900.00',
  updated_at = NOW()
WHERE
  course_slug IN ('lean-portfolio-management', 'agile-product-management')
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
WHERE course_slug IN ('lean-portfolio-management', 'agile-product-management')
ORDER BY course_slug, start_date;

