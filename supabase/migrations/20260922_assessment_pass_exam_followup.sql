-- Practice-exam leads get a pass-the-exam follow-up. No 100OFF.
-- Trigger: they entered an email to start the free mock. Cron every 30 minutes.
-- Applied to Agile36_Production 2026-09-22.

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

SELECT cron.unschedule(jobid)
FROM cron.job
WHERE jobname = 'process-assessment-taker-signal'
   OR command ILIKE '%process_assessment_taker_signal%';

SELECT cron.schedule(
  'process-assessment-taker-signal',
  '*/30 * * * *',
  $$SELECT process_assessment_taker_signal();$$
);

-- Professional practice-exam follow-up. No 100OFF.

UPDATE public.email_templates SET
  subject = $a0s$You started the Leading SAFe practice exam — here's how people pass$a0s$,
  body_text = $a0t$Hi {first_name},

You started the free Leading SAFe® practice exam. That usually means you care about passing the official SAFe® Agilist exam — not collecting another sample test.

Our students pass at a 98% rate. The free mock is a preview. When you enroll in the live class, you get the Pro practice exams: more questions, closer to the real test, with review after you submit.

What enrollment includes:
- Live two-day class with the official exam included
- Pro practice exams after you enroll — more questions, closer to the real test
- Review after you submit so you know exactly what to restudy
- Official courseware and one year of SAFe Studio

See upcoming dates: https://www.agile36.com/courses/leading-safe/schedule

Questions about the exam or which date fits? Reply to this email.

Deadra Stevenson
Agile36
d.stevenson@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL 33131 • SAFe Silver Partner$a0t$,
  body_html = $a0h$<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>Leading SAFe® practice exam | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:'Segoe UI', Arial, Helvetica, sans-serif; color:#1f2733;">

<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/agile36-logo-header.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">Leading SAFe® / SAFe® Agilist</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">The free mock is a start. Here’s how people actually pass.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started the free <strong>Leading SAFe®</strong> practice exam. That usually means one thing: you want to pass the official SAFe® Agilist exam.</p>
<p style="margin:0 0 8px 0; font-size:16px; line-height:1.6; color:#3a4453;">The free version is a preview. Students who enroll in the live class get the full Pro practice exams — more questions, closer to the real test, with a review after they submit.</p>
</td>
</tr>

<tr>
<td style="padding:20px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Pro exams</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Included when you enroll</p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get in the live class</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Live two-day class with the official exam included</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Pro practice exams after you enroll — more questions, closer to the real test</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Review after you submit so you know exactly what to restudy</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Official courseware and one year of SAFe Studio</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:28px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/leading-safe/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">See upcoming dates &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about the exam, dates, or whether this is the right certification? Reply to this email.</p>
</td>
</tr>

<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Deadra Stevenson</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:d.stevenson@agile36.com" style="color:#1a5cff; text-decoration:none;">d.stevenson@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL 33131 &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>$a0h$,
  discount_code = NULL,
  discount_amount = NULL,
  is_active = true,
  updated_at = NOW()
WHERE template_type = 'assessment' AND course_slug = 'leading-safe';

UPDATE public.email_templates SET
  subject = $a1s$You started the POPM practice exam — here's how people pass$a1s$,
  body_text = $a1t$Hi {first_name},

You started the free SAFe® POPM practice exam. That usually means you care about passing the official SAFe® POPM exam — not collecting another sample test.

Our students pass at a 98% rate. The free mock is a preview. When you enroll in the live class, you get the Pro practice exams: more questions, closer to the real test, with review after you submit.

What enrollment includes:
- Live two-day class with the official exam included
- Pro practice exams after you enroll — more questions, closer to the real test
- Review after you submit so you know exactly what to restudy
- Official courseware and one year of SAFe Studio

See upcoming dates: https://www.agile36.com/courses/product-owner-manager/schedule

Questions about the exam or which date fits? Reply to this email.

