-- Assessment emails: same as abandoned cart — $100 / 100OFF only.
-- Prefer supabase-email-templates-force-100-off.sql (one script for abandoned_cart + assessment + no_convert).
-- This file is kept for name recognition; logic matches supabase-abandoned-cart-safecourses-100off.sql.

UPDATE email_templates
SET
  discount_code = '100OFF',
  discount_amount = 100.00,
  subject = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    subject,
    '200OFF', '100OFF'), '150OFF', '100OFF'), '75OFF', '100OFF'),
    '$200', '$100'), '$150', '$100'), '$75', '$100'),
    'code discount', 'code 100OFF'), 'Code discount', 'code 100OFF'), 'CODE DISCOUNT', 'CODE 100OFF'),
  body_text = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    body_text,
    '200OFF', '100OFF'), '150OFF', '100OFF'), '75OFF', '100OFF'),
    '$200', '$100'), '$150', '$100'), '$75', '$100'),
    'code discount', 'code 100OFF'), 'Code discount', 'code 100OFF'), 'CODE DISCOUNT', 'CODE 100OFF'),
  body_html = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    COALESCE(body_html, ''),
    '200OFF', '100OFF'), '150OFF', '100OFF'), '75OFF', '100OFF'),
    '$200', '$100'), '$150', '$100'), '$75', '$100'),
    'code discount', 'code 100OFF'), 'Code discount', 'code 100OFF'), 'CODE DISCOUNT', 'CODE 100OFF'),
  updated_at = NOW()
WHERE template_type IN ('abandoned_cart', 'assessment');

SELECT course_slug, discount_code, discount_amount, LEFT(subject, 70) AS subject_preview
FROM email_templates
WHERE template_type = 'assessment'
ORDER BY course_slug;
