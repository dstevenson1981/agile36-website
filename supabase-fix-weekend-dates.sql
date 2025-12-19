-- Fix weekend course dates: Change Friday-Saturday to Saturday-Sunday
-- Weekend courses should be Saturday-Sunday, not Friday-Saturday

-- First, find all weekend courses that start on Friday (DOW = 5)
-- Then update them to start on Saturday (add 1 day to both start and end dates)

-- Update AI Agents course (Dec 20-21 -> Dec 21-22)
UPDATE course_schedules
SET 
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day'
WHERE course_slug = 'ai-agent-builder'
  AND start_date = '2025-12-20 09:00:00-05:00'
  AND is_weekend = true;

-- Update SAFe Scrum Master course (Dec 20-21 -> Dec 21-22)
UPDATE course_schedules
SET 
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day'
WHERE course_slug = 'scrum-master'
  AND start_date = '2025-12-20 09:00:00-05:00'
  AND is_weekend = true;

-- Generic fix: Update ALL weekend courses that start on Friday to Saturday-Sunday
-- This will catch any other weekend courses with the same issue
UPDATE course_schedules
SET 
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day'
WHERE is_weekend = true
  AND EXTRACT(DOW FROM start_date) = 5  -- Friday (0=Sunday, 1=Monday, ..., 5=Friday, 6=Saturday)
  AND status = 'active';

-- Verify the updates
SELECT 
  id,
  course_name,
  course_slug,
  start_date,
  end_date,
  is_weekend,
  CASE 
    WHEN EXTRACT(DOW FROM start_date) = 6 THEN 'Saturday'
    WHEN EXTRACT(DOW FROM start_date) = 0 THEN 'Sunday'
    WHEN EXTRACT(DOW FROM start_date) = 5 THEN 'Friday'
    ELSE 'Other'
  END as start_day,
  CASE 
    WHEN EXTRACT(DOW FROM end_date) = 6 THEN 'Saturday'
    WHEN EXTRACT(DOW FROM end_date) = 0 THEN 'Sunday'
    WHEN EXTRACT(DOW FROM end_date) = 5 THEN 'Friday'
    ELSE 'Other'
  END as end_day
FROM course_schedules
WHERE is_weekend = true
  AND start_date >= '2025-12-01'
ORDER BY start_date;
