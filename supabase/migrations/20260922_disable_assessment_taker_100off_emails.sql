-- Practice-exam / form leads do not get 100OFF.
-- 100OFF is revealed by subscribing on the site banner only.
-- Applied to Agile36_Production 2026-09-22.

SELECT cron.unschedule(jobid)
FROM cron.job
WHERE jobname = 'process-assessment-taker-signal'
   OR command ILIKE '%process_assessment_taker_signal%';

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
    'message', 'Assessment / practice-exam leads do not receive 100OFF emails'
  );
END;
$$;

UPDATE public.email_templates
SET is_active = false,
    updated_at = NOW()
WHERE template_type = 'assessment';

UPDATE public.assessment_emails
SET signal_processed = true
WHERE COALESCE(signal_processed, false) = false;
