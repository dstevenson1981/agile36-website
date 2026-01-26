-- Update SAFe Product Owner/Product Manager course prices to $525
-- Original price set to $1050 (50% discount)

UPDATE course_schedules
SET 
  price = '525.00',
  original_price = '1050.00'
WHERE 
  course_slug = 'product-owner-manager'
  AND status = 'active';

-- Verify the update
SELECT 
  id,
  course_slug,
  course_name,
  start_date,
  price,
  original_price,
  status
FROM course_schedules
WHERE course_slug = 'product-owner-manager'
ORDER BY start_date;
