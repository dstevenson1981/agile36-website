-- Weekend Courses Schedule: POPM, Leading SAFe, and Agile Product Management
-- Every Saturday-Sunday from January 2026 through May 2026
-- This script ensures these three courses are scheduled for every weekend
-- Does NOT delete existing schedules - only adds missing weekend schedules

-- POPM (SAFe Product Owner/Product Manager) - Every Weekend Jan-May 2026
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats,
  language, exam_included, status, is_weekend
)
SELECT 
  course_name, course_slug, course_type, 
  (start_date || ' ' || start_time || ' EST')::timestamp with time zone as start_date,
  (end_date || ' ' || end_time || ' EST')::timestamp with time zone as end_date,
  start_time::time, end_time::time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats,
  language, exam_included, status, is_weekend
FROM (VALUES
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-01-03', '2026-01-04', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-01-10', '2026-01-11', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-01-17', '2026-01-18', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-01-24', '2026-01-25', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-01-31', '2026-02-01', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-02-07', '2026-02-08', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-02-14', '2026-02-15', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-02-21', '2026-02-22', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-02-28', '2026-03-01', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-03-07', '2026-03-08', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-03-14', '2026-03-15', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-03-21', '2026-03-22', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-03-28', '2026-03-29', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-04-04', '2026-04-05', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-04-11', '2026-04-12', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-04-18', '2026-04-19', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-04-25', '2026-04-26', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-05-02', '2026-05-03', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-05-09', '2026-05-10', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-05-16', '2026-05-17', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-05-23', '2026-05-24', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Product Owner/Product Manager', 'product-owner-manager', 'SAFe Product', '2026-05-30', '2026-05-31', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 525, 1050, 'USD', 25, 25, 'English', true, 'active', true)
) AS new_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats,
  language, exam_included, status, is_weekend
)
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules cs
  WHERE cs.course_slug = new_schedules.course_slug
    AND DATE(cs.start_date) = new_schedules.start_date::date
    AND DATE(cs.end_date) = new_schedules.end_date::date
);

-- Leading SAFe - Every Weekend Jan-May 2026
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats,
  language, exam_included, status, is_weekend
)
SELECT 
  course_name, course_slug, course_type, start_date::timestamp with time zone, end_date::timestamp with time zone, start_time::time, end_time::time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats,
  language, exam_included, status, is_weekend
FROM (VALUES
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-01-03', '2026-01-04', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-01-10', '2026-01-11', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-01-17', '2026-01-18', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-01-24', '2026-01-25', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-01-31', '2026-02-01', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-02-07', '2026-02-08', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-02-14', '2026-02-15', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-02-21', '2026-02-22', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-02-28', '2026-03-01', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-03-07', '2026-03-08', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-03-14', '2026-03-15', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-03-21', '2026-03-22', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-03-28', '2026-03-29', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-04-04', '2026-04-05', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-04-11', '2026-04-12', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-04-18', '2026-04-19', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-04-25', '2026-04-26', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-05-02', '2026-05-03', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-05-09', '2026-05-10', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-05-16', '2026-05-17', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-05-23', '2026-05-24', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true),
  ('Leading SAFe', 'leading-safe', 'SAFe Agilist', '2026-05-30', '2026-05-31', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 555, 1110, 'USD', 25, 25, 'English', true, 'active', true)
) AS new_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats,
  language, exam_included, status, is_weekend
)
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules cs
  WHERE cs.course_slug = new_schedules.course_slug
    AND DATE(cs.start_date) = new_schedules.start_date::date
    AND DATE(cs.end_date) = new_schedules.end_date::date
);

-- Agile Product Management - Every Weekend Jan-May 2026
INSERT INTO course_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats,
  language, exam_included, status, is_weekend
)
SELECT 
  course_name, course_slug, course_type, start_date::timestamp with time zone, end_date::timestamp with time zone, start_time::time, end_time::time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats,
  language, exam_included, status, is_weekend
FROM (VALUES
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-01-03', '2026-01-04', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-01-10', '2026-01-11', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-01-17', '2026-01-18', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-01-24', '2026-01-25', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-01-31', '2026-02-01', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-02-07', '2026-02-08', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-02-14', '2026-02-15', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-02-21', '2026-02-22', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-02-28', '2026-03-01', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-03-07', '2026-03-08', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-03-14', '2026-03-15', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-03-21', '2026-03-22', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-03-28', '2026-03-29', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-04-04', '2026-04-05', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-04-11', '2026-04-12', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-04-18', '2026-04-19', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-04-25', '2026-04-26', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-05-02', '2026-05-03', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-05-09', '2026-05-10', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-05-16', '2026-05-17', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Deadra Stevenson', '/Deadra.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-05-23', '2026-05-24', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Marcus Ball', '/marcus.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true),
  ('SAFe Agile Product Management', 'agile-product-management', 'SAFe APM', '2026-05-30', '2026-05-31', '09:00:00', '14:00:00', 'EST', 'morning', 'live-virtual', '02 days', 'Joe Puoci', '/Joe.jpeg', 950, 1900, 'USD', 25, 25, 'English', true, 'active', true)
) AS new_schedules (
  course_name, course_slug, course_type, start_date, end_date, start_time, end_time,
  timezone, time_slot, format, duration, instructor_name, instructor_image,
  price, original_price, currency, seats_available, total_seats,
  language, exam_included, status, is_weekend
)
WHERE NOT EXISTS (
  SELECT 1 FROM course_schedules cs
  WHERE cs.course_slug = new_schedules.course_slug
    AND DATE(cs.start_date) = new_schedules.start_date::date
    AND DATE(cs.end_date) = new_schedules.end_date::date
);

-- Verify weekend schedules were created
SELECT 
  course_name,
  course_slug,
  start_date,
  end_date,
  is_weekend,
  CASE 
    WHEN EXTRACT(DOW FROM start_date) IN (0, 6) THEN 'Weekend'
    ELSE 'Weekday'
  END as day_type,
  TO_CHAR(start_date, 'Day') as day_name
FROM course_schedules 
WHERE course_slug IN ('product-owner-manager', 'leading-safe', 'agile-product-management')
  AND start_date >= '2026-01-01'
  AND start_date <= '2026-05-31'
  AND is_weekend = true
ORDER BY start_date, course_slug;
