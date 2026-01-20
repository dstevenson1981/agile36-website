-- Find and delete duplicate "Leading SAFe" entries for Feb 9
-- The issue: Multiple entries with same or similar course names on same date

-- STEP 1: Find ALL "Leading SAFe" entries for Feb 9
SELECT 
  id,
  course_slug,
  course_name,
  start_date,
  end_date,
  instructor_name,
  price,
  original_price,
  created_at
FROM course_schedules
WHERE DATE(start_date) = '2026-02-09'
  AND (course_slug = 'leading-safe' 
       OR course_name ILIKE '%leading safe%'
       OR course_name ILIKE '%leading safe®%')
ORDER BY id;

-- STEP 2: Find duplicates for Leading SAFe across ALL dates
SELECT 
  course_slug,
  course_name,
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text, ', ' ORDER BY id) as all_ids,
  STRING_AGG(DISTINCT course_name, ' | ') as course_names
FROM course_schedules
WHERE (course_slug = 'leading-safe' 
       OR course_name ILIKE '%leading safe%'
       OR course_name ILIKE '%leading safe®%')
  AND DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, DATE(start_date), DATE(end_date)
HAVING COUNT(*) > 1
ORDER BY start_date_only;

-- STEP 3: Delete duplicates - keep the oldest entry (lowest ID) for each date
DELETE FROM course_schedules
WHERE id IN (
  SELECT id FROM (
    SELECT 
      id,
      ROW_NUMBER() OVER (
        PARTITION BY 
          COALESCE(course_slug, 'leading-safe'), 
          DATE(start_date), 
          DATE(end_date) 
        ORDER BY id ASC
      ) as rn
    FROM course_schedules
    WHERE (course_slug = 'leading-safe' 
           OR course_name ILIKE '%leading safe%'
           OR course_name ILIKE '%leading safe®%')
      AND DATE(start_date) >= '2026-02-09' 
      AND DATE(start_date) <= '2026-05-31'
      AND course_type = 'SAFe' 
      AND duration LIKE '%02 days%'
  ) t 
  WHERE rn > 1
);

-- STEP 4: Verify no duplicates remain for Leading SAFe
SELECT 
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  COUNT(*) as count,
  STRING_AGG(id::text, ', ') as remaining_ids
FROM course_schedules
WHERE (course_slug = 'leading-safe' 
       OR course_name ILIKE '%leading safe%'
       OR course_name ILIKE '%leading safe®%')
  AND DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY DATE(start_date), DATE(end_date)
HAVING COUNT(*) > 1;
-- Should return 0 rows

-- STEP 5: Check for ANY duplicates across ALL courses (more comprehensive)
SELECT 
  course_slug,
  course_name,
  DATE(start_date) as start_date_only,
  DATE(end_date) as end_date_only,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text, ', ' ORDER BY id) as all_ids
FROM course_schedules
WHERE DATE(start_date) >= '2026-02-09' 
  AND DATE(start_date) <= '2026-05-31'
  AND course_type = 'SAFe' 
  AND duration LIKE '%02 days%'
GROUP BY course_slug, course_name, DATE(start_date), DATE(end_date)
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, course_slug, start_date_only;

-- STEP 6: If STEP 5 shows duplicates, delete them all
-- (Run this only if STEP 5 shows results)
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
