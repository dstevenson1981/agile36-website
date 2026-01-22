/**
 * Apollo API Client for Person Enrichment and Lookalike Search
 * Base URL: https://api.apollo.io
 * API Key: Set via APOLLO_API_KEY environment variable
 */

const APOLLO_API_KEY = Deno.env.get('APOLLO_API_KEY') || '';
const APOLLO_BASE_URL = 'https://api.apollo.io';

interface ApolloPerson {
  id?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  email?: string;
  title?: string;
  job_title?: string;
  organization?: {
    name?: string;
    website_url?: string;
    estimated_num_employees?: number;
    industry?: string;
  };
  linkedin_url?: string;
  phone_numbers?: Array<{ raw_number?: string }>;
  city?: string;
  state?: string;
  country?: string;
  seniority?: string;
  departments?: string[];
}

interface ApolloEnrichmentResponse {
  person?: ApolloPerson;
  credits_used?: number;
}

interface ApolloSearchResponse {
  people?: ApolloPerson[];
  pagination?: {
    page?: number;
    per_page?: number;
    total_entries?: number;
  };
  credits_used?: number;
}

/**
 * Enrich a person by email using Apollo API
 */
export async function enrichPerson(email: string): Promise<ApolloPerson | null> {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`${APOLLO_BASE_URL}/v1/people/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Api-Key': APOLLO_API_KEY,
        },
        body: JSON.stringify({
          email: email,
          reveal_phone_number: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Apollo API error (${response.status}): ${errorText}`);
      }

      const data: ApolloEnrichmentResponse = await response.json();
      
      if (data.person) {
        // Track credits used
        if (data.credits_used) {
          await trackCredits('enrich_person', data.credits_used);
        }
        return data.person;
      }

      return null;
    } catch (error: any) {
      lastError = error;
      console.error(`Apollo enrichPerson attempt ${attempt} failed:`, error.message);
      
      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw lastError || new Error('Failed to enrich person after retries');
}

/**
 * Search for lookalikes (similar people at the same company with similar job titles)
 */
export async function searchLookalikes(
  companyName: string,
  jobTitle: string,
  limit: number = 10
): Promise<ApolloPerson[]> {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`${APOLLO_BASE_URL}/v1/mixed_people/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Api-Key': APOLLO_API_KEY,
        },
        body: JSON.stringify({
          organization_name: companyName,
          person_titles: [jobTitle],
          per_page: limit,
          page: 1,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Apollo API error (${response.status}): ${errorText}`);
      }

      const data: ApolloSearchResponse = await response.json();
      
      // Track credits used
      if (data.credits_used) {
        await trackCredits('search_lookalikes', data.credits_used);
      }

      return data.people || [];
    } catch (error: any) {
      lastError = error;
      console.error(`Apollo searchLookalikes attempt ${attempt} failed:`, error.message);
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw lastError || new Error('Failed to search lookalikes after retries');
}

/**
 * Search for executives (VPs, Directors, C-level) at a company
 */
export async function searchExecutives(
  companyName: string,
  limit: number = 10
): Promise<ApolloPerson[]> {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`${APOLLO_BASE_URL}/v1/mixed_people/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Api-Key': APOLLO_API_KEY,
        },
        body: JSON.stringify({
          organization_name: companyName,
          person_seniorities: ['vp', 'director', 'c_suite', 'owner'],
          per_page: limit,
          page: 1,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Apollo API error (${response.status}): ${errorText}`);
      }

      const data: ApolloSearchResponse = await response.json();
      
      if (data.credits_used) {
        await trackCredits('search_executives', data.credits_used);
      }

      return data.people || [];
    } catch (error: any) {
      lastError = error;
      console.error(`Apollo searchExecutives attempt ${attempt} failed:`, error.message);
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw lastError || new Error('Failed to search executives after retries');
}

/**
 * Search for practitioners with specific roles at a company
 */
export async function searchPractitioners(
  companyName: string,
  roles: string[],
  limit: number = 10
): Promise<ApolloPerson[]> {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`${APOLLO_BASE_URL}/v1/mixed_people/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Api-Key': APOLLO_API_KEY,
        },
        body: JSON.stringify({
          organization_name: companyName,
          person_titles: roles,
          per_page: limit,
          page: 1,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Apollo API error (${response.status}): ${errorText}`);
      }

      const data: ApolloSearchResponse = await response.json();
      
      if (data.credits_used) {
        await trackCredits('search_practitioners', data.credits_used);
      }

      return data.people || [];
    } catch (error: any) {
      lastError = error;
      console.error(`Apollo searchPractitioners attempt ${attempt} failed:`, error.message);
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  throw lastError || new Error('Failed to search practitioners after retries');
}

/**
 * Track Apollo API credit usage
 */
export async function trackCredits(operation: string, creditsUsed: number): Promise<void> {
  try {
    // Log to console (you can extend this to write to a database table)
    console.log(`Apollo credits used: ${operation} - ${creditsUsed} credits`);
    
    // Optional: Store in database for tracking
    // const { supabase } = await import('./supabase-client.ts');
    // await supabase.from('apollo_credit_logs').insert({
    //   operation,
    //   credits_used: creditsUsed,
    //   created_at: new Date().toISOString(),
    // });
  } catch (error) {
    console.error('Failed to track credits:', error);
    // Don't throw - credit tracking failure shouldn't break the main flow
  }
}
