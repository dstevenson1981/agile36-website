-- Create payments table for individual payment transactions
-- Run this in Supabase SQL Editor before running import_payments.py

-- Drop table if it exists (uncomment if you want to start fresh)
-- DROP TABLE IF EXISTS payments CASCADE;

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_email TEXT REFERENCES customers(email) ON DELETE CASCADE,
    stripe_customer_id TEXT,
    amount NUMERIC NOT NULL,
    course_slug TEXT,
    course_description TEXT,
    payment_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(stripe_customer_id, payment_date, amount, course_slug)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_customer_email ON payments(customer_email);
CREATE INDEX IF NOT EXISTS idx_payments_course_slug ON payments(course_slug);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_customer_id ON payments(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);

-- Add comment for documentation
COMMENT ON TABLE payments IS 'Individual payment transactions linked to customers';
