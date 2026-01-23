-- Update Certified AI Product Manager course prices to $555
-- Original price set to $1110 (50% discount)

UPDATE course_schedules
SET 
  price = '555.00',
  original_price = '1110.00'
WHERE 
  course_slug = 'certified-ai-product-manager'
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
WHERE course_slug = 'certified-ai-product-manager'
ORDER BY start_date;
