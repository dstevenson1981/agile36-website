-- Add course_slug and total_spend columns to customers table
-- Run this in Supabase SQL Editor

-- Add course_slug column if it doesn't exist
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS course_slug TEXT;

-- Add total_spend column if it doesn't exist
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS total_spend NUMERIC;

-- Create index for course_slug
CREATE INDEX IF NOT EXISTS idx_customers_course_slug ON customers(course_slug);
