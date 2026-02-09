-- Add assessment email templates to email_templates table.
-- Only for courses that have assessments: Leading SAFe, POPM, LPM, APM, Scrum Master, SAFe for Teams, DevOps, Advanced Scrum Master.
-- (Value Stream Mapping, Responsible AI, and all AI courses do not have assessments.)
-- Lookup by template_type = 'assessment' and course_slug. Run in Supabase SQL Editor.

INSERT INTO email_templates (template_type, course_name, course_slug, subject, body_text, body_html, discount_code, discount_amount, discount_type) VALUES

-- 1. Leading SAFe
('assessment', 'Leading SAFe', 'leading-safe',
 'Thanks for your interest in Leading SAFe® – save $150 with code 150OFF',
 'Hi {first_name},

Thank you for your interest in Leading SAFe®. You now have access to the assessment.

We have a very high pass rate for the SAFe® Agilist exam—our learners are well prepared. Benefits of the course and certification:
• Master the Scaled Agile Framework and lead enterprise transformations
• Earn your SAFe® Agilist certification—recognized by top companies worldwide
• Learn from expert instructors with real-world experience
• Join 1,000+ professionals who have transformed their careers with SAFe®

Save $150 when you enroll: use code 150OFF at checkout. This code expires in 30 minutes.

View upcoming dates and enroll: https://agile36.com/courses/leading-safe/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #01203d;">Thanks for your interest in Leading SAFe®</h2>
  <p>Hi {first_name},</p>
  <p>You now have access to the assessment. We have a <strong>very high pass rate</strong> for the SAFe® Agilist exam—our learners are well prepared.</p>
  <h3 style="color: #01203d;">Benefits of the course and certification:</h3>
  <ul><li>Master the Scaled Agile Framework and lead enterprise transformations</li><li>Earn your SAFe® Agilist certification—recognized by top companies worldwide</li><li>Learn from expert instructors with real-world experience</li><li>Join 1,000+ professionals who have transformed their careers with SAFe®</li></ul>
  <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;"><p style="margin: 0; font-weight: bold;">Save $150 when you enroll: use code <span style="color: #fa4a23; font-size: 18px;">150OFF</span> at checkout. This code expires in 30 minutes.</p></div>
  <p><a href="https://agile36.com/courses/leading-safe/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View dates and enroll</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>',
 '150OFF', 150.00, 'fixed'),

-- 2. SAFe POPM
('assessment', 'SAFe POPM', 'product-owner-manager',
 'Thanks for your interest in SAFe® POPM – save $150 with code 150OFF',
 'Hi {first_name},

Thank you for your interest in SAFe® Product Owner/Product Manager (POPM). You now have access to the assessment.

We have a very high pass rate for the SAFe® POPM exam. Benefits of the course and certification:
• Become the strategic product leader your organization needs
• Master product management at scale with SAFe® best practices
• Earn industry-recognized certification that opens doors to senior roles
• Learn from certified SAFe® instructors with years of real-world experience

Save $150 when you enroll: use code 150OFF at checkout. This code expires in 30 minutes.

View upcoming dates: https://agile36.com/courses/product-owner-manager/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #01203d;">Thanks for your interest in SAFe® POPM</h2>
  <p>Hi {first_name},</p>
  <p>You now have access to the assessment. We have a <strong>very high pass rate</strong> for the SAFe® POPM exam.</p>
  <h3 style="color: #01203d;">Benefits of the course and certification:</h3>
  <ul><li>Become the strategic product leader your organization needs</li><li>Master product management at scale with SAFe® best practices</li><li>Earn industry-recognized certification that opens doors to senior roles</li><li>Learn from certified SAFe® instructors with years of real-world experience</li></ul>
  <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;"><p style="margin: 0; font-weight: bold;">Save $150 when you enroll: use code <span style="color: #fa4a23; font-size: 18px;">150OFF</span> at checkout. This code expires in 30 minutes.</p></div>
  <p><a href="https://agile36.com/courses/product-owner-manager/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View dates and enroll</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>',
 '150OFF', 150.00, 'fixed'),

