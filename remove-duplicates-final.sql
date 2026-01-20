-- FINAL DUPLICATE REMOVAL - More robust approach
-- This will definitely remove all duplicates from the database

-- STEP 1: First, let's see EXACTLY what duplicates exist
-- This shows every single duplicate entry
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
  ) as row_num,
  CASE 
    WHEN ROW_NUMBER() OVER (
      PARTITION BY course_slug, DATE(start_date), DATE(end_date) 
      ORDER BY id ASC
    ) = 1 THEN 'KEEP'
    ELSE 'DELETE'
  END as action
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
ORDER BY course_slug, DATE(start_date), id;

-- STEP 2: Count duplicates before deletion
SELECT 
  COUNT(*) as total_duplicates_to_delete
FROM (
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
WHERE rn > 1;

-- STEP 3: DELETE DUPLICATES using CTE for clarity
WITH duplicates_to_delete AS (
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
)
DELETE FROM course_schedules
WHERE id IN (
  SELECT id FROM duplicates_to_delete WHERE rn > 1
);

-- STEP 4: Verify deletion worked - should return 0 rows
SELECT 
  course_slug, 
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  COUNT(*) as count,
  STRING_AGG(id::text, ', ') as remaining_ids
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, DATE(start_date), DATE(end_date)
HAVING COUNT(*) > 1;
-- If this returns ANY rows, duplicates still exist!

-- STEP 5: Update all times to 9 AM - 5 PM
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

-- STEP 6: Update all prices
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

-- STEP 7: Final check - show courses for Feb 16-17
SELECT 
  id,
  course_slug,
  course_name,
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  TO_CHAR(start_date, 'HH24:MI') as start_time,
  TO_CHAR(end_date, 'HH24:MI') as end_time,
  instructor_name,
  price
FROM course_schedules
WHERE DATE(start_date) = '2026-02-16'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
ORDER BY course_slug;

-- STEP 8: Summary - should show one entry per course per date
SELECT 
  course_slug,
  DATE(start_date) as date,
  COUNT(*) as entries
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-02-20'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, DATE(start_date)
HAVING COUNT(*) > 1
ORDER BY course_slug, DATE(start_date);
-- Should return 0 rows - if you see rows, duplicates still exist!
