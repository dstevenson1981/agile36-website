-- Remove duplicate Certified AI Product Manager schedules
-- When same course has multiple rows for same start_date/end_date (different instructors), keep one
-- Run in Supabase SQL Editor

-- Step 1: List all duplicates (same course_slug + start_date + end_date, multiple rows)
SELECT course_slug, start_date::date, end_date::date, COUNT(*) as cnt
FROM course_schedules
WHERE course_slug = 'certified-ai-product-manager'
  AND status = 'active'
GROUP BY course_slug, start_date::date, end_date::date
HAVING COUNT(*) > 1;

-- Step 2: Delete duplicates, keeping the row with MIN(id) for each (course_slug, start_date, end_date)
DELETE FROM course_schedules
WHERE id IN (
  SELECT id
  FROM (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY course_slug, start_date::date, end_date::date
             ORDER BY id
           ) AS rn
    FROM course_schedules
    WHERE course_slug = 'certified-ai-product-manager'
      AND status = 'active'
  ) sub
  WHERE rn > 1
);

-- Step 3: Set Deadra Stevenson as instructor for all Certified AI Product Manager schedules
UPDATE course_schedules
SET instructor_name = 'Deadra Stevenson',
    instructor_image = '/Deadra.jpeg',
    updated_at = NOW()
WHERE course_slug = 'certified-ai-product-manager'
  AND status = 'active';

-- Step 4: Verify - no date should appear more than once, all show Deadra
SELECT course_slug, start_date::date, end_date::date, instructor_name, price
FROM course_schedules
WHERE course_slug = 'certified-ai-product-manager'
  AND status = 'active'
ORDER BY start_date;
