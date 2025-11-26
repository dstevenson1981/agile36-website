# How to Create the Orders Table in Supabase

## Step-by-Step Instructions

### 1. Open Supabase SQL Editor
1. Go to your Supabase project: https://supabase.com/dashboard
2. Click on your project
3. In the left sidebar, click **"SQL Editor"**
4. Click **"New query"** button

### 2. Copy and Paste This SQL Code

Copy the ENTIRE contents of `supabase-orders-table.sql` and paste it into the SQL Editor:

```sql
-- Create orders table for storing Stripe payment information
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_intent_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT,
  schedule_id TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  course_name TEXT NOT NULL,
  plan TEXT NOT NULL, -- 'basic' or 'pro'
  quantity INTEGER NOT NULL DEFAULT 1,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  alternative_contact TEXT,
  enrolling_for TEXT DEFAULT 'myself',
  payment_status TEXT NOT NULL,
  promo_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on payment_intent_id for quick lookups
CREATE INDEX IF NOT EXISTS idx_orders_payment_intent_id ON orders(payment_intent_id);

-- Create index on customer_email for customer lookup
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

-- Create index on schedule_id
CREATE INDEX IF NOT EXISTS idx_orders_schedule_id ON orders(schedule_id);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to do everything
CREATE POLICY "Service role can manage orders" ON orders
  FOR ALL
  USING (auth.role() = 'service_role');

-- Policy: Allow users to read their own orders
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT
  USING (auth.uid()::text = customer_email OR auth.role() = 'service_role');
```

### 3. Run the SQL
1. Click the **"Run"** button (or press `Ctrl+Enter` / `Cmd+Enter`)
2. You should see "Success. No rows returned" or similar success message

### 4. Verify the Table Was Created
1. Go to **"Table Editor"** in the left sidebar
2. You should see a new table called **"orders"**
3. Click on it to see all the columns

## What This SQL Does

1. **Creates the `orders` table** with all necessary columns
2. **Creates indexes** for fast lookups on common fields
3. **Enables Row Level Security (RLS)** for data protection
4. **Creates security policies** so only authorized access is allowed

## Alternative: Quick Copy Command

If you're on Mac/Linux, you can also copy the file contents directly:

```bash
cat supabase-orders-table.sql | pbcopy  # Mac
# or
cat supabase-orders-table.sql | xclip -selection clipboard  # Linux
```

Then just paste into Supabase SQL Editor!



