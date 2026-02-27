# Agile36 Account Management System

## Overview
A learner portal where customers can manage their profile, view orders/receipts, and access practice exams (upsell). Designed to be distinct from competitors like Axis (axis.simpliaxis.com).

## Design Direction (Different from Axis)
- **Axis**: Top nav bar, horizontal cards, red accent
- **Agile36**: Sidebar navigation, card-based dashboard, orange (#fa4a23) + navy (#01203d) brand colors, softer background
- **Layout**: Left sidebar for nav (Profile, Orders, Practice Exams, etc.) vs Axis's top nav

## Features

### 1. Profile
- Name, email, phone
- Company (optional)
- Profile completion progress (like Axis "35% Completed")
- Editable after signup

### 2. Orders & Receipts
- List of past purchases (from `orders` table)
- Download receipt (Stripe receipt_url when available)
- Course name, date, amount, status

### 3. Practice Exams (Upsell)
- Show when user has purchased a course that includes practice exams (Pro plan)
- Or show as "Upgrade to access" for Basic plan purchasers
- Placeholder for future integration

### 4. Auth
- Supabase Auth: email + password, or magic link
- Link existing orders by email (customer_email in orders)

## Database

### profiles (new)
- id, user_id (auth.users), name, email, phone, company, avatar_url
- profile_completion_percent
- created_at, updated_at

### orders (existing)
- Already has customer_email, course_name, amount, etc.
- Lookup by email when user logs in

## Routes
- `/account` - Dashboard home (redirect to login if not logged in)
- `/account/login` - Sign in (email/password or magic link)
- `/account/signup` - Create account
- `/account/profile` - Edit profile
- `/account/orders` - Orders & receipts
- `/account/practice-exams` - Practice exams (upsell placeholder)

## Setup

1. **Run SQL in Supabase**
   - Execute `supabase-account-profiles.sql` in Supabase SQL Editor
   - Enables Auth in Supabase Dashboard if not already

2. **Environment variables**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `STRIPE_SECRET_KEY` (for receipt API)

3. **Supabase Auth**
   - Enable Email auth in Supabase Dashboard > Authentication > Providers
   - Optional: disable "Confirm email" for faster testing
