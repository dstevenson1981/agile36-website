-- Schedule rules (February is never changed):
-- - Two-day classes: Mon-Tue, Thu-Fri, or Sat-Sun only. One-day classes can be on Wednesday.
-- - APM: 3 days during the week (weekday) OR 2 days on the weekend (Sat-Sun only).
-- Run in Supabase SQL Editor. Skip February for all updates.

-- ========== SKIP FEBRUARY: (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01') ==========

-- ---------------------------------------------------------------------------
-- PART A: APM — weekend = 2-day Sat-Sun only; weekday = 3 days
-- ---------------------------------------------------------------------------

-- A1) APM 3-day Fri-Sun → 2-day Sat-Sun (drop Friday; end stays Sunday)
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
  AND EXTRACT(DOW FROM start_date) = 5
  AND EXTRACT(DOW FROM end_date) = 0
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- A2) APM 2-day Fri-Sat → Sat-Sun
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  is_weekend = true,
  updated_at = NOW()
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 5
  AND EXTRACT(DOW FROM end_date) = 6
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- A3) APM 2-day Sun-Mon → Sat-Sun
UPDATE course_schedules
SET
  start_date = start_date - INTERVAL '1 day',
  end_date = end_date - INTERVAL '1 day',
  is_weekend = true,
  updated_at = NOW()
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 0
  AND EXTRACT(DOW FROM end_date) = 1
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- A4) APM 2-day weekday Mon-Tue → 3-day Mon-Wed (add Wednesday)
UPDATE course_schedules
SET
  end_date = (start_date::date + INTERVAL '2 days') + end_time,
  duration = '03 days',
  updated_at = NOW()
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 1   -- Monday
  AND EXTRACT(DOW FROM end_date) = 2     -- Tuesday
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- A5) APM 2-day weekday Thu-Fri → 3-day Wed-Fri (add Wednesday)
UPDATE course_schedules
SET
  start_date = (end_date::date - INTERVAL '2 days') + start_time,
  duration = '03 days',
  updated_at = NOW()
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 4   -- Thursday
  AND EXTRACT(DOW FROM end_date) = 5     -- Friday
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- ---------------------------------------------------------------------------
-- PART B: All other 2-day classes — Mon-Tue, Thu-Fri, or Sat-Sun only
-- (Excludes APM; one-day classes are left as-is.)
-- ---------------------------------------------------------------------------

-- B1) Tue-Wed → Mon-Tue (shift back 1 day)
UPDATE course_schedules
SET
  start_date = start_date - INTERVAL '1 day',
  end_date = end_date - INTERVAL '1 day',
  updated_at = NOW()
WHERE course_slug <> 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 2
  AND EXTRACT(DOW FROM end_date) = 3
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- B2) Wed-Thu → Thu-Fri (shift forward 1 day)
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  updated_at = NOW()
WHERE course_slug <> 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 3
  AND EXTRACT(DOW FROM end_date) = 4
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- B3) Fri-Sat → Sat-Sun (shift forward 1 day)
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  is_weekend = true,
  updated_at = NOW()
WHERE course_slug <> 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 5
  AND EXTRACT(DOW FROM end_date) = 6
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- B4) Sun-Mon → Sat-Sun (shift back 1 day)
UPDATE course_schedules
SET
  start_date = start_date - INTERVAL '1 day',
  end_date = end_date - INTERVAL '1 day',
  is_weekend = true,
  updated_at = NOW()
WHERE course_slug <> 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 0
  AND EXTRACT(DOW FROM end_date) = 1
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- ---------------------------------------------------------------------------
-- VERIFY: APM should be 3-day weekday OR 2-day Sat-Sun
-- ---------------------------------------------------------------------------
SELECT
  id,
  course_slug,
  start_date::date AS start_date,
  end_date::date AS end_date,
  (end_date::date - start_date::date) + 1 AS calendar_days,
  duration,
  TO_CHAR(start_date, 'Dy') AS start_day,
  TO_CHAR(end_date, 'Dy') AS end_day,
  is_weekend,
  CASE
    WHEN (end_date::date - start_date::date) + 1 = 2 AND EXTRACT(DOW FROM start_date) = 6 AND EXTRACT(DOW FROM end_date) = 0 THEN 'Sat-Sun (OK)'
    WHEN (end_date::date - start_date::date) + 1 = 3 AND EXTRACT(DOW FROM start_date) BETWEEN 1 AND 5 AND EXTRACT(DOW FROM end_date) BETWEEN 1 AND 5 THEN '3-day weekday (OK)'
    ELSE 'CHECK'
  END AS pattern
FROM course_schedules
WHERE course_slug = 'agile-product-management'
  AND status = 'active'
ORDER BY start_date;

-- ---------------------------------------------------------------------------
-- VERIFY: Other 2-day classes should be Mon-Tue, Thu-Fri, or Sat-Sun
-- ---------------------------------------------------------------------------
SELECT
  id,
  course_slug,
  start_date::date AS start_date,
  end_date::date AS end_date,
  TO_CHAR(start_date, 'Dy') AS start_day,
  TO_CHAR(end_date, 'Dy') AS end_day,
  CASE
    WHEN (end_date::date - start_date::date) <> 1 THEN 'not 2-day'
    WHEN EXTRACT(DOW FROM start_date) = 1 AND EXTRACT(DOW FROM end_date) = 2 THEN 'Mon-Tue (OK)'
    WHEN EXTRACT(DOW FROM start_date) = 4 AND EXTRACT(DOW FROM end_date) = 5 THEN 'Thu-Fri (OK)'
    WHEN EXTRACT(DOW FROM start_date) = 6 AND EXTRACT(DOW FROM end_date) = 0 THEN 'Sat-Sun (OK)'
    ELSE 'INVALID'
  END AS pattern
FROM course_schedules
WHERE course_slug <> 'agile-product-management'
  AND status = 'active'
  AND (end_date::date - start_date::date) = 1
ORDER BY start_date, course_slug;
