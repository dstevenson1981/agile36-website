# N8N Enrollment Leads – What You’re Doing & Node Parameters

## What you’re trying to do (enrollment leads)

1. **Trigger:** When someone fills step 1 of checkout and leaves, a row is inserted into Supabase **`enrollment_leads`**. Supabase sends that row to N8N via a **Database Webhook** (POST to your N8N webhook URL).

2. **Always:** Send the lead a **recovery email** (e.g. “Complete your order – use code **50OFF** for $50 off”, link to agile36.com).

3. **If the lead used a corporate email** (not gmail, yahoo, outlook, etc.):  
   - Enrich that person with **Apollo** (get company + job title).  
   - Search Apollo for **10 other people at the same company with the same (or similar) role**.  
   - Save those **lookalikes** into Supabase **`expansion_opportunities`** with `source = 'enrollment_lookalike'` and `source_email =` the lead’s email.

So: **one webhook per new lead → one email every time → plus, for corporate emails only, find 10 same-company same-role contacts and store them.**

---

## Workflow JSON and import

- **File:** `n8n-enrollment-leads-workflow.json`
- In N8N: **Workflows → Import from File** (or paste the JSON). Then:
  - Create/reuse **credentials** (see below).
  - Replace every `REPLACE_*` placeholder in the nodes as described in this doc.

---

## Parameters and credentials by node

Below are the parameters (and credentials) that sit “behind” each node. After importing, open each node and set these so the workflow matches your setup.

---

### 1. Webhook – Supabase

- **Type:** Webhook (trigger)
- **Parameters:**
  - **HTTP Method:** `POST`
  - **Path:** `enrollment-lead`  
    → Full URL will be like: `https://<your-n8n>/webhook/enrollment-lead`
- **Use this URL in Supabase:**  
  Supabase Dashboard → Database → Webhooks → Create webhook on table **`enrollment_leads`**, event **Insert**, URL = the webhook URL above, method POST.

---

### 2. Set Record & Fields

- **Type:** Set
- **Role:** Normalize payload from Supabase (sometimes `body.record`, sometimes `body`), and derive `domain` for the IF node.
- **Assignments (keys and expressions):**

| Name       | Type   | Value (expression) |
|------------|--------|--------------------|
| record     | object | `{{ $json.body?.record ?? $json.body ?? $json }}` |
| email      | string | `{{ $json.body?.record?.email ?? $json.body?.email ?? $json.email ?? '' }}` |
| first_name | string | `{{ $json.body?.record?.first_name ?? $json.body?.first_name ?? $json.first_name ?? 'there' }}` |
| last_name  | string | `{{ $json.body?.record?.last_name ?? $json.body?.last_name ?? $json.last_name ?? '' }}` |
| created_at | string | `{{ $json.body?.record?.created_at ?? $json.body?.created_at ?? $json.created_at ?? $now }}` |
| lead_id    | string | `{{ $json.body?.record?.id ?? $json.body?.id ?? $json.id ?? '' }}` |
| domain     | string | `{{ ($json.body?.record?.email ?? $json.body?.email ?? $json.email ?? '').toString().split('@')[1]?.toLowerCase() ?? '' }}` |

No credentials.

---

### 3. IF Corporate Email

- **Type:** IF
- **Role:** Route only corporate domains to Apollo (skip free providers).
- **Condition:**
  - **Left value:** `{{ $json.domain }}`
  - **Operator:** “does not contain” (or “not in” depending on your n8n version)
  - **Right value:**  
    `gmail.com;yahoo.com;hotmail.com;outlook.com;icloud.com;aol.com;mail.com;protonmail.com;yandex.com`  
  (one string; you can implement “not in” by checking “not contains” for each, or use a small Code node that returns true/false.)
- **Connections:**  
  - **True** → Apollo – Enrich Person  
  - **False** → Respond to Webhook

No credentials.

---

### 4. SendGrid – Recovery Email

- **Type:** HTTP Request
- **Method:** POST  
- **URL:** `https://api.sendgrid.com/v3/mail/send`
- **Authentication:** Header Auth (or Generic Credential).
  - **Header name:** `Authorization`  
  - **Value:** `Bearer <your SendGrid API key>`  
  Create an N8N credential (e.g. “Header Auth”) and store the key there; reference it in the node.
- **Body (JSON):**

```json
{
  "personalizations": [
    {
      "to": [{ "email": "{{ $json.email }}", "name": "{{ $json.first_name || 'there' }}" }],
      "subject": "Complete your order – $50 OFF inside"
    }
  ],
  "from": { "email": "REPLACE_WITH_FROM_EMAIL", "name": "Agile36" },
  "content": [
    {
      "type": "text/plain",
      "value": "Hi {{ $json.first_name || 'there' }},\n\nYou started checking out but didn't complete your order. Complete your purchase now with $50 OFF using code 50OFF.\n\nVisit: https://agile36.com\n\nThank you,\nAgile36 Team"
    }
  ]
}
```

- **Replace:** `REPLACE_WITH_FROM_EMAIL` with your SendGrid verified sender (e.g. `m.ball@agile36.com` or your chosen address).

---

### 5. Apollo – Enrich Person

- **Type:** HTTP Request
- **Method:** POST  
- **URL:** `https://api.apollo.io/v1/mixed_people/match`  
  (or the current “match by email” endpoint from Apollo docs.)
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**

