import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/** Strip instructor identity from API responses (DB may still store values for admin use). */
function redactScheduleRow(row: Record<string, unknown>): Record<string, unknown> {
  return { ...row, instructor_name: null, instructor_image: null };
}

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
      const payload = schedule ? [redactScheduleRow(schedule as Record<string, unknown>)] : [];
      return NextResponse.json({ success: true, data: payload });
    }

    // Build query - only active, future schedules.
    // Try with hidden filter first (excludes hidden schedules when column exists).
    let query = supabase
      .from('course_schedules')
      .select('*')
      .eq('status', status)
      .or('hidden.is.null,hidden.eq.false')
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true });

    if (courseSlug) query = query.eq('course_slug', courseSlug);

    let { data, error } = await query;

    // If hidden column doesn't exist (PostgreSQL 42703), retry without the filter
    if (error && (error.code === '42703' || String(error.message).includes('column "hidden" does not exist'))) {
      query = supabase
        .from('course_schedules')
        .select('*')
        .eq('status', status)
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true });
      if (courseSlug) query = query.eq('course_slug', courseSlug);
      const retry = await query;
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: `Failed to fetch schedules: ${error.message}` },
        { status: 500 }
      );
    }

    const safe = (data || []).map((row) => redactScheduleRow(row as Record<string, unknown>));
    return NextResponse.json({ success: true, data: safe });
  } catch (error: any) {
    console.error('Error fetching course schedules:', error);
    return NextResponse.json(
      { error: `Failed to fetch schedules: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}

