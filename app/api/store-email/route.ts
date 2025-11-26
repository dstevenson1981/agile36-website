import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { name, email, source, exam_name } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Use service role key for server-side operations (bypasses RLS)
    // Fall back to anon key if service role is not set
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase environment variables are not configured');
      return NextResponse.json(
        { error: 'Database not configured. Please check environment variables.' },
        { status: 500 }
      );
    }

    // Create a fresh Supabase client for this request (server-side)
    // Using service role key bypasses RLS, which is appropriate for server-side API routes
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Insert email into Supabase
    const { data, error } = await supabase
      .from('assessment_emails')
      .insert([
        {
          name: name || null,
          email,
          source: source || 'SA Free Assessment',
          exam_name: exam_name || null,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      // Check if it's a column not found error (migration not complete)
      if (error.code === '42703' || (error.message?.includes('column') && error.message?.includes('does not exist'))) {
        return NextResponse.json(
          { error: 'Database columns missing. Please complete all migration steps in Supabase (Steps 2-5).' },
          { status: 500 }
        );
      }
      // Check if it's a table not found error
      if (error.code === '42P01' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Database table not found. Please run the SQL setup script in Supabase.' },
          { status: 500 }
        );
      }
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        // Duplicate email is okay, just proceed
        return NextResponse.json({ success: true, message: 'Email already exists' });
      }
      return NextResponse.json(
        { error: `Failed to store email: ${error.message || 'Unknown error'} (Code: ${error.code || 'N/A'})` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error storing email:', error);
    return NextResponse.json(
      { error: `Failed to store email: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}
