-- Create visitor_logs table for storing FingerprintJS visitor tracking data
-- This captures visitor fingerprints and metadata for analytics and tracking

CREATE TABLE IF NOT EXISTS visitor_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL, -- FingerprintJS visitor identifier
  timestamp TIMESTAMP WITH TIME ZONE,
  url TEXT,
  path TEXT,
  user_agent TEXT,
  language TEXT,
  platform TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  timezone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on visitor_id for tracking returning visitors
CREATE INDEX IF NOT EXISTS idx_visitor_logs_visitor_id ON visitor_logs(visitor_id);

-- Create index on path for page analytics
CREATE INDEX IF NOT EXISTS idx_visitor_logs_path ON visitor_logs(path);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_visitor_logs_created_at ON visitor_logs(created_at DESC);

-- Create index on timestamp for analytics queries
CREATE INDEX IF NOT EXISTS idx_visitor_logs_timestamp ON visitor_logs(timestamp DESC);

-- Enable Row Level Security
ALTER TABLE visitor_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to do everything
CREATE POLICY "Service role can manage visitor logs" ON visitor_logs
  FOR ALL
  USING (auth.role() = 'service_role');

-- Policy: Allow anonymous inserts (for visitor tracking)
CREATE POLICY "Allow anonymous inserts" ON visitor_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

