Deadra Stevenson
Agile36
d.stevenson@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL 33131 • SAFe Silver Partner$a1t$,
  body_html = $a1h$<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe® POPM practice exam | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:'Segoe UI', Arial, Helvetica, sans-serif; color:#1f2733;">

<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/agile36-logo-header.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe® Product Owner / Product Manager</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">The free mock is a start. Here’s how people actually pass.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started the free <strong>SAFe® POPM</strong> practice exam. That usually means one thing: you want to pass the official SAFe® POPM exam.</p>
<p style="margin:0 0 8px 0; font-size:16px; line-height:1.6; color:#3a4453;">The free version is a preview. Students who enroll in the live class get the full Pro practice exams — more questions, closer to the real test, with a review after they submit.</p>
</td>
</tr>

<tr>
<td style="padding:20px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Pro exams</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Included when you enroll</p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get in the live class</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Live two-day class with the official exam included</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Pro practice exams after you enroll — more questions, closer to the real test</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Review after you submit so you know exactly what to restudy</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Official courseware and one year of SAFe Studio</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:28px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/product-owner-manager/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">See upcoming dates &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about the exam, dates, or whether this is the right certification? Reply to this email.</p>
</td>
</tr>

<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Deadra Stevenson</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:d.stevenson@agile36.com" style="color:#1a5cff; text-decoration:none;">d.stevenson@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL 33131 &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>$a1h$,
  discount_code = NULL,
  discount_amount = NULL,
  is_active = true,
  updated_at = NOW()
WHERE template_type = 'assessment' AND course_slug = 'product-owner-manager';

UPDATE public.email_templates SET
  subject = $a2s$You started the LPM practice exam — here's how people pass$a2s$,
  body_text = $a2t$Hi {first_name},

You started the free SAFe® Lean Portfolio Management practice exam. That usually means you care about passing the official SAFe® LPM exam — not collecting another sample test.

Our students pass at a 98% rate. The free mock is a preview. When you enroll in the live class, you get the Pro practice exams: more questions, closer to the real test, with review after you submit.

What enrollment includes:
- Live two-day class with the official exam included
- Pro practice exams after you enroll — more questions, closer to the real test
- Review after you submit so you know exactly what to restudy
- Official courseware and one year of SAFe Studio

See upcoming dates: https://www.agile36.com/courses/lean-portfolio-management/schedule

Questions about the exam or which date fits? Reply to this email.

Deadra Stevenson
Agile36
d.stevenson@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL 33131 • SAFe Silver Partner$a2t$,
  body_html = $a2h$<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe® Lean Portfolio Management practice exam | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:'Segoe UI', Arial, Helvetica, sans-serif; color:#1f2733;">

<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/agile36-logo-header.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe® Lean Portfolio Management</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">The free mock is a start. Here’s how people actually pass.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started the free <strong>SAFe® Lean Portfolio Management</strong> practice exam. That usually means one thing: you want to pass the official SAFe® LPM exam.</p>
<p style="margin:0 0 8px 0; font-size:16px; line-height:1.6; color:#3a4453;">The free version is a preview. Students who enroll in the live class get the full Pro practice exams — more questions, closer to the real test, with a review after they submit.</p>
</td>
</tr>

<tr>
<td style="padding:20px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Pro exams</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Included when you enroll</p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get in the live class</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Live two-day class with the official exam included</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Pro practice exams after you enroll — more questions, closer to the real test</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Review after you submit so you know exactly what to restudy</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Official courseware and one year of SAFe Studio</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:28px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/lean-portfolio-management/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">See upcoming dates &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about the exam, dates, or whether this is the right certification? Reply to this email.</p>
</td>
</tr>

<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Deadra Stevenson</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:d.stevenson@agile36.com" style="color:#1a5cff; text-decoration:none;">d.stevenson@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL 33131 &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>$a2h$,
  discount_code = NULL,
  discount_amount = NULL,
  is_active = true,
  updated_at = NOW()
WHERE template_type = 'assessment' AND course_slug = 'lean-portfolio-management';

UPDATE public.email_templates SET
  subject = $a3s$You started the APM practice exam — here's how people pass$a3s$,
  body_text = $a3t$Hi {first_name},

