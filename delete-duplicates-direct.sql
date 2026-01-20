-- DIRECT DUPLICATE DELETION - This WILL work
-- Deletes all duplicates, keeping only the oldest entry (lowest ID) per course per date

-- STEP 1: Count how many duplicates exist
SELECT 
  COUNT(*) as total_duplicates_to_delete
FROM course_schedules cs1
WHERE EXISTS (
  SELECT 1 
  FROM course_schedules cs2
  WHERE cs2.course_slug = cs1.course_slug
    AND DATE(cs2.start_date) = DATE(cs1.start_date)
    AND cs2.id < cs1.id
    AND DATE(cs1.start_date) >= '2026-02-09' 
    AND DATE(cs1.start_date) <= '2026-05-31'
    AND cs1.course_type = 'SAFe' 
    AND cs1.duration LIKE '%02 days%'
    AND cs2.course_type = 'SAFe' 
    AND cs2.duration LIKE '%02 days%'
);

-- STEP 2: Show what will be deleted
SELECT 
  cs1.id as id_to_delete,
  cs1.course_slug,
  cs1.course_name,
  DATE(cs1.start_date) as start_date_only,
  cs1.instructor_name,
  cs2.id as id_to_keep
FROM course_schedules cs1
INNER JOIN course_schedules cs2 
  ON cs2.course_slug = cs1.course_slug
  AND DATE(cs2.start_date) = DATE(cs1.start_date)
  AND cs2.id < cs1.id
WHERE DATE(cs1.start_date) >= '2026-02-09' 
  AND DATE(cs1.start_date) <= '2026-05-31'
  AND cs1.course_type = 'SAFe' 
  AND cs1.duration LIKE '%02 days%'
  AND cs2.course_type = 'SAFe' 
  AND cs2.duration LIKE '%02 days%'
ORDER BY cs1.course_slug, DATE(cs1.start_date), cs1.id
LIMIT 50;

-- STEP 3: DELETE ALL DUPLICATES
-- This deletes any entry where there's another entry with same course_slug and same start date but lower ID
DELETE FROM course_schedules cs1
WHERE EXISTS (
  SELECT 1 
  FROM course_schedules cs2
  WHERE cs2.course_slug = cs1.course_slug
    AND DATE(cs2.start_date) = DATE(cs1.start_date)
    AND cs2.id < cs1.id
    AND DATE(cs1.start_date) >= '2026-02-09' 
    AND DATE(cs1.start_date) <= '2026-05-31'
    AND cs1.course_type = 'SAFe' 
    AND cs1.duration LIKE '%02 days%'
    AND cs2.course_type = 'SAFe' 
    AND cs2.duration LIKE '%02 days%'
);

-- STEP 4: Verify - should return 0 rows
SELECT 
  course_slug,
  DATE(start_date) as start_date_only,
  COUNT(*) as count,
  STRING_AGG(id::text, ', ') as remaining_ids
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, DATE(start_date)
HAVING COUNT(*) > 1
ORDER BY course_slug, start_date_only;
-- Should return 0 rows!

-- STEP 5: Update times and prices
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

-- STEP 6: Final check - show courses for Feb 23
SELECT 
  id,
  course_slug,
  course_name,
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  price
FROM course_schedules
WHERE DATE(start_date) = '2026-02-23'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
ORDER BY course_slug;
