-- AGGRESSIVE DUPLICATE REMOVAL - Run this step by step
-- This will show you exactly what will be deleted before deleting it

-- STEP 1: See ALL duplicates that will be removed
-- This shows you every duplicate entry
WITH duplicates AS (
  SELECT 
    id,
    course_slug,
    course_name,
    DATE(start_date) as start_date_only,
    DATE(end_date) as end_date_only,
    start_date,
    end_date,
    instructor_name,
    price,
    ROW_NUMBER() OVER (
      PARTITION BY course_slug, DATE(start_date), DATE(end_date) 
      ORDER BY id ASC
    ) as rn
  FROM course_schedules
  WHERE DATE(start_date) >= '2026-02-09' 
    AND DATE(start_date) <= '2026-05-31'
    AND course_type = 'SAFe' 
    AND duration LIKE '%02 days%'
)
SELECT 
  id,
  course_slug,
  course_name,
  start_date_only,
  end_date_only,
  TO_CHAR(start_date, 'YYYY-MM-DD HH24:MI') as full_start,
  TO_CHAR(end_date, 'YYYY-MM-DD HH24:MI') as full_end,
  instructor_name,
  price,
  CASE WHEN rn = 1 THEN 'KEEP (oldest)' ELSE 'DELETE (duplicate)' END as action
FROM duplicates
WHERE rn > 1  -- These are the duplicates that will be deleted
ORDER BY course_slug, start_date_only, id;

-- STEP 2: Count how many duplicates will be deleted
SELECT 
  COUNT(*) as total_duplicates_to_delete,
  COUNT(DISTINCT course_slug || '|' || DATE(start_date)::text || '|' || DATE(end_date)::text) as unique_duplicate_groups
FROM (
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
WHERE rn > 1;

-- STEP 3: DELETE ALL DUPLICATES
-- This keeps only the oldest entry (lowest ID) for each course + date combination
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
    WHERE DATE(start_date) >= '2026-02-09' 
      AND DATE(start_date) <= '2026-05-31'
      AND course_type = 'SAFe' 
      AND duration LIKE '%02 days%'
  ) t 
  WHERE rn > 1
);

-- STEP 4: Verify NO duplicates remain
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
-- Should return 0 rows - if you see rows here, duplicates still exist

-- STEP 5: Update ALL courses to have correct end time (5 PM)
UPDATE course_schedules
SET 
  start_time = '09:00:00',
  end_time = '17:00:00',
  start_date = DATE(start_date) + TIME '09:00:00',
  end_date = DATE(end_date) + TIME '17:00:00'
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%';

-- STEP 6: Update prices
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

-- STEP 7: Show sample results for Feb 16-17 to verify
SELECT 
  id,
  course_slug,
  course_name,
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  TO_CHAR(start_date, 'HH24:MI') as start_time,
  TO_CHAR(end_date, 'HH24:MI') as end_time,
  instructor_name,
  price,
  original_price
FROM course_schedules
WHERE DATE(start_date) = '2026-02-16'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
ORDER BY course_slug;

-- STEP 8: Final verification - count courses per date
SELECT 
  DATE(start_date) as date,
  COUNT(*) as total_courses,
  COUNT(DISTINCT course_slug) as unique_courses,
  STRING_AGG(DISTINCT course_slug, ', ') as courses_list
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-02-20'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY DATE(start_date)
ORDER BY DATE(start_date);