You started the free SAFe® Agile Product Management practice exam. That usually means you care about passing the official SAFe® APM exam — not collecting another sample test.

Our students pass at a 98% rate. The free mock is a preview. When you enroll in the live class, you get the Pro practice exams: more questions, closer to the real test, with review after you submit.

What enrollment includes:
- Live three-day class with the official exam included
- Pro practice exams after you enroll — more questions, closer to the real test
- Review after you submit so you know exactly what to restudy
- Official courseware and one year of SAFe Studio

See upcoming dates: https://www.agile36.com/courses/agile-product-management/schedule

Questions about the exam or which date fits? Reply to this email.

Deadra Stevenson
Agile36
d.stevenson@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL 33131 • SAFe Silver Partner$a3t$,
  body_html = $a3h$<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe® Agile Product Management practice exam | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:'Segoe UI', Arial, Helvetica, sans-serif; color:#1f2733;">

<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/agile36-logo-header.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe® Agile Product Management</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">The free mock is a start. Here’s how people actually pass.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started the free <strong>SAFe® Agile Product Management</strong> practice exam. That usually means one thing: you want to pass the official SAFe® APM exam.</p>
<p style="margin:0 0 8px 0; font-size:16px; line-height:1.6; color:#3a4453;">The free version is a preview. Students who enroll in the live class get the full Pro practice exams — more questions, closer to the real test, with a review after they submit.</p>
</td>
</tr>

<tr>
<td style="padding:20px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Pro exams</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Included when you enroll</p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get in the live class</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Live three-day class with the official exam included</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Pro practice exams after you enroll — more questions, closer to the real test</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Review after you submit so you know exactly what to restudy</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Official courseware and one year of SAFe Studio</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:28px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/agile-product-management/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">See upcoming dates &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about the exam, dates, or whether this is the right certification? Reply to this email.</p>
</td>
</tr>

<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Deadra Stevenson</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:d.stevenson@agile36.com" style="color:#1a5cff; text-decoration:none;">d.stevenson@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL 33131 &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>$a3h$,
  discount_code = NULL,
  discount_amount = NULL,
  is_active = true,
  updated_at = NOW()
WHERE template_type = 'assessment' AND course_slug = 'agile-product-management';

UPDATE public.email_templates SET
  subject = $a4s$You started the Scrum Master practice exam — here's how people pass$a4s$,
  body_text = $a4t$Hi {first_name},

You started the free SAFe® Scrum Master practice exam. That usually means you care about passing the official SAFe® Scrum Master exam — not collecting another sample test.

Our students pass at a 98% rate. The free mock is a preview. When you enroll in the live class, you get the Pro practice exams: more questions, closer to the real test, with review after you submit.

What enrollment includes:
- Live two-day class with the official exam included
- Pro practice exams after you enroll — more questions, closer to the official test
- Review after you submit so you know exactly what to restudy
- Official courseware and one year of SAFe Studio

See upcoming dates: https://www.agile36.com/courses/scrum-master/schedule

Questions about the exam or which date fits? Reply to this email.

Deadra Stevenson
Agile36
d.stevenson@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL 33131 • SAFe Silver Partner$a4t$,
  body_html = $a4h$<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe® Scrum Master practice exam | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:'Segoe UI', Arial, Helvetica, sans-serif; color:#1f2733;">

<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/agile36-logo-header.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe® Scrum Master</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">The free mock is a start. Here’s how people actually pass.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started the free <strong>SAFe® Scrum Master</strong> practice exam. That usually means one thing: you want to pass the official SAFe® Scrum Master exam.</p>
<p style="margin:0 0 8px 0; font-size:16px; line-height:1.6; color:#3a4453;">The free version is a preview. Students who enroll in the live class get the full Pro practice exams — more questions, closer to the real test, with a review after they submit.</p>
</td>
</tr>

