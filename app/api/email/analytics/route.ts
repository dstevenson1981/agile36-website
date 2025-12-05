import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

    // Get all email sends
    const { data: sends, error: sendsError } = await supabase
      .from('email_sends')
      .select('*');

    if (sendsError) {
      console.error('Error fetching sends:', sendsError);
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      );
    }

    // Calculate analytics
    const totalSent = sends?.length || 0;
    const totalOpened = sends?.filter(s => s.opened_at).length || 0;
    const totalClicked = sends?.filter(s => s.clicked_at).length || 0;
    const totalBounced = sends?.filter(s => s.bounced).length || 0;

    const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(2) : '0';
    const clickRate = totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(2) : '0';
    const bounceRate = totalSent > 0 ? ((totalBounced / totalSent) * 100).toFixed(2) : '0';

    return NextResponse.json({
      success: true,
      analytics: {
        totalSent,
        totalOpened,
        totalClicked,
        totalBounced,
        openRate: parseFloat(openRate),
        clickRate: parseFloat(clickRate),
        bounceRate: parseFloat(bounceRate),
      },
    });
  } catch (error: any) {
    console.error('Error in analytics API:', error);
    return NextResponse.json(
      { error: `Failed to fetch analytics: ${error.message}` },
      { status: 500 }
    );
  }
}

