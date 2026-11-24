-- /rte-pro-nov23 stays live through the end of December 1, 2026 Eastern.

ALTER TABLE public.pro_practice_exam_links
  ADD COLUMN IF NOT EXISTS expires_at timestamptz;

COMMENT ON COLUMN public.pro_practice_exam_links.expires_at IS
  'When set, the class link stops working at this instant. Null means it stays up while is_active is true.';

INSERT INTO public.pro_practice_exam_links
  (course_slug, course_name, path, is_active, notes, expires_at)
VALUES
  (
    'release-train-engineer',
    'SAFe Release Train Engineer (RTE)',
    '/rte-pro-nov23',
    true,
    'Nov 23 RTE class. Live through the end of Dec 1, 2026 Eastern.',
    '2026-12-02 00:00:00-05:00'
  )
ON CONFLICT (path) DO UPDATE
SET
  course_slug = EXCLUDED.course_slug,
  course_name = EXCLUDED.course_name,
  is_active = true,
  notes = EXCLUDED.notes,
  expires_at = EXCLUDED.expires_at;