-- 3. SAFe Lean Portfolio Management
('assessment', 'SAFe Lean Portfolio Management', 'lean-portfolio-management',
 'Thanks for your interest in SAFe® LPM – save $150 with code 150OFF',
 'Hi {first_name},

Thank you for your interest in SAFe® Lean Portfolio Management. You now have access to the assessment.

We have a very high pass rate for the SAFe® LPM exam. Benefits of the course and certification:
• Lead strategic portfolio planning and execution at the enterprise level
• Align strategy with execution using Lean-Agile principles
• Earn the most advanced SAFe® certification for portfolio leaders
• Join executives and senior leaders driving organizational transformation

Save $150 when you enroll: use code 150OFF at checkout. This code expires in 30 minutes.

View upcoming dates: https://agile36.com/courses/lean-portfolio-management/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #01203d;">Thanks for your interest in SAFe® LPM</h2>
  <p>Hi {first_name},</p>
  <p>You now have access to the assessment. We have a <strong>very high pass rate</strong> for the SAFe® LPM exam.</p>
  <h3 style="color: #01203d;">Benefits of the course and certification:</h3>
  <ul><li>Lead strategic portfolio planning and execution at the enterprise level</li><li>Align strategy with execution using Lean-Agile principles</li><li>Earn the most advanced SAFe® certification for portfolio leaders</li><li>Join executives and senior leaders driving organizational transformation</li></ul>
  <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;"><p style="margin: 0; font-weight: bold;">Save $150 when you enroll: use code <span style="color: #fa4a23; font-size: 18px;">150OFF</span> at checkout. This code expires in 30 minutes.</p></div>
  <p><a href="https://agile36.com/courses/lean-portfolio-management/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View dates and enroll</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>',
 '150OFF', 150.00, 'fixed'),

-- 4. SAFe Agile Product Management
('assessment', 'SAFe Agile Product Management', 'agile-product-management',
 'Thanks for your interest in SAFe® APM – save $150 with code 150OFF',
 'Hi {first_name},

Thank you for your interest in SAFe® Agile Product Management. You now have access to the assessment.

We have a very high pass rate for the SAFe® APM exam. Benefits of the course and certification:
• Master customer-centric product management at scale
• Learn to build products customers actually want and need
• Earn certification that validates your product management expertise
• Gain practical tools and frameworks used by top product teams

Save $150 when you enroll: use code 150OFF at checkout. This code expires in 30 minutes.

View upcoming dates: https://agile36.com/courses/agile-product-management/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #01203d;">Thanks for your interest in SAFe® APM</h2>
  <p>Hi {first_name},</p>
  <p>You now have access to the assessment. We have a <strong>very high pass rate</strong> for the SAFe® APM exam.</p>
  <h3 style="color: #01203d;">Benefits of the course and certification:</h3>
  <ul><li>Master customer-centric product management at scale</li><li>Learn to build products customers actually want and need</li><li>Earn certification that validates your product management expertise</li><li>Gain practical tools and frameworks used by top product teams</li></ul>
  <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;"><p style="margin: 0; font-weight: bold;">Save $150 when you enroll: use code <span style="color: #fa4a23; font-size: 18px;">150OFF</span> at checkout. This code expires in 30 minutes.</p></div>
  <p><a href="https://agile36.com/courses/agile-product-management/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View dates and enroll</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>',
 '150OFF', 150.00, 'fixed'),

-- 5. SAFe Scrum Master
('assessment', 'SAFe Scrum Master', 'scrum-master',
 'Thanks for your interest in SAFe® Scrum Master – save $150 with code 150OFF',
 'Hi {first_name},

Thank you for your interest in SAFe® Scrum Master. You now have access to the assessment.

We have a very high pass rate for the SAFe® Scrum Master exam. Benefits of the course and certification:
• Lead Agile teams effectively in a SAFe® environment
• Master servant leadership and team facilitation skills
• Earn certification recognized by Fortune 500 companies
• Learn from experienced SAFe® instructors with real-world insights

Save $150 when you enroll: use code 150OFF at checkout. This code expires in 30 minutes.

View upcoming dates: https://agile36.com/courses/scrum-master/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #01203d;">Thanks for your interest in SAFe® Scrum Master</h2>
  <p>Hi {first_name},</p>
  <p>You now have access to the assessment. We have a <strong>very high pass rate</strong> for the SAFe® Scrum Master exam.</p>
  <h3 style="color: #01203d;">Benefits of the course and certification:</h3>
  <ul><li>Lead Agile teams effectively in a SAFe® environment</li><li>Master servant leadership and team facilitation skills</li><li>Earn certification recognized by Fortune 500 companies</li><li>Learn from experienced SAFe® instructors with real-world insights</li></ul>
  <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;"><p style="margin: 0; font-weight: bold;">Save $150 when you enroll: use code <span style="color: #fa4a23; font-size: 18px;">150OFF</span> at checkout. This code expires in 30 minutes.</p></div>
  <p><a href="https://agile36.com/courses/scrum-master/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View dates and enroll</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>',
 '150OFF', 150.00, 'fixed'),

