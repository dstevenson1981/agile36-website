    -- Add Release Train Engineer Course - Jan 19-21, 2026
    -- Instructor: Deadra Stevenson
    -- Price: $950
    -- This course will not be shown on the website but will be accessible via direct URL

    INSERT INTO course_schedules (
    course_name,
    course_slug,
    course_type,
    start_date,
    end_date,
    start_time,
    end_time,
    timezone,
    time_slot,
    format,
    duration,
    instructor_name,
    instructor_image,
    price,
    original_price,
    currency,
    seats_available,
    total_seats,
    language,
    exam_included,
    status,
    is_weekend
    )
    VALUES (
    'SAFe Release Train Engineer',
    'release-train-engineer',
    'SAFe',
    '2026-01-19 09:00:00-05:00',
    '2026-01-21 14:00:00-05:00',
    '09:00:00',
    '14:00:00',
    'America/New_York',
    'morning',
    'live-virtual',
    '03 days',
    'Deadra Stevenson',
    '/Deadra.jpeg',
    950.00,
    1900.00,
    'USD',
    25,
    25,
    'English',
    true,
    'active',
    false
    )
    ON CONFLICT DO NOTHING
    RETURNING id, course_name, course_slug, start_date, end_date, price;

    -- After running this SQL, use the returned schedule ID to create the direct checkout URL:
    -- Format: /courses/release-train-engineer/schedule/checkout?schedule={schedule_id}&course=release-train-engineer&quantity=1
    -- Example: /courses/release-train-engineer/schedule/checkout?schedule=123&course=release-train-engineer&quantity=1

    -- If you need to find the schedule ID later, run this query:
    -- SELECT id, course_name, start_date, end_date, price 
    -- FROM course_schedules 
    -- WHERE course_slug = 'release-train-engineer' 
    --   AND start_date = '2026-01-19 09:00:00-05:00';
