-- Fix AI Agent Builder weekend: Feb 28 - Mar 1 (Sat-Sun)
-- Date-only values were stored as midnight UTC, causing display as Feb 27-28.
-- Run this in Supabase SQL Editor.

UPDATE course_schedules
SET
  start_date = '2026-02-28 09:00:00-05:00',
  end_date = '2026-03-01 14:00:00-05:00',
  is_weekend = true,
  updated_at = NOW()
WHERE course_slug = 'ai-agent-builder'
  AND status = 'active'
  AND (
    (start_date::date = '2026-02-28' AND end_date::date = '2026-03-01')
    OR (start_date::date = '2026-02-27' AND end_date::date = '2026-02-28')
  );

-- Verify: should show Feb 28 – Mar 1, is_weekend = true
SELECT
  id,
  course_slug,
  course_name,
  start_date,
  end_date,
  start_date::date AS start_date_only,
  end_date::date AS end_date_only,
  is_weekend,
  instructor_name
FROM course_schedules
WHERE course_slug = 'ai-agent-builder'
  AND start_date::date >= '2026-02-25'
  AND start_date::date <= '2026-03-05';
