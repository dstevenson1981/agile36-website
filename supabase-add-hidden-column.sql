-- Add hidden column to course_schedules
-- Hidden schedules are not displayed on schedule listing pages but remain accessible via direct checkout URL

ALTER TABLE course_schedules 
ADD COLUMN IF NOT EXISTS hidden BOOLEAN DEFAULT false;

-- Add index for filtering hidden schedules
CREATE INDEX IF NOT EXISTS idx_course_schedules_hidden ON course_schedules(hidden);

COMMENT ON COLUMN course_schedules.hidden IS 'When true, schedule is not shown on website schedule pages but can be accessed via direct checkout URL';
