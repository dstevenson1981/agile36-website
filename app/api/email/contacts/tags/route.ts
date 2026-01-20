import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Add tag to a single contact
export async function POST(request: NextRequest) {
  try {
    const { contactId, tag } = await request.json();

    if (!contactId || !tag || !tag.trim()) {
      return NextResponse.json(
        { success: false, error: 'Contact ID and tag are required' },
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

    // Get current tags
    const { data: contact, error: fetchError } = await supabase
      .from('email_contacts')
      .select('tags')
      .eq('id', contactId)
      .single();

    if (fetchError || !contact) {
      return NextResponse.json(
        { success: false, error: 'Contact not found' },
        { status: 404 }
      );
    }

    const currentTags = contact.tags || [];
    const tagToAdd = tag.trim();

    // Check if tag already exists
    if (currentTags.includes(tagToAdd)) {
      return NextResponse.json({
        success: true,
        message: 'Tag already exists',
        contact: { ...contact, tags: currentTags },
      });
    }

    // Add tag using array_append
    const { data: updated, error: updateError } = await supabase
      .from('email_contacts')
      .update({ tags: [...currentTags, tagToAdd] })
      .eq('id', contactId)
      .select()
      .single();

    if (updateError) {
      console.error('Error adding tag:', updateError);
      return NextResponse.json(
        { success: false, error: `Failed to add tag: ${updateError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      contact: updated,
    });
  } catch (error: any) {
    console.error('Error in add tag API:', error);
    return NextResponse.json(
      { success: false, error: `Failed to add tag: ${error.message}` },
      { status: 500 }
    );
  }
}

// Remove tag from a single contact
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get('contactId');
    const tag = searchParams.get('tag');

    if (!contactId || !tag) {
      return NextResponse.json(
        { success: false, error: 'Contact ID and tag are required' },
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

    // Get current tags
    const { data: contact, error: fetchError } = await supabase
      .from('email_contacts')
      .select('tags')
      .eq('id', parseInt(contactId))
      .single();

    if (fetchError || !contact) {
      return NextResponse.json(
        { success: false, error: 'Contact not found' },
        { status: 404 }
      );
    }

    const currentTags = contact.tags || [];
    const tagToRemove = tag.trim();

    // Remove tag
    const updatedTags = currentTags.filter((t: string) => t !== tagToRemove);

    // Update with new tags array (or null if empty)
    const { data: updated, error: updateError } = await supabase
      .from('email_contacts')
      .update({ tags: updatedTags.length > 0 ? updatedTags : null })
      .eq('id', parseInt(contactId))
      .select()
      .single();

    if (updateError) {
      console.error('Error removing tag:', updateError);
      return NextResponse.json(
        { success: false, error: `Failed to remove tag: ${updateError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      contact: updated,
    });
  } catch (error: any) {
    console.error('Error in remove tag API:', error);
    return NextResponse.json(
      { success: false, error: `Failed to remove tag: ${error.message}` },
      { status: 500 }
    );
  }
}
