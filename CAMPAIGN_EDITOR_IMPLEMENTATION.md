# Campaign Editor Implementation - Summary

## Overview
Fixed the campaign duplication workflow to allow editing recipients and campaign details before sending.

## Changes Made

### 1. Database Structure
**File**: `create-campaign-recipients-table.sql`
- Created `email_campaign_recipients` junction table
- Tracks which contacts are recipients for each campaign
- Stores `sent_at`, `opened_at`, `clicked_at` timestamps
- Created `campaigns_with_stats` view for analytics

### 2. Campaign Duplication
**File**: `app/api/email/campaigns/[id]/duplicate/route.ts`
- Updated to handle copy numbering (Copy, Copy 2, Copy 3, etc.)
- Always creates duplicate as 'draft' status
- Returns new campaign ID for redirect

### 3. Campaign Editor Page
**File**: `app/admin/email/campaigns/edit/[id]/page.tsx`
- Full-featured campaign editor
- Left column: Edit campaign name, subject, HTML content, plain text
- Right column: Recipient selection with:
  - Tag filter chips
  - Search functionality
  - Contact list with checkboxes
  - Select All / Deselect All
  - Shows selected count
- Action buttons: Save as Draft, Send Now, Cancel

### 4. API Endpoints

#### `GET /api/email/campaigns/[id]`
- Fetch single campaign details

#### `PUT /api/email/campaigns/[id]`
- Update campaign name, subject, content, status

#### `GET /api/email/campaigns/[id]/recipients`
- Get list of recipient contact IDs for a campaign

#### `PUT /api/email/campaigns/[id]/recipients`
- Set recipients for a campaign (replaces existing)
- Body: `{ contactIds: number[] }`

### 5. Updated Send Campaign Route
**File**: `app/api/email/send-campaign/route.ts`
- **Priority 1**: Uses recipients from `email_campaign_recipients` table if set
- **Priority 2**: Falls back to tag filter logic (backward compatibility)
- Updates `sent_at` timestamp in `email_campaign_recipients` when emails are sent

### 6. Admin Page Updates
**File**: `app/admin/email/page.tsx`
- "Duplicate" button now redirects to editor page
- Added "Edit" button for draft campaigns
- Both buttons navigate to `/admin/email/campaigns/edit/[id]`

## User Flow

### Duplicating a Campaign:
1. User clicks "Duplicate" on any campaign
2. System creates a copy with "(Copy)" or "(Copy N)" suffix
3. Redirects to editor page: `/admin/email/campaigns/edit/[new_id]`
4. User can:
   - Edit campaign name, subject, content
   - Select new recipients using tag filters and checkboxes
   - Save as draft or send immediately

### Editing a Draft Campaign:
1. User clicks "Edit" on a draft campaign
2. Redirects to editor page: `/admin/email/campaigns/edit/[id]`
3. User can modify everything and select recipients
4. Save as draft or send

### Sending a Campaign:
1. User selects recipients in editor
2. Clicks "Send Now"
3. System:
   - Saves campaign details
   - Saves recipient list to `email_campaign_recipients`
   - Sends emails via SendGrid
   - Updates `sent_at` timestamps in junction table
   - Updates campaign status to 'sent'

## Database Setup Required

Run this SQL in Supabase:

```sql
-- See: create-campaign-recipients-table.sql
```

This creates:
- `email_campaign_recipients` table
- Indexes for performance
- `campaigns_with_stats` view

## Features

✅ Duplicate campaigns with automatic copy numbering
✅ Edit campaign details (name, subject, content)
✅ Select recipients using tag filters
✅ Select recipients using checkboxes
✅ Search contacts
✅ See selected recipient count
✅ Save as draft
✅ Send immediately
✅ Track sent status in junction table
✅ Backward compatible with tag filter logic

## Testing Checklist

- [ ] Run SQL to create junction table
- [ ] Duplicate a campaign - should redirect to editor
- [ ] Edit campaign name and content
- [ ] Filter contacts by tags
- [ ] Select/deselect contacts
- [ ] Save as draft - should save recipients
- [ ] Send campaign - should send to selected recipients
- [ ] Verify `sent_at` is updated in junction table
- [ ] Edit existing draft campaign
- [ ] Verify backward compatibility (campaigns without recipients use tag filters)
