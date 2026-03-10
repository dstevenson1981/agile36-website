import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get('course_slug') || searchParams.get('course');
    const status = searchParams.get('status') || 'active';
    const scheduleId = searchParams.get('schedule_id') || searchParams.get('schedule');

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseKey = serviceRoleKey || anonKey;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase environment variables are not configured');
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // When fetching a specific schedule by ID (e.g. for direct checkout), include hidden schedules
    if (scheduleId) {
      const { data: schedule, error } = await supabase
        .from('course_schedules')
        .select('*')
        .eq('id', scheduleId)
        .eq('status', status)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json(
          { error: `Failed to fetch schedule: ${error.message}` },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true, data: schedule ? [schedule] : [] });
    }

    // Build query - only active, future schedules. Exclude hidden (not shown on website).
    let query = supabase
      .from('course_schedules')
      .select('*')
      .eq('status', status)
      .or('hidden.is.null,hidden.eq.false')
      .gte('start_date', new Date().toISOString()) // Only today and future
      .order('start_date', { ascending: true });

    // Filter by course if provided
    if (courseSlug) {
      query = query.eq('course_slug', courseSlug);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: `Failed to fetch schedules: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error: any) {
    console.error('Error fetching course schedules:', error);
    return NextResponse.json(
      { error: `Failed to fetch schedules: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}

