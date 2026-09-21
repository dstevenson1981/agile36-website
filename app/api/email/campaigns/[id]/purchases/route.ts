import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  summarizeCampaignPurchases,
  type CampaignPurchase,
} from '@/app/lib/email-campaign-purchases';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const campaignId = parseInt(id, 10);

    if (Number.isNaN(campaignId)) {
      return NextResponse.json({ error: 'Invalid campaign ID' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase.rpc('email_campaign_purchases', {
      p_campaign_id: campaignId,
    });

    if (error) {
      console.error('Error fetching campaign purchases:', error);
      return NextResponse.json(
        { error: `Failed to fetch purchases: ${error.message}` },
        { status: 500 }
      );
    }

    const purchases = (data || []) as CampaignPurchase[];

    return NextResponse.json({
      success: true,
      purchases,
      stats: summarizeCampaignPurchases(purchases),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in campaign purchases API:', error);
    return NextResponse.json(
      { error: `Failed to fetch purchases: ${message}` },
      { status: 500 }
    );
  }
}
