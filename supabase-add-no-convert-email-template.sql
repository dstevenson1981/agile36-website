-- Add one email template for "No Convert": someone had 100OFF and didn't use it; offer 150OFF.
-- Not tied to a specific course. Lookup by template_type = 'no_convert' (course_slug is NULL).
-- Run in Supabase SQL Editor.

INSERT INTO email_templates (template_type, course_name, course_slug, subject, body_text, body_html, discount_code, discount_amount, discount_type) VALUES

('no_convert', 'All Courses', NULL,
 'Your 100OFF is now 150OFF—expires in 30 mins ⏰',
 'Hi {first_name},

Your 100OFF has been upgraded to 150OFF, saving you $150 on any certification course designed to strengthen real-world execution and leadership. Expires in 30 minutes.

https://agile36.com/courses

Best regards,
The Agile36 Team',
 '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #01203d;">Your 100OFF is now 150OFF</h2>
  <p>Hi {first_name},</p>
  <p>Your 100OFF has been upgraded to <strong style="color: #fa4a23;">150OFF</strong>, saving you $150 on any certification course designed to strengthen real-world execution and leadership.</p>
  <p style="background: #ffebee; padding: 12px; border-radius: 5px; font-weight: bold;">⏰ Expires in 30 minutes.</p>
  <p><a href="https://agile36.com/courses" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View courses</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>',
 '150OFF', 150.00, 'fixed');

-- Lookup: SELECT * FROM email_templates WHERE template_type = 'no_convert';