-- 6. SAFe for Teams
('assessment', 'SAFe for Teams', 'safe-for-teams',
 'Thanks for your interest in SAFe® for Teams – save $150 with code 150OFF',
 'Hi {first_name},

Thank you for your interest in SAFe® for Teams. You now have access to the assessment.

We have a very high pass rate for the SAFe® for Teams exam. Benefits of the course and certification:
• Learn how Agile teams work within the SAFe® framework
• Build essential skills for high-performing Agile teams
• Earn your first SAFe® certification and advance your career
• Get hands-on experience with SAFe® practices and principles

Save $150 when you enroll: use code 150OFF at checkout. This code expires in 30 minutes.

View upcoming dates: https://agile36.com/courses/safe-for-teams/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #01203d;">Thanks for your interest in SAFe® for Teams</h2>
  <p>Hi {first_name},</p>
  <p>You now have access to the assessment. We have a <strong>very high pass rate</strong> for the SAFe® for Teams exam.</p>
  <h3 style="color: #01203d;">Benefits of the course and certification:</h3>
  <ul><li>Learn how Agile teams work within the SAFe® framework</li><li>Build essential skills for high-performing Agile teams</li><li>Earn your first SAFe® certification and advance your career</li><li>Get hands-on experience with SAFe® practices and principles</li></ul>
  <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;"><p style="margin: 0; font-weight: bold;">Save $150 when you enroll: use code <span style="color: #fa4a23; font-size: 18px;">150OFF</span> at checkout. This code expires in 30 minutes.</p></div>
  <p><a href="https://agile36.com/courses/safe-for-teams/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View dates and enroll</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>',
 '150OFF', 150.00, 'fixed'),

-- 7. SAFe DevOps
('assessment', 'SAFe DevOps', 'devops',
 'Thanks for your interest in SAFe® DevOps – save $150 with code 150OFF',
 'Hi {first_name},

Thank you for your interest in SAFe® DevOps. You now have access to the assessment.

We have a very high pass rate for the SAFe® DevOps exam. Benefits of the course and certification:
• Master continuous delivery and DevOps practices at scale
• Learn to accelerate value delivery in SAFe® enterprises
• Earn certification that combines Agile, Lean, and DevOps principles
• Gain skills that are in high demand across the tech industry

Save $150 when you enroll: use code 150OFF at checkout. This code expires in 30 minutes.

View upcoming dates: https://agile36.com/courses/devops/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #01203d;">Thanks for your interest in SAFe® DevOps</h2>
  <p>Hi {first_name},</p>
  <p>You now have access to the assessment. We have a <strong>very high pass rate</strong> for the SAFe® DevOps exam.</p>
  <h3 style="color: #01203d;">Benefits of the course and certification:</h3>
  <ul><li>Master continuous delivery and DevOps practices at scale</li><li>Learn to accelerate value delivery in SAFe® enterprises</li><li>Earn certification that combines Agile, Lean, and DevOps principles</li><li>Gain skills that are in high demand across the tech industry</li></ul>
  <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;"><p style="margin: 0; font-weight: bold;">Save $150 when you enroll: use code <span style="color: #fa4a23; font-size: 18px;">150OFF</span> at checkout. This code expires in 30 minutes.</p></div>
  <p><a href="https://agile36.com/courses/devops/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View dates and enroll</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>',
 '150OFF', 150.00, 'fixed'),

-- 8. SAFe Advanced Scrum Master
('assessment', 'SAFe Advanced Scrum Master', 'advanced-scrum-master',
 'Thanks for your interest in SAFe® Advanced Scrum Master – save $150 with code 150OFF',
 'Hi {first_name},

Thank you for your interest in SAFe® Advanced Scrum Master. You now have access to the assessment.

We have a very high pass rate for the SAFe® Advanced Scrum Master exam. Benefits of the course and certification:
• Take your Scrum Master skills to the next level with advanced techniques
• Master facilitation, coaching, and servant leadership at scale
• Earn the most advanced Scrum Master certification in SAFe®
• Learn to lead multiple teams and drive organizational change

Save $150 when you enroll: use code 150OFF at checkout. This code expires in 30 minutes.

View upcoming dates: https://agile36.com/courses/advanced-scrum-master/schedule

Best regards,
The Agile36 Team',
 '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #01203d;">Thanks for your interest in SAFe® Advanced Scrum Master</h2>
  <p>Hi {first_name},</p>
  <p>You now have access to the assessment. We have a <strong>very high pass rate</strong> for the SAFe® Advanced Scrum Master exam.</p>
  <h3 style="color: #01203d;">Benefits of the course and certification:</h3>
  <ul><li>Take your Scrum Master skills to the next level with advanced techniques</li><li>Master facilitation, coaching, and servant leadership at scale</li><li>Earn the most advanced Scrum Master certification in SAFe®</li><li>Learn to lead multiple teams and drive organizational change</li></ul>
  <div style="background: #fff3e0; border-left: 4px solid #fa4a23; padding: 15px; margin: 20px 0;"><p style="margin: 0; font-weight: bold;">Save $150 when you enroll: use code <span style="color: #fa4a23; font-size: 18px;">150OFF</span> at checkout. This code expires in 30 minutes.</p></div>
  <p><a href="https://agile36.com/courses/advanced-scrum-master/schedule" style="display: inline-block; background: #fa4a23; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View dates and enroll</a></p>
  <p>Best regards,<br>The Agile36 Team</p>
</body></html>',
 '150OFF', 150.00, 'fixed');

-- Verify: one assessment template per course that has assessments
-- SELECT template_type, course_slug, subject FROM email_templates WHERE template_type = 'assessment' ORDER BY course_slug;
