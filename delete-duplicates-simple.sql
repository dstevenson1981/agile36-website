-- SIMPLE: Delete duplicates - ONE course per course_slug per start date
-- If the same course appears multiple times on the same date, keep only ONE

-- STEP 1: See what duplicates exist
SELECT 
  course_slug,
  course_name,
  DATE(start_date) as start_date_only,
  COUNT(*) as count,
  STRING_AGG(id::text, ', ' ORDER BY id) as all_ids
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, course_name, DATE(start_date)
HAVING COUNT(*) > 1
ORDER BY course_slug, start_date_only;

-- STEP 2: DELETE duplicates - keep the one with the LOWEST ID (oldest)
DELETE FROM course_schedules
WHERE id IN (
  SELECT id FROM (
    SELECT 
      id,
      ROW_NUMBER() OVER (
        PARTITION BY course_slug, DATE(start_date)
        ORDER BY id ASC
      ) as row_num
    FROM course_schedules
    WHERE DATE(start_date) >= '2026-02-09' 
      AND DATE(start_date) <= '2026-05-31'
      AND course_type = 'SAFe' 
      AND duration LIKE '%02 days%'
  ) t
  WHERE row_num > 1
);

-- STEP 3: Verify - should return 0 rows
SELECT 
  course_slug,
  DATE(start_date) as start_date_only,
  COUNT(*) as count
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, DATE(start_date)
HAVING COUNT(*) > 1;
-- Should return 0 rows!

-- STEP 4: Update all to have correct times (9 AM - 5 PM) and prices
UPDATE course_schedules
SET 
  start_time = '09:00:00',
  end_time = '17:00:00',
  start_date = DATE(start_date) + TIME '09:00:00',
  end_date = DATE(start_date) + INTERVAL '1 day' + TIME '17:00:00',
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

-- STEP 5: Final check for Feb 23
SELECT 
  id,
  course_slug,
  course_name,
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  start_time,
  end_time,
  price
FROM course_schedules
WHERE DATE(start_date) = '2026-02-23'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
ORDER BY course_slug;
