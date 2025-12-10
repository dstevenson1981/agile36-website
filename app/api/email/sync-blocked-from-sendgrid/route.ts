import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// API route to sync blocked contacts from SendGrid bounce data
// This can be called manually or scheduled to sync blocked emails
export async function POST(request: NextRequest) {
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

    // Get all bounced email sends
    const { data: bouncedSends, error: sendsError } = await supabase
      .from('email_sends')
      .select('contact_id, sendgrid_message_id')
      .eq('bounced', true);

    if (sendsError) {
      console.error('Error fetching bounced sends:', sendsError);
      return NextResponse.json(
        { error: 'Failed to fetch bounced sends' },
        { status: 500 }
      );
    }

    if (!bouncedSends || bouncedSends.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No bounced emails found',
        blocked: 0,
      });
    }

    // Get unique contact IDs that have bounced
    const contactIds = [...new Set(bouncedSends.map(s => s.contact_id).filter(id => id !== null))];
    
    if (contactIds.length === 0) {
      // If no contact_ids, try to match by email from SendGrid message IDs
      // This would require fetching from SendGrid API, which we'll skip for now
      return NextResponse.json({
        success: false,
        message: 'No contact_ids found in bounced sends. Contact IDs may not be linked. You may need to manually block by email domain.',
        blocked: 0,
        totalBounced: bouncedSends.length,
      });
    }

    // Block all contacts with bounced emails
    const { data: updatedContacts, error: updateError } = await supabase
      .from('email_contacts')
      .update({
        blocked: true,
        blocked_at: new Date().toISOString(),
        blocked_reason: 'Auto-blocked due to bounced emails',
        subscribed: false,
      })
      .in('id', contactIds)
      .eq('blocked', false)
      .select('id, email');

    if (updateError) {
      console.error('Error blocking contacts:', updateError);
      return NextResponse.json(
        { error: `Failed to block contacts: ${updateError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Blocked ${updatedContacts?.length || 0} contacts`,
      blocked: updatedContacts?.length || 0,
      totalBounced: bouncedSends.length,
      contacts: updatedContacts,
    });
  } catch (error: any) {
    console.error('Error syncing blocked contacts:', error);
    return NextResponse.json(
      { error: `Failed to sync: ${error.message}` },
      { status: 500 }
    );
  }
}



