-- FINAL FIX: Remove duplicates based on DATE only (ignore time differences)
-- The issue: Same course on same dates but different times (2 PM vs 5 PM) are showing as duplicates
-- Solution: Match by course_slug + DATE(start_date) + DATE(end_date), ignoring time

-- STEP 1: Show all duplicates (matching by date only, not time)
SELECT 
  course_slug, 
  course_name,
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  start_date,
  end_date,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text || ' (' || start_time || '-' || end_time || ')', ', ') as duplicate_details
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, course_name, DATE(start_date), DATE(end_date)
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

-- STEP 3: Verify duplicates are completely removed
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
-- Should return 0 rows - if you see any, there are still duplicates

-- STEP 4: Update all remaining entries to have consistent times (9 AM - 2 PM)
-- This ensures all 2-day courses have the same schedule format
UPDATE course_schedules
SET 
  start_time = '09:00:00',
  end_time = '14:00:00',
  start_date = DATE(start_date) + TIME '09:00:00',
  end_date = DATE(end_date) + TIME '14:00:00'
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%';

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

-- STEP 6: Show all courses for Feb 14-15 to verify no duplicates
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
  original_price
FROM course_schedules
WHERE DATE(start_date) = '2026-02-14'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
ORDER BY course_slug;

-- STEP 7: Show all courses for Feb 16-17 to verify no duplicates
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
  original_price
FROM course_schedules
WHERE DATE(start_date) = '2026-02-16'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
ORDER BY course_slug;

-- STEP 8: Final summary
SELECT 
  course_slug, 
  course_name, 
  COUNT(*) as total_cohorts,
  MIN(price) as price,
  MIN(original_price) as original_price
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, course_name
ORDER BY course_slug;
