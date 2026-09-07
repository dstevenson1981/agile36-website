import { createClient } from "@supabase/supabase-js";
import { groupLiveVisitors, type LiveVisitor } from "./live-visitors";

export type VisitorsPayload = {
  visitors: LiveVisitor[];
  online: number;
  active: number;
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function loadVisitors(limit = 200): Promise<VisitorsPayload> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("website_visitors")
    .select(
      "id, visited_at, city, region, country, latitude, longitude, page, page_title, company, person_name, email, session_id, visitor_id, referrer",
    )
    .order("visited_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  const visitors = groupLiveVisitors(data ?? []);
  return {
    visitors,
    online: visitors.filter((row) => row.live).length,
    active: visitors.filter((row) => row.active).length,
  };
}
