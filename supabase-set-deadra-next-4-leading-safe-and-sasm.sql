-- Set Deadra Stevenson as trainer (+ image) for the next 4 Leading SAFe
-- and next 4 Advanced Scrum Master active public schedules (as of 2026-07-26).
-- Idempotent: safe to re-run.

UPDATE course_schedules
SET
  instructor_name = 'Deadra Stevenson',
  instructor_image = '/Deadra.jpeg'
WHERE id IN (
  -- Leading SAFe: Aug 13–14, 15–16, 17–18, 22–23 2026
  '536b049c-debe-4de1-8f81-1a6614063420',
  'f80e6fba-fcae-4c5a-9acb-f318f6903d85',
  '3a323d97-47d2-47fa-ba49-0099bfa0dc22',
  'e6cac5ed-4656-4f1a-80ec-d0754dc68173',
  -- Advanced Scrum Master: Aug 1–2, 13–14, 15–16, 17–18 2026
  '102b039a-3840-4669-bf2a-e05a4e955ac8',
  '111518ba-3d04-4e53-8538-b45436dd72c6',
  '065321e7-d0cf-4f22-bd1c-1543f877e9dd',
  'cba8b035-2d85-4a87-864d-6d7f598e1264'
);

-- Verify
SELECT course_slug, start_date::date, instructor_name, instructor_image
FROM course_schedules
WHERE id IN (
  '536b049c-debe-4de1-8f81-1a6614063420',
  'f80e6fba-fcae-4c5a-9acb-f318f6903d85',
  '3a323d97-47d2-47fa-ba49-0099bfa0dc22',
  'e6cac5ed-4656-4f1a-80ec-d0754dc68173',
  '102b039a-3840-4669-bf2a-e05a4e955ac8',
  '111518ba-3d04-4e53-8538-b45436dd72c6',
  '065321e7-d0cf-4f22-bd1c-1543f877e9dd',
  'cba8b035-2d85-4a87-864d-6d7f598e1264'
)
ORDER BY course_slug, start_date;
