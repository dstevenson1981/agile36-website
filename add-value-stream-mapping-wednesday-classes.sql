-- Add Value Stream Mapping classes for every Wednesday
-- Reference date: Saturday, Jan 24, 2026
-- Next Wednesday: Jan 28, 2026
-- Add classes through May 31, 2026

-- First, let's check existing Value Stream Mapping schedules to get the pattern
SELECT 
  course_slug,
  course_name,
  price,
  original_price,
  duration,
  start_time,
  end_time,
  timezone,
  time_slot,
  instructor_name,
  language,
  is_weekend
FROM course_schedules
WHERE course_slug = 'value-stream-mapping'
  AND status = 'active'
LIMIT 1;

-- Generate all Wednesdays from Jan 28, 2026 through May 31, 2026
-- Wednesday = 3 in PostgreSQL DOW (0=Sunday, 1=Monday, ..., 3=Wednesday, ..., 6=Saturday)
-- Jan 28, 2026 is a Wednesday

WITH wednesday_dates AS (
  SELECT 
    generate_series(
      '2026-01-28'::date,  -- First Wednesday after Jan 24, 2026
      '2026-05-31'::date,  -- Through May 31, 2026
      '1 week'::interval
    )::date AS class_date
),
instructors AS (
  SELECT unnest(ARRAY['Deadra Stevenson', 'Joe Puoci', 'Marcus Ball']) AS instructor_name,
         unnest(ARRAY['/Deadra.jpeg', '/Joe.jpeg', '/marcus.jpeg']) AS instructor_image
)
INSERT INTO course_schedules (
  course_slug,
  course_name,
  start_date,
  end_date,
  start_time,
  end_time,
  timezone,
  duration,
  price,
  original_price,
  instructor_name,
  instructor_image,
  language,
  time_slot,
  is_weekend,
  status,
  seats_available,
  created_at,
  updated_at
)
SELECT 
  'value-stream-mapping' AS course_slug,
  'SAFe Value Stream Mapping' AS course_name,
  wd.class_date AS start_date,
  wd.class_date AS end_date,  -- Same day (half-day course)
  '08:00:00' AS start_time,  -- 8:00 AM EST
  '12:00:00' AS end_time,    -- 12:00 PM EST (half day)
  'America/New_York' AS timezone,
  'Half day' AS duration,
  '350.00' AS price,
  '700.00' AS original_price,
  i.instructor_name,
  i.instructor_image,
  'English' AS language,
  'morning' AS time_slot,
  false AS is_weekend,  -- Wednesday is a weekday
  'active' AS status,
  25 AS seats_available,
  NOW() AS created_at,
  NOW() AS updated_at
FROM wednesday_dates wd
CROSS JOIN LATERAL (
  SELECT 
    instructor_name, 
    instructor_image
  FROM (
    SELECT 
      instructor_name,
      instructor_image,
      ROW_NUMBER() OVER (ORDER BY instructor_name) as rn
    FROM instructors
  ) ranked
  WHERE rn = ((EXTRACT(EPOCH FROM (wd.class_date - '2026-01-28'::date)) / 86400)::int % 3) + 1
  LIMIT 1
) i
WHERE NOT EXISTS (
  -- Don't insert if a class already exists on this date
  SELECT 1 
  FROM course_schedules 
  WHERE course_slug = 'value-stream-mapping'
    AND DATE(start_date) = wd.class_date
    AND status = 'active'
)
ORDER BY wd.class_date;

-- Verify the inserted classes
SELECT 
  id,
  course_slug,
  course_name,
  start_date,
  end_date,
  EXTRACT(DOW FROM start_date) as day_of_week,
  CASE 
    WHEN EXTRACT(DOW FROM start_date) = 0 THEN 'Sunday'
    WHEN EXTRACT(DOW FROM start_date) = 1 THEN 'Monday'
    WHEN EXTRACT(DOW FROM start_date) = 2 THEN 'Tuesday'
    WHEN EXTRACT(DOW FROM start_date) = 3 THEN 'Wednesday'
    WHEN EXTRACT(DOW FROM start_date) = 4 THEN 'Thursday'
    WHEN EXTRACT(DOW FROM start_date) = 5 THEN 'Friday'
    WHEN EXTRACT(DOW FROM start_date) = 6 THEN 'Saturday'
  END as day_name,
  start_time,
  end_time,
  instructor_name,
  price,
  status
FROM course_schedules
WHERE course_slug = 'value-stream-mapping'
  AND start_date >= '2026-01-28'
  AND start_date <= '2026-05-31'
  AND EXTRACT(DOW FROM start_date) = 3  -- Wednesday
ORDER BY start_date;
