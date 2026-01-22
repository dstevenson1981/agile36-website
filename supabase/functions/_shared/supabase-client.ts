/**
 * Supabase Client for Server-Side Database Operations
 * URL: https://hjwdjlgtotsvxdnjxhmr.supabase.co
 * Uses service role key for server-side operations (bypasses RLS)
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://hjwdjlgtotsvxdnjxhmr.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Warning: SUPABASE_SERVICE_ROLE_KEY not set. Database operations may fail.');
}

/**
 * Create and export Supabase client instance
 * This uses the service role key for server-side operations
 */
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

/**
 * Helper function to get Supabase client (for consistency)
 */
export function getSupabaseClient() {
  return supabase;
}
