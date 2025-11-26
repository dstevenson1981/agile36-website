# Setup Instructions for Course Schedules

## Error: "relation course_schedules does not exist"

This error means you need to **create the table first** before inserting data.

## Step-by-Step Setup:

### STEP 1: Create the Table
1. Go to your Supabase SQL Editor
2. Open a **new query**
3. Copy and paste the **entire contents** of `supabase-course-schedules.sql`
4. Click **"Run"** or press Cmd/Ctrl + Enter
5. You should see "Success. No rows returned" - this is correct!

### STEP 2: Insert the Course Data
1. In the same SQL Editor, open a **new query** (or clear the previous one)
2. Copy and paste the **entire contents** of `supabase-course-schedules-data.sql`
3. Click **"Run"** or press Cmd/Ctrl + Enter
4. You should see "Success. 15 rows inserted" or similar

### STEP 3: Verify
1. Go to **Table Editor** in Supabase
2. Click on `course_schedules` table
3. You should see 15 rows of course data

### STEP 4: Restart Dev Server
```bash
npm run dev
```

Then navigate to `/courses/leading-safe` and click "View Schedules" to see all 15 dates!

## Files to Run (in order):
1. ✅ `supabase-course-schedules.sql` - Creates the table
2. ✅ `supabase-course-schedules-data.sql` - Inserts 15 course dates

## If you still get errors:
- Make sure you're running the files in the correct order
- Check that the first file completed successfully before running the second
- Verify your Supabase project is active and connected



