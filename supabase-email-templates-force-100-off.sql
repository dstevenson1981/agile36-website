-- Force email_templates to $100 off / code 100OFF only (removes 150OFF, $150, 200OFF/$200 for LPM, 75OFF/$75 in copy).
-- Run once in Supabase SQL Editor after backup if desired.
-- Types: abandoned_cart, assessment, no_convert.

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

-- no_convert: do not upsell to 150OFF; same $100 / 100OFF offer
UPDATE email_templates
SET
  discount_code = '100OFF',
  discount_amount = 100.00,
  subject = 'Last chance: $100 off with code 100OFF—expires in 30 mins ⏰',
  body_text = 'Hi {first_name},

You still have $100 off any certification course: use code 100OFF at checkout. Expires in 30 minutes.

https://agile36.com/courses

Best regards,
The Agile36 Team',
  body_html = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #01203d;">Last chance: $100 off with 100OFF</h2>
  <p>Hi {first_name},</p>
  <p>You still have <strong>$100 off</strong> any certification course when you use code <strong style="color: #fa4a23;">100OFF</strong> at checkout.</p>
  <p style="background: #ffebee; padding: 12px; border-radius: 5px; font-weight: bold;">⏰ Expires in 30 minutes.</p>
  <p><a href="https://agile36.com/courses" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View courses</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>',
  updated_at = NOW()
WHERE template_type = 'no_convert';

-- Verify
SELECT template_type, course_slug, discount_code, discount_amount, LEFT(subject, 65) AS subject_preview
FROM email_templates
WHERE template_type IN ('abandoned_cart', 'assessment', 'no_convert')
ORDER BY template_type, course_slug NULLS LAST;
