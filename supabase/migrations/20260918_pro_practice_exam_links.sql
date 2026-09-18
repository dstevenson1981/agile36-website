-- Class-only Pro practice exam URLs. Edit path / is_active in the Table Editor
-- (or the practice_exam_urls view). The site serves whichever rows are active.

CREATE TABLE IF NOT EXISTS public.pro_practice_exam_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_slug text NOT NULL,
  course_name text NOT NULL,
  path text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pro_practice_exam_links_path_format
    CHECK (path ~ '^/[a-z0-9][a-z0-9-]*$'),
  CONSTRAINT pro_practice_exam_links_path_key UNIQUE (path)
);

CREATE INDEX IF NOT EXISTS pro_practice_exam_links_active_path_idx
  ON public.pro_practice_exam_links (path)
  WHERE is_active = true;

CREATE INDEX IF NOT EXISTS pro_practice_exam_links_course_slug_idx
  ON public.pro_practice_exam_links (course_slug);

CREATE OR REPLACE FUNCTION public.tg_pro_practice_exam_links_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_pro_practice_exam_links_updated_at ON public.pro_practice_exam_links;
CREATE TRIGGER trg_pro_practice_exam_links_updated_at
BEFORE UPDATE ON public.pro_practice_exam_links
FOR EACH ROW
EXECUTE FUNCTION public.tg_pro_practice_exam_links_updated_at();

COMMENT ON TABLE public.pro_practice_exam_links IS
  'Ungated class Pro practice exam URLs. Change path to rotate a link; set is_active false to retire one.';

ALTER TABLE public.pro_practice_exam_links ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.pro_practice_exam_links FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.pro_practice_exam_links TO anon, authenticated;
GRANT ALL ON TABLE public.pro_practice_exam_links TO postgres, service_role;

DROP POLICY IF EXISTS pro_practice_exam_links_anon_read_active ON public.pro_practice_exam_links;
CREATE POLICY pro_practice_exam_links_anon_read_active
  ON public.pro_practice_exam_links
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

INSERT INTO public.pro_practice_exam_links
  (course_slug, course_name, path, is_active, notes)
VALUES
  (
    'product-owner-manager',
    'SAFe Product Owner/Product Manager (POPM)',
    '/popm-pro-sep19',
    true,
    'Current class link — Sep 19–20 2026 EST'
  ),
  (
    'product-owner-manager',
    'SAFe Product Owner/Product Manager (POPM)',
    '/popm-pro-class',
    false,
    'Retired Sep 18 2026'
  ),
  (
    'leading-safe',
    'Leading SAFe / SAFe Agilist',
    '/leading-safe-pro-class',
    true,
    'Ungated class link'
  ),
  (
    'scrum-master',
    'SAFe Scrum Master (SSM)',
    '/scrum-master-pro-class',
    true,
    'Ungated class link'
  ),
  (
    'lean-portfolio-management',
    'SAFe Lean Portfolio Management (LPM)',
    '/lpm-pro-class',
    true,
    'Ungated class link'
  ),
  (
    'agile-product-management',
    'Agile Product Management (APM)',
    '/apm-pro-class',
    true,
    'Ungated class link'
  ),
  (
    'agile-product-management',
    'Agile Product Management (APM)',
    '/apm-pro-temp',
    true,
    'Second live APM class link'
  ),
  (
    'advanced-scrum-master',
    'SAFe Advanced Scrum Master (SASM)',
    '/advanced-scrum-master-pro-class',
    true,
    'Ungated class link'
  )
ON CONFLICT (path) DO NOTHING;

CREATE OR REPLACE VIEW public.practice_exam_urls
WITH (security_invoker = true)
AS
SELECT
  ('https://www.agile36.com' || path) AS url,
  course_name,
  course_slug,
  path,
  is_active,
  notes,
  updated_at
FROM public.pro_practice_exam_links;

COMMENT ON VIEW public.practice_exam_urls IS
  'Easy list of Pro practice exam URLs. Filter is_active = true for the live links.';

REVOKE ALL ON TABLE public.practice_exam_urls FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.practice_exam_urls TO postgres, service_role;
