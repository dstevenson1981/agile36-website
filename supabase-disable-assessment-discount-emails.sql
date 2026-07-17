-- Disable practice-exam assessment discount emails (production one-shot).
-- Prefer: supabase/migrations/20260716_disable_practice_exam_assessment_discount_emails.sql
-- Already applied to Agile36_Production on 2026-07-16.

DO $$
DECLARE
  jid bigint;
BEGIN
  FOR jid IN
    SELECT jobid FROM cron.job
    WHERE command ILIKE '%process_assessment_taker_signal%'
  LOOP
    PERFORM cron.unschedule(jid);
  END LOOP;
END $$;

CREATE OR REPLACE FUNCTION public.process_assessment_taker_signal()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN jsonb_build_object(
    'processed', 0,
    'skipped', 0,
    'errors', 0,
    'disabled', true,
    'message', 'Assessment discount emails are disabled'
  );
END;
$$;

UPDATE public.email_templates
SET is_active = false,
    updated_at = NOW()
WHERE template_type = 'assessment';
