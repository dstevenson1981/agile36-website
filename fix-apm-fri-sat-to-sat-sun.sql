-- Fix Agile Product Management: Change Friday-Saturday classes to Saturday-Sunday
-- Today: Monday, Feb 2, 2026
-- Run in Supabase SQL Editor

-- Preview: find Agile Product Management schedules that are Fri-Sat
SELECT
  id,
  course_slug,
  course_name,
  start_date,
  end_date,
  EXTRACT(DOW FROM start_date) AS start_dow, -- 0=Sun ... 5=Fri ... 6=Sat
  EXTRACT(DOW FROM end_date) AS end_dow,
  is_weekend,
  status
FROM course_schedules
WHERE
  status = 'active'
  AND course_slug = 'agile-product-management'
  AND start_date >= NOW()
  AND EXTRACT(DOW FROM start_date) = 5 -- Friday
  AND EXTRACT(DOW FROM end_date) = 6   -- Saturday
ORDER BY start_date;

-- Update: shift Fri-Sat to Sat-Sun by adding 1 day to start/end
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  is_weekend = true,
  updated_at = NOW()
WHERE
  status = 'active'
  AND course_slug = 'agile-product-management'
  AND start_date >= NOW()
  AND EXTRACT(DOW FROM start_date) = 5 -- Friday
  AND EXTRACT(DOW FROM end_date) = 6;  -- Saturday

-- Verify: confirm there are no remaining Fri-Sat APM schedules
SELECT
  COUNT(*) AS remaining_apm_fri_sat
FROM course_schedules
WHERE
  status = 'active'
  AND course_slug = 'agile-product-management'
  AND start_date >= NOW()
  AND EXTRACT(DOW FROM start_date) = 5
  AND EXTRACT(DOW FROM end_date) = 6;

-- Verify: confirm the shifted records are now Sat-Sun
SELECT
  id,
  course_slug,
  course_name,
  start_date,
  end_date,
  EXTRACT(DOW FROM start_date) AS start_dow,
  EXTRACT(DOW FROM end_date) AS end_dow,
  is_weekend,
  status
FROM course_schedules
WHERE
  status = 'active'
  AND course_slug = 'agile-product-management'
  AND start_date >= NOW()
  AND EXTRACT(DOW FROM start_date) = 6 -- Saturday
  AND EXTRACT(DOW FROM end_date) = 0   -- Sunday
ORDER BY start_date;

