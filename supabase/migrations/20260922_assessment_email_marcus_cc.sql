-- Assessment follow-up: from Marcus Ball, CC Deadra, optional CC on SendGrid send.
-- Existing 5-arg send_email_via_sendgrid callers stay unchanged.

CREATE OR REPLACE FUNCTION public.send_email_via_sendgrid(
  p_to_email text,
  p_to_name text,
  p_subject text,
  p_body_text text,
  p_body_html text,
  p_cc_email text,
  p_from_name text DEFAULT 'Marcus Ball'
)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_api_key TEXT;
  v_personalization JSONB;
  v_payload JSONB;
  v_request_id BIGINT;
  v_cc TEXT;
BEGIN
  SELECT decrypted_secret INTO v_api_key
  FROM vault.decrypted_secrets
  WHERE name = 'sendgrid_api_key';

  IF v_api_key IS NULL THEN
    RAISE EXCEPTION 'SendGrid API key not found in vault';
  END IF;

  v_cc := NULLIF(LOWER(TRIM(COALESCE(p_cc_email, ''))), '');
  IF v_cc IS NOT NULL AND v_cc = LOWER(TRIM(p_to_email)) THEN
    v_cc := NULL;
  END IF;

  v_personalization := jsonb_build_object(
    'to', jsonb_build_array(
      jsonb_build_object('email', p_to_email, 'name', COALESCE(p_to_name, ''))
    ),
    'subject', p_subject
  );

  IF v_cc IS NOT NULL THEN
    v_personalization := v_personalization || jsonb_build_object(
      'cc', jsonb_build_array(
        jsonb_build_object('email', v_cc)
      )
    );
  END IF;

  v_payload := jsonb_build_object(
    'personalizations', jsonb_build_array(v_personalization),
    'from', jsonb_build_object(
      'email', 'm.ball@agile36.com',
      'name', COALESCE(NULLIF(TRIM(p_from_name), ''), 'Marcus Ball')
    ),
    'reply_to', jsonb_build_object(
      'email', 'm.ball@agile36.com',
      'name', 'Marcus Ball'
    ),
    'content', CASE
      WHEN p_body_html IS NOT NULL THEN
        jsonb_build_array(
          jsonb_build_object('type', 'text/plain', 'value', p_body_text),
          jsonb_build_object('type', 'text/html', 'value', p_body_html)
        )
      ELSE
        jsonb_build_array(
          jsonb_build_object('type', 'text/plain', 'value', p_body_text)
        )
    END
  );

  SELECT net.http_post(
    url := 'https://api.sendgrid.com/v3/mail/send',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || v_api_key,
      'Content-Type', 'application/json'
    ),
    body := v_payload,
    timeout_milliseconds := 30000
  ) INTO v_request_id;

  RETURN v_request_id;
END;
$$;

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
             AND (
               eq.subject ILIKE '%practice exam%'
               OR eq.subject ILIKE '%how people pass%'
             )
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
      v_body_text := REPLACE(v_template.body_text, '{first_name}', v_first_name);
      v_body_html := REPLACE(COALESCE(v_template.body_html, '<p>' || v_body_text || '</p>'), '{first_name}', v_first_name);

      PERFORM send_email_via_sendgrid(
        v_rec.email,
        COALESCE(v_rec.name, ''),
        v_subject,
        v_body_text,
        v_body_html,
        'd.stevenson@agile36.com',
        'Marcus Ball'
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
