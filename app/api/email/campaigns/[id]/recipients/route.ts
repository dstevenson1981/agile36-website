import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function normalizeTagFilters(tagFilters: unknown): string[] {
  if (!Array.isArray(tagFilters)) return [];
  return Array.from(
    new Set(
      tagFilters
        .map((tag) => (typeof tag === 'string' ? tag.trim() : ''))
        .filter((tag) => tag.length > 0)
    )
  );
}

function normalizeContactIds(contactIds: unknown): number[] {
  if (!Array.isArray(contactIds)) return [];
  return Array.from(
    new Set(
      contactIds
        .map((id) => (typeof id === 'number' ? id : parseInt(String(id), 10)))
        .filter((id) => Number.isInteger(id) && id > 0)
    )
  );
}

// Get recipients / audience for a campaign
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

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { data: campaign, error: campaignError } = await supabase
      .from('email_campaigns')
      .select('id, tag_filters')
      .eq('id', campaignId)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    const { data: recipients, error: recipientsError } = await supabase
      .from('email_campaign_recipients')
      .select('contact_id')
      .eq('campaign_id', campaignId);

    if (recipientsError) {
      console.error('Error fetching campaign recipients:', recipientsError);
      return NextResponse.json(
        { error: `Failed to fetch recipients: ${recipientsError.message}` },
        { status: 500 }
      );
    }

    const contactIds = (recipients || []).map((row) => row.contact_id);
    const tagFilters = normalizeTagFilters(campaign.tag_filters);

    return NextResponse.json({
      success: true,
      contactIds,
      tagFilters,
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

// Set recipients / audience for a campaign (replace existing)
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

    const body = await request.json();
    const contactIds = normalizeContactIds(body.contactIds);
    const tagFilters = normalizeTagFilters(body.tagFilters);

    if (!Array.isArray(body.contactIds)) {
      return NextResponse.json(
        { error: 'contactIds must be an array' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { data: campaign, error: campaignError } = await supabase
      .from('email_campaigns')
      .select('id')
      .eq('id', campaignId)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    const { error: updateCampaignError } = await supabase
      .from('email_campaigns')
      .update({ tag_filters: tagFilters })
      .eq('id', campaignId);

    if (updateCampaignError) {
      console.error('Error updating campaign tag filters:', updateCampaignError);
      return NextResponse.json(
        { error: `Failed to save tag filters: ${updateCampaignError.message}` },
        { status: 500 }
      );
    }

    const { error: deleteError } = await supabase
      .from('email_campaign_recipients')
      .delete()
      .eq('campaign_id', campaignId);

    if (deleteError) {
      console.error('Error clearing campaign recipients:', deleteError);
      return NextResponse.json(
        { error: `Failed to clear recipients: ${deleteError.message}` },
        { status: 500 }
      );
    }

    if (contactIds.length > 0) {
      const rows = contactIds.map((contactId) => ({
        campaign_id: campaignId,
        contact_id: contactId,
      }));

      // Insert in chunks to avoid payload limits
      const chunkSize = 500;
      for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        const { error: insertError } = await supabase
          .from('email_campaign_recipients')
          .insert(chunk);

        if (insertError) {
          console.error('Error inserting campaign recipients:', insertError);
          return NextResponse.json(
            { error: `Failed to save recipients: ${insertError.message}` },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json({
      success: true,
      contactIds,
      tagFilters,
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
