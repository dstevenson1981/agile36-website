import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Get recipients for a campaign
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const campaignId = parseInt(id);

    if (isNaN(campaignId)) {
      return NextResponse.json(
        { error: 'Invalid campaign ID' },
        { status: 400 }
      );
    }

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

    // Recipients are now determined by tag filters, not stored in a junction table
    // Return empty array - recipients are determined at send time via tag filters
    const contactIds: number[] = [];

    return NextResponse.json({
      success: true,
      contactIds,
      count: contactIds.length,
    });
  } catch (error: any) {
    console.error('Error in get recipients API:', error);
    return NextResponse.json(
      { error: `Failed to fetch recipients: ${error.message}` },
      { status: 500 }
    );
  }
}

// Set recipients for a campaign (replace existing)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const campaignId = parseInt(id);

    if (isNaN(campaignId)) {
      return NextResponse.json(
        { error: 'Invalid campaign ID' },
        { status: 400 }
      );
    }

    const { contactIds } = await request.json();

    if (!Array.isArray(contactIds)) {
      return NextResponse.json(
        { error: 'contactIds must be an array' },
        { status: 400 }
      );
    }

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

    // Recipients are now determined by tag filters at send time, not stored in a junction table
    // This endpoint is kept for API compatibility but doesn't store recipients

    return NextResponse.json({
      success: true,
      count: contactIds.length,
    });
  } catch (error: any) {
    console.error('Error in set recipients API:', error);
    return NextResponse.json(
      { error: `Failed to set recipients: ${error.message}` },
      { status: 500 }
    );
  }
}
