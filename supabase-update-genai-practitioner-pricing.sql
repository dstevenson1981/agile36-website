-- Update Certified GenAI Practitioner™ Course Pricing to $299
-- Run this in Supabase SQL Editor to update all existing schedule records

-- Update all Certified GenAI Practitioner course schedules to $299 (original: $598)
UPDATE course_schedules
SET 
  price = 299.00,
  original_price = 598.00,
  updated_at = NOW()
WHERE course_slug = 'certified-genai-practitioner';

-- Verify the update
SELECT 
  course_name,
  course_slug,
  price,
  original_price,
  start_date,
  status,
  updated_at
FROM course_schedules
WHERE course_slug = 'certified-genai-practitioner'
ORDER BY start_date
LIMIT 10;
