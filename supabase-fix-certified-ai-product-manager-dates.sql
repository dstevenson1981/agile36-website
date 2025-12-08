-- Fix timezone issue for Certified AI Product Manager dates
-- Update December 2025 dates to use proper timestamp with timezone

UPDATE course_schedules
SET 
  start_date = '2025-12-20 09:00:00-05:00'::timestamp with time zone,
  end_date = '2025-12-21 14:00:00-05:00'::timestamp with time zone,
  timezone = 'America/New_York',
  updated_at = NOW()
WHERE course_slug = 'certified-ai-product-manager'
  AND DATE(start_date) = '2025-12-20';

UPDATE course_schedules
SET 
  start_date = '2025-12-29 09:00:00-05:00'::timestamp with time zone,
  end_date = '2025-12-30 14:00:00-05:00'::timestamp with time zone,
  timezone = 'America/New_York',
  updated_at = NOW()
WHERE course_slug = 'certified-ai-product-manager'
  AND DATE(start_date) = '2025-12-29';

-- Verify the dates are correct
SELECT 
  course_name,
  start_date,
  end_date,
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  timezone
FROM course_schedules 
WHERE course_slug = 'certified-ai-product-manager'
  AND (DATE(start_date) IN ('2025-12-20', '2025-12-29'))
ORDER BY start_date;




