/* Two upsell templates. POPM completers: APM + AI Product Manager. APM completers: AI Product Manager + LPM. template_type = 'upsell'. Run in Supabase SQL Editor. */

DELETE FROM email_templates WHERE template_type = 'upsell' AND course_slug IN ('product-owner-manager', 'agile-product-management');

INSERT INTO email_templates (template_type, course_name, course_slug, subject, body_text, body_html, discount_code, discount_amount, discount_type) VALUES

-- 1. POPM completers → Agile Product Management + AI Product Manager
('upsell', 'SAFe POPM', 'product-owner-manager',
 'Thank you for completing SAFe Product Owner Product Manager with Agile36',
 $txt$Hi {first_name},

Thank you for completing SAFe Product Owner Product Manager with Agile36. We appreciate the opportunity to support your work in product execution and delivery.

Many POPM participants continue with Agile Product Management, where the focus expands from execution to strategy, roadmapping, and prioritization. Others add the AI Product Manager course to decide what to build with AI and align AI initiatives with real business value.

As a returning customer, you can save $200 on your next course using code UPSKILL.

Agile Product Management: https://agile36.com/courses/agile-product-management/schedule
AI Product Manager: https://agile36.com/courses/certified-ai-product-manager/schedule

Best regards,
The Agile36 Team$txt$,
 $html$<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hi {first_name},</p>
  <p>Thank you for completing SAFe Product Owner Product Manager with Agile36. We appreciate the opportunity to support your work in product execution and delivery.</p>
  <p>Many POPM participants continue with <strong>Agile Product Management</strong> (strategy, roadmapping, prioritization) or the <strong>AI Product Manager</strong> course (what to build with AI, aligning AI with business value).</p>
  <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;"><p style="margin: 0;">As a returning customer, you can save $200 on your next course using code <strong style="color: #fa4a23;">UPSKILL</strong>.</p></div>
  <p><a href="https://agile36.com/courses/agile-product-management/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-right: 10px; margin-bottom: 10px;">View Agile Product Management schedule</a><a href="https://agile36.com/courses/certified-ai-product-manager/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View AI Product Manager schedule</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>$html$,
 'UPSKILL', 200.00, 'fixed'),

-- 2. APM completers → AI Product Manager + Lean Portfolio Management
('upsell', 'Agile Product Management', 'agile-product-management',
 'Thank you for completing Agile Product Management with Agile36',
 $txt$Hi {first_name},

Thank you for completing Agile Product Management with Agile36. We appreciated your engagement and the focus on strategy, roadmapping, and business outcomes.

Many Agile Product Management participants continue with the AI Product Manager course to bring that product mindset into AI initiatives, or with Lean Portfolio Management to influence funding, prioritization, and governance at the portfolio level.

As a returning customer, you can save $200 on your next course using code UPSKILL.

AI Product Manager: https://agile36.com/courses/certified-ai-product-manager/schedule
Lean Portfolio Management: https://agile36.com/courses/lean-portfolio-management/schedule

Best regards,
The Agile36 Team$txt$,
 $html$<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hi {first_name},</p>
  <p>Thank you for completing Agile Product Management with Agile36. We appreciated your engagement and the focus on strategy, roadmapping, and business outcomes.</p>
  <p>Many participants continue with the <strong>AI Product Manager</strong> course (product mindset into AI) or <strong>Lean Portfolio Management</strong> (funding, prioritization, governance at portfolio level).</p>
  <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;"><p style="margin: 0;">As a returning customer, you can save $200 on your next course using code <strong style="color: #fa4a23;">UPSKILL</strong>.</p></div>
  <p><a href="https://agile36.com/courses/certified-ai-product-manager/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-right: 10px; margin-bottom: 10px;">View AI Product Manager schedule</a><a href="https://agile36.com/courses/lean-portfolio-management/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Lean Portfolio Management schedule</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>$html$,
 'UPSKILL', 200.00, 'fixed');

-- Lookup: SELECT * FROM email_templates WHERE template_type = 'upsell' ORDER BY course_slug;
