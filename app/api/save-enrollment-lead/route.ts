import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      scheduleId,
      courseSlug,
      courseName,
      enrollingFor,
      firstName,
      lastName,
      email,
      phone,
      alternativeContact,
      referralCode,
    } = body;

    // Validate required fields
    if (!scheduleId || !courseSlug || !firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Store enrollment lead in Supabase
    const leadData = {
      schedule_id: scheduleId,
      course_slug: courseSlug,
      course_name: courseName || null,
      enrolling_for: enrollingFor || 'myself',
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      alternative_contact: alternativeContact?.trim() || null,
      referral_code: referralCode?.trim() || null,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: lead, error: leadError } = await supabase
      .from('enrollment_leads')
      .insert(leadData)
      .select()
      .single();

    if (leadError) {
      console.error('Error saving enrollment lead:', leadError);
      // If it's a duplicate, that's okay - we still want to return success
      // as the lead was already captured
      if (leadError.code === '23505') { // Unique constraint violation
        return NextResponse.json({
          success: true,
          message: 'Enrollment lead already exists',
          duplicate: true,
        });
      }
      return NextResponse.json(
        { error: 'Failed to save enrollment lead', details: leadError.message },
        { status: 500 }
      );
    }

    // Send webhook to n8n for abandoned checkout recovery workflow
    // Fire and forget - don't wait for response to avoid slowing down the API
    if (process.env.N8N_WEBHOOK_URL_ENROLLMENT_LEADS) {
      fetch(process.env.N8N_WEBHOOK_URL_ENROLLMENT_LEADS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: lead.id,
          email: lead.email,
          name: `${lead.first_name} ${lead.last_name}`,
          first_name: lead.first_name,
          last_name: lead.last_name,
          phone: lead.phone,
          course_name: lead.course_name,
          course_slug: lead.course_slug,
          schedule_id: lead.schedule_id,
          cart_value: null, // Will need to be calculated if available
          checkout_link: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://agile36.com'}/courses/${lead.course_slug}/schedule/checkout?schedule=${lead.schedule_id}`,
          created_at: lead.created_at,
        }),
      }).catch((error) => {
        // Log error but don't fail the request
        console.error('Error sending webhook to n8n:', error);
      });
    }

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Enrollment lead saved successfully',
    });
  } catch (error: any) {
    console.error('Error in save-enrollment-lead:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save enrollment lead' },
      { status: 500 }
    );
  }
}









