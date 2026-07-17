-- Stop practice-exam / assessment discount emails entirely.
-- Site may still store leads in assessment_emails; cron must not email them.
-- Applied to Agile36_Production 2026-07-16.

-- 1) Unschedule any cron that calls process_assessment_taker_signal
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

-- 2) Replace function with a no-op so accidental re-scheduling cannot send
CREATE OR REPLACE FUNCTION public.process_assessment_taker_signal()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Disabled 2026-07-16: practice exam / assessment discount emails removed.
  RETURN jsonb_build_object(
    'processed', 0,
    'skipped', 0,
    'errors', 0,
    'disabled', true,
    'message', 'Assessment discount emails are disabled'
  );
END;
$$;

-- 3) Deactivate assessment email templates (keep rows for history)
UPDATE public.email_templates
SET is_active = false,
    updated_at = NOW()
WHERE template_type = 'assessment';
