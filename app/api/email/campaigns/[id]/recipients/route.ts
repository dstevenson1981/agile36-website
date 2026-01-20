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

    const { data: recipients, error } = await supabase
      .from('email_campaign_recipients')
      .select('contact_id')
      .eq('campaign_id', campaignId);

    if (error) {
      console.error('Error fetching recipients:', error);
      return NextResponse.json(
        { error: `Failed to fetch recipients: ${error.message}` },
        { status: 500 }
      );
    }

    const contactIds = recipients?.map(r => r.contact_id) || [];

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

    // Delete existing recipients
    const { error: deleteError } = await supabase
      .from('email_campaign_recipients')
      .delete()
      .eq('campaign_id', campaignId);

    if (deleteError) {
      console.error('Error deleting existing recipients:', deleteError);
      return NextResponse.json(
        { error: `Failed to clear recipients: ${deleteError.message}` },
        { status: 500 }
      );
    }

    // Insert new recipients if any
    if (contactIds.length > 0) {
      const recipients = contactIds.map((contactId: number) => ({
        campaign_id: campaignId,
        contact_id: contactId,
      }));

      const { error: insertError } = await supabase
        .from('email_campaign_recipients')
        .insert(recipients);

      if (insertError) {
        console.error('Error inserting recipients:', insertError);
        return NextResponse.json(
          { error: `Failed to set recipients: ${insertError.message}` },
          { status: 500 }
        );
      }
    }

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
