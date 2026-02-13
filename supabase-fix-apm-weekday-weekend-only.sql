-- SAFe Agile Product Management: 3 days during the week OR 2 days on the weekend (Sat-Sun only).
-- DO NOT touch February. Prefer running supabase-schedule-rules-mon-tue-thu-fri-sat-sun-apm-3day.sql for all rules.

-- Skip February: (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01')

-- 0) Fix 3-day Fri-Sun → 2-day Sat-Sun (drop Friday; keep Sat-Sun)
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = (start_date::date + INTERVAL '2 days') + end_time,
  duration = '02 days',
  is_weekend = true,
  updated_at = NOW()
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 2
  AND EXTRACT(DOW FROM start_date) = 5   -- Friday
  AND EXTRACT(DOW FROM end_date) = 0    -- Sunday
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

-- 4) APM 2-day Mon-Tue → 3-day Mon-Wed (weekday = 3 days)
UPDATE course_schedules
SET
  end_date = (start_date::date + INTERVAL '2 days') + end_time,
  duration = '03 days',
  updated_at = NOW()
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 1
  AND EXTRACT(DOW FROM end_date) = 2
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- 5) APM 2-day Thu-Fri → 3-day Wed-Fri (weekday = 3 days)
UPDATE course_schedules
SET
  start_date = (end_date::date - INTERVAL '2 days') + start_time,
  duration = '03 days',
  updated_at = NOW()
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 4
  AND EXTRACT(DOW FROM end_date) = 5
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- Verify: APM = 3-day weekday OR 2-day Sat-Sun
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
    WHEN (end_date::date - start_date::date) + 1 = 2 AND EXTRACT(DOW FROM start_date) = 6 AND EXTRACT(DOW FROM end_date) = 0 THEN 'Sat-Sun (OK)'
    WHEN (end_date::date - start_date::date) + 1 = 3 AND EXTRACT(DOW FROM start_date) BETWEEN 1 AND 5 THEN '3-day weekday (OK)'
    ELSE 'CHECK'
  END AS pattern
FROM course_schedules
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
ORDER BY start_date;
