-- Create course_schedules table for storing course schedule information
-- This table will store all course schedules that can be managed through Supabase

CREATE TABLE IF NOT EXISTS course_schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_name TEXT NOT NULL,
  course_slug TEXT NOT NULL, -- e.g., 'leading-safe', 'scrum-master'
  course_type TEXT, -- e.g., 'Leading SAFe'
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  start_time TIME NOT NULL, -- e.g., '09:00:00'
  end_time TIME NOT NULL, -- e.g., '17:00:00'
  timezone TEXT DEFAULT 'America/New_York', -- Timezone for the course
  time_slot TEXT CHECK (time_slot IN ('morning', 'afternoon', 'evening')), -- Morning, Afternoon, Evening
  format TEXT NOT NULL CHECK (format IN ('live-virtual', 'in-person', 'self-paced')), -- Course delivery format
  duration TEXT, -- e.g., '2 Days', '3 Days'
  instructor_name TEXT,
  instructor_image TEXT, -- URL to instructor profile image
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2), -- Original price before discount
  currency TEXT DEFAULT 'USD',
  seats_available INTEGER,
  total_seats INTEGER,
  location TEXT, -- For in-person courses
  meeting_link TEXT, -- For virtual courses
  registration_url TEXT, -- Registration link
  language TEXT DEFAULT 'English',
  exam_included BOOLEAN DEFAULT true,
  curriculum_url TEXT, -- Link to download curriculum
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'full', 'cancelled', 'completed')),
  description TEXT,
  is_best_deal BOOLEAN DEFAULT false, -- Flag for "BEST DEAL" badge
  is_weekend BOOLEAN DEFAULT false, -- Flag for weekend batch
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on course_slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_course_schedules_slug ON course_schedules(course_slug);

-- Create index on start_date for filtering by date
CREATE INDEX IF NOT EXISTS idx_course_schedules_start_date ON course_schedules(start_date);

-- Create index on status for filtering active courses
CREATE INDEX IF NOT EXISTS idx_course_schedules_status ON course_schedules(status);

-- Enable Row Level Security
ALTER TABLE course_schedules ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to course_schedules"
  ON course_schedules
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow authenticated users to insert (for admin)
CREATE POLICY "Allow authenticated users to insert course_schedules"
  ON course_schedules
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update (for admin)
CREATE POLICY "Allow authenticated users to update course_schedules"
  ON course_schedules
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to delete (for admin)
CREATE POLICY "Allow authenticated users to delete course_schedules"
  ON course_schedules
  FOR DELETE
  TO authenticated
  USING (true);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_course_schedules_updated_at
    BEFORE UPDATE ON course_schedules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

