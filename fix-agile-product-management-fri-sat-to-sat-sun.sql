-- Fix Agile Product Management: Change Friday-Saturday classes to Saturday-Sunday
-- Reference date: Saturday, Jan 24, 2026

-- First, let's see what we have
SELECT 
  id,
  course_slug,
  course_name,
  start_date,
  end_date,
  EXTRACT(DOW FROM start_date) as start_day_of_week, -- 0=Sunday, 1=Monday, ..., 5=Friday, 6=Saturday
  EXTRACT(DOW FROM end_date) as end_day_of_week,
  is_weekend,
  status
FROM course_schedules
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
ORDER BY start_date;

-- Update Friday-Saturday classes to Saturday-Sunday
-- Friday = 5, Saturday = 6, Sunday = 0
-- We need to add 1 day to both start_date and end_date to shift from Fri-Sat to Sat-Sun
UPDATE course_schedules
SET 
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  is_weekend = true
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
  AND EXTRACT(DOW FROM start_date) = 5  -- Friday
  AND EXTRACT(DOW FROM end_date) = 6;   -- Saturday

-- Verify the changes
SELECT 
  id,
  course_slug,
  course_name,
  start_date,
  end_date,
  EXTRACT(DOW FROM start_date) as start_day_of_week,
  EXTRACT(DOW FROM end_date) as end_day_of_week,
  CASE 
    WHEN EXTRACT(DOW FROM start_date) = 0 THEN 'Sunday'
    WHEN EXTRACT(DOW FROM start_date) = 1 THEN 'Monday'
    WHEN EXTRACT(DOW FROM start_date) = 2 THEN 'Tuesday'
    WHEN EXTRACT(DOW FROM start_date) = 3 THEN 'Wednesday'
    WHEN EXTRACT(DOW FROM start_date) = 4 THEN 'Thursday'
    WHEN EXTRACT(DOW FROM start_date) = 5 THEN 'Friday'
    WHEN EXTRACT(DOW FROM start_date) = 6 THEN 'Saturday'
  END as start_day_name,
  CASE 
    WHEN EXTRACT(DOW FROM end_date) = 0 THEN 'Sunday'
    WHEN EXTRACT(DOW FROM end_date) = 1 THEN 'Monday'
    WHEN EXTRACT(DOW FROM end_date) = 2 THEN 'Tuesday'
    WHEN EXTRACT(DOW FROM end_date) = 3 THEN 'Wednesday'
    WHEN EXTRACT(DOW FROM end_date) = 4 THEN 'Thursday'
    WHEN EXTRACT(DOW FROM end_date) = 5 THEN 'Friday'
    WHEN EXTRACT(DOW FROM end_date) = 6 THEN 'Saturday'
  END as end_day_name,
  is_weekend,
  status
FROM course_schedules
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
ORDER BY start_date;
