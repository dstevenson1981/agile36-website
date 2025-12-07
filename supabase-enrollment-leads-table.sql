- Create enrollment_leads table for storing Basic Details form data
-- This captures enrollment information when users complete step 1 of checkout
-- even if they don't complete payment

CREATE TABLE IF NOT EXISTS enrollment_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  schedule_id TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  course_name TEXT,
  enrolling_for TEXT DEFAULT 'myself', -- 'myself' or 'someoneElse'
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  alternative_contact TEXT,
  referral_code TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'abandoned'
  order_id UUID REFERENCES orders(id), -- Link to order if payment completed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for customer lookup
CREATE INDEX IF NOT EXISTS idx_enrollment_leads_email ON enrollment_leads(email);

-- Create index on schedule_id
CREATE INDEX IF NOT EXISTS idx_enrollment_leads_schedule_id ON enrollment_leads(schedule_id);

-- Create index on course_slug
CREATE INDEX IF NOT EXISTS idx_enrollment_leads_course_slug ON enrollment_leads(course_slug);

-- Create index on status
CREATE INDEX IF NOT EXISTS idx_enrollment_leads_status ON enrollment_leads(status);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_enrollment_leads_created_at ON enrollment_leads(created_at DESC);

-- Enable Row Level Security
ALTER TABLE enrollment_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to do everything
CREATE POLICY "Service role can manage enrollment leads" ON enrollment_leads
  FOR ALL
  USING (auth.role() = 'service_role');

-- Policy: Allow anonymous inserts (for the checkout form)
CREATE POLICY "Allow anonymous inserts" ON enrollment_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

