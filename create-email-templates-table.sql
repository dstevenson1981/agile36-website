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

-- SAFe Courses ($150 OFF, code: 150off)
INSERT INTO email_templates (template_type, course_name, course_slug, subject, body_text, body_html, discount_code, discount_amount, discount_type) VALUES

-- 1. Leading SAFe
('abandoned_cart', 'Leading SAFe', 'leading-safe', 
 'Complete Your SAFe® Certification - $150 OFF Inside! ',
 'Hi {first_name},

You started enrolling in Leading SAFe® but didn''t complete your purchase. Don''t miss out on this opportunity to become a certified SAFe® Agilist!

Special offer: Use code 150off to save $150 on your enrollment!

Why complete your Leading SAFe® certification now:
• Master the Scaled Agile Framework and lead enterprise transformations
• Earn your SAFe® Agilist certification - recognized by top companies worldwide
• Learn from expert instructors with real-world experience
• Join 1,000+ professionals who have transformed their careers with SAFe®

 This offer expires soon - secure your spot today!

Complete your enrollment now: https://agile36.com/courses/leading-safe/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Complete Your SAFe® Certification - $150 OFF Inside! </h2>
 <p>Hi {first_name},</p>
 <p>You started enrolling in <strong>Leading SAFe®</strong> but didn''t complete your purchase. Don''t miss out on this opportunity to become a certified SAFe® Agilist!</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Special offer: Use code <span style="color: #fa4a23; font-size: 20px;">150off</span> to save $150 on your enrollment!</p>
 </div>
 <h3 style="color: #01203d;">Why complete your Leading SAFe® certification now:</h3>
 <ul>
 <li>Master the Scaled Agile Framework and lead enterprise transformations</li>
 <li>Earn your SAFe® Agilist certification - recognized by top companies worldwide</li>
 <li>Learn from expert instructors with real-world experience</li>
 <li>Join 1,000+ professionals who have transformed their careers with SAFe®</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>This offer expires soon</strong> - secure your spot today!</p>
 <a href="https://agile36.com/courses/leading-safe/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Complete Your Enrollment Now</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- 2. SAFe POPM
('abandoned_cart', 'SAFe POPM', 'product-owner-manager',
 'Don''t Miss Out: Complete Your SAFe® POPM Enrollment - $150 OFF! ',
 'Hi {first_name},

You were so close to enrolling in SAFe® Product Owner/Product Manager (POPM) certification! Complete your purchase now and save $150.

Use code: 150off to save $150 instantly!

Why SAFe® POPM certification matters:
• Become the strategic product leader your organization needs
• Master product management at scale with SAFe® best practices
• Earn industry-recognized certification that opens doors to senior roles
• Learn from certified SAFe® instructors with years of real-world experience

 Limited time offer - don''t let this opportunity slip away!

Enroll now: https://agile36.com/courses/product-owner-manager/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Don''t Miss Out: Complete Your SAFe® POPM Enrollment - $150 OFF! </h2>
 <p>Hi {first_name},</p>
 <p>You were so close to enrolling in <strong>SAFe® Product Owner/Product Manager (POPM)</strong> certification! Complete your purchase now and save $150.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Use code: <span style="color: #fa4a23; font-size: 20px;">150off</span> to save $150 instantly!</p>
 </div>
 <h3 style="color: #01203d;">Why SAFe® POPM certification matters:</h3>
 <ul>
 <li>Become the strategic product leader your organization needs</li>
 <li>Master product management at scale with SAFe® best practices</li>
 <li>Earn industry-recognized certification that opens doors to senior roles</li>
 <li>Learn from certified SAFe® instructors with years of real-world experience</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>Limited time offer</strong> - don''t let this opportunity slip away!</p>
 <a href="https://agile36.com/courses/product-owner-manager/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Enroll Now</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- 3. SAFe Lean Portfolio Management
('abandoned_cart', 'SAFe Lean Portfolio Management', 'lean-portfolio-management',
 'Finish Your SAFe® LPM Enrollment - $150 OFF Your Certification! 💼',
 'Hi {first_name},

You started the enrollment process for SAFe® Lean Portfolio Management but didn''t complete it. Don''t miss this chance to transform how your organization manages portfolios!

Save $150 with code: 150off

Why complete your SAFe® LPM certification:
• Lead strategic portfolio planning and execution at the enterprise level
• Align strategy with execution using Lean-Agile principles
• Earn the most advanced SAFe® certification for portfolio leaders
• Join executives and senior leaders driving organizational transformation

 This discount won''t last forever - complete your enrollment today!

Secure your spot: https://agile36.com/courses/lean-portfolio-management/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Finish Your SAFe® LPM Enrollment - $150 OFF Your Certification! 💼</h2>
 <p>Hi {first_name},</p>
 <p>You started the enrollment process for <strong>SAFe® Lean Portfolio Management</strong> but didn''t complete it. Don''t miss this chance to transform how your organization manages portfolios!</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Save $150 with code: <span style="color: #fa4a23; font-size: 20px;">150off</span></p>
 </div>
 <h3 style="color: #01203d;">Why complete your SAFe® LPM certification:</h3>
 <ul>
 <li>Lead strategic portfolio planning and execution at the enterprise level</li>
 <li>Align strategy with execution using Lean-Agile principles</li>
 <li>Earn the most advanced SAFe® certification for portfolio leaders</li>
 <li>Join executives and senior leaders driving organizational transformation</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>This discount won''t last forever</strong> - complete your enrollment today!</p>
 <a href="https://agile36.com/courses/lean-portfolio-management/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Secure Your Spot</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- 4. SAFe Agile Product Management
('abandoned_cart', 'SAFe Agile Product Management', 'agile-product-management',
 'Complete Your SAFe® APM Enrollment - $150 OFF! ',
 'Hi {first_name},

You were about to enroll in SAFe® Agile Product Management! Complete your purchase now and save $150 on this essential certification.

Special code: 150off saves you $150!

Why SAFe® APM is essential for product managers:
• Master customer-centric product management at scale
• Learn to build products customers actually want and need
• Earn certification that validates your product management expertise
• Gain practical tools and frameworks used by top product teams

 Don''t wait - this offer expires soon!

Complete enrollment: https://agile36.com/courses/agile-product-management/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Complete Your SAFe® APM Enrollment - $150 OFF! </h2>
 <p>Hi {first_name},</p>
 <p>You were about to enroll in <strong>SAFe® Agile Product Management</strong>! Complete your purchase now and save $150 on this essential certification.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Special code: <span style="color: #fa4a23; font-size: 20px;">150off</span> saves you $150!</p>
 </div>
 <h3 style="color: #01203d;">Why SAFe® APM is essential for product managers:</h3>
 <ul>
 <li>Master customer-centric product management at scale</li>
 <li>Learn to build products customers actually want and need</li>
 <li>Earn certification that validates your product management expertise</li>
 <li>Gain practical tools and frameworks used by top product teams</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>Don''t wait</strong> - this offer expires soon!</p>
 <a href="https://agile36.com/courses/agile-product-management/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Complete Enrollment</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- 5. SAFe Scrum Master
('abandoned_cart', 'SAFe Scrum Master', 'scrum-master',
 'Finish Your SAFe® Scrum Master Certification - $150 OFF! 🏆',
 'Hi {first_name},

You started enrolling in SAFe® Scrum Master certification! Don''t let this opportunity pass - complete your enrollment now and save $150.

Use code 150off to save $150!

Why become a SAFe® Scrum Master:
• Lead Agile teams effectively in a SAFe® environment
• Master servant leadership and team facilitation skills
• Earn certification recognized by Fortune 500 companies
• Learn from experienced SAFe® instructors with real-world insights

 Limited seats available - secure your spot now!

Enroll now: https://agile36.com/courses/scrum-master/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Finish Your SAFe® Scrum Master Certification - $150 OFF! 🏆</h2>
 <p>Hi {first_name},</p>
 <p>You started enrolling in <strong>SAFe® Scrum Master</strong> certification! Don''t let this opportunity pass - complete your enrollment now and save $150.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Use code <span style="color: #fa4a23; font-size: 20px;">150off</span> to save $150!</p>
 </div>
 <h3 style="color: #01203d;">Why become a SAFe® Scrum Master:</h3>
 <ul>
 <li>Lead Agile teams effectively in a SAFe® environment</li>
 <li>Master servant leadership and team facilitation skills</li>
 <li>Earn certification recognized by Fortune 500 companies</li>
 <li>Learn from experienced SAFe® instructors with real-world insights</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>Limited seats available</strong> - secure your spot now!</p>
 <a href="https://agile36.com/courses/scrum-master/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Enroll Now</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- 6. SAFe for Teams
('abandoned_cart', 'SAFe for Teams', 'safe-for-teams',
 'Complete Your SAFe® for Teams Enrollment - $150 OFF! 👥',
 'Hi {first_name},

You were so close to enrolling in SAFe® for Teams! Finish your purchase now and save $150 on this foundational SAFe® certification.

Save $150 with code: 150off

Why SAFe® for Teams is perfect for you:
• Learn how Agile teams work within the SAFe® framework
• Build essential skills for high-performing Agile teams
• Earn your first SAFe® certification and advance your career
• Get hands-on experience with SAFe® practices and principles

 This special offer won''t last - complete your enrollment today!

Complete now: https://agile36.com/courses/safe-for-teams/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Complete Your SAFe® for Teams Enrollment - $150 OFF! 👥</h2>
 <p>Hi {first_name},</p>
 <p>You were so close to enrolling in <strong>SAFe® for Teams</strong>! Finish your purchase now and save $150 on this foundational SAFe® certification.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Save $150 with code: <span style="color: #fa4a23; font-size: 20px;">150off</span></p>
 </div>
 <h3 style="color: #01203d;">Why SAFe® for Teams is perfect for you:</h3>
 <ul>
 <li>Learn how Agile teams work within the SAFe® framework</li>
 <li>Build essential skills for high-performing Agile teams</li>
 <li>Earn your first SAFe® certification and advance your career</li>
 <li>Get hands-on experience with SAFe® practices and principles</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>This special offer won''t last</strong> - complete your enrollment today!</p>
 <a href="https://agile36.com/courses/safe-for-teams/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Complete Now</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- 7. SAFe DevOps
('abandoned_cart', 'SAFe DevOps', 'devops',
 'Don''t Miss Out: Complete Your SAFe® DevOps Enrollment - $150 OFF! ',
 'Hi {first_name},

You started enrolling in SAFe® DevOps but didn''t finish! Complete your purchase now and save $150 on this critical certification.

Special offer: Code 150off saves you $150!

Why SAFe® DevOps certification is essential:
• Master continuous delivery and DevOps practices at scale
• Learn to accelerate value delivery in SAFe® enterprises
• Earn certification that combines Agile, Lean, and DevOps principles
• Gain skills that are in high demand across the tech industry

 Time is running out - secure your spot now!

Enroll now: https://agile36.com/courses/devops/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Don''t Miss Out: Complete Your SAFe® DevOps Enrollment - $150 OFF! </h2>
 <p>Hi {first_name},</p>
 <p>You started enrolling in <strong>SAFe® DevOps</strong> but didn''t finish! Complete your purchase now and save $150 on this critical certification.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Special offer: Code <span style="color: #fa4a23; font-size: 20px;">150off</span> saves you $150!</p>
 </div>
 <h3 style="color: #01203d;">Why SAFe® DevOps certification is essential:</h3>
 <ul>
 <li>Master continuous delivery and DevOps practices at scale</li>
 <li>Learn to accelerate value delivery in SAFe® enterprises</li>
 <li>Earn certification that combines Agile, Lean, and DevOps principles</li>
 <li>Gain skills that are in high demand across the tech industry</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>Time is running out</strong> - secure your spot now!</p>
 <a href="https://agile36.com/courses/devops/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Enroll Now</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- 8. SAFe Advanced Scrum Master
('abandoned_cart', 'SAFe Advanced Scrum Master', 'advanced-scrum-master',
 'Complete Your SAFe® Advanced Scrum Master Enrollment - $150 OFF! 🎓',
 'Hi {first_name},

You were about to enroll in SAFe® Advanced Scrum Master! Don''t miss this opportunity to advance your Scrum Master career - save $150 now.

Use code: 150off to save $150 instantly!

Why SAFe® Advanced Scrum Master certification:
• Take your Scrum Master skills to the next level with advanced techniques
• Master facilitation, coaching, and servant leadership at scale
• Earn the most advanced Scrum Master certification in SAFe®
• Learn to lead multiple teams and drive organizational change

 This offer expires soon - complete your enrollment today!

Secure your spot: https://agile36.com/courses/advanced-scrum-master/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Complete Your SAFe® Advanced Scrum Master Enrollment - $150 OFF! 🎓</h2>
 <p>Hi {first_name},</p>
 <p>You were about to enroll in <strong>SAFe® Advanced Scrum Master</strong>! Don''t miss this opportunity to advance your Scrum Master career - save $150 now.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Use code: <span style="color: #fa4a23; font-size: 20px;">150off</span> to save $150 instantly!</p>
 </div>
 <h3 style="color: #01203d;">Why SAFe® Advanced Scrum Master certification:</h3>
 <ul>
 <li>Take your Scrum Master skills to the next level with advanced techniques</li>
 <li>Master facilitation, coaching, and servant leadership at scale</li>
 <li>Earn the most advanced Scrum Master certification in SAFe®</li>
 <li>Learn to lead multiple teams and drive organizational change</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>This offer expires soon</strong> - complete your enrollment today!</p>
 <a href="https://agile36.com/courses/advanced-scrum-master/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Secure Your Spot</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- Micro-credentials ($150 OFF, code: 150off)
-- 9. SAFe Value Stream Mapping
('abandoned_cart', 'SAFe Value Stream Mapping', 'value-stream-mapping',
 'Complete Your Value Stream Mapping Enrollment - $150 OFF! 🗺',
 'Hi {first_name},

You started enrolling in SAFe® Value Stream Mapping but didn''t finish! Complete your enrollment now and save $150 on this powerful micro-credential.

Use code: 150off to save $150!

Why SAFe® Value Stream Mapping matters:
• Learn to identify and eliminate waste in your value streams
• Master techniques to optimize flow and accelerate delivery
• Earn a SAFe® micro-credential that demonstrates your expertise
• Gain practical tools to improve your organization''s efficiency

 Don''t let this opportunity slip away - enroll today!

Complete enrollment: https://agile36.com/courses/value-stream-mapping/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Complete Your Value Stream Mapping Enrollment - $150 OFF! 🗺</h2>
 <p>Hi {first_name},</p>
 <p>You started enrolling in <strong>SAFe® Value Stream Mapping</strong> but didn''t finish! Complete your enrollment now and save $150 on this powerful micro-credential.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Use code: <span style="color: #fa4a23; font-size: 20px;">150off</span> to save $150!</p>
 </div>
 <h3 style="color: #01203d;">Why SAFe® Value Stream Mapping matters:</h3>
 <ul>
 <li>Learn to identify and eliminate waste in your value streams</li>
 <li>Master techniques to optimize flow and accelerate delivery</li>
 <li>Earn a SAFe® micro-credential that demonstrates your expertise</li>
 <li>Gain practical tools to improve your organization''s efficiency</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>Don''t let this opportunity slip away</strong> - enroll today!</p>
 <a href="https://agile36.com/courses/value-stream-mapping/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Complete Enrollment</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 75.00, 'fixed'),

-- 10. Responsible AI
('abandoned_cart', 'Responsible AI', 'responsible-ai',
 'Finish Your Responsible AI Enrollment - $150 OFF! ',
 'Hi {first_name},

You were about to enroll in Achieving Responsible AI with SAFe®! Complete your purchase now and save $150 on this essential micro-credential.

Save $150 with code: 150off

Why Responsible AI certification is critical:
• Learn to build ethical and responsible AI systems
• Master SAFe® principles for responsible AI development
• Earn a micro-credential that shows your commitment to ethical AI
• Stay ahead of AI regulations and best practices

 Limited time offer - complete your enrollment now!

Enroll now: https://agile36.com/courses/responsible-ai/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Finish Your Responsible AI Enrollment - $150 OFF! </h2>
 <p>Hi {first_name},</p>
 <p>You were about to enroll in <strong>Achieving Responsible AI with SAFe®</strong>! Complete your purchase now and save $150 on this essential micro-credential.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Save $150 with code: <span style="color: #fa4a23; font-size: 20px;">150off</span></p>
 </div>
 <h3 style="color: #01203d;">Why Responsible AI certification is critical:</h3>
 <ul>
 <li>Learn to build ethical and responsible AI systems</li>
 <li>Master SAFe® principles for responsible AI development</li>
 <li>Earn a micro-credential that shows your commitment to ethical AI</li>
 <li>Stay ahead of AI regulations and best practices</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>Limited time offer</strong> - complete your enrollment now!</p>
 <a href="https://agile36.com/courses/responsible-ai/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Enroll Now</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 75.00, 'fixed'),

-- AI Courses ($150 OFF, code: 150off)
-- 11. AI-Driven Scrum Master
('abandoned_cart', 'AI-Driven Scrum Master', 'ai-driven-scrum-master',
 'Complete Your AI-Driven Scrum Master Enrollment - $150 OFF! ',
 'Hi {first_name},

You started enrolling in AI-Driven Scrum Master! Don''t miss this chance to combine AI and Agile - complete your enrollment and save $150.

Use code: 150off to save $150!

Why AI-Driven Scrum Master is the future:
• Learn to leverage AI tools to supercharge your Scrum Master effectiveness
• Master AI-powered techniques for team facilitation and coaching
• Earn certification that positions you at the intersection of AI and Agile
• Gain skills that are in high demand as AI transforms the workplace

 This offer won''t last - secure your spot today!

Complete enrollment: https://agile36.com/courses/ai-driven-scrum-master/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Complete Your AI-Driven Scrum Master Enrollment - $150 OFF! </h2>
 <p>Hi {first_name},</p>
 <p>You started enrolling in <strong>AI-Driven Scrum Master</strong>! Don''t miss this chance to combine AI and Agile - complete your enrollment and save $150.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Use code: <span style="color: #fa4a23; font-size: 20px;">150off</span> to save $150!</p>
 </div>
 <h3 style="color: #01203d;">Why AI-Driven Scrum Master is the future:</h3>
 <ul>
 <li>Learn to leverage AI tools to supercharge your Scrum Master effectiveness</li>
 <li>Master AI-powered techniques for team facilitation and coaching</li>
 <li>Earn certification that positions you at the intersection of AI and Agile</li>
 <li>Gain skills that are in high demand as AI transforms the workplace</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>This offer won''t last</strong> - secure your spot today!</p>
 <a href="https://agile36.com/courses/ai-driven-scrum-master/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Complete Enrollment</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- 12. Executive GenAI Leadership
('abandoned_cart', 'Executive GenAI Leadership', 'executive-genai-leadership',
 'Finish Your Executive GenAI Leadership Enrollment - $150 OFF! ',
 'Hi {first_name},

You were about to enroll in Executive GenAI Leadership! Complete your purchase now and save $150 on this strategic leadership certification.

Save $150 with code: 150off

Why Executive GenAI Leadership is essential:
• Lead your organization''s AI transformation with confidence
• Master GenAI strategy and implementation for executives
• Earn certification that demonstrates your AI leadership expertise
• Learn to make strategic decisions about AI adoption and governance

 Limited time offer - don''t miss this opportunity!

Enroll now: https://agile36.com/courses/executive-genai-leadership/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Finish Your Executive GenAI Leadership Enrollment - $150 OFF! </h2>
 <p>Hi {first_name},</p>
 <p>You were about to enroll in <strong>Executive GenAI Leadership</strong>! Complete your purchase now and save $150 on this strategic leadership certification.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Save $150 with code: <span style="color: #fa4a23; font-size: 20px;">150off</span></p>
 </div>
 <h3 style="color: #01203d;">Why Executive GenAI Leadership is essential:</h3>
 <ul>
 <li>Lead your organization''s AI transformation with confidence</li>
 <li>Master GenAI strategy and implementation for executives</li>
 <li>Earn certification that demonstrates your AI leadership expertise</li>
 <li>Learn to make strategic decisions about AI adoption and governance</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>Limited time offer</strong> - don''t miss this opportunity!</p>
 <a href="https://agile36.com/courses/executive-genai-leadership/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Enroll Now</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- 13. Generative AI for Project Managers
('abandoned_cart', 'Generative AI for Project Managers', 'generative-ai-project-managers',
 'Complete Your GenAI for PM Enrollment - $150 OFF! ',
 'Hi {first_name},

You started enrolling in Generative AI for Project Managers! Finish your purchase now and save $150 on this cutting-edge certification.

Special code: 150off saves you $150!

Why GenAI for Project Managers is a game-changer:
• Learn to use AI to streamline project management and boost productivity
• Master AI tools that automate project tasks and improve decision-making
• Earn certification that shows you''re ahead of the AI curve
• Gain practical AI skills that transform how you manage projects

 This offer expires soon - complete your enrollment today!

Secure your spot: https://agile36.com/courses/generative-ai-project-managers/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Complete Your GenAI for PM Enrollment - $150 OFF! </h2>
 <p>Hi {first_name},</p>
 <p>You started enrolling in <strong>Generative AI for Project Managers</strong>! Finish your purchase now and save $150 on this cutting-edge certification.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Special code: <span style="color: #fa4a23; font-size: 20px;">150off</span> saves you $150!</p>
 </div>
 <h3 style="color: #01203d;">Why GenAI for Project Managers is a game-changer:</h3>
 <ul>
 <li>Learn to use AI to streamline project management and boost productivity</li>
 <li>Master AI tools that automate project tasks and improve decision-making</li>
 <li>Earn certification that shows you''re ahead of the AI curve</li>
 <li>Gain practical AI skills that transform how you manage projects</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>This offer expires soon</strong> - complete your enrollment today!</p>
 <a href="https://agile36.com/courses/generative-ai-project-managers/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Secure Your Spot</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- 14. Certified GenAI Practitioner
('abandoned_cart', 'Certified GenAI Practitioner', 'certified-genai-practitioner',
 'Don''t Miss Out: Complete Your GenAI Practitioner Enrollment - $150 OFF! ',
 'Hi {first_name},

You were about to enroll in Certified GenAI Practitioner! Complete your purchase now and save $150 on this comprehensive AI certification.

Use code 150off to save $150!

Why Certified GenAI Practitioner certification:
• Master practical GenAI skills and applications
• Learn to build and deploy GenAI solutions effectively
• Earn certification recognized by leading tech companies
• Gain hands-on experience with cutting-edge AI technologies

 Time is running out - secure your spot now!

Complete enrollment: https://agile36.com/courses/certified-genai-practitioner/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Don''t Miss Out: Complete Your GenAI Practitioner Enrollment - $150 OFF! </h2>
 <p>Hi {first_name},</p>
 <p>You were about to enroll in <strong>Certified GenAI Practitioner</strong>! Complete your purchase now and save $150 on this comprehensive AI certification.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Use code <span style="color: #fa4a23; font-size: 20px;">150off</span> to save $150!</p>
 </div>
 <h3 style="color: #01203d;">Why Certified GenAI Practitioner certification:</h3>
 <ul>
 <li>Master practical GenAI skills and applications</li>
 <li>Learn to build and deploy GenAI solutions effectively</li>
 <li>Earn certification recognized by leading tech companies</li>
 <li>Gain hands-on experience with cutting-edge AI technologies</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>Time is running out</strong> - secure your spot now!</p>
 <a href="https://agile36.com/courses/certified-genai-practitioner/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Complete Enrollment</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- 15. No-Code AI Agents & Automation
('abandoned_cart', 'No-Code AI Agents & Automation', 'ai-agent-builder',
 'Complete Your No-Code AI Agents Enrollment - $150 OFF! ',
 'Hi {first_name},

You started enrolling in No-Code AI Agents & Automation! Finish your purchase now and save $150 on this innovative certification.

Save $150 with code: 150off

Why No-Code AI Agents & Automation is revolutionary:
• Build powerful AI agents without writing code
• Master automation that transforms your workflow
• Earn certification that opens doors to AI automation careers
• Learn to create AI solutions that solve real business problems

 This special offer won''t last - enroll today!

Enroll now: https://agile36.com/courses/ai-agent-builder/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Complete Your No-Code AI Agents Enrollment - $150 OFF! </h2>
 <p>Hi {first_name},</p>
 <p>You started enrolling in <strong>No-Code AI Agents & Automation</strong>! Finish your purchase now and save $150 on this innovative certification.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Save $150 with code: <span style="color: #fa4a23; font-size: 20px;">150off</span></p>
 </div>
 <h3 style="color: #01203d;">Why No-Code AI Agents & Automation is revolutionary:</h3>
 <ul>
 <li>Build powerful AI agents without writing code</li>
 <li>Master automation that transforms your workflow</li>
 <li>Earn certification that opens doors to AI automation careers</li>
 <li>Learn to create AI solutions that solve real business problems</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>This special offer won''t last</strong> - enroll today!</p>
 <a href="https://agile36.com/courses/ai-agent-builder/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Enroll Now</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed'),

-- 16. Certified AI Product Manager
('abandoned_cart', 'Certified AI Product Manager', 'certified-ai-product-manager',
 'Finish Your AI Product Manager Enrollment - $150 OFF! ',
 'Hi {first_name},

You were about to enroll in Certified AI Product Manager! Complete your purchase now and save $150 on this essential AI product management certification.

Use code: 150off to save $150 instantly!

Why Certified AI Product Manager is essential:
• Master AI product management from strategy to launch
• Learn to build AI products that customers love
• Earn certification that validates your AI product expertise
• Gain skills that are in high demand across tech companies

 Don''t wait - this offer expires soon!

Complete enrollment: https://agile36.com/courses/certified-ai-product-manager/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
 <h2 style="color: #fa4a23;">Finish Your AI Product Manager Enrollment - $150 OFF! </h2>
 <p>Hi {first_name},</p>
 <p>You were about to enroll in <strong>Certified AI Product Manager</strong>! Complete your purchase now and save $150 on this essential AI product management certification.</p>
 <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;">
 <p style="margin: 0; font-size: 18px; font-weight: bold;">Use code: <span style="color: #fa4a23; font-size: 20px;">150off</span> to save $150 instantly!</p>
 </div>
 <h3 style="color: #01203d;">Why Certified AI Product Manager is essential:</h3>
 <ul>
 <li>Master AI product management from strategy to launch</li>
 <li>Learn to build AI products that customers love</li>
 <li>Earn certification that validates your AI product expertise</li>
 <li>Gain skills that are in high demand across tech companies</li>
 </ul>
 <p style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;"> <strong>Don''t wait</strong> - this offer expires soon!</p>
 <a href="https://agile36.com/courses/certified-ai-product-manager/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Complete Enrollment</a>
 <p>Best regards,<br>The Agile36 Team</p>
</body>
</html>',
 '150off', 100.00, 'fixed');

-- Verify the inserts
SELECT 
 course_name,
 template_type,
 discount_code,
 discount_amount,
 is_active
FROM email_templates
ORDER BY 
 CASE WHEN discount_code = '150off' THEN 1 ELSE 2 END,
 course_name;