```json
{
  "api_key": "REPLACE_APOLLO_API_KEY",
  "email": "{{ $('Set Record & Fields').item.json.email }}"
}
```

- **Replace:** `REPLACE_APOLLO_API_KEY` with your Apollo API key (or use a credential and reference it in the node).
- **On error:** Set to “Continue” so that if enrichment fails, the workflow still responds to the webhook.

---

### 6. Apollo – Search 10 Lookalikes

- **Type:** HTTP Request
- **Method:** POST  
- **URL:** `https://api.apollo.io/v1/mixed_people/search`  
  (or the people search endpoint from Apollo docs; adjust to the exact path and parameters they show.)
- **Body (JSON):**

```json
{
  "api_key": "REPLACE_APOLLO_API_KEY",
  "q_organization_name": "{{ $json.person?.organization?.name ?? $json.organization?.name ?? '' }}",
  "person_titles": ["{{ $json.person?.title ?? $json.title ?? '' }}"],
  "page": 1,
  "per_page": 10
}
```

- **Replace:** Same Apollo API key (or credential).  
- **Note:** Parameter names may differ by Apollo version (e.g. `q_organization_name` vs `organization_name`). Check Apollo’s “People Search” docs and align these fields.
- **On error:** Continue.

---

### 7. Map Lookalikes for Supabase (Code node)

- **Type:** Code
- **Role:** Take Apollo search response (e.g. `people` array), exclude the lead’s email, take up to 10, and output one item per lookalike with the shape expected by the Supabase node.
- **Input:** Output of “Apollo – Search 10 Lookalikes” (one item with e.g. `body.people`).
- **Code (conceptual):**
  - Read `$('Set Record & Fields').first().json` (email, etc.).
  - Read `$('Apollo – Enrich Person').first().json` (company name, title).
  - Read people from `$input.first().json.people` (or the actual key from Apollo’s response).
  - Filter out the lead’s email; take first 10.
  - For each person, output:
    - `email`, `first_name`, `last_name`, `job_title` / `title`, `company_name` (from enrich), `company_size`, `seniority`, `linkedin_url`, `source: 'enrollment_lookalike'`, `source_email: <lead’s email>`.
- The exact code in `n8n-enrollment-leads-workflow.json` already does this; if Apollo returns a different shape (e.g. `people` inside a wrapper), adjust the code to use that path.

No credentials.

---

### 8. Supabase – Insert Lookalikes

- **Type:** Supabase
- **Operation:** Insert
- **Schema:** `public`
- **Table:** `expansion_opportunities`
- **Data:** Map from the Code node’s output items. Each item’s keys should match (or be mapped to) columns:
  - `email`, `first_name`, `last_name`, `job_title`, `company_name`, `company_size`, `seniority`, `linkedin_url`, `source`, `source_email`
- **Credentials:** Create a Supabase credential in N8N (project URL + service role key or anon key with insert rights). Select it in the node.

If your Supabase node only supports one row per execution, add a **Loop** over the Code node’s output and insert one row per iteration.

---

### 9. Respond to Webhook

- **Type:** Respond to Webhook
- **Respond with:** JSON
- **Body (expression):**

`{{ { success: true, message: 'Enrollment lead processed', lead_id: $json.lead_id } }}`

Ensure the node receiving the webhook payload (Set or the last step before Respond) has `lead_id` in its `$json`, or reference the correct node: e.g. `$('Set Record & Fields').item.json.lead_id`.

---

## Credentials to create in N8N

| Credential  | Used in node(s)           | Values to store                         |
|------------|----------------------------|-----------------------------------------|
| SendGrid   | SendGrid – Recovery Email  | Header: `Authorization: Bearer <key>`   |
| Apollo     | Apollo Enrich + Search     | `api_key` in body (or header if required) |
| Supabase   | Supabase – Insert Lookalikes | Project URL + Service Role (or key with insert) |

Replace every `REPLACE_*` in the workflow with your real values or credential references so nothing is left as a literal placeholder in the exported JSON.

---

## Supabase tables (reference)

- **enrollment_leads**  
  Insert from your app; webhook sends `record` (or full body) to N8N. Columns include: `id`, `email`, `first_name`, `last_name`, `created_at`, `course_slug`, `course_name`, etc.

- **expansion_opportunities**  
  One row per lookalike. Columns: `email`, `first_name`, `last_name`, `job_title`, `company_name`, `company_size`, `seniority`, `linkedin_url`, `source`, `source_email`, etc. Unique on `(email, source)`; use `source = 'enrollment_lookalike'` and `source_email` = lead email.

---

## Flow summary

1. Supabase fires webhook → **Webhook** receives POST.
2. **Set Record & Fields** normalizes payload and sets `domain`.
3. **SendGrid – Recovery Email** runs for every lead (using Set output).
4. **IF Corporate Email** on `domain`:
   - **True** → **Apollo Enrich** → **Apollo Search 10 Lookalikes** → **Map Lookalikes for Supabase** → **Supabase Insert Lookalikes** → **Respond to Webhook**.
   - **False** → **Respond to Webhook**.
5. Replace all placeholders and credentials as above, then activate the workflow and set the Supabase webhook URL to your N8N webhook path.
