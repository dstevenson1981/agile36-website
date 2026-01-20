# Customer Import Script

This script imports customer and purchase data from `public/stripe_customers.csv` into Supabase.

## Prerequisites

1. Python 3.8+
2. Supabase credentials (loaded from .env.local)
3. `public/stripe_customers.csv` file (already exists in the project)

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set environment variables:
```bash
export NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

Or create a `.env` file:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

3. Create tables in Supabase:
   - Open Supabase SQL Editor
   - Run the SQL from `create_tables.sql`

## Usage

1. The script automatically uses `public/stripe_customers.csv` (already in the project)
2. Run the import:
```bash
python import_customers.py
```

## What it does

1. **Reads CSV**: Filters out rows with NULL/empty `courseSlug (metadata)`
2. **Groups by email**: Aggregates customer data (totals, dates)
3. **Creates customers**: One row per unique email
4. **Creates purchases**: One row per course purchase
5. **Handles duplicates**: Upserts customers, skips duplicate purchases

## Output

The script will print:
- Progress updates
- Summary statistics
- Any errors encountered

## Tables Created

### `customers`
- `email` (PRIMARY KEY)
- `name`, `stripe_customer_id`
- `total_spend`, `payment_count`
- `first_purchase_date`, `last_purchase_date`
- `company`, `title`, `linkedin_url` (for future enrichment)
- `enriched` (flag for data enrichment status)

### `purchases`
- `id` (UUID PRIMARY KEY)
- `customer_email` (FOREIGN KEY → customers.email)
- `course_slug`
- `purchase_date`
- `stripe_customer_id`

## Notes

- The script uses `SUPABASE_SERVICE_ROLE_KEY` for admin operations
- Duplicate purchases (same email, course, date) are skipped
- Customer data is aggregated (totals summed, dates min/max)
- All timestamps are stored in UTC
