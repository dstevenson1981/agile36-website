-- FIX ALL DUPLICATES AND CORRECT END TIMES FOR ALL SAFe 2-DAY COURSES
-- All classes should start at 9 AM and end at 5 PM EST
-- Remove all duplicates (same course on same dates)

-- STEP 1: Show all duplicates (matching by course + date only, ignoring time)
SELECT 
  course_slug, 
  course_name,
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  start_time,
  end_time,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text || ' (' || TO_CHAR(start_date, 'HH24:MI') || '-' || TO_CHAR(end_date, 'HH24:MI') || ')', ', ') as duplicate_details
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, course_name, DATE(start_date), DATE(end_date), start_time, end_time
HAVING COUNT(*) > 1
ORDER BY course_slug, DATE(start_date);

-- STEP 2: Remove ALL duplicates - keep only the OLDEST entry (lowest ID) for each course + date pair
-- This matches by DATE only, ignoring time differences
DELETE FROM course_schedules
WHERE id IN (
  SELECT id FROM (
    SELECT 
      id, 
      course_slug,
      DATE(start_date) as start_date_only,
      DATE(end_date) as end_date_only,
      ROW_NUMBER() OVER (
        PARTITION BY course_slug, DATE(start_date), DATE(end_date) 
        ORDER BY id ASC
      ) as rn
    FROM course_schedules
    WHERE DATE(start_date) >= '2026-02-09' 
      AND DATE(start_date) <= '2026-05-31'
      AND course_type = 'SAFe' 
      AND duration LIKE '%02 days%'
  ) t 
  WHERE rn > 1
);

-- STEP 3: Verify duplicates are removed
SELECT 
  course_slug, 
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  COUNT(*) as count
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, DATE(start_date), DATE(end_date)
HAVING COUNT(*) > 1;
-- Should return 0 rows

-- STEP 4: Update ALL 2-day SAFe courses to have correct times: 9 AM - 5 PM EST
-- Fix both start_time/end_time fields AND the actual start_date/end_date timestamps
UPDATE course_schedules
SET 
  start_time = '09:00:00',
  end_time = '17:00:00',
  start_date = DATE(start_date) + TIME '09:00:00',
  end_date = DATE(end_date) + TIME '17:00:00'
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
  AND (end_time != '17:00:00' OR end_date::time != TIME '17:00:00');

-- STEP 5: Update prices to match new pricing structure
UPDATE course_schedules
SET 
  price = CASE 
    WHEN course_slug = 'safe-for-teams' THEN 599.00
    WHEN course_slug = 'safe-devops' THEN 699.00
    WHEN course_slug = 'advanced-scrum-master' THEN 950.00
    WHEN course_slug = 'lean-portfolio-management' THEN 1095.00
    ELSE 555.00
  END,
  original_price = CASE 
    WHEN course_slug = 'safe-for-teams' THEN 1198.00
    WHEN course_slug = 'safe-devops' THEN 1398.00
    WHEN course_slug = 'advanced-scrum-master' THEN 1900.00
    WHEN course_slug = 'lean-portfolio-management' THEN 2190.00
    ELSE 1110.00
  END
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%';

-- STEP 6: Verify all courses now have correct end time (5 PM)
SELECT 
  course_slug,
  course_name,
  DATE(start_date) as start_date_only,
  start_time,
  end_time,
  TO_CHAR(end_date, 'HH24:MI') as end_date_time,
  CASE 
    WHEN end_time = '17:00:00' AND end_date::time = TIME '17:00:00' THEN 'CORRECT'
    ELSE 'WRONG - NEEDS FIX'
  END as time_status
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
ORDER BY course_slug, DATE(start_date)
LIMIT 20;

-- STEP 7: Show sample courses to verify no duplicates and correct times
SELECT 
  id,
  course_slug,
  course_name,
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  start_time,
  end_time,
  TO_CHAR(start_date, 'YYYY-MM-DD HH24:MI') as full_start,
  TO_CHAR(end_date, 'YYYY-MM-DD HH24:MI') as full_end,
  instructor_name,
  price
FROM course_schedules
WHERE DATE(start_date) IN ('2026-02-09', '2026-02-14', '2026-02-16', '2026-02-23')
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
ORDER BY DATE(start_date), course_slug;

-- STEP 8: Final summary
SELECT 
  course_slug, 
  course_name, 
  COUNT(*) as total_cohorts,
  COUNT(*) FILTER (WHERE end_time = '17:00:00') as correct_end_time_count,
  COUNT(*) FILTER (WHERE end_time != '17:00:00') as wrong_end_time_count,
  MIN(price) as price,
  MIN(original_price) as original_price
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, course_name
ORDER BY course_slug;
