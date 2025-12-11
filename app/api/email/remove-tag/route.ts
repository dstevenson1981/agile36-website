import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { tag, excludeContactIds } = await request.json();

    if (!tag || typeof tag !== 'string') {
      return NextResponse.json(
        { error: 'Tag is required' },
        { status: 400 }
      );
    }

    // Supabase setup
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Fetch all contacts that have this tag
    const { data: allContacts, error: fetchError } = await supabase
      .from('email_contacts')
      .select('id, tags')
      .not('tags', 'is', null);

    if (fetchError) {
      console.error('Error fetching contacts:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch contacts' },
        { status: 500 }
      );
    }

    if (!allContacts || allContacts.length === 0) {
      return NextResponse.json({
        success: true,
        removed: 0,
        message: 'No contacts found with this tag',
      });
    }

    // Filter contacts that have the tag and are not in exclude list
    const contactsToUpdate = allContacts.filter((contact) => {
      const tags = contact.tags || [];
      const hasTag = tags.some((t: string) => t.trim().toLowerCase() === tag.trim().toLowerCase());
      
      if (!hasTag) return false;
      if (excludeContactIds && Array.isArray(excludeContactIds) && excludeContactIds.length > 0) {
        return !excludeContactIds.includes(contact.id);
      }
      return true;
    });

    // Remove tag from each contact
    let updatedCount = 0;
    const errors: string[] = [];

    for (const contact of contactsToUpdate) {
      try {
        const currentTags = contact.tags || [];
        const tagsArray = Array.isArray(currentTags) ? currentTags : [];
        const newTags = tagsArray.filter(
          (t: string) => t.trim().toLowerCase() !== tag.trim().toLowerCase()
        );

        const { error: updateError } = await supabase
          .from('email_contacts')
          .update({ tags: newTags.length > 0 ? newTags : null })
          .eq('id', contact.id);

        if (updateError) {
          errors.push(`Failed to update contact ${contact.id}: ${updateError.message}`);
        } else {
          updatedCount++;
        }
      } catch (error: any) {
        errors.push(`Error updating contact ${contact.id}: ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      removed: updatedCount,
      total: contactsToUpdate.length,
      errors: errors.length > 0 ? errors.slice(0, 10) : undefined,
      message: `Successfully removed tag "${tag}" from ${updatedCount} contact${updatedCount !== 1 ? 's' : ''}`,
    });
  } catch (error: any) {
    console.error('Error in remove tag API:', error);
    return NextResponse.json(
      { error: `Failed to remove tag: ${error.message}` },
      { status: 500 }
    );
  }
}
