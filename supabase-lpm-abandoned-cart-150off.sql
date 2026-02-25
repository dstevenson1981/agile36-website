-- Lean Portfolio Management: change abandoned cart from $200 to $150
-- Run this in Supabase SQL Editor.

UPDATE email_templates
SET
  discount_code = '150OFF',
  discount_amount = 150,
  subject = REPLACE(REPLACE(subject, '200OFF', '150OFF'), '$200', '$150'),
  body_text = REPLACE(REPLACE(body_text, '200OFF', '150OFF'), '$200', '$150'),
  body_html = REPLACE(REPLACE(COALESCE(body_html, ''), '200OFF', '150OFF'), '$200', '$150'),
  updated_at = NOW()
WHERE template_type = 'abandoned_cart'
  AND course_slug = 'lean-portfolio-management';
