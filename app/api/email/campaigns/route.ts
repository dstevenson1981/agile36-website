import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  groupPurchaseStatsByCampaign,
  type CampaignPurchase,
} from '@/app/lib/email-campaign-purchases';

export async function GET(request: NextRequest) {
  try {
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

    const { data: campaigns, error } = await supabase
      .from('email_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching campaigns:', error);
      return NextResponse.json(
        { error: 'Failed to fetch campaigns' },
        { status: 500 }
      );
    }

    const { data: purchaseRows, error: purchaseError } = await supabase.rpc(
      'email_campaign_purchases',
      { p_campaign_id: null }
    );

    if (purchaseError) {
      console.error('Error fetching campaign purchases:', purchaseError);
    }

    const purchaseStats = groupPurchaseStatsByCampaign(
      (purchaseRows || []) as CampaignPurchase[]
    );

    return NextResponse.json({
      success: true,
      campaigns: (campaigns || []).map((campaign) => ({
        ...campaign,
        ...(purchaseStats[campaign.id] || {
          buyers_on_list: 0,
          purchases_after_send: 0,
          revenue_after_send: 0,
          revenue_on_list: 0,
        }),
      })),
    });
  } catch (error: any) {
    console.error('Error in campaigns API:', error);
    return NextResponse.json(
      { error: `Failed to fetch campaigns: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, subject, html_content, text_content, status = 'draft' } = await request.json();

    if (!name || !subject || !html_content) {
      return NextResponse.json(
        { error: 'Name, subject, and HTML content are required' },
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

    const { data, error } = await supabase
      .from('email_campaigns')
      .insert({
        name,
        subject,
        html_content,
        text_content: text_content || null,
        status,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating campaign:', error);
      return NextResponse.json(
        { error: `Failed to create campaign: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      campaign: data,
    });
  } catch (error: any) {
    console.error('Error in campaigns API:', error);
    return NextResponse.json(
      { error: `Failed to create campaign: ${error.message}` },
      { status: 500 }
    );
  }
}



















