-- Fix critical: tables publicly accessible via anon key when RLS is off.
-- These tables are only used by service-role (Edge Functions / admin API).
-- Enabling RLS with no anon/authenticated policies blocks public access;
-- service_role bypasses RLS.

ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expansion_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role manages email_templates" ON public.email_templates;
CREATE POLICY "Service role manages email_templates"
  ON public.email_templates
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role manages email_queue" ON public.email_queue;
CREATE POLICY "Service role manages email_queue"
  ON public.email_queue
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role manages expansion_opportunities" ON public.expansion_opportunities;
CREATE POLICY "Service role manages expansion_opportunities"
  ON public.expansion_opportunities
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role manages app_config" ON public.app_config;
CREATE POLICY "Service role manages app_config"
  ON public.app_config
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
