import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { email, course, couponCode } = await request.json();

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
      .from('coupon_leads')
      .insert([
        {
          email,
          course: course || null,
          coupon_code: couponCode || '100OFF',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      // Check if it's a table not found error
      if (error.code === '42P01' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Database table not found. Please run the coupon_leads SQL setup script in Supabase.' },
          { status: 500 }
        );
      }
      // Check if it's a duplicate email error (that's okay, just proceed)
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
    console.error('Error storing coupon lead:', error);
    return NextResponse.json(
      { error: `Failed to store email: ${error?.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}




