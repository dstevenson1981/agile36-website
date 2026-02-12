-- Two-day classes: Mon-Tue, Thu-Fri, or Sat-Sun only. No overlapping dates for same course.
-- DO NOT touch February — all February dates are correct. Only fix March and later.
-- DOW: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
-- Run in Supabase SQL Editor.

-- Skip February: only apply to start_date before Feb or from March onward
-- (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01')

-- 1) Tue-Wed (2,3) -> Mon-Tue: subtract 1 day
UPDATE course_schedules
SET
  start_date = start_date - INTERVAL '1 day',
  end_date = end_date - INTERVAL '1 day',
  updated_at = NOW()
WHERE status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 2
  AND EXTRACT(DOW FROM end_date) = 3
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- 2) Wed-Thu (3,4) -> Thu-Fri: add 1 day
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  updated_at = NOW()
WHERE status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 3
  AND EXTRACT(DOW FROM end_date) = 4
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- 3) Fri-Sat (5,6) -> Sat-Sun: add 1 day
UPDATE course_schedules
SET
  start_date = start_date + INTERVAL '1 day',
  end_date = end_date + INTERVAL '1 day',
  is_weekend = true,
  updated_at = NOW()
WHERE status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 5
  AND EXTRACT(DOW FROM end_date) = 6
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- 4) Sun-Mon (0,1) -> Sat-Sun: subtract 1 day
UPDATE course_schedules
SET
  start_date = start_date - INTERVAL '1 day',
  end_date = end_date - INTERVAL '1 day',
  is_weekend = true,
  updated_at = NOW()
WHERE status = 'active'
  AND (end_date::date - start_date::date) = 1
  AND EXTRACT(DOW FROM start_date) = 0
  AND EXTRACT(DOW FROM end_date) = 1
  AND (start_date::date < '2026-02-01' OR start_date::date >= '2026-03-01');

-- 5) Mon-Tue (1,2), Thu-Fri (4,5), and Sat-Sun (6,0) are already valid — no change

-- 6) Fix overlaps: same course_slug with overlapping dates. Shift overlapping row to start the day after the other ends. (Skip February.)
UPDATE course_schedules c2
SET
  start_date = c2.start_date + (overlap.shift_days * INTERVAL '1 day'),
  end_date = c2.end_date + (overlap.shift_days * INTERVAL '1 day'),
  updated_at = NOW()
FROM (
  SELECT
    c2.id AS id,
    (MAX(c1.end_date::date) + 1 - c2.start_date::date)::int AS shift_days
  FROM course_schedules c1
  JOIN course_schedules c2 ON c1.course_slug = c2.course_slug AND c1.id <> c2.id
  WHERE c1.status = 'active' AND c2.status = 'active'
    AND c2.start_date::date <= c1.end_date::date
    AND c2.end_date::date >= c1.start_date::date
    AND (c2.start_date::date < '2026-02-01' OR c2.start_date::date >= '2026-03-01')
  GROUP BY c2.id, c2.start_date
) overlap
WHERE c2.id = overlap.id AND overlap.shift_days > 0;

-- 7) Verify: two-day classes should only be Mon-Tue, Thu-Fri, or Sat-Sun
SELECT
  course_slug,
  start_date::date AS start_date,
  end_date::date AS end_date,
  TO_CHAR(start_date, 'Dy') AS start_day,
  TO_CHAR(end_date, 'Dy') AS end_day,
  CASE
    WHEN EXTRACT(DOW FROM start_date) = 1 AND EXTRACT(DOW FROM end_date) = 2 THEN 'Mon-Tue OK'
    WHEN EXTRACT(DOW FROM start_date) = 4 AND EXTRACT(DOW FROM end_date) = 5 THEN 'Thu-Fri OK'
    WHEN EXTRACT(DOW FROM start_date) = 6 AND EXTRACT(DOW FROM end_date) = 0 THEN 'Sat-Sun OK'
    ELSE 'CHECK'
  END AS pattern
FROM course_schedules
WHERE status = 'active'
  AND (end_date::date - start_date::date) = 1
ORDER BY course_slug, start_date;
