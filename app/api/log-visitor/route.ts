import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const visitorData = await request.json();

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase environment variables are not configured');
      // Return success even if DB is not configured to avoid breaking the site
      return NextResponse.json({ success: true, message: 'Visitor logged (DB not configured)' });
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Insert visitor data into Supabase
    // Note: You'll need to create a 'visitor_logs' table in Supabase
    const { data, error } = await supabase
      .from('visitor_logs')
      .insert([
        {
          visitor_id: visitorData.visitorId,
          timestamp: visitorData.timestamp || new Date().toISOString(),
          url: visitorData.url,
          path: visitorData.path,
          user_agent: visitorData.userAgent,
          language: visitorData.language,
          platform: visitorData.platform,
          screen_width: visitorData.screenWidth,
          screen_height: visitorData.screenHeight,
          timezone: visitorData.timezone,
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error logging visitor:', error);
      
      // If table doesn't exist, return success but log the error
      if (error.code === '42P01' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        console.warn('visitor_logs table does not exist. Please create it in Supabase.');
        return NextResponse.json({ 
          success: true, 
          message: 'Visitor logged (table not found - please create visitor_logs table)' 
        });
      }
      
      // For other errors, still return success to not break the site
      return NextResponse.json({ 
        success: true, 
        message: 'Visitor logged (with errors)',
        error: error.message 
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error logging visitor:', error);
    // Return success to avoid breaking the site if logging fails
    return NextResponse.json({ 
      success: true, 
      message: 'Visitor logged (with errors)',
      error: error?.message 
    });
  }
}

















