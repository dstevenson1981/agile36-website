-- Add column to store raw Apollo API response data
-- Run this in Supabase SQL Editor

-- Add JSONB column to store complete Apollo response
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS apollo_raw_data JSONB;

-- Create index for JSONB queries
CREATE INDEX IF NOT EXISTS idx_customers_apollo_raw_data ON customers USING GIN (apollo_raw_data);

-- Add comment
COMMENT ON COLUMN customers.apollo_raw_data IS 'Complete raw JSON response from Apollo API for this person';
