# Course Schedule Setup Guide

This guide will walk you through the steps to set up the `course_schedules` table in your Supabase project and populate it with actual course data.

## Step 1: Create the `course_schedules` table

1. Go to your Supabase project dashboard.
2. Navigate to the "SQL Editor" section.
3. Click on "New query" or open an existing one.
4. Copy the content from `supabase-course-schedules.sql` and paste it into the SQL editor.
5. Click "Run" to execute the query. This will create the `course_schedules` table with all necessary columns including:
   - Course information (name, slug, type)
   - Date and time details (start/end dates, times, timezone, time slot)
   - Instructor information (name, image)
   - Pricing (price, original_price, currency)
   - Availability (seats, status)
   - Additional fields (format, duration, language, exam_included, etc.)
6. The query will also enable Row Level Security (RLS) with a policy for public read access.

## Step 2: Add Course Schedule Data

1. In the same Supabase SQL Editor, open a new query.
2. Copy the content from `supabase-course-schedules-data.sql` and paste it into the SQL editor.
3. Click "Run" to execute the query. This will insert 15 course schedules for "Leading SAFe" from November 2025 to March 2026, including:
   - Dates from the provided Excel data
   - Instructors: Joe Puoci and Deadra Stevenson
   - Pricing: $555.55 (sale) / $899.00 (original)
   - Time: 9 AM - 5 PM EST
   - Duration: 2 Days
   - Mix of weekday and weekend batches

## Step 3: Verify Data (Optional)

1. Go to the "Table Editor" section in your Supabase dashboard.
2. Select the `course_schedules` table.
3. You should see 15 course schedules with all the details from the Excel data.
4. Verify that:
   - Dates range from November 2025 to March 2026
   - Instructors are correctly assigned (Joe Puoci and Deadra Stevenson)
   - Prices are set to $555.55 (sale) and $899.00 (original)
   - Time slots are marked as "morning"
   - Weekend batches are properly flagged

## Step 4: Update Environment Variables

Ensure your `.env.local` file in your Next.js project has the following environment variables configured:

```
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
```
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are for client-side access.
- `SUPABASE_SERVICE_ROLE_KEY` is crucial for server-side API routes (like `/api/course-schedules`) to bypass RLS and perform privileged operations.

## Step 5: Restart Your Development Server

After making database changes and updating environment variables, restart your Next.js development server to ensure all changes are picked up:

```bash
npm run dev
```

## Step 6: Test the Schedule Page

1. Navigate to the Leading SAFe course page (`/courses/leading-safe`)
2. Click "View Schedules" or "View Schedules" button
3. You should be redirected to `/courses/leading-safe/schedule`
4. The page should display:
   - Filter buttons (This Month, Next Month, Weekdays, Weekend, Time Slot)
   - Results count
   - Left sidebar with discount banner and reviews
   - Course schedule cards with:
     - Time slot badges (Morning/Afternoon/Evening)
     - Dates and times
     - Instructor profile pictures
     - SAFe badges
     - Download curriculum link
     - Quantity selector
     - Pricing with original and sale prices
     - Enroll Now button

## Managing Course Schedules

You can add, update, or remove course schedules directly in Supabase:
- Use the Table Editor to manually add/edit schedules
- Or use SQL queries to bulk insert/update schedules
- The schedule page will automatically fetch and display active schedules

## Database Schema

The `course_schedules` table includes the following key fields:
- `course_slug`: Identifier for the course (e.g., 'leading-safe')
- `start_date` / `end_date`: Course dates
- `start_time` / `end_time`: Course times
- `timezone`: Timezone (default: 'America/New_York')
- `time_slot`: Morning, Afternoon, or Evening
- `instructor_name` / `instructor_image`: Instructor details
- `price` / `original_price`: Current and original pricing
- `seats_available`: Number of available seats
- `is_weekend`: Boolean flag for weekend batches
- `is_best_deal`: Boolean flag for "BEST DEAL" badge
- `status`: active, full, cancelled, or completed
