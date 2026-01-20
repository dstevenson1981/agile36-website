-- SIMPLE DIRECT DUPLICATE DELETION
-- This is the most straightforward approach

-- First, see what will be deleted:
SELECT 
  cs1.id as id_to_delete,
  cs1.course_slug,
  cs1.course_name,
  DATE(cs1.start_date) as date,
  cs1.instructor_name,
  cs1.price,
  cs2.id as id_to_keep
FROM course_schedules cs1
INNER JOIN course_schedules cs2 
  ON cs1.course_slug = cs2.course_slug
  AND DATE(cs1.start_date) = DATE(cs2.start_date)
  AND DATE(cs1.end_date) = DATE(cs2.end_date)
  AND cs1.id > cs2.id  -- Keep the one with lower ID
WHERE DATE(cs1.start_date) >= '2026-02-09' 
  AND DATE(cs1.start_date) <= '2026-05-31'
  AND cs1.course_type = 'SAFe' 
  AND cs1.duration LIKE '%02 days%'
  AND cs2.course_type = 'SAFe' 
  AND cs2.duration LIKE '%02 days%'
ORDER BY cs1.course_slug, DATE(cs1.start_date);

-- Now delete them:
DELETE FROM course_schedules cs1
USING course_schedules cs2
WHERE cs1.course_slug = cs2.course_slug
  AND DATE(cs1.start_date) = DATE(cs2.start_date)
  AND DATE(cs1.end_date) = DATE(cs2.end_date)
  AND cs1.id > cs2.id  -- Delete the ones with higher ID (keep oldest)
  AND DATE(cs1.start_date) >= '2026-02-09' 
  AND DATE(cs1.start_date) <= '2026-05-31'
  AND cs1.course_type = 'SAFe' 
  AND cs1.duration LIKE '%02 days%'
  AND cs2.course_type = 'SAFe' 
  AND cs2.duration LIKE '%02 days%';

-- Verify no duplicates remain:
SELECT 
  course_slug,
  DATE(start_date) as date,
  COUNT(*) as count
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, DATE(start_date)
HAVING COUNT(*) > 1;
-- Should return 0 rows!

-- Update times to 5 PM:
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

-- Update prices:
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
