-- REMOVE ALL DUPLICATES FOR ALL SAFe 2-DAY COURSES
-- This will delete duplicates across ALL courses, not just one

-- STEP 1: See ALL duplicates that exist (across all courses)
SELECT 
  course_slug,
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text, ', ' ORDER BY id) as all_ids,
  STRING_AGG(DISTINCT course_name, ' | ') as course_name_variations
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, DATE(start_date), DATE(end_date)
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, course_slug, start_date_only;

-- STEP 2: DELETE ALL DUPLICATES - Keep only the oldest entry (lowest ID) for each course + date
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

-- STEP 3: Verify NO duplicates remain (should return 0 rows)
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
-- If this returns ANY rows, duplicates still exist!

-- STEP 4: Update all times to 9 AM - 5 PM
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

-- STEP 5: Update all prices
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

-- STEP 6: Final verification - show count per course per date
SELECT 
  course_slug,
  DATE(start_date) as date,
  COUNT(*) as entries_per_date
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-02-20'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, DATE(start_date)
HAVING COUNT(*) > 1
ORDER BY course_slug, DATE(start_date);
-- Should return 0 rows - each course should appear only ONCE per date!
