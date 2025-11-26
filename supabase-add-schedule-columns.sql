-- Add schedule information columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS schedule_date TEXT,
ADD COLUMN IF NOT EXISTS schedule_time TEXT,
ADD COLUMN IF NOT EXISTS duration TEXT,
ADD COLUMN IF NOT EXISTS timezone TEXT;

-- Add index on schedule_date for filtering
CREATE INDEX IF NOT EXISTS idx_orders_schedule_date ON orders(schedule_date);



