-- Update AI Agent Builder and Certified AI Product Manager course prices to $400
-- This updates all existing schedules for these courses

-- Update AI Agent Builder courses
UPDATE course_schedules
SET 
  price = 400.00,
  original_price = 800.00, -- Set original price to show discount
  updated_at = NOW()
WHERE course_slug = 'ai-agent-builder';

-- Update Certified AI Product Manager courses
UPDATE course_schedules
SET 
  price = 400.00,
  original_price = 800.00, -- Set original price to show discount
  updated_at = NOW()
WHERE course_slug = 'certified-ai-product-manager';

-- Verify the updates
SELECT 
  course_name,
  course_slug,
  price,
  original_price,
  status,
  start_date
FROM course_schedules
WHERE course_slug IN ('ai-agent-builder', 'certified-ai-product-manager')
ORDER BY course_slug, start_date;
