-- Re-enable practice-exam / assessment 100OFF emails for NEW leads only.
-- Existing assessment_emails rows are marked processed so they are not blasted.
-- Applied to Agile36_Production 2026-09-10.

UPDATE public.assessment_emails
SET signal_processed = true
WHERE COALESCE(signal_processed, false) = false;

UPDATE public.email_templates
SET is_active = true,
    updated_at = NOW()
WHERE template_type = 'assessment';

CREATE OR REPLACE FUNCTION public.process_assessment_taker_signal()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_rec RECORD;
  v_template RECORD;
  v_slug TEXT;
  v_subject TEXT;
  v_body_text TEXT;
  v_body_html TEXT;
  v_first_name TEXT;
  v_processed INT := 0;
  v_skipped INT := 0;
  v_errors INT := 0;
BEGIN
  FOR v_rec IN
    SELECT *
    FROM assessment_emails
    WHERE COALESCE(signal_processed, false) = false
      AND (
        source ILIKE '%assessment%'
        OR source ILIKE '%practice test%'
      )
    ORDER BY created_at
  LOOP
    BEGIN
      v_slug := CASE
        WHEN v_rec.exam_name ILIKE '%advanced scrum%' THEN 'advanced-scrum-master'
        WHEN v_rec.exam_name ILIKE '%product owner%' OR v_rec.exam_name ILIKE '%popm%' THEN 'product-owner-manager'
        WHEN v_rec.exam_name ILIKE '%lean portfolio%' OR v_rec.exam_name ILIKE '%lpm%practice%' THEN 'lean-portfolio-management'
        WHEN v_rec.exam_name ILIKE '%agile product management%' THEN 'agile-product-management'
        WHEN v_rec.exam_name ILIKE '%devops%' THEN 'devops'
        WHEN v_rec.exam_name ILIKE '%for teams%' THEN 'safe-for-teams'
        WHEN v_rec.exam_name ILIKE '%leading safe%' OR v_rec.exam_name ILIKE '%agilist%' THEN 'leading-safe'
        WHEN v_rec.exam_name ILIKE '%scrum master%' THEN 'scrum-master'
        ELSE NULL
      END;

      IF v_slug IS NULL
         OR EXISTS (SELECT 1 FROM email_unsubscribes eu WHERE LOWER(eu.email) = LOWER(v_rec.email))
         OR EXISTS (
           SELECT 1 FROM orders o
           WHERE LOWER(o.customer_email) = LOWER(v_rec.email)
             AND o.payment_status = 'succeeded'
         )
         OR EXISTS (
           SELECT 1 FROM email_queue eq
           WHERE LOWER(eq.recipient_email) = LOWER(v_rec.email)
             AND eq.subject ILIKE '%100OFF%'
             AND eq.subject ILIKE '%interest%'
         )
      THEN
        UPDATE assessment_emails SET signal_processed = true WHERE id = v_rec.id;
        v_skipped := v_skipped + 1;
        CONTINUE;
      END IF;

      SELECT * INTO v_template
      FROM email_templates
      WHERE template_type = 'assessment'
        AND course_slug = v_slug
        AND is_active = TRUE
      LIMIT 1;

      IF v_template.id IS NULL THEN
        UPDATE assessment_emails SET signal_processed = true WHERE id = v_rec.id;
        v_skipped := v_skipped + 1;
        CONTINUE;
      END IF;

      v_first_name := NULLIF(TRIM(SPLIT_PART(COALESCE(v_rec.name, ''), ' ', 1)), '');
      IF v_first_name IS NULL THEN
        v_first_name := INITCAP(REGEXP_REPLACE(SPLIT_PART(v_rec.email, '@', 1), '[^a-zA-Z]', '', 'g'));
      END IF;
      IF v_first_name IS NULL OR v_first_name = '' THEN
        v_first_name := 'there';
      END IF;

      v_subject := REPLACE(v_template.subject, '{first_name}', v_first_name);
      v_body_text := REPLACE(
        REPLACE(
          REPLACE(v_template.body_text, '{first_name}', v_first_name),
          '{discount_code}', COALESCE(v_template.discount_code, '100OFF')
        ),
        '{discount_amount}', COALESCE(v_template.discount_amount::TEXT, '100')
      );
      v_body_html := COALESCE(v_template.body_html, '<p>' || v_body_text || '</p>');
      v_body_html := REPLACE(
        REPLACE(
          REPLACE(v_body_html, '{first_name}', v_first_name),
          '{discount_code}', COALESCE(v_template.discount_code, '100OFF')
        ),
        '{discount_amount}', COALESCE(v_template.discount_amount::TEXT, '100')
      );

      PERFORM send_email_via_sendgrid(
        v_rec.email,
        COALESCE(v_rec.name, ''),
        v_subject,
        v_body_text,
        v_body_html
      );

      INSERT INTO email_queue (
        recipient_email, recipient_name, subject, body, html_body, scheduled_for, sent_at, status
      ) VALUES (
        v_rec.email, COALESCE(v_rec.name, ''), v_subject, v_body_text, v_body_html, NOW(), NOW(), 'sent'
      );

      UPDATE assessment_emails SET signal_processed = true WHERE id = v_rec.id;
      v_processed := v_processed + 1;
    EXCEPTION WHEN OTHERS THEN
      v_errors := v_errors + 1;
      RAISE NOTICE 'Error processing assessment lead %: %', v_rec.id, SQLERRM;
    END;
  END LOOP;

  RETURN jsonb_build_object(
    'processed', v_processed,
    'skipped', v_skipped,
    'errors', v_errors,
    'disabled', false
  );
END;
$$;

SELECT cron.unschedule(jobid)
FROM cron.job
WHERE jobname = 'process-assessment-taker-signal'
   OR command ILIKE '%process_assessment_taker_signal%';

SELECT cron.schedule(
  'process-assessment-taker-signal',
  '*/30 * * * *',
  $$SELECT process_assessment_taker_signal();$$
);
