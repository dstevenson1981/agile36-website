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
    let records;
    try {
      records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
      });
    } catch (parseError: any) {
      console.error('CSV parse error:', parseError);
      return NextResponse.json(
        { error: `Failed to parse CSV file: ${parseError.message}` },
        { status: 400 }
      );
    }

    if (!records || records.length === 0) {
      return NextResponse.json(
        { error: 'CSV file is empty or invalid. Please ensure it has a header row and at least one data row.' },
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
        
        // Validate required fields - check multiple possible column names
        const email = csvRecord.email || csvRecord.Email || csvRecord.EMAIL || csvRecord['email'] || csvRecord['Email'];
        
        if (!email || typeof email !== 'string' || !email.includes('@')) {
          errors.push(`Row ${contacts.length + errors.length + 1}: Missing or invalid email. Found: ${email || 'empty'}`);
          continue;
        }

        const emailLower = email.toLowerCase().trim();

        // Check if contact already exists
        const { data: existingContact } = await supabase
          .from('email_contacts')
          .select('id')
          .eq('email', emailLower)
          .maybeSingle();

        const isUpdate = !!existingContact;

        // Parse tags (can be comma-separated string or array)
        let tags: string[] = [];
        if (csvRecord.tags) {
          if (typeof csvRecord.tags === 'string') {
            tags = csvRecord.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
          } else if (Array.isArray(csvRecord.tags)) {
            tags = csvRecord.tags;
          }
        }
        
        // Auto-tag new imports with timestamp tag for easy filtering
        const importDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const importTag = `Imported ${importDate}`;
        if (!isUpdate && !tags.includes(importTag)) {
          tags.push(importTag);
        }

        // Determine subscription status - default to true unless explicitly false
        let subscribed = true;
        if (csvRecord.subscribed !== undefined && csvRecord.subscribed !== null) {
          const subValue = String(csvRecord.subscribed).toLowerCase().trim();
          subscribed = subValue !== 'false' && subValue !== '0' && subValue !== 'no' && subValue !== 'n';
        }

        // Extract company from CSV - check multiple possible column names
        let company = csvRecord.company || 
                      csvRecord.Company || 
                      csvRecord['Company'] || 
                      csvRecord['Company Name'] || 
                      csvRecord['company name'] || 
                      csvRecord['COMPANY NAME'] ||
                      csvRecord.companyName ||
                      csvRecord.company_name ||
                      null;
        
        // If no company column, extract from email domain
        if (!company && email.includes('@')) {
          const domain = email.split('@')[1];
          if (domain) {
            // Remove common TLDs and format nicely
            const domainParts = domain.split('.');
            if (domainParts.length > 0) {
              // Take the main domain part (before .com, .org, etc.)
              const mainDomain = domainParts[0];
              // Capitalize and format common domains
              const domainMap: Record<string, string | null> = {
                'nationwide': 'Nationwide',
                'visa': 'Visa',
                'bny': 'BNY Mellon',
                'bnymellon': 'BNY Mellon',
                'tjx': 'TJX',
                'gmail': null, // Don't use gmail as company
                'yahoo': null,
                'hotmail': null,
                'outlook': null,
              };
              
              const mappedCompany = domainMap[mainDomain.toLowerCase()];
              if (mappedCompany) {
                company = mappedCompany;
              } else if (!['gmail', 'yahoo', 'hotmail', 'outlook', 'icloud', 'aol'].includes(mainDomain.toLowerCase())) {
                // Only use domain as company if it's not a personal email domain
                company = mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
              }
            }
          }
        }

        const contactData = {
          email: emailLower,
          first_name: csvRecord.first_name || csvRecord['First Name'] || csvRecord.firstName || csvRecord['first_name'] || null,
          last_name: csvRecord.last_name || csvRecord['Last Name'] || csvRecord.lastName || csvRecord['last_name'] || null,
          role: csvRecord.role || csvRecord.Role || csvRecord['Role'] || null,
          company: company,
          tags: tags.length > 0 ? tags : null,
          subscribed: subscribed, // Default to true unless explicitly set to false
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
          if (isUpdate) {
            updateCount++;
          } else {
            successCount++;
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

