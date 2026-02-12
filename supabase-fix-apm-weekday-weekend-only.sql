-- SAFe Agile Product Management: weekday only OR 2-day Sat-Sun only. No 3-day, no Fri-Sun.
-- DO NOT touch February — all February dates are correct. Only fix March and later.
-- Run in Supabase SQL Editor. Does not add any new dates.

-- Skip February: (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01')

-- 0) Fix 3-day Fri-Sun → 2-day Sat-Sun (drop Friday; keep Sat-Sun)
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  duration = '02 days',
  is_weekend = true,
  updated_at = NOW()
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 2
  AND EXTRACT(DOW FROM start_date) = 5   -- Friday
  AND EXTRACT(DOW FROM end_date) = 0    -- Sunday
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- 0b) Fix any other 3-day APM → 2-day (keep first two days, e.g. Mon-Wed → Mon-Tue)
UPDATE course_schedules
SET
  end_date = (start_date::date + INTERVAL '1 day') + end_time,
  duration = '02 days',
  updated_at = NOW()
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 2
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- 1) Fix Sunday-Monday → Saturday-Sunday (shift back one day)
UPDATE course_schedules
SET
  start_date = start_date - INTERVAL '1 day',
  end_date = end_date - INTERVAL '1 day',
  is_weekend = true,
  updated_at = NOW()
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
  AND EXTRACT(DOW FROM start_date) = 0  -- Sunday
  AND EXTRACT(DOW FROM end_date) = 1   -- Monday
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- 2) Fix Friday-Saturday → Saturday-Sunday (shift forward one day)
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  is_weekend = true,
  updated_at = NOW()
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
  AND EXTRACT(DOW FROM start_date) = 5  -- Friday
  AND EXTRACT(DOW FROM end_date) = 6   -- Saturday
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- 3) Verify: list all APM schedules (must be 2-day only: Mon-Tue, Thu-Fri, or Sat-Sun)
SELECT
  id,
  start_date::date AS start_date,
  end_date::date AS end_date,
  (end_date::date - start_date::date) + 1 AS calendar_days,
  duration,
  TO_CHAR(start_date, 'Dy') AS start_day,
  TO_CHAR(end_date, 'Dy') AS end_day,
  is_weekend,
  CASE
    WHEN (end_date::date - start_date::date) <> 1 THEN 'INVALID (not 2-day)'
    WHEN EXTRACT(DOW FROM start_date) = 6 AND EXTRACT(DOW FROM end_date) = 0 THEN 'Sat-Sun (OK)'
    WHEN EXTRACT(DOW FROM start_date) BETWEEN 1 AND 5 AND EXTRACT(DOW FROM end_date) BETWEEN 1 AND 5 THEN 'Mon-Fri (OK)'
    ELSE 'CHECK'
  END AS pattern
FROM course_schedules
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
ORDER BY start_date;
