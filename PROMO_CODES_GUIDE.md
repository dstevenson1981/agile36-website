# Promo Codes System Guide

## ✅ What's Been Set Up

### 1. **Database Table** (`supabase-promo-codes-table.sql`)
A flexible table to manage all your promo codes with:
- Fixed dollar discounts (e.g., $150 OFF)
- Percentage discounts (e.g., 25% OFF)
- Expiration dates
- Usage limits
- Active/inactive status

### 2. **API Endpoint** (`/api/validate-promo-code`)
Secure backend validation that checks:
- Code exists
- Code is active
- Not expired
- Under usage limit

### 3. **Checkout Integration**
Updated your checkout flow to:
- Accept any promo code
- Validate in real-time
- Show clear error messages
- Calculate discounts automatically

## 🚀 How to Set Up

### Step 1: Create the Table in Supabase
1. Go to your Supabase project dashboard
2. Click on "SQL Editor"
3. Copy and paste the contents of `supabase-promo-codes-table.sql`
4. Click "Run"

This creates the table and adds two initial codes:
- **150OFF** - $150 off (Black Friday)
- **SAVE25** - 25% off

### Step 2: Add Your Service Role Key
Make sure you have this in your `.env.local` file:
```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

You can find this in Supabase Dashboard → Project Settings → API → service_role key

## 📝 How to Add New Promo Codes

### Option 1: Via Supabase Dashboard
1. Go to Supabase → Table Editor → promo_codes
2. Click "Insert row"
3. Fill in:
   - **code**: The promo code (e.g., "NEWYEAR100")
   - **discount_type**: "fixed" or "percentage"
   - **discount_value**: Amount (e.g., 100 for $100 or 20 for 20%)
   - **description**: What it's for
   - **expires_at**: When it expires (optional)
   - **usage_limit**: Max uses (optional, leave null for unlimited)
   - **active**: true

### Option 2: Via SQL
Run this in SQL Editor:

**Fixed Dollar Amount:**
```sql
INSERT INTO promo_codes (code, discount_type, discount_value, description, expires_at)
VALUES ('NEWYEAR100', 'fixed', 100, 'New Year - $100 Off', '2025-01-15 23:59:59');
```

**Percentage Discount:**
```sql
INSERT INTO promo_codes (code, discount_type, discount_value, description, expires_at, usage_limit)
VALUES ('SPRING20', 'percentage', 20, 'Spring Sale - 20% Off', '2025-04-30 23:59:59', 500);
```

## 🛠️ How to Manage Codes

### Deactivate a Code
```sql
UPDATE promo_codes SET active = false WHERE code = '150OFF';
```

### Reactivate a Code
```sql
UPDATE promo_codes SET active = true WHERE code = '150OFF';
```

### Extend Expiration Date
```sql
UPDATE promo_codes 
SET expires_at = '2025-01-31 23:59:59' 
WHERE code = '150OFF';
```

### Check Usage Statistics
```sql
SELECT code, usage_count, usage_limit, active, expires_at 
FROM promo_codes 
ORDER BY created_at DESC;
```

### Delete a Code
```sql
DELETE FROM promo_codes WHERE code = 'OLDCODE';
```

## 🎯 Examples of Promo Codes You Can Create

1. **Flash Sale** - $200 off, expires in 24 hours
```sql
INSERT INTO promo_codes (code, discount_type, discount_value, description, expires_at, usage_limit)
VALUES ('FLASH200', 'fixed', 200, 'Flash Sale', NOW() + INTERVAL '24 hours', 50);
```

2. **First 100 Customers** - 30% off
```sql
INSERT INTO promo_codes (code, discount_type, discount_value, description, usage_limit)
VALUES ('FIRST100', 'percentage', 30, 'First 100 Customers', 100);
```

3. **Partner Discount** - $75 off, unlimited uses
```sql
INSERT INTO promo_codes (code, discount_type, discount_value, description)
VALUES ('PARTNER75', 'fixed', 75, 'Partner Discount');
```

## 💡 Tips

1. **Test codes** in a test environment first
2. **Monitor usage** regularly via the statistics query
3. **Set reasonable limits** to prevent abuse
4. **Use clear, memorable codes** (e.g., BLACKFRIDAY, SAVE150)
5. **Communicate expiration** dates clearly to customers
6. **Track which codes** perform best for future campaigns

## 🔄 Applying Same Changes to Other Checkout Pages

The promo code functionality has been fully integrated into the Leading SAFe checkout page. To add it to other checkout pages, you'll need to:

1. Copy the state variables
2. Copy the validation functions
3. Update the UI section
4. Update the price calculation logic

Let me know if you want me to update all checkout pages!



















