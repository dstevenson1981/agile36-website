import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (!id) {
      return NextResponse.json(
        { error: 'Invalid contact ID' },
        { status: 400 }
      );
    }

    const { tags, first_name, last_name, role, company, subscribed, blocked, blocked_reason } = await request.json();

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

    const updateData: any = {};
    if (tags !== undefined) updateData.tags = tags && tags.length > 0 ? tags : null;
    if (first_name !== undefined) updateData.first_name = first_name || null;
    if (last_name !== undefined) updateData.last_name = last_name || null;
    if (role !== undefined) updateData.role = role || null;
    if (company !== undefined) updateData.company = company || null;
    if (subscribed !== undefined) updateData.subscribed = subscribed;
    if (blocked !== undefined) {
      updateData.blocked = blocked;
      if (blocked) {
        updateData.blocked_at = new Date().toISOString();
        updateData.subscribed = false; // Auto-unsubscribe when blocked
      } else {
        updateData.blocked_at = null;
        updateData.blocked_reason = null;
      }
    }
    if (blocked_reason !== undefined) updateData.blocked_reason = blocked_reason || null;

    const { data, error } = await supabase
      .from('email_contacts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating contact:', error);
      return NextResponse.json(
        { error: `Failed to update contact: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      contact: data,
    });
  } catch (error: any) {
    console.error('Error in update contact API:', error);
    return NextResponse.json(
      { error: `Failed to update contact: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (!id) {
      return NextResponse.json(
        { error: 'Invalid contact ID' },
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

    const { error } = await supabase
      .from('email_contacts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contact:', error);
      return NextResponse.json(
        { error: `Failed to delete contact: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error('Error in delete contact API:', error);
    return NextResponse.json(
      { error: `Failed to delete contact: ${error.message}` },
      { status: 500 }
    );
  }
}

