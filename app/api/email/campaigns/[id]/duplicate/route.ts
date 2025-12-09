import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const campaignId = parseInt(params.id);

    if (isNaN(campaignId)) {
      return NextResponse.json(
        { error: 'Invalid campaign ID' },
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

    // Fetch the original campaign
    const { data: originalCampaign, error: fetchError } = await supabase
      .from('email_campaigns')
      .select('*')
      .eq('id', campaignId)
      .single();

    if (fetchError || !originalCampaign) {
      console.error('Error fetching campaign:', fetchError);
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    // Create duplicate with new name and reset status
    const { data: duplicatedCampaign, error: duplicateError } = await supabase
      .from('email_campaigns')
      .insert({
        name: `${originalCampaign.name} (Copy)`,
        subject: originalCampaign.subject,
        html_content: originalCampaign.html_content,
        text_content: originalCampaign.text_content,
        status: 'draft', // Always create as draft
        sent_count: 0, // Reset sent count
        sent_at: null, // Clear sent date
        scheduled_at: null, // Clear scheduled date
      })
      .select()
      .single();

    if (duplicateError) {
      console.error('Error duplicating campaign:', duplicateError);
      return NextResponse.json(
        { error: `Failed to duplicate campaign: ${duplicateError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      campaign: duplicatedCampaign,
    });
  } catch (error: any) {
    console.error('Error in duplicate campaign API:', error);
    return NextResponse.json(
      { error: `Failed to duplicate campaign: ${error.message}` },
      { status: 500 }
    );
  }
}

