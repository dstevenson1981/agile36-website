-- COMPREHENSIVE FIX: Remove duplicates and update prices for ALL SAFe 2-day courses
-- Run this in Supabase SQL Editor

-- STEP 1: First, update prices for existing courses to match new pricing structure
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
WHERE start_date >= '2026-02-09' 
  AND start_date <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%';

-- STEP 2: Identify ALL duplicates (same course on same date pair)
SELECT 
  course_slug, 
  course_name,
  start_date, 
  end_date, 
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text, ', ') as duplicate_ids
FROM course_schedules
WHERE start_date >= '2026-02-09' 
  AND start_date <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, course_name, start_date, end_date
HAVING COUNT(*) > 1
ORDER BY course_slug, start_date;

-- STEP 3: Remove ALL duplicates - keep only the OLDEST entry (lowest ID) for each course + date pair
-- This ensures we keep the original entry and remove newer duplicates
DELETE FROM course_schedules
WHERE id IN (
  SELECT id FROM (
    SELECT 
      id, 
      ROW_NUMBER() OVER (
        PARTITION BY course_slug, DATE(start_date), DATE(end_date) 
        ORDER BY id ASC
      ) as rn
    FROM course_schedules
    WHERE start_date >= '2026-02-09' 
      AND start_date <= '2026-05-31'
      AND course_type = 'SAFe' 
      AND duration LIKE '%02 days%'
  ) t 
  WHERE rn > 1
);

-- STEP 4: Verify duplicates are completely removed
SELECT 
  course_slug, 
  start_date, 
  end_date, 
  COUNT(*) as count
FROM course_schedules
WHERE start_date >= '2026-02-09' 
  AND start_date <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, start_date, end_date
HAVING COUNT(*) > 1;
-- Should return 0 rows - if you see any, there are still duplicates

-- STEP 5: Check for any courses with incorrect pricing
SELECT 
  course_slug,
  course_name,
  price,
  original_price,
  CASE 
    WHEN course_slug = 'safe-for-teams' AND price != 599.00 THEN 'WRONG PRICE'
    WHEN course_slug = 'safe-devops' AND price != 699.00 THEN 'WRONG PRICE'
    WHEN course_slug = 'advanced-scrum-master' AND price != 950.00 THEN 'WRONG PRICE'
    WHEN course_slug = 'lean-portfolio-management' AND price != 1095.00 THEN 'WRONG PRICE'
    WHEN course_slug NOT IN ('safe-for-teams', 'safe-devops', 'advanced-scrum-master', 'lean-portfolio-management') 
         AND price != 555.00 THEN 'WRONG PRICE'
    ELSE 'OK'
  END as price_status
FROM course_schedules
WHERE start_date >= '2026-02-09' 
  AND start_date <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
ORDER BY course_slug, start_date;

-- STEP 6: Summary - show how many cohorts each course has
SELECT 
  course_slug, 
  course_name, 
  COUNT(*) as total_cohorts,
  COUNT(DISTINCT DATE(start_date)) as unique_start_dates,
  MIN(price) as price,
  MIN(original_price) as original_price
FROM course_schedules
WHERE start_date >= '2026-02-09' 
  AND start_date <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, course_name
ORDER BY course_slug;

-- STEP 7: Show all courses for Feb 9-10 to verify no duplicates
SELECT 
  id,
  course_slug,
  course_name,
  start_date,
  end_date,
  instructor_name,
  price,
  original_price
FROM course_schedules
WHERE DATE(start_date) = '2026-02-09'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
ORDER BY course_slug;
