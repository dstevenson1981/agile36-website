import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse/sync';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Read file content
    const fileContent = await file.text();

    // Parse CSV
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    if (!records || records.length === 0) {
      return NextResponse.json(
        { error: 'CSV file is empty or invalid' },
        { status: 400 }
      );
    }

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

    // Process records
    const contacts = [];
    const errors = [];
    let successCount = 0;
    let updateCount = 0;

    for (const record of records) {
      try {
        // Type assertion for CSV record
        const csvRecord = record as Record<string, string>;
        
        // Validate required fields
        if (!csvRecord.email || !csvRecord.email.includes('@')) {
          errors.push(`Invalid email in row: ${JSON.stringify(csvRecord)}`);
          continue;
        }

        // Parse tags (can be comma-separated string or array)
        let tags: string[] = [];
        if (csvRecord.tags) {
          if (typeof csvRecord.tags === 'string') {
            tags = csvRecord.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
          } else if (Array.isArray(csvRecord.tags)) {
            tags = csvRecord.tags;
          }
        }

        const contactData = {
          email: csvRecord.email.toLowerCase().trim(),
          first_name: csvRecord.first_name || csvRecord.firstName || null,
          last_name: csvRecord.last_name || csvRecord.lastName || null,
          tags: tags.length > 0 ? tags : null,
          subscribed: csvRecord.subscribed !== 'false' && csvRecord.subscribed !== 'FALSE', // Default to true
        };

        // Try to insert, update if exists
        const { data, error } = await supabase
          .from('email_contacts')
          .upsert(contactData, {
            onConflict: 'email',
            ignoreDuplicates: false,
          })
          .select();

        if (error) {
          errors.push(`Error processing ${csvRecord.email}: ${error.message}`);
        } else {
          if (data && data.length > 0) {
            // Check if it was an update or insert
            const existing = await supabase
              .from('email_contacts')
              .select('id')
              .eq('email', contactData.email)
              .single();

            if (existing.data) {
              updateCount++;
            } else {
              successCount++;
            }
          }
        }
      } catch (error: any) {
        errors.push(`Error processing row: ${error.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      imported: successCount,
      updated: updateCount,
      errors: errors.length,
      errorDetails: errors.slice(0, 10), // Return first 10 errors
      total: records.length,
    });
  } catch (error: any) {
    console.error('Error importing contacts:', error);
    return NextResponse.json(
      { error: `Failed to import contacts: ${error.message}` },
      { status: 500 }
    );
  }
}

