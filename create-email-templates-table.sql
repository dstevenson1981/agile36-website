-- Create email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 template_type TEXT NOT NULL, -- 'abandoned_cart', 'welcome', 'course_completion', etc.
 course_name TEXT NOT NULL,
 course_slug TEXT,
 subject TEXT NOT NULL,
 body_text TEXT NOT NULL,
 body_html TEXT,
 discount_code TEXT,
 discount_amount DECIMAL(10, 2),
 discount_type TEXT, -- 'fixed' or 'percentage'
 created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 is_active BOOLEAN DEFAULT true
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_templates_type_course 
 ON email_templates(template_type, course_name);
CREATE INDEX IF NOT EXISTS idx_email_templates_course_slug 
 ON email_templates(course_slug);

-- Insert abandoned cart templates for all 16 courses
-- Professional layout, 100OFF / $100, offer ends Mon Jul 20 2026
-- Highest Scaled Agile feedback score + 98% exam pass rate; no emojis

INSERT INTO email_templates (template_type, course_name, course_slug, subject, body_text, body_html, discount_code, discount_amount, discount_type) VALUES
('abandoned_cart', 'Leading SAFe', 'leading-safe',
 'Complete your Leading SAFe enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in Leading SAFe but did not finish checkout. A SAFe Agilist certification puts your name on the shortlist for larger programs and leadership roles.

Agile36 holds the highest feedback score with Scaled Agile. Our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate.

Why finish now:
- Master the Scaled Agile Framework and lead enterprise transformations
- Earn your SAFe Agilist certification, recognized worldwide
- Learn from SPC instructors with Fortune 100 transformation experience
- Official courseware, exam, and one-year SAFe Studio membership included

Official SAFe course materials, the certification exam where applicable, and the learning resources you need to succeed are included.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/leading-safe/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>Leading SAFe | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">Leading SAFe&reg; / SAFe&reg; Agilist</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">You started Leading SAFe. Finish and get certified.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>Leading SAFe&reg;</strong> but did not finish checkout. A SAFe Agilist certification puts your name on the shortlist for larger programs and leadership roles.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We hold the highest feedback score with Scaled Agile, our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate. You learn from people who have actually done this work, using real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get with this course</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Master the Scaled Agile Framework and lead enterprise transformations</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn your SAFe&reg; Agilist certification, recognized worldwide</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Learn from SPC instructors with Fortune 100 transformation experience</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Official courseware, exam, and one-year SAFe Studio membership included</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Every registration includes official SAFe course materials, the certification exam where applicable, and access to the learning resources you need to succeed.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/leading-safe/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about dates, exam prep, or whether this is the right certification for your role? Just reply and I will help.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'SAFe POPM', 'product-owner-manager',
 'Complete your SAFe POPM enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in SAFe Product Owner / Product Manager (POPM) but did not finish checkout. POPM certification signals you can manage product value delivery across Agile Release Trains.

Agile36 holds the highest feedback score with Scaled Agile. Our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate.

Why finish now:
- Become the strategic product leader your organization needs
- Master product management at scale with SAFe practices
- Earn industry-recognized POPM certification for senior roles
- Official courseware, exam, and one-year SAFe Studio membership included

Official SAFe course materials, the certification exam where applicable, and the learning resources you need to succeed are included.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/product-owner-manager/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe Product Owner / Product Manager (POPM) | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe&reg; POPM Certification</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">You were close to POPM. Claim your seat and get certified.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>SAFe&reg; Product Owner / Product Manager (POPM)</strong> but did not finish checkout. POPM certification signals you can manage product value delivery across Agile Release Trains.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We hold the highest feedback score with Scaled Agile, our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate. You learn from people who have actually done this work, using real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get with this course</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Become the strategic product leader your organization needs</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Master product management at scale with SAFe&reg; practices</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn industry-recognized POPM certification for senior roles</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Official courseware, exam, and one-year SAFe Studio membership included</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Every registration includes official SAFe course materials, the certification exam where applicable, and access to the learning resources you need to succeed.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/product-owner-manager/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about dates, exam prep, or whether this is the right certification for your role? Just reply and I will help.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'SAFe Lean Portfolio Management', 'lean-portfolio-management',
 'Complete your SAFe LPM enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in SAFe Lean Portfolio Management but did not finish checkout. LPM certification positions you to connect strategy, funding, and delivery across the enterprise.

Agile36 holds the highest feedback score with Scaled Agile. Our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate.

Why finish now:
- Lead strategic portfolio planning and funding at enterprise scale
- Align strategy with execution using Lean-Agile principles
- Earn one of the most advanced SAFe certifications for portfolio leaders
- Official courseware, exam, and one-year SAFe Studio membership included

Official SAFe course materials, the certification exam where applicable, and the learning resources you need to succeed are included.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/lean-portfolio-management/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe Lean Portfolio Management | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe&reg; LPM Certification</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish Lean Portfolio Management and lead strategy to execution.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>SAFe&reg; Lean Portfolio Management</strong> but did not finish checkout. LPM certification positions you to connect strategy, funding, and delivery across the enterprise.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We hold the highest feedback score with Scaled Agile, our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate. You learn from people who have actually done this work, using real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get with this course</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Lead strategic portfolio planning and funding at enterprise scale</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Align strategy with execution using Lean-Agile principles</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn one of the most advanced SAFe&reg; certifications for portfolio leaders</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Official courseware, exam, and one-year SAFe Studio membership included</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Every registration includes official SAFe course materials, the certification exam where applicable, and access to the learning resources you need to succeed.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/lean-portfolio-management/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about dates, exam prep, or whether this is the right certification for your role? Just reply and I will help.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'SAFe Agile Product Management', 'agile-product-management',
 'Complete your SAFe APM enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in SAFe Agile Product Management but did not finish checkout. APM certification shows you can drive product strategy and outcomes in a SAFe enterprise.

Agile36 holds the highest feedback score with Scaled Agile. Our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate.

Why finish now:
- Master customer-centric product management at scale
- Learn to design and deliver products customers actually need
- Earn APM certification that validates product leadership expertise
- Official courseware, exam, and one-year SAFe Studio membership included

Official SAFe course materials, the certification exam where applicable, and the learning resources you need to succeed are included.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/agile-product-management/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe Agile Product Management | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe&reg; APM Certification</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish Agile Product Management and build products that matter.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>SAFe&reg; Agile Product Management</strong> but did not finish checkout. APM certification shows you can drive product strategy and outcomes in a SAFe enterprise.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We hold the highest feedback score with Scaled Agile, our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate. You learn from people who have actually done this work, using real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get with this course</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Master customer-centric product management at scale</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Learn to design and deliver products customers actually need</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn APM certification that validates product leadership expertise</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Official courseware, exam, and one-year SAFe Studio membership included</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Every registration includes official SAFe course materials, the certification exam where applicable, and access to the learning resources you need to succeed.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/agile-product-management/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about dates, exam prep, or whether this is the right certification for your role? Just reply and I will help.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'SAFe Scrum Master', 'scrum-master',
 'Complete your SAFe Scrum Master enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in SAFe Scrum Master but did not finish checkout. SSM certification proves you can facilitate delivery and continuous improvement at scale.

Agile36 holds the highest feedback score with Scaled Agile. Our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate.

Why finish now:
- Lead Agile teams effectively inside a SAFe environment
- Master servant leadership, facilitation, and team coaching
- Earn SSM certification recognized across Fortune 500 organizations
- Official courseware, exam, and one-year SAFe Studio membership included

Official SAFe course materials, the certification exam where applicable, and the learning resources you need to succeed are included.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/scrum-master/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe Scrum Master | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe&reg; Scrum Master Certification</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish SAFe Scrum Master and lead high-performing teams.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>SAFe&reg; Scrum Master</strong> but did not finish checkout. SSM certification proves you can facilitate delivery and continuous improvement at scale.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We hold the highest feedback score with Scaled Agile, our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate. You learn from people who have actually done this work, using real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get with this course</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Lead Agile teams effectively inside a SAFe&reg; environment</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Master servant leadership, facilitation, and team coaching</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn SSM certification recognized across Fortune 500 organizations</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Official courseware, exam, and one-year SAFe Studio membership included</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Every registration includes official SAFe course materials, the certification exam where applicable, and access to the learning resources you need to succeed.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/scrum-master/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about dates, exam prep, or whether this is the right certification for your role? Just reply and I will help.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'SAFe for Teams', 'safe-for-teams',
 'Complete your SAFe for Teams enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in SAFe for Teams but did not finish checkout. SAFe for Teams gives you the shared language and practices used on Agile Release Trains.

Agile36 holds the highest feedback score with Scaled Agile. Our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate.

Why finish now:
- Learn how Agile teams deliver inside the SAFe framework
- Build essential skills for high-performing team collaboration
- Earn a foundational SAFe certification that advances your career
- Official courseware, exam, and one-year SAFe Studio membership included

Official SAFe course materials, the certification exam where applicable, and the learning resources you need to succeed are included.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/safe-for-teams/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe for Teams | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe&reg; for Teams Certification</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish SAFe for Teams and build your Agile foundation.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>SAFe&reg; for Teams</strong> but did not finish checkout. SAFe for Teams gives you the shared language and practices used on Agile Release Trains.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We hold the highest feedback score with Scaled Agile, our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate. You learn from people who have actually done this work, using real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get with this course</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Learn how Agile teams deliver inside the SAFe&reg; framework</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Build essential skills for high-performing team collaboration</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn a foundational SAFe&reg; certification that advances your career</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Official courseware, exam, and one-year SAFe Studio membership included</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Every registration includes official SAFe course materials, the certification exam where applicable, and access to the learning resources you need to succeed.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/safe-for-teams/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about dates, exam prep, or whether this is the right certification for your role? Just reply and I will help.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'SAFe DevOps', 'devops',
 'Complete your SAFe DevOps enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in SAFe DevOps but did not finish checkout. SAFe DevOps certification shows you can improve flow from idea to production.

Agile36 holds the highest feedback score with Scaled Agile. Our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate.

Why finish now:
- Master continuous delivery and DevOps practices at scale
- Learn to accelerate value flow across the entire pipeline
- Earn certification that combines Agile, Lean, and DevOps
- Official courseware, exam, and one-year SAFe Studio membership included

Official SAFe course materials, the certification exam where applicable, and the learning resources you need to succeed are included.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/devops/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe DevOps | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe&reg; DevOps Certification</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish SAFe DevOps and accelerate value delivery.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>SAFe&reg; DevOps</strong> but did not finish checkout. SAFe DevOps certification shows you can improve flow from idea to production.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We hold the highest feedback score with Scaled Agile, our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate. You learn from people who have actually done this work, using real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get with this course</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Master continuous delivery and DevOps practices at scale</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Learn to accelerate value flow across the entire pipeline</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn certification that combines Agile, Lean, and DevOps</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Official courseware, exam, and one-year SAFe Studio membership included</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Every registration includes official SAFe course materials, the certification exam where applicable, and access to the learning resources you need to succeed.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/devops/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about dates, exam prep, or whether this is the right certification for your role? Just reply and I will help.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'SAFe Advanced Scrum Master', 'advanced-scrum-master',
 'Complete your SAFe Advanced Scrum Master enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in SAFe Advanced Scrum Master but did not finish checkout. SASM certification marks you as ready for larger programs and coaching responsibilities.

Agile36 holds the highest feedback score with Scaled Agile. Our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate.

Why finish now:
- Take Scrum Master skills further with advanced facilitation and coaching
- Lead multiple teams and support organizational change
- Earn the advanced SAFe Scrum Master certification
- Official courseware, exam, and one-year SAFe Studio membership included

Official SAFe course materials, the certification exam where applicable, and the learning resources you need to succeed are included.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/advanced-scrum-master/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe Advanced Scrum Master | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe&reg; Advanced Scrum Master</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish Advanced Scrum Master and level up your coaching impact.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>SAFe&reg; Advanced Scrum Master</strong> but did not finish checkout. SASM certification marks you as ready for larger programs and coaching responsibilities.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We hold the highest feedback score with Scaled Agile, our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate. You learn from people who have actually done this work, using real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get with this course</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Take Scrum Master skills further with advanced facilitation and coaching</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Lead multiple teams and support organizational change</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn the advanced SAFe&reg; Scrum Master certification</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Official courseware, exam, and one-year SAFe Studio membership included</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Every registration includes official SAFe course materials, the certification exam where applicable, and access to the learning resources you need to succeed.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/advanced-scrum-master/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about dates, exam prep, or whether this is the right certification for your role? Just reply and I will help.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'SAFe Value Stream Mapping', 'value-stream-mapping',
 'Complete your Value Stream Mapping enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in SAFe Value Stream Mapping but did not finish checkout. Value Stream Mapping gives you a concrete method to improve end-to-end delivery.

Agile36 holds the highest feedback score with Scaled Agile. Our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate.

Why finish now:
- Identify and eliminate waste across your value streams
- Optimize flow to accelerate delivery and improve outcomes
- Earn a SAFe micro-credential that demonstrates practical expertise
- Official courseware and learning materials included

Official SAFe course materials, the certification exam where applicable, and the learning resources you need to succeed are included.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/value-stream-mapping/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>SAFe Value Stream Mapping | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">SAFe&reg; Value Stream Mapping</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish Value Stream Mapping and optimize how work flows.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>SAFe&reg; Value Stream Mapping</strong> but did not finish checkout. Value Stream Mapping gives you a concrete method to improve end-to-end delivery.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We hold the highest feedback score with Scaled Agile, our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate. You learn from people who have actually done this work, using real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get with this course</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Identify and eliminate waste across your value streams</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Optimize flow to accelerate delivery and improve outcomes</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn a SAFe&reg; micro-credential that demonstrates practical expertise</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Official courseware and learning materials included</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Every registration includes official SAFe course materials, the certification exam where applicable, and access to the learning resources you need to succeed.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/value-stream-mapping/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about dates, exam prep, or whether this is the right certification for your role? Just reply and I will help.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'Responsible AI', 'responsible-ai',
 'Complete your Responsible AI enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in Achieving Responsible AI with SAFe but did not finish checkout. Responsible AI credentials help you guide AI initiatives with trust and governance.

Agile36 holds the highest feedback score with Scaled Agile. Our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate.

Why finish now:
- Build ethical, responsible AI practices into delivery
- Apply SAFe principles to AI development and governance
- Earn a micro-credential that signals commitment to responsible AI
- Stay ahead of emerging AI regulations and best practices

Official SAFe course materials, the certification exam where applicable, and the learning resources you need to succeed are included.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/responsible-ai/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>Achieving Responsible AI with SAFe | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">Responsible AI with SAFe&reg;</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish Responsible AI and lead ethical AI adoption.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>Achieving Responsible AI with SAFe&reg;</strong> but did not finish checkout. Responsible AI credentials help you guide AI initiatives with trust and governance.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We hold the highest feedback score with Scaled Agile, our instructors are SPC-certified with Fortune 100 transformation experience, and our students pass their certification exam at a 98% rate. You learn from people who have actually done this work, using real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you get with this course</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Build ethical, responsible AI practices into delivery</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Apply SAFe&reg; principles to AI development and governance</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn a micro-credential that signals commitment to responsible AI</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Stay ahead of emerging AI regulations and best practices</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Every registration includes official SAFe course materials, the certification exam where applicable, and access to the learning resources you need to succeed.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/responsible-ai/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Questions about dates, exam prep, or whether this is the right certification for your role? Just reply and I will help.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'AI-Driven Scrum Master', 'ai-driven-scrum-master',
 'Complete your AI-Driven Scrum Master enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in AI-Driven Scrum Master but did not finish checkout. AI-capable Scrum Masters are becoming the default expectation on modern delivery teams.

Agile36 is a Scaled Agile Silver Partner with the highest feedback score with Scaled Agile, Fortune 100 training experience, and a 98% exam pass rate across our certification programs.

Why finish now:
- Use AI tools to strengthen facilitation, planning, and coaching
- Combine Agile leadership with practical GenAI workflows
- Earn a credential at the intersection of AI and Scrum Mastery
- Build skills organizations need as AI reshapes delivery teams

Live instruction, practical exercises, and course materials designed for working professionals.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/ai-driven-scrum-master/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>AI-Driven Scrum Master | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">AI-Driven Scrum Master</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish AI-Driven Scrum Master and bring AI into your team practice.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>AI-Driven Scrum Master</strong> but did not finish checkout. AI-capable Scrum Masters are becoming the default expectation on modern delivery teams.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We are a Scaled Agile Silver Partner with the highest feedback score with Scaled Agile, Fortune 100 training experience, and a 98% exam pass rate across our certification programs. You learn from practitioners who teach with real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you will learn</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Use AI tools to strengthen facilitation, planning, and coaching</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Combine Agile leadership with practical GenAI workflows</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn a credential at the intersection of AI and Scrum Mastery</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Build skills organizations need as AI reshapes delivery teams</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Live instruction, practical exercises, and course materials designed for professionals who need skills they can use immediately.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/ai-driven-scrum-master/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Not sure if this is the right program for your role? Just reply and I will point you in the right direction.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'Executive GenAI Leadership', 'executive-genai-leadership',
 'Complete your Executive GenAI Leadership enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in Executive GenAI Leadership but did not finish checkout. Executives who understand GenAI are better positioned to fund and govern AI initiatives.

Agile36 is a Scaled Agile Silver Partner with the highest feedback score with Scaled Agile, Fortune 100 training experience, and a 98% exam pass rate across our certification programs.

Why finish now:
- Lead organizational GenAI strategy and adoption
- Make clearer decisions on AI investment, risk, and governance
- Earn an executive-level credential in GenAI leadership
- Learn practical frameworks used in enterprise AI transformation

Live instruction, practical exercises, and course materials designed for working professionals.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/executive-genai-leadership/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>Executive GenAI Leadership | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">Executive GenAI Leadership</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish Executive GenAI Leadership and guide AI strategy with confidence.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>Executive GenAI Leadership</strong> but did not finish checkout. Executives who understand GenAI are better positioned to fund and govern AI initiatives.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We are a Scaled Agile Silver Partner with the highest feedback score with Scaled Agile, Fortune 100 training experience, and a 98% exam pass rate across our certification programs. You learn from practitioners who teach with real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you will learn</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Lead organizational GenAI strategy and adoption</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Make clearer decisions on AI investment, risk, and governance</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn an executive-level credential in GenAI leadership</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Learn practical frameworks used in enterprise AI transformation</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Live instruction, practical exercises, and course materials designed for professionals who need skills they can use immediately.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/executive-genai-leadership/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Not sure if this is the right program for your role? Just reply and I will point you in the right direction.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'Generative AI for Project Managers', 'generative-ai-project-managers',
 'Complete your GenAI for Project Managers enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in Generative AI for Project Managers but did not finish checkout. Project managers who use GenAI well deliver clearer communication and faster execution.

Agile36 is a Scaled Agile Silver Partner with the highest feedback score with Scaled Agile, Fortune 100 training experience, and a 98% exam pass rate across our certification programs.

Why finish now:
- Use GenAI to streamline planning, status, and decision support
- Automate repetitive project tasks without losing control
- Earn a credential that shows you are ahead of the AI curve
- Apply practical AI workflows you can use on your next project

Live instruction, practical exercises, and course materials designed for working professionals.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/generative-ai-project-managers/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>Generative AI for Project Managers | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">GenAI for Project Managers</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish GenAI for Project Managers and work smarter with AI.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>Generative AI for Project Managers</strong> but did not finish checkout. Project managers who use GenAI well deliver clearer communication and faster execution.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We are a Scaled Agile Silver Partner with the highest feedback score with Scaled Agile, Fortune 100 training experience, and a 98% exam pass rate across our certification programs. You learn from practitioners who teach with real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you will learn</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Use GenAI to streamline planning, status, and decision support</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Automate repetitive project tasks without losing control</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn a credential that shows you are ahead of the AI curve</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Apply practical AI workflows you can use on your next project</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Live instruction, practical exercises, and course materials designed for professionals who need skills they can use immediately.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/generative-ai-project-managers/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Not sure if this is the right program for your role? Just reply and I will point you in the right direction.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'Certified GenAI Practitioner', 'certified-genai-practitioner',
 'Complete your GenAI Practitioner enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in Certified GenAI Practitioner but did not finish checkout. GenAI practitioner skills are increasingly required across product, delivery, and operations roles.

Agile36 is a Scaled Agile Silver Partner with the highest feedback score with Scaled Agile, Fortune 100 training experience, and a 98% exam pass rate across our certification programs.

Why finish now:
- Build practical GenAI skills you can apply immediately
- Learn how to design and deploy GenAI solutions effectively
- Earn a practitioner credential recognized by leading organizations
- Gain hands-on experience with modern AI tools and techniques

Live instruction, practical exercises, and course materials designed for working professionals.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/certified-genai-practitioner/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>Certified GenAI Practitioner | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">Certified GenAI Practitioner</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish Certified GenAI Practitioner and put GenAI to work.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>Certified GenAI Practitioner</strong> but did not finish checkout. GenAI practitioner skills are increasingly required across product, delivery, and operations roles.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We are a Scaled Agile Silver Partner with the highest feedback score with Scaled Agile, Fortune 100 training experience, and a 98% exam pass rate across our certification programs. You learn from practitioners who teach with real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you will learn</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Build practical GenAI skills you can apply immediately</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Learn how to design and deploy GenAI solutions effectively</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn a practitioner credential recognized by leading organizations</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Gain hands-on experience with modern AI tools and techniques</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Live instruction, practical exercises, and course materials designed for professionals who need skills they can use immediately.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/certified-genai-practitioner/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Not sure if this is the right program for your role? Just reply and I will point you in the right direction.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'No-Code AI Agents & Automation', 'ai-agent-builder',
 'Complete your No-Code AI Agents enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in No-Code AI Agents & Automation but did not finish checkout. No-code AI agent skills help you ship automation faster than waiting on engineering capacity.

Agile36 is a Scaled Agile Silver Partner with the highest feedback score with Scaled Agile, Fortune 100 training experience, and a 98% exam pass rate across our certification programs.

Why finish now:
- Build useful AI agents without writing traditional code
- Automate workflows that save hours every week
- Earn a credential focused on practical AI automation
- Create solutions that solve real business problems

Live instruction, practical exercises, and course materials designed for working professionals.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/ai-agent-builder/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>No-Code AI Agents & Automation | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">No-Code AI Agents &amp; Automation</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish No-Code AI Agents and automate real work.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>No-Code AI Agents &amp; Automation</strong> but did not finish checkout. No-code AI agent skills help you ship automation faster than waiting on engineering capacity.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We are a Scaled Agile Silver Partner with the highest feedback score with Scaled Agile, Fortune 100 training experience, and a 98% exam pass rate across our certification programs. You learn from practitioners who teach with real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you will learn</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Build useful AI agents without writing traditional code</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Automate workflows that save hours every week</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn a credential focused on practical AI automation</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Create solutions that solve real business problems</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Live instruction, practical exercises, and course materials designed for professionals who need skills they can use immediately.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/ai-agent-builder/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Not sure if this is the right program for your role? Just reply and I will point you in the right direction.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed'),

('abandoned_cart', 'Certified AI Product Manager', 'certified-ai-product-manager',
 'Complete your AI Product Manager enrollment — $100 off with 100OFF',
 'Hi {first_name},

You started enrolling in Certified AI Product Manager but did not finish checkout. AI Product Manager certification shows you can turn AI capability into customer outcomes.

Agile36 is a Scaled Agile Silver Partner with the highest feedback score with Scaled Agile, Fortune 100 training experience, and a 98% exam pass rate across our certification programs.

Why finish now:
- Master AI product management from strategy through launch
- Learn to ship AI products customers trust and adopt
- Earn a credential that validates AI product expertise
- Build skills in high demand across technology organizations

Live instruction, practical exercises, and course materials designed for working professionals.

Complete your enrollment and use code 100OFF to save $100.
This offer expires in one hour. Seats per cohort are limited.

Complete your enrollment: https://www.agile36.com/courses/certified-ai-product-manager/schedule

Questions? Just reply to this email.

Marcus Ball
Agile36
m.ball@agile36.com

Agile36 • 1000 Brickell Ave, Suite 715, Miami, FL • SAFe Silver Partner',
 '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="x-apple-disable-message-reformatting">
<title>Certified AI Product Manager | Agile36</title>
</head>
<body style="margin:0; padding:0; background-color:#eceff3; -webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eceff3; padding:32px 12px;">
<tr>
<td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(16,42,77,0.08); font-family:''Segoe UI'', Arial, Helvetica, sans-serif; color:#1f2733;">

<!-- Logo header -->
<tr>
<td style="padding:26px 40px 22px 40px; background-color:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td><img src="https://www.agile36.com/logo.png" alt="Agile36" height="36" style="display:block; height:36px; width:auto; border:0;"></td>
<td align="right" style="font-size:11px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:#0f2a4d;">SAFe&reg; Silver Partner</td>
</tr>
</table>
</td>
</tr>

<!-- Navy hero -->
<tr>
<td style="background-color:#0f2a4d; padding:30px 40px;">
<p style="margin:0 0 8px 0; font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#f5b942;">Certified AI Product Manager</p>
<h1 style="margin:0; font-size:26px; line-height:1.28; font-weight:700; color:#ffffff;">Finish AI Product Manager and lead AI products with clarity.</h1>
</td>
</tr>

<tr><td style="height:4px; background-color:#f5b942; font-size:0; line-height:0;">&nbsp;</td></tr>

<!-- Body -->
<tr>
<td style="padding:32px 40px 0 40px;">
<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Hi {first_name},</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">You started enrolling in <strong>Certified AI Product Manager</strong> but did not finish checkout. AI Product Manager certification shows you can turn AI capability into customer outcomes.</p>

<p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#3a4453;">Agile36 gets you there. We are a Scaled Agile Silver Partner with the highest feedback score with Scaled Agile, Fortune 100 training experience, and a 98% exam pass rate across our certification programs. You learn from practitioners who teach with real scenarios—not slides alone.</p>
</td>
</tr>

<!-- Proof stat strip -->
<tr>
<td style="padding:8px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f2a4d; border-radius:8px;">
<tr>
<td width="50%" align="center" style="padding:20px 12px; border-right:1px solid #274a75;">
<p style="margin:0; font-size:30px; font-weight:800; color:#f5b942;">98%</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Exam pass rate</p>
</td>
<td width="50%" align="center" style="padding:20px 12px;">
<p style="margin:0; font-size:22px; font-weight:800; color:#f5b942; line-height:1.15;">Highest</p>
<p style="margin:4px 0 0 0; font-size:12px; letter-spacing:0.5px; text-transform:uppercase; color:#b9cae0;">Scaled Agile feedback score</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Course specifics -->
<tr>
<td style="padding:24px 40px 0 40px;">
<p style="margin:0 0 10px 0; font-size:13px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#0f2a4d;">What you will learn</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; line-height:1.5; color:#3a4453;">
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Master AI product management from strategy through launch</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Learn to ship AI products customers trust and adopt</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Earn a credential that validates AI product expertise</td></tr>
<tr><td style="padding:3px 0; vertical-align:top; width:22px; color:#d99b1f; font-weight:700;">&#10003;</td><td style="padding:3px 0;">Build skills in high demand across technology organizations</td></tr>
</table>
<p style="margin:12px 0 0 0; font-size:15px; line-height:1.6; color:#6b7683;">Live instruction, practical exercises, and course materials designed for professionals who need skills they can use immediately.</p>
</td>
</tr>

<!-- Offer box -->
<tr>
<td style="padding:22px 40px 0 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fbf4e3; border:1px dashed #e0b64a; border-radius:8px;">
<tr>
<td style="padding:18px 24px;" align="center">
<p style="margin:0; font-size:16px; line-height:1.5; color:#0f2a4d;"><strong>Complete your enrollment and use code <span style="color:#b8860b;">100OFF</span> to save $100.</strong></p>
<p style="margin:6px 0 0 0; font-size:14px; color:#6b7683;">This offer expires in one hour. Seats per cohort are limited.</p>
</td>
</tr>
</table>
</td>
</tr>

<!-- CTA -->
<tr>
<td style="padding:24px 40px 8px 40px;" align="center">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="background-color:#f5b942; border-radius:6px;">
<a href="https://www.agile36.com/courses/certified-ai-product-manager/schedule" style="display:inline-block; padding:15px 38px; font-size:16px; font-weight:700; color:#0f2a4d; text-decoration:none;">Complete Your Enrollment &rarr;</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Reply -->
<tr>
<td style="padding:12px 40px 32px 40px;" align="center">
<p style="margin:0; font-size:15px; line-height:1.6; color:#6b7683;">Not sure if this is the right program for your role? Just reply and I will point you in the right direction.</p>
</td>
</tr>

<!-- Signature -->
<tr>
<td style="padding:0 40px 36px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e9f0;">
<tr>
<td style="padding-top:20px;">
<p style="margin:0; font-size:16px; font-weight:700; color:#0f2a4d;">Marcus Ball</p>
<p style="margin:2px 0 0 0; font-size:14px; color:#6b7683;">Agile36</p>
<p style="margin:2px 0 0 0; font-size:14px;"><a href="mailto:m.ball@agile36.com" style="color:#1a5cff; text-decoration:none;">m.ball@agile36.com</a></p>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="background-color:#0f2a4d; padding:20px 40px;">
<p style="margin:0; font-size:12px; line-height:1.5; color:#9db4d4;">Agile36 &bull; 1000 Brickell Ave, Suite 715, Miami, FL &bull; SAFe&reg; Silver Partner</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>',
 '100OFF', 100.00, 'fixed');
