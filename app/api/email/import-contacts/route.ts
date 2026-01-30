import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse/sync';

function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [arr];
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function normalizeHeaderKey(key: string) {
  // Strip BOM and normalize whitespace/case
  return key.replace(/^\uFEFF/, '').trim();
}

function getFirstValue(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const normalizedKey = normalizeHeaderKey(key);
    if (record[normalizedKey] !== undefined) return record[normalizedKey];
    // Also try case-insensitive match against actual keys (handles weird headers)
    const matchedKey = Object.keys(record).find((k) => normalizeHeaderKey(k).toLowerCase() === normalizedKey.toLowerCase());
    if (matchedKey && record[matchedKey] !== undefined) return record[matchedKey];
  }
  return undefined;
}

function parseTags(input: unknown): string[] {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map((t) => String(t).trim()).filter((t) => t.length > 0);
  }
  return String(input)
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const importTagRaw = formData.get('importTag');
    const importTags = parseTags(importTagRaw);

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Read file content
    // Strip UTF-8 BOM if present (common cause of "missing email" on imports)
    const fileContent = (await file.text()).replace(/^\uFEFF/, '');

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
        {
          error: 'Database not configured (missing NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY)',
        },
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
    const errors: string[] = [];
    let successCount = 0;
    let updateCount = 0;

    // Normalize + validate emails up-front (also de-dupe)
    const normalizedRows: Array<{
      rowIndex: number; // 1-based excluding header
      email: string;
      record: Record<string, unknown>;
    }> = [];

    const seenEmails = new Set<string>();
    (records as Array<Record<string, unknown>>).forEach((rawRecord, i) => {
      const record: Record<string, unknown> = {};
      // Normalize keys (handles BOM in header)
      for (const [k, v] of Object.entries(rawRecord || {})) {
        record[normalizeHeaderKey(k)] = v;
      }

      const emailRaw = getFirstValue(record, ['email', 'Email', 'EMAIL']);
      const email = String(emailRaw ?? '').toLowerCase().trim();
      const rowIndex = i + 1;

      if (!email || !email.includes('@')) {
        errors.push(`Row ${rowIndex}: Missing or invalid email. Found: ${emailRaw ?? 'empty'}`);
        return;
      }

      if (seenEmails.has(email)) {
        // silently skip duplicates in the same import
        return;
      }
      seenEmails.add(email);
      normalizedRows.push({ rowIndex, email, record });
    });

    if (normalizedRows.length === 0) {
      return NextResponse.json(
        { error: 'No valid contacts found in CSV (all rows missing/invalid email).' },
        { status: 400 }
      );
    }

    // Fetch existing contacts in chunks (avoids per-row queries and serverless timeouts)
    const existingByEmail = new Map<string, { tags: unknown }>();
    const emailChunks = chunk(
      normalizedRows.map((r) => r.email),
      500
    );

    for (const emails of emailChunks) {
      const { data, error } = await supabase
        .from('email_contacts')
        .select('email, tags')
        .in('email', emails);

      if (error) {
        return NextResponse.json(
          { error: `Failed to lookup existing contacts: ${error.message}` },
          { status: 500 }
        );
      }

      (data || []).forEach((row: any) => {
        if (row?.email) existingByEmail.set(String(row.email), { tags: row.tags });
      });
    }

    const toUpsert: any[] = [];

    for (const row of normalizedRows) {
      try {
        const { record, email, rowIndex } = row;
        const existing = existingByEmail.get(email);
        const isUpdate = !!existing;

        const tagsInput = getFirstValue(record, ['tags', 'tag', 'Tags', 'Tag', 'TAGS', 'TAG']) ?? '';
        const newTags = [...parseTags(tagsInput), ...importTags];

        let finalTags: string[] | undefined;
        const existingTags = existing?.tags;
        if (Array.isArray(existingTags)) {
          finalTags = existingTags.map((t) => String(t));
        } else if (!isUpdate) {
          finalTags = [];
        }

        if (newTags.length > 0) {
          const existingSet = new Set((finalTags || []).map((t) => t.toLowerCase()));
          for (const t of newTags) {
            if (!existingSet.has(t.toLowerCase())) {
              (finalTags ||= []).push(t);
              existingSet.add(t.toLowerCase());
            }
          }
        }

        // Determine subscription status (support multiple header variants)
        let subscribed = true;
        const subscribedRaw = getFirstValue(record, ['subscribed', 'Subscribed', 'SUBSCRIBED']);
        if (subscribedRaw !== undefined && subscribedRaw !== null && String(subscribedRaw).trim() !== '') {
          const subValue = String(subscribedRaw).toLowerCase().trim();
          subscribed = subValue !== 'false' && subValue !== '0' && subValue !== 'no' && subValue !== 'n';
        }

        const firstName = getFirstValue(record, ['first_name', 'firstName', 'First Name', 'FirstName']);
        const lastName = getFirstValue(record, ['last_name', 'lastName', 'Last Name', 'LastName']);
        const role = getFirstValue(record, ['role', 'Role']);
        const company = getFirstValue(record, ['company', 'Company']);

        const contactData: any = {
          email,
          first_name: firstName ? String(firstName).trim() : null,
          last_name: lastName ? String(lastName).trim() : null,
          role: role ? String(role).trim() : null,
          company: company ? String(company).trim() : null,
          subscribed,
        };

        if (finalTags && finalTags.length > 0) {
          contactData.tags = finalTags;
        } else if (!isUpdate) {
          contactData.tags = null;
        }

        toUpsert.push(contactData);
        if (isUpdate) updateCount++;
        else successCount++;
      } catch (err: any) {
        errors.push(`Row ${row.rowIndex}: ${err?.message || 'Unknown error processing row'}`);
      }
    }

    // Upsert in batches. If a batch fails, fall back to per-row upserts for that batch to surface errors.
    const batches = chunk(toUpsert, 250);
    for (const batch of batches) {
      const { error } = await supabase
        .from('email_contacts')
        .upsert(batch, { onConflict: 'email', ignoreDuplicates: false });

      if (!error) continue;

      // fallback for better error reporting
      for (const one of batch) {
        const { error: rowError } = await supabase
          .from('email_contacts')
          .upsert(one, { onConflict: 'email', ignoreDuplicates: false });
        if (rowError) {
          errors.push(`Error processing ${one.email}: ${rowError.message}`);
        }
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

