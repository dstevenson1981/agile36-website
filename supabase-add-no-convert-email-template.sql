-- "No convert" follow-up: reminder to use 100OFF ($100 off). Not tied to a specific course.
-- Lookup: template_type = 'no_convert' (course_slug NULL). Run in Supabase SQL Editor.

INSERT INTO email_templates (template_type, course_name, course_slug, subject, body_text, body_html, discount_code, discount_amount, discount_type) VALUES

('no_convert', 'All Courses', NULL,
 'Last chance: $100 off with code 100OFF—expires in 30 mins ⏰',
 'Hi {first_name},

You still have $100 off any certification course: use code 100OFF at checkout. Expires in 30 minutes.

https://agile36.com/courses

Best regards,
The Agile36 Team',
 '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #01203d;">Last chance: $100 off with 100OFF</h2>
  <p>Hi {first_name},</p>
  <p>You still have <strong>$100 off</strong> any certification course when you use code <strong style="color: #fa4a23;">100OFF</strong> at checkout.</p>
  <p style="background: #ffebee; padding: 12px; border-radius: 5px; font-weight: bold;">⏰ Expires in 30 minutes.</p>
  <p><a href="https://agile36.com/courses" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View courses</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>',
 '100OFF', 100.00, 'fixed');

-- Lookup: SELECT * FROM email_templates WHERE template_type = 'no_convert';
