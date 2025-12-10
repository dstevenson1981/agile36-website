import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// API endpoint to delete or block contacts from a list of emails
// Accepts CSV file or JSON array of emails
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const action = formData.get('action') as string || 'block'; // 'block' or 'delete'
    const emailsJson = formData.get('emails'); // Alternative: JSON array of emails

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

    let emails: string[] = [];

    // Parse emails from CSV file or JSON
    if (file) {
      const text = await file.text();
      const lines = text.split('\n').map(line => line.trim()).filter(line => line);
      
      // Skip header row if it exists
      const firstLine = lines[0]?.toLowerCase();
      if (firstLine?.includes('email')) {
        lines.shift();
      }

      // Extract emails (handle CSV format - email might be first column)
      emails = lines.map(line => {
        const parts = line.split(',').map(p => p.trim().replace(/^"|"$/g, ''));
        // Try to find email (contains @)
        const emailPart = parts.find(p => p.includes('@'));
        return emailPart || parts[0];
      }).filter(email => email && email.includes('@'));
    } else if (emailsJson) {
      emails = JSON.parse(emailsJson as string);
    } else {
      return NextResponse.json(
        { error: 'No file or email list provided' },
        { status: 400 }
      );
    }

    if (emails.length === 0) {
      return NextResponse.json(
        { error: 'No valid emails found' },
        { status: 400 }
      );
    }

    // Normalize emails (lowercase, trim)
    emails = emails.map(email => email.toLowerCase().trim()).filter(email => email);

    if (action === 'delete') {
      // Delete contacts
      const { data: deleted, error: deleteError } = await supabase
        .from('email_contacts')
        .delete()
        .in('email', emails)
        .select('email');

      if (deleteError) {
        console.error('Error deleting contacts:', deleteError);
        return NextResponse.json(
          { error: `Failed to delete contacts: ${deleteError.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        action: 'deleted',
        total: emails.length,
        deleted: deleted?.length || 0,
        emails: deleted?.map(c => c.email) || [],
      });
    } else {
      // Block contacts
      const { data: blocked, error: blockError } = await supabase
        .from('email_contacts')
        .update({
          blocked: true,
          blocked_at: new Date().toISOString(),
          blocked_reason: 'Blocked from CSV import',
          subscribed: false,
        })
        .in('email', emails)
        .select('email');

      if (blockError) {
        console.error('Error blocking contacts:', blockError);
        return NextResponse.json(
          { error: `Failed to block contacts: ${blockError.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        action: 'blocked',
        total: emails.length,
        blocked: blocked?.length || 0,
        emails: blocked?.map(c => c.email) || [],
      });
    }
  } catch (error: any) {
    console.error('Error processing blocked contacts:', error);
    return NextResponse.json(
      { error: `Failed to process: ${error.message}` },
      { status: 500 }
    );
  }
}

