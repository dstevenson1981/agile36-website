-- Update email_templates: set 150OFF / $150 OFF for all courses
-- EXCEPT Lean Portfolio Management and Agile Product Management.
-- Run this in Supabase SQL Editor.

UPDATE email_templates
SET
  discount_code = '150OFF',
  discount_amount = 150,
  subject = REPLACE(REPLACE(REPLACE(REPLACE(subject, '100OFF', '150OFF'), '$100', '$150'), '75OFF', '150OFF'), '$75', '$150'),
  body_text = REPLACE(REPLACE(REPLACE(REPLACE(body_text, '100OFF', '150OFF'), '$100', '$150'), '75OFF', '150OFF'), '$75', '$150'),
  body_html = REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(body_html, ''), '100OFF', '150OFF'), '$100', '$150'), '75OFF', '150OFF'), '$75', '$150'),
  updated_at = NOW()
WHERE (course_slug IS NULL OR course_slug NOT IN ('lean-portfolio-management', 'agile-product-management'));

-- LPM and APM: set 200OFF / $200 OFF
UPDATE email_templates
SET
  discount_code = '200OFF',
  discount_amount = 200,
  subject = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(subject, '150OFF', '200OFF'), '$150', '$200'), '100OFF', '200OFF'), '$100', '$200'), '75OFF', '200OFF'), '$75', '$200'),
  body_text = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(body_text, '150OFF', '200OFF'), '$150', '$200'), '100OFF', '200OFF'), '$100', '$200'), '75OFF', '200OFF'), '$75', '$200'),
  body_html = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(body_html, ''), '150OFF', '200OFF'), '$150', '$200'), '100OFF', '200OFF'), '$100', '$200'), '75OFF', '200OFF'), '$75', '$200'),
  updated_at = NOW()
WHERE course_slug IN ('lean-portfolio-management', 'agile-product-management');
