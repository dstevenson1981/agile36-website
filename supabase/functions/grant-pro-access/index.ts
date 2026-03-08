/**
 * Grant Pro Access Edge Function
 *
 * Called after successful payment. Upserts user_access with plan_type: 'pro'.
 * Body: { user_id: string, course_id: string }
 */

import { supabase } from '../_shared/supabase-client.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();
    const { user_id, course_id } = body;

    if (!user_id || !course_id) {
      return new Response(
        JSON.stringify({ error: 'user_id and course_id required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { error } = await supabase
      .from('user_access')
      .upsert(
        { user_id, course_id, plan_type: 'pro' },
        { onConflict: 'user_id,course_id' }
      );

    if (error) {
      console.error('Error granting pro access:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Grant pro access error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
