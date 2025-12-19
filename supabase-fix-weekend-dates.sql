-- Fix weekend course dates: Change Friday-Saturday to Saturday-Sunday
-- December 20-21, 2025 is Friday-Saturday, should be Saturday-Sunday (Dec 21-22)

-- Update AI Agents course (Dec 20-21 -> Dec 21-22)
UPDATE course_schedules
SET 
  start_date = '2025-12-21 09:00:00-05:00',
  end_date = '2025-12-22 17:00:00-05:00'
WHERE course_slug = 'ai-agent-builder'
  AND start_date = '2025-12-20 09:00:00-05:00'
  AND is_weekend = true;

-- Update SAFe Scrum Master course (Dec 20-21 -> Dec 21-22)
UPDATE course_schedules
SET 
  start_date = '2025-12-21 09:00:00-05:00',
  end_date = '2025-12-22 17:00:00-05:00'
WHERE course_slug = 'scrum-master'
  AND start_date = '2025-12-20 09:00:00-05:00'
  AND is_weekend = true;

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