<tr>
<td style="padding:20px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Pro exams</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Included when you enroll</p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get in the live class</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Live two-day class with the official exam included</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Pro practice exams after you enroll — more questions, closer to the official test</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Review after you submit so you know exactly what to restudy</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Official courseware and one year of SAFe Studio</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:28px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/scrum-master/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">See upcoming dates &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about the exam, dates, or whether this is the right certification? Reply to this email.</p>
</td>
</tr>

<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Deadra Stevenson</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:d.stevenson@agile36.com" style="color:#1a5cff; text-decoration:none;">d.stevenson@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL 33131 &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>$a4h$,
  discount_code = NULL,
  discount_amount = NULL,
  is_active = true,
  updated_at = NOW()
WHERE template_type = 'assessment' AND course_slug = 'scrum-master';

UPDATE public.email_templates SET
  subject = $a5s$You started the SAFe for Teams practice exam — here's how people pass$a5s$,
  body_text = $a5t$Hi {first_name},

You started the free SAFe® for Teams practice exam. That usually means you care about passing the official SAFe® for Teams exam — not collecting another sample test.

Our students pass at a 98% rate. The free mock is a preview. When you enroll in the live class, you get the Pro practice exams: more questions, closer to the real test, with review after you submit.

What enrollment includes:
- Live two-day class with the official exam included
- Pro practice exams after you enroll — more questions, closer to the real test
- Review after you submit so you know exactly what to restudy
- Official courseware and one year of SAFe Studio

See upcoming dates: https://www.agile36.com/courses/safe-for-teams/schedule

Questions about the exam or which date fits? Reply to this email.

Deadra Stevenson
Agile36
d.stevenson@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL 33131 • SAFe Silver Partner$a5t$,
  body_html = $a5h$<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe® for Teams practice exam | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:'Segoe UI', Arial, Helvetica, sans-serif; color:#1f2733;">

<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/agile36-logo-header.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe® for Teams</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">The free mock is a start. Here’s how people actually pass.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started the free <strong>SAFe® for Teams</strong> practice exam. That usually means one thing: you want to pass the official SAFe® for Teams exam.</p>
<p style="margin:0 0 8px 0; font-size:16px; line-height:1.6; color:#3a4453;">The free version is a preview. Students who enroll in the live class get the full Pro practice exams — more questions, closer to the real test, with a review after they submit.</p>
</td>
</tr>

<tr>
<td style="padding:20px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Pro exams</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Included when you enroll</p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get in the live class</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Live two-day class with the official exam included</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Pro practice exams after you enroll — more questions, closer to the real test</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Review after you submit so you know exactly what to restudy</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Official courseware and one year of SAFe Studio</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:28px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/safe-for-teams/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">See upcoming dates &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about the exam, dates, or whether this is the right certification? Reply to this email.</p>
</td>
</tr>

<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Deadra Stevenson</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:d.stevenson@agile36.com" style="color:#1a5cff; text-decoration:none;">d.stevenson@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL 33131 &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>$a5h$,
  discount_code = NULL,
  discount_amount = NULL,
  is_active = true,
  updated_at = NOW()
WHERE template_type = 'assessment' AND course_slug = 'safe-for-teams';

UPDATE public.email_templates SET
  subject = $a6s$You started the DevOps practice exam — here's how people pass$a6s$,
  body_text = $a6t$Hi {first_name},

You started the free SAFe® DevOps practice exam. That usually means you care about passing the official SAFe® DevOps exam — not collecting another sample test.

Our students pass at a 98% rate. The free mock is a preview. When you enroll in the live class, you get the Pro practice exams: more questions, closer to the real test, with review after you submit.

What enrollment includes:
- Live two-day class with the official exam included
- Pro practice exams after you enroll — more questions, closer to the real test
- Review after you submit so you know exactly what to restudy
- Official courseware and one year of SAFe Studio

See upcoming dates: https://www.agile36.com/courses/devops/schedule

Questions about the exam or which date fits? Reply to this email.

Deadra Stevenson
Agile36
d.stevenson@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL 33131 • SAFe Silver Partner$a6t$,
  body_html = $a6h$<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe® DevOps practice exam | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:'Segoe UI', Arial, Helvetica, sans-serif; color:#1f2733;">

