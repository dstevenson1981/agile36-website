-- Fix SAFe Product Owner/Manager (POPM): Feb 18-19 → Feb 19-20. Run in Supabase SQL Editor.

UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  updated_at = NOW()
WHERE course_slug = 'product-owner-manager'
  AND status = 'active'
  AND start_date::date = '2026-02-18'
  AND end_date::date = '2026-02-19';

-- Verify: should show Feb 19 – Feb 20
SELECT
  id,
  course_slug,
  course_name,
  start_date,
  end_date,
  start_date::date AS start_date_only,
  end_date::date AS end_date_only
FROM course_schedules
WHERE course_slug = 'product-owner-manager'
  AND status = 'active'
  AND start_date::date >= '2026-02-17'
  AND start_date::date <= '2026-02-21';
