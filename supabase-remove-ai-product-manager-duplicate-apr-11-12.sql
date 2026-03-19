-- Remove duplicate Certified AI Product Manager schedules for Apr 11-12, 2026
-- Two entries exist (Joe Puoci and Marcus Ball) for same dates - keep one, delete the other
-- Run in Supabase SQL Editor

-- Step 1: See the duplicates
SELECT id, course_slug, course_name, start_date, end_date, instructor_name, price, created_at
FROM course_schedules
WHERE course_slug = 'certified-ai-product-manager'
  AND start_date::date = '2026-04-11'
  AND status = 'active'
ORDER BY id;

-- Step 2: Delete duplicates, keeping the row with the MIN(id) per (course_slug, start_date::date, end_date::date)
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
      AND start_date::date = '2026-04-11'
      AND status = 'active'
  ) sub
  WHERE rn > 1
);

-- Step 3: Verify - should return only 1 row for Apr 11-12
SELECT id, course_slug, course_name, start_date, end_date, instructor_name, price
FROM course_schedules
WHERE course_slug = 'certified-ai-product-manager'
  AND start_date::date = '2026-04-11'
  AND status = 'active';
