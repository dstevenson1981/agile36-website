-- DIAGNOSTIC: See exactly what duplicates exist in the database
-- Run this FIRST to understand the problem

-- Show ALL courses for Feb 16-17 with full details
SELECT 
  id,
  course_slug,
  course_name,
  start_date,
  end_date,
  start_time,
  end_time,
  instructor_name,
  price,
  original_price,
  created_at,
  updated_at
FROM course_schedules
WHERE DATE(start_date) = '2026-02-16'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
ORDER BY course_slug, id;

-- Show duplicates grouped by course + date
SELECT 
  course_slug,
  course_name,
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text, ', ' ORDER BY id) as all_ids,
  STRING_AGG(DISTINCT instructor_name, ', ') as instructors,
  STRING_AGG(DISTINCT price::text, ', ') as prices
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, course_name, DATE(start_date), DATE(end_date)
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, course_slug, start_date_only
LIMIT 50;

-- Show total duplicate count
SELECT 
  COUNT(*) as total_duplicate_entries,
  COUNT(DISTINCT course_slug || '|' || DATE(start_date)::text || '|' || DATE(end_date)::text) as unique_duplicate_groups
FROM (
  SELECT 
    course_slug,
    DATE(start_date) as start_date_only,
    DATE(end_date) as end_date_only,
    COUNT(*) as cnt
  FROM course_schedules
  WHERE DATE(start_date) >= '2026-02-09' 
    AND DATE(start_date) <= '2026-05-31'
    AND course_type = 'SAFe' 
    AND duration LIKE '%02 days%'
  GROUP BY course_slug, DATE(start_date), DATE(end_date)
  HAVING COUNT(*) > 1
) duplicates;
