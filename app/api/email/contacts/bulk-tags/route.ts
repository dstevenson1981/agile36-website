import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Bulk add/remove tags from multiple contacts
export async function POST(request: NextRequest) {
  try {
    const { contactIds, tag, action } = await request.json();

    if (!contactIds || !Array.isArray(contactIds) || contactIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Contact IDs array is required' },
        { status: 400 }
      );
    }

    if (!tag || !tag.trim()) {
      return NextResponse.json(
        { success: false, error: 'Tag is required' },
        { status: 400 }
      );
    }

    if (!action || !['add', 'remove'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Action must be "add" or "remove"' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Fetch all contacts
    const { data: contacts, error: fetchError } = await supabase
      .from('email_contacts')
      .select('id, tags')
      .in('id', contactIds);

    if (fetchError) {
      console.error('Error fetching contacts:', fetchError);
      return NextResponse.json(
        { success: false, error: `Failed to fetch contacts: ${fetchError.message}` },
        { status: 500 }
      );
    }

    if (!contacts || contacts.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No contacts found' },
        { status: 404 }
      );
    }

    const tagToProcess = tag.trim();
    let updatedCount = 0;
    const errors: string[] = [];

    // Update each contact
    for (const contact of contacts) {
      const currentTags = contact.tags || [];
      let updatedTags: string[];

      if (action === 'add') {
        if (currentTags.includes(tagToProcess)) {
          continue; // Skip if tag already exists
        }
        updatedTags = [...currentTags, tagToProcess];
      } else {
        // remove
        updatedTags = currentTags.filter((t: string) => t !== tagToProcess);
        if (updatedTags.length === currentTags.length) {
          continue; // Skip if tag doesn't exist
        }
      }

      const { error: updateError } = await supabase
        .from('email_contacts')
        .update({ tags: updatedTags.length > 0 ? updatedTags : null })
        .eq('id', contact.id);

      if (updateError) {
        errors.push(`Contact ${contact.id}: ${updateError.message}`);
      } else {
        updatedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      updated: updatedCount,
      total: contacts.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('Error in bulk tags API:', error);
    return NextResponse.json(
      { success: false, error: `Failed to update tags: ${error.message}` },
      { status: 500 }
    );
  }
}