<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/agile36-logo-header.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe® DevOps</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">The free mock is a start. Here’s how people actually pass.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started the free <strong>SAFe® DevOps</strong> practice exam. That usually means one thing: you want to pass the official SAFe® DevOps exam.</p>
<p style="margin:0 0 8px 0; font-size:16px; line-height:1.6; color:#3a4453;">The free version is a preview. Students who enroll in the live class get the full Pro practice exams — more questions, closer to the real test, with a review after they submit.</p>
</td>
</tr>

<tr>
<td style="padding:20px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Pro exams</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Included when you enroll</p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get in the live class</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Live two-day class with the official exam included</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Pro practice exams after you enroll — more questions, closer to the real test</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Review after you submit so you know exactly what to restudy</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Official courseware and one year of SAFe Studio</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:28px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/devops/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">See upcoming dates &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about the exam, dates, or whether this is the right certification? Reply to this email.</p>
</td>
</tr>

<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Deadra Stevenson</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:d.stevenson@agile36.com" style="color:#1a5cff; text-decoration:none;">d.stevenson@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL 33131 &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>$a6h$,
  discount_code = NULL,
  discount_amount = NULL,
  is_active = true,
  updated_at = NOW()
WHERE template_type = 'assessment' AND course_slug = 'devops';

UPDATE public.email_templates SET
  subject = $a7s$You started the Advanced Scrum Master practice exam — here's how people pass$a7s$,
  body_text = $a7t$Hi {first_name},

You started the free SAFe® Advanced Scrum Master practice exam. That usually means you care about passing the official SAFe® Advanced Scrum Master exam — not collecting another sample test.

Our students pass at a 98% rate. The free mock is a preview. When you enroll in the live class, you get the Pro practice exams: more questions, closer to the real test, with review after you submit.

What enrollment includes:
- Live two-day class with the official exam included
- Pro practice exams after you enroll — more questions, closer to the real test
- Review after you submit so you know exactly what to restudy
- Official courseware and one year of SAFe Studio

See upcoming dates: https://www.agile36.com/courses/advanced-scrum-master/schedule

Questions about the exam or which date fits? Reply to this email.

Deadra Stevenson
Agile36
d.stevenson@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL 33131 • SAFe Silver Partner$a7t$,
  body_html = $a7h$<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe® Advanced Scrum Master practice exam | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:'Segoe UI', Arial, Helvetica, sans-serif; color:#1f2733;">

<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/agile36-logo-header.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe® Advanced Scrum Master</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">The free mock is a start. Here’s how people actually pass.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started the free <strong>SAFe® Advanced Scrum Master</strong> practice exam. That usually means one thing: you want to pass the official SAFe® Advanced Scrum Master exam.</p>
<p style="margin:0 0 8px 0; font-size:16px; line-height:1.6; color:#3a4453;">The free version is a preview. Students who enroll in the live class get the full Pro practice exams — more questions, closer to the real test, with a review after they submit.</p>
</td>
</tr>

<tr>
<td style="padding:20px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Pro exams</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Included when you enroll</p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get in the live class</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Live two-day class with the official exam included</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Pro practice exams after you enroll — more questions, closer to the real test</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Review after you submit so you know exactly what to restudy</td></tr><tr><td style="padding:6px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:6px 0;">Official courseware and one year of SAFe Studio</td></tr>
</table>
</td>
</tr>

<tr>
<td style="padding:28px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/advanced-scrum-master/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">See upcoming dates &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about the exam, dates, or whether this is the right certification? Reply to this email.</p>
</td>
</tr>

<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Deadra Stevenson</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:d.stevenson@agile36.com" style="color:#1a5cff; text-decoration:none;">d.stevenson@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL 33131 &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>$a7h$,
  discount_code = NULL,
  discount_amount = NULL,
  is_active = true,
  updated_at = NOW()
WHERE template_type = 'assessment' AND course_slug = 'advanced-scrum-master';

