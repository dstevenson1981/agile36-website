# Supabase Confirmation Email Setup

This guide explains how to use the custom confirmation email template when users register for an Agile36 account.

## Template File

The template is in `supabase-confirm-signup-email-template.html`. It includes:

- **Agile36 logo** (`agile36-logo-final.png`) at the top
- **SAFe Silver Partner badge** from Scaled Agile
- **Client logos** (Amazon, Apple, Accenture, Tesla, Netflix, Disney)
- **Value propositions** (competitive pricing, dedicated support, etc.)
- **Contact information** (support email, phone)

All images use absolute URLs (`https://www.agile36.com/...`) so they load correctly in email clients.

## How to Apply in Supabase

1. **Open your Supabase project** → [Dashboard](https://supabase.com/dashboard)

2. **Go to Authentication** → **Email Templates**

3. **Select "Confirm signup"** template

4. **Copy the contents** of `supabase-confirm-signup-email-template.html` into the HTML body

5. **Set the subject line** (e.g. `Confirm your Agile36 account`)

6. **Save** the template

## Template Variables (Supabase)

The template uses these variables that Supabase replaces automatically:

| Variable | Description |
|----------|-------------|
| `{{ .ConfirmationURL }}` | Link user clicks to confirm their email |
| `{{ .Data.full_name }}` | User's full name (if provided at signup) |
| `{{ .Email }}` | User's email address |
| `{{ .Token }}` | 6-digit OTP (if using magic link) |

## Required Assets

Ensure these files exist in your `public/` folder and are deployed:

- `agile36-logo-final.png` – main logo
- `Silver.png` – Scaled Agile Silver Partner badge
- `logo-amazon.svg`, `apple-11.svg`, `accenture-6.svg`, `tesla-9.svg`, `netflix-3.svg`, `disney-2.svg` – client logos

All are served from `https://www.agile36.com/` in production.
