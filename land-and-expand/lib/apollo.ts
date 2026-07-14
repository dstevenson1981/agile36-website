export type ApolloPerson = {
  id?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  title?: string;
  seniority?: string;
  departments?: string[];
  department?: string;
  linkedin_url?: string;
  email?: string;
  emails?: Array<{ address?: string } | string>;
  organization_id?: string;
  organization?: {
    id?: string;
    name?: string;
    primary_domain?: string;
    website_url?: string;
    estimated_num_employees?: number;
    industry?: string;
    linkedin_url?: string;
  };
  organization_name?: string;
};

function requireApolloKey(): string {
  const key = process.env.APOLLO_API_KEY;
  if (!key) {
    throw new Error("APOLLO_API_KEY is required for land-and-expand enrichment");
  }
  return key;
}

async function apolloPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const apiKey = requireApolloKey();
  const response = await fetch(`https://api.apollo.io/api/v1${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Apollo ${path} failed (${response.status}): ${text.slice(0, 300)}`);
  }

  return response.json() as Promise<T>;
}

function collectEmails(person: ApolloPerson): string[] {
  const out: string[] = [];
  if (person.email) out.push(person.email);
  for (const item of person.emails || []) {
    if (typeof item === "string") out.push(item);
    else if (item?.address) out.push(item.address);
  }
  return out.map((e) => e.toLowerCase().trim()).filter(Boolean);
}

export type EnrichResult = {
  person: ApolloPerson | null;
  confidence: number;
  uncertain: boolean;
  reason?: string;
};

export async function matchPersonByEmail(params: {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}): Promise<EnrichResult> {
  const data = await apolloPost<{ person?: ApolloPerson; people?: ApolloPerson[] }>(
    "/people/match",
    {
      email: params.email,
      first_name: params.firstName || undefined,
      last_name: params.lastName || undefined,
      reveal_personal_emails: false,
      reveal_phone_number: false,
    }
  );

  const person = data.person || data.people?.[0] || null;
  if (!person) {
    return { person: null, confidence: 0, uncertain: true, reason: "No Apollo person match" };
  }

  const emails = collectEmails(person);
  const emailOk = emails.includes(params.email.toLowerCase().trim());
  if (!emailOk && emails.length > 0) {
    return {
      person,
      confidence: 0.35,
      uncertain: true,
      reason: "Apollo email did not match order email",
    };
  }

  const hasOrg = Boolean(person.organization?.name || person.organization_name || person.organization_id);
  const hasTitle = Boolean(person.title);
  let confidence = 0.55;
  if (emailOk) confidence += 0.25;
  if (hasOrg) confidence += 0.1;
  if (hasTitle) confidence += 0.1;

  return {
    person,
    confidence: Math.min(confidence, 0.99),
    uncertain: confidence < 0.7 || !hasOrg,
    reason: !hasOrg ? "No reliable employer on Apollo match" : undefined,
  };
}

export async function searchCompanyProspects(params: {
  organizationId?: string | null;
  organizationName?: string | null;
  titles: string[];
  perPage: number;
}): Promise<ApolloPerson[]> {
  const body: Record<string, unknown> = {
    page: 1,
    per_page: Math.min(Math.max(params.perPage, 1), 25),
    person_titles: params.titles,
  };

  if (params.organizationId) {
    body.organization_ids = [params.organizationId];
  } else if (params.organizationName) {
    body.q_organization_name = params.organizationName;
  } else {
    return [];
  }

  const data = await apolloPost<{ people?: ApolloPerson[] }>("/mixed_people/search", body);
  return data.people || [];
}
