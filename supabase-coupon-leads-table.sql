-- Create table for storing coupon lead email addresses
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS coupon_leads (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  course TEXT,
  coupon_code TEXT DEFAULT '100OFF',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email, coupon_code, course)
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_coupon_leads_email ON coupon_leads(email);

-- Create an index on course for filtering by course
CREATE INDEX IF NOT EXISTS idx_coupon_leads_course ON coupon_leads(course);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_coupon_leads_created_at ON coupon_leads(created_at DESC);

-- Enable Row Level Security (RLS) - only allow inserts, not reads
ALTER TABLE coupon_leads ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert emails (for the API)
CREATE POLICY "Allow public inserts" ON coupon_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Create a policy for authenticated users to read (if you want to view leads later)
-- CREATE POLICY "Allow authenticated reads" ON coupon_leads
--   FOR SELECT
--   TO authenticated
--   USING (true);

