-- Soft-hide all RTE cohorts from public calendars / catalogs.
-- Public course page stays listed as private class (contact only).
-- Private enrollment (share this URL):
--   https://www.agile36.com/private/rte
-- Direct checkout:
--   /private/rte/checkout?schedule={UUID}&course=release-train-engineer
-- Old public schedule URL no longer lists dates.

UPDATE course_schedules
SET hidden = true
WHERE course_slug = 'release-train-engineer'
  AND COALESCE(hidden, false) = false;
