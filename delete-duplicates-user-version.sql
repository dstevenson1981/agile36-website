-- Your version - works for ALL courses
-- STEP 1: Find duplicate courses (same course_slug, same start_date)
SELECT 
  course_slug,
  course_name,
  DATE(start_date) as start_date,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text, ', ') as all_ids
FROM course_schedules
WHERE start_date >= '2026-02-09'
GROUP BY course_slug, course_name, DATE(start_date)
HAVING COUNT(*) > 1
ORDER BY start_date, course_slug;

-- STEP 2: Delete duplicates - keep only the FIRST entry per course per date
DELETE FROM course_schedules
WHERE id IN (
  SELECT id 
  FROM (
    SELECT 
      id,
      ROW_NUMBER() OVER (
        PARTITION BY course_slug, DATE(start_date)
        ORDER BY created_at ASC, id ASC
      ) as row_num
    FROM course_schedules
    WHERE start_date >= '2026-02-09'
  ) duplicates
  WHERE row_num > 1
);

-- STEP 3: Verify - should show NO duplicates
SELECT 
  course_slug,
  course_name,
  DATE(start_date) as start_date,
  COUNT(*) as count
FROM course_schedules
WHERE start_date >= '2026-02-09'
GROUP BY course_slug, course_name, DATE(start_date)
HAVING COUNT(*) > 1;
-- Should return 0 rows!

-- STEP 4: See your clean schedule
SELECT 
  DATE(start_date) as date,
  COUNT(DISTINCT course_slug) as num_courses,
  STRING_AGG(DISTINCT course_name, ' | ' ORDER BY course_name) as courses
FROM course_schedules
WHERE start_date >= '2026-02-09' AND start_date <= '2026-05-31'
GROUP BY DATE(start_date)
ORDER BY date;
