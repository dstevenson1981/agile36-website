import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get('course_slug') || searchParams.get('course');
    const status = searchParams.get('status') || 'active';

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Supabase environment variables are not configured');
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Build query
    let query = supabase
      .from('course_schedules')
      .select('*')
      .eq('status', status)
      .gte('start_date', new Date().toISOString()) // Only future courses
      .order('start_date', { ascending: true });
    
    // Debug logging
    console.log('Fetching schedules for course_slug:', courseSlug);
    console.log('Status filter:', status);
    console.log('Date filter: >=', new Date().toISOString());

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

