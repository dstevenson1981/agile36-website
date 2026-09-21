-- Load Agile36 company brain from storefront tables + known operating facts.
-- Idempotent. Tagged source: agile36-brain-load

insert into sources (id, name, config) values
  ('shared', 'shared', '{"federated": true}'::jsonb),
  ('customers', 'customers', '{"federated": true}'::jsonb),
  ('internal', 'internal', '{"federated": false}'::jsonb)
on conflict (id) do update
  set name = excluded.name,
      config = sources.config || excluded.config;

create temporary table brain_seed (
  source_id text,
  slug text,
  type text,
  title text,
  compiled_truth text,
  frontmatter jsonb
);

insert into brain_seed (source_id, slug, type, title, compiled_truth, frontmatter) values
(
  'shared', 'companies/agile36', 'company', 'Agile36',
  $t$Agile36 sells live remote SAFe and AI certification training. CEO and founder is Deadra Stevenson, a SAFe Practice Consultant (SPC) and SAFe Silver Partner. The live storefront is agile36.com. Payments go through Stripe; enrollments live in Supabase orders. The company brain is this GBrain database. Agents should treat course dates and prices as live storefront facts (course_schedules / checkout), not invent them.$t$,
  '{"subtype":"company","domain":"agile36.com"}'::jsonb
),
(
  'shared', 'people/deadra-stevenson', 'person', 'Deadra Stevenson',
  $t$Deadra Stevenson is CEO and founder of Agile36. Brand voice profile: direct, confident, practitioner-first. Speaks from leading real transformations, not theory. Uses concrete examples. Challenges status-quo thinking. Warm but no-nonsense. Avoids corporate jargon when possible. Credentials stored in brand_voice: SAFe Practice Consultant (SPC), SAFe Silver Partner, 20+ years experience, trained 25K+ professionals, led 30+ enterprise transformations, certified 30+ AI Product Managers, Fortune 100 client experience (Amazon, Apple, Tesla, Netflix, Disney). Those figures are owner-sourced from the brand_voice row — do not invent new stats.$t$,
  '{"role":"CEO & Founder","aliases":["Deadra"]}'::jsonb
),
(
  'shared', 'companies/scaled-agile', 'company', 'Scaled Agile',
  $t$Scaled Agile is the SAFe partner. Agile36 posts upcoming public classes to the Scaled Agile class listing. There is an in-repo class-poster skill for that. Agile36 is a SAFe Silver Partner.$t$,
  '{"subtype":"org","role":"partner"}'::jsonb
),
(
  'customers', 'companies/trimont', 'company', 'Trimont',
  $t$Trimont is the active corporate account in corporate_accounts. Contact: Victoria Bradford, vbradford@trimont.com. Status: active.$t$,
  '{"subtype":"company","source_ref":"public.corporate_accounts"}'::jsonb
),
(
  'shared', 'notes/brand-voice', 'note', 'Brand voice',
  $t$Voice: direct, confident, practitioner-first. Themes: enterprise agile transformation, AI transformation, practical SAFe, AI product management, leadership in digital transformation, lean-agile mindset, scaling beyond teams, AI strategy.

Value propositions on file: live remote SAFe with real practitioners; AI Product Management via the ProductAI Framework; enterprise agile and AI transformation consulting; corporate training customized for teams.

Audience: engineering managers, directors, VPs, CTOs, Scrum Masters, Product Managers, Agile coaches, and transformation leaders at mid-to-large enterprises.

Avoid these phrases: synergy, circle back, low-hanging fruit, move the needle, at the end of the day, deep dive, paradigm shift.

Do not invent statistics. Owner-sourced figures already on file include brand_voice credentials and the SAFe catalog label "52,000+ Participants". Those two figures do not match — keep both attributed and do not pick a merged number.$t$,
  '{"kind":"playbook"}'::jsonb
),
(
  'shared', 'notes/how-we-sell', 'note', 'How Agile36 sells',
  $t$Public storefront: course pages, schedule, Stripe checkout. Corporate path exists (corporate_accounts, Trimont is the live one).

100OFF is a site banner / subscribe-modal code. A visitor subscribes on the banner to reveal it. n8n does not send the checkout discount. Do not tell anyone n8n emails them 100OFF.

Course-specific checkout caps in code (not the promo_codes table): POPM / POPM399 = $399 per seat on product-owner-manager; SASM465 = $465 per seat on advanced-scrum-master.

enrollment_leads means someone started checkout. That is not a paid student.

orders with payment_status succeeded is the live purchase record. Exam and class access come from orders, not leftover roster tables.

Site live chat today is Crisp (human widget), not an AI agent. This brain is for agents (Grok Bot first, site chat later).$t$,
  '{"kind":"playbook"}'::jsonb
),
(
  'shared', 'notes/exam-access', 'note', 'Exam access rules',
  $t$Pro practice exams: a paid order with plan = pro, plus combo resolution. Emergency email allowlists still exist in practice-exams.ts.

AI Product Management practice and final exam: owner preview emails, or a paid order whose course slug resolves to certified-ai-product-manager (including combos). AI PM orders are plan basic. certified-ai-product-manager is in PRACTICE_EXAM_COURSE_IDS.

This is not a SAFe exam. There is no AI PM exam roster table anymore.$t$,
  '{"kind":"playbook"}'::jsonb
),
(
  'shared', 'notes/data-map', 'note', 'Where live facts live',
  $t$Storefront tables stay the write path. Brain pages remember them.

- orders: paid purchases (email, name, course, plan, amount, schedule, Stripe ids)
- customers: thin person file (email, name, LinkedIn, title, company, spend, first/last purchase). About 2,045 rows; only some overlap current orders. Storefront does not read this table.
- course_schedules: live classes, dates, prices, seats
- enrollment_leads: started checkout
- email_contacts / email_campaigns / email_sends: marketing list and send log. Do not treat 66k contacts as brain people.
- brand_voice: one row, Deadra voice
- corporate_accounts: Trimont

Do not change a price, course date, or schedule unless a human explicitly asks.$t$,
  '{"kind":"playbook"}'::jsonb
);

insert into brain_seed (source_id, slug, type, title, compiled_truth, frontmatter) values
  ('shared', 'courses/leading-safe', 'project', 'AI-Empowered Leading SAFe / SAFe Agilist',
   'SAFe Agilist class. Catalog (site course-catalog.ts): $515 list, 16 hours / 2 days, skills SAFe Principles, Lean-Agile Practices, AI-empowered collaboration. Popular. Live dates and checkout price come from course_schedules — do not invent a date.',
   '{"kind":"course","course_slug":"leading-safe","category":"SAFe","catalog_list_price":515,"hours":"16 Hrs"}'::jsonb),
  ('shared', 'courses/product-owner-manager', 'project', 'AI-Empowered SAFe Product Owner/Product Manager',
   'POPM. Catalog list $545 (CLAUDE.md: POPM is $545 as of July 2026). 16 hours / 2 days. Checkout cap POPM/POPM399 can make it $399 per seat. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"product-owner-manager","category":"SAFe","catalog_list_price":545,"hours":"16 Hrs"}'::jsonb),
  ('shared', 'courses/lean-portfolio-management', 'project', 'SAFe Lean Portfolio Management',
   'LPM. Catalog list $950, 16 hours / 2 days, advanced. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"lean-portfolio-management","category":"SAFe","catalog_list_price":950,"hours":"16 Hrs"}'::jsonb),
  ('shared', 'courses/agile-product-management', 'project', 'SAFe Agile Product Management',
   'APM. Catalog list $1199, 24 hours / 3 days, advanced. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"agile-product-management","category":"SAFe","catalog_list_price":1199,"hours":"24 Hrs"}'::jsonb),
  ('shared', 'courses/safe-for-architects', 'project', 'SAFe for Architects',
   'ARCH. Catalog list $1399, 24 hours / 3 days, advanced. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"safe-for-architects","category":"SAFe","catalog_list_price":1399,"hours":"24 Hrs"}'::jsonb),
  ('shared', 'courses/scrum-master', 'project', 'AI-Empowered SAFe Scrum Master',
   'SSM. Catalog list $515, 16 hours / 2 days. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"scrum-master","category":"SAFe","catalog_list_price":515,"hours":"16 Hrs"}'::jsonb),
  ('shared', 'courses/safe-for-teams', 'project', 'AI-Empowered SAFe for Teams',
   'S4T. Catalog list $599, 16 hours / 2 days. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"safe-for-teams","category":"SAFe","catalog_list_price":599,"hours":"16 Hrs"}'::jsonb),
  ('shared', 'courses/devops', 'project', 'SAFe DevOps',
   'SDP. Catalog list $599, 16 hours / 2 days. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"devops","category":"SAFe","catalog_list_price":599,"hours":"16 Hrs"}'::jsonb),
  ('shared', 'courses/advanced-scrum-master', 'project', 'AI-Empowered SAFe Advanced Scrum Master',
   'SASM. Catalog list $599, 16 hours / 2 days. Checkout cap SASM465 can make it $465 per seat. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"advanced-scrum-master","category":"SAFe","catalog_list_price":599,"hours":"16 Hrs"}'::jsonb),
  ('shared', 'courses/release-train-engineer', 'project', 'AI-Empowered SAFe Release Train Engineer',
   'RTE. Marked privateClass in the catalog (list price 0 in catalog = not a public list price). Live dates from course_schedules.',
   '{"kind":"course","course_slug":"release-train-engineer","category":"SAFe","private_class":true,"hours":"16 Hrs"}'::jsonb),
  ('shared', 'courses/ai-driven-scrum-master', 'project', 'AI-Driven Scrum Master',
   'AI course. Catalog list $555, 10 hours / 2 days (9:00 AM–2:00 PM Eastern each day). Live dates from course_schedules.',
   '{"kind":"course","course_slug":"ai-driven-scrum-master","category":"AI Courses","catalog_list_price":555,"hours":"10 Hrs"}'::jsonb),
  ('shared', 'courses/executive-genai-leadership', 'project', 'Executive GenAI Leadership',
   'AI course. Catalog list $400, 5 hours / 1 day. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"executive-genai-leadership","category":"AI Courses","catalog_list_price":400}'::jsonb),
  ('shared', 'courses/generative-ai-project-managers', 'project', 'AI-Driven Project Manager',
   'AI course. Catalog list $400, 8 hours / 1 day. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"generative-ai-project-managers","category":"AI Courses","catalog_list_price":400}'::jsonb),
  ('shared', 'courses/certified-genai-practitioner', 'project', 'Certified GenAI Practitioner',
   'AI course. Catalog list $299, 4 hours / half day. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"certified-genai-practitioner","category":"AI Courses","catalog_list_price":299}'::jsonb),
  ('shared', 'courses/ai-agent-builder', 'project', 'No-Code AI Agents & Automation',
   'AI course. Catalog list $400, 8 hours / 2 days. Skills include GrokBot, RAG, Voice AI, Claude Code, n8n. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"ai-agent-builder","category":"AI Courses","catalog_list_price":400}'::jsonb),
  ('shared', 'courses/ai-workflow-automation', 'project', 'AI Workflow Automation',
   'AI course. Catalog list $400, 8 hours / 2 days. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"ai-workflow-automation","category":"AI Courses","catalog_list_price":400}'::jsonb),
  ('shared', 'courses/ai-app-builder', 'project', 'No-Code AI App Builder',
   'AI course. Catalog list $400, 8 hours / 2 days. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"ai-app-builder","category":"AI Courses","catalog_list_price":400}'::jsonb),
  ('shared', 'courses/certified-ai-product-manager', 'project', 'Certified AI Product Manager',
   'AI PM certification. Catalog list $400, 16 hours / 2 days. Exam access is from a paid order resolving to this slug (plan is basic). Not a SAFe exam.',
   '{"kind":"course","course_slug":"certified-ai-product-manager","category":"AI Courses","catalog_list_price":400}'::jsonb),
  ('shared', 'courses/responsible-ai', 'project', 'Responsible AI',
   'SAFe-catalog microcredential. Catalog list $350, 8 hours / 1 day. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"responsible-ai","category":"SAFe","catalog_list_price":350}'::jsonb),
  ('shared', 'courses/value-stream-mapping', 'project', 'SAFe Value Stream Mapping',
   'Catalog list $350, 4 hours / half day. Live dates from course_schedules.',
   '{"kind":"course","course_slug":"value-stream-mapping","category":"SAFe","catalog_list_price":350}'::jsonb);

insert into pages (source_id, slug, type, title, compiled_truth, frontmatter, ingested_via, ingested_at)
select source_id, slug, type, title, compiled_truth, frontmatter, 'agile36-brain-load', now()
from brain_seed
on conflict (source_id, slug) do update set
  type = excluded.type,
  title = excluded.title,
  compiled_truth = excluded.compiled_truth,
  frontmatter = excluded.frontmatter,
  ingested_via = excluded.ingested_via,
  ingested_at = excluded.ingested_at,
  updated_at = now(),
  deleted_at = null;

-- Courses that exist on the schedule board but not in the seed list
insert into pages (source_id, slug, type, title, compiled_truth, frontmatter, ingested_via, ingested_at)
select
  'shared',
  'courses/' || s.course_slug,
  'project',
  coalesce(max(s.course_name), s.course_slug),
  'Course offered on the live schedule board. Dates and prices are in course_schedules. Do not invent a session.',
  jsonb_build_object('kind', 'course', 'course_slug', s.course_slug, 'source_ref', 'public.course_schedules'),
  'agile36-brain-load',
  now()
from course_schedules s
where s.course_slug is not null and length(trim(s.course_slug)) > 0
group by s.course_slug
on conflict (source_id, slug) do nothing;

-- People from paid orders
insert into pages (source_id, slug, type, title, compiled_truth, frontmatter, ingested_via, ingested_at)
select
  'customers',
  'people/' || left(regexp_replace(lower(trim(o.customer_email)), '[^a-z0-9]+', '-', 'g'), 80),
  'person',
  coalesce(nullif(max(o.customer_name), ''), max(o.customer_email)),
  format(
    '%s <%s>. Paid student. Courses: %s. Orders: %s. Last purchase %s.',
    coalesce(nullif(max(o.customer_name), ''), 'Unknown name'),
    max(o.customer_email),
    string_agg(distinct o.course_slug, ', ' order by o.course_slug),
    count(*)::text,
    max(o.created_at)::date
  ),
  jsonb_build_object(
    'email', max(o.customer_email),
    'kind', 'buyer',
    'source_ref', 'public.orders'
  ),
  'agile36-brain-load',
  now()
from orders o
where o.payment_status = 'succeeded'
  and o.customer_email is not null
  and position('@' in o.customer_email) > 1
group by lower(trim(o.customer_email))
on conflict (source_id, slug) do update set
  title = excluded.title,
  compiled_truth = excluded.compiled_truth,
  frontmatter = pages.frontmatter || excluded.frontmatter,
  updated_at = now(),
  deleted_at = null;

-- Overlay slim customers file (name, linkedin, title, company, spend)
update pages p
set
  title = coalesce(nullif(c.name, ''), p.title),
  compiled_truth = trim(both from concat_ws(
    E'\n',
    p.compiled_truth,
    case when c.job_title is not null and length(trim(c.job_title)) > 0 then 'Title: ' || trim(c.job_title) end,
    case when c.company_name is not null and length(trim(c.company_name)) > 0 then 'Company: ' || trim(c.company_name) end,
    case when c.linkedin_url is not null and length(trim(c.linkedin_url)) > 0 then 'LinkedIn: ' || trim(c.linkedin_url) end,
    case when c.total_spend is not null then 'customers.total_spend on file: ' || c.total_spend::text end
  )),
  frontmatter = p.frontmatter || jsonb_strip_nulls(jsonb_build_object(
    'linkedin_url', nullif(trim(c.linkedin_url), ''),
    'job_title', nullif(trim(c.job_title), ''),
    'company_name', nullif(trim(c.company_name), ''),
    'customers_row', true
  )),
  updated_at = now()
from customers c
where p.source_id = 'customers'
  and p.slug = 'people/' || left(regexp_replace(lower(trim(c.email)), '[^a-z0-9]+', '-', 'g'), 80)
  and c.email is not null;

-- Historical customers with no overlapping paid-order page
insert into pages (source_id, slug, type, title, compiled_truth, frontmatter, ingested_via, ingested_at)
select
  'customers',
  'people/' || left(regexp_replace(lower(trim(c.email)), '[^a-z0-9]+', '-', 'g'), 80),
  'person',
  coalesce(nullif(c.name, ''), c.email),
  format(
    '%s <%s>. On the slim customers file (not necessarily a current orders row). Company: %s. Title: %s. LinkedIn: %s. Course slug on file: %s.',
    coalesce(nullif(c.name, ''), 'Unknown name'),
    c.email,
    coalesce(c.company_name, 'unknown'),
    coalesce(c.job_title, 'unknown'),
    coalesce(c.linkedin_url, 'none'),
    coalesce(c.course_slug, 'unknown')
  ),
  jsonb_strip_nulls(jsonb_build_object(
    'email', c.email,
    'kind', 'customer_file',
    'linkedin_url', c.linkedin_url,
    'job_title', c.job_title,
    'company_name', c.company_name,
    'source_ref', 'public.customers'
  )),
  'agile36-brain-load',
  now()
from customers c
where c.email is not null
  and position('@' in c.email) > 1
  and not exists (
    select 1 from pages p
    where p.source_id = 'customers'
      and p.slug = 'people/' || left(regexp_replace(lower(trim(c.email)), '[^a-z0-9]+', '-', 'g'), 80)
  )
on conflict (source_id, slug) do nothing;

-- Checkout starts that never became a paid-order page
insert into pages (source_id, slug, type, title, compiled_truth, frontmatter, ingested_via, ingested_at)
select
  'customers',
  'people/' || left(regexp_replace(lower(trim(l.email)), '[^a-z0-9]+', '-', 'g'), 80),
  'person',
  coalesce(nullif(trim(concat_ws(' ', max(l.first_name), max(l.last_name))), ''), max(l.email)),
  format(
    '%s <%s> started checkout for %s (%s) and does not have a paid orders page yet.',
    coalesce(nullif(trim(concat_ws(' ', max(l.first_name), max(l.last_name))), ''), 'Unknown name'),
    max(l.email),
    coalesce(max(l.course_name), max(l.course_slug), 'unknown course'),
    max(l.status)
  ),
  jsonb_build_object('email', max(l.email), 'kind', 'checkout_started', 'source_ref', 'public.enrollment_leads'),
  'agile36-brain-load',
  now()
from enrollment_leads l
where l.email is not null
  and position('@' in l.email) > 1
  and not exists (
    select 1 from pages p
    where p.source_id = 'customers'
      and p.slug = 'people/' || left(regexp_replace(lower(trim(l.email)), '[^a-z0-9]+', '-', 'g'), 80)
  )
group by lower(trim(l.email))
on conflict (source_id, slug) do nothing;

-- Companies from the customers file
insert into pages (source_id, slug, type, title, compiled_truth, frontmatter, ingested_via, ingested_at)
select
  'customers',
  'companies/' || left(regexp_replace(lower(trim(c.company_name)), '[^a-z0-9]+', '-', 'g'), 60),
  'company',
  trim(c.company_name),
  format(
    '%s appears on %s customer file row(s).',
    trim(c.company_name),
    count(*)::text
  ),
  jsonb_build_object('subtype', 'company', 'source_ref', 'public.customers'),
  'agile36-brain-load',
  now()
from customers c
where c.company_name is not null
  and length(trim(c.company_name)) > 1
group by trim(c.company_name)
on conflict (source_id, slug) do update set
  compiled_truth = excluded.compiled_truth,
  updated_at = now(),
  deleted_at = null;

-- Campaigns (object, not every send)
insert into pages (source_id, slug, type, title, compiled_truth, frontmatter, ingested_via, ingested_at)
select
  'internal',
  'campaigns/' || id::text,
  'note',
  coalesce(nullif(name, ''), 'Campaign ' || id::text),
  format(
    'Email campaign "%s". Status %s. Subject: %s. Sent count on file: %s. Created %s.',
    coalesce(name, 'untitled'),
    coalesce(status, 'unknown'),
    coalesce(subject, '(no subject)'),
    coalesce(sent_count, 0)::text,
    created_at::date
  ),
  jsonb_build_object('kind', 'campaign', 'campaign_id', id, 'status', status, 'sent_count', sent_count),
  'agile36-brain-load',
  now()
from email_campaigns
on conflict (source_id, slug) do update set
  title = excluded.title,
  compiled_truth = excluded.compiled_truth,
  frontmatter = excluded.frontmatter,
  updated_at = now(),
  deleted_at = null;

-- Timeline: paid orders
insert into timeline_entries (page_id, date, source, summary, detail)
select
  p.id,
  o.created_at::date,
  'orders',
  format('Bought %s (%s) for %s %s', coalesce(o.course_name, o.course_slug), coalesce(o.plan, 'basic'), coalesce(o.amount::text, '?'), coalesce(o.currency, 'usd')),
  format('order %s; schedule %s %s', o.id, coalesce(o.schedule_date, ''), coalesce(o.schedule_id, ''))
from orders o
join pages p
  on p.source_id = 'customers'
 and p.slug = 'people/' || left(regexp_replace(lower(trim(o.customer_email)), '[^a-z0-9]+', '-', 'g'), 80)
where o.payment_status = 'succeeded'
  and o.customer_email is not null
on conflict (page_id, date, md5(summary), source) do nothing;

-- Timeline: checkout started, only if no paid order for that email+course
insert into timeline_entries (page_id, date, source, summary, detail)
select
  p.id,
  l.created_at::date,
  'enrollment_leads',
  format('Started checkout for %s', coalesce(l.course_name, l.course_slug, 'a course')),
  format('lead %s status %s', l.id, coalesce(l.status, ''))
from enrollment_leads l
join pages p
  on p.source_id = 'customers'
 and p.slug = 'people/' || left(regexp_replace(lower(trim(l.email)), '[^a-z0-9]+', '-', 'g'), 80)
where l.email is not null
  and not exists (
    select 1 from orders o
    where o.payment_status = 'succeeded'
      and lower(trim(o.customer_email)) = lower(trim(l.email))
      and o.course_slug is not distinct from l.course_slug
  )
on conflict (page_id, date, md5(summary), source) do nothing;

-- Links: person -> course bought
insert into links (from_page_id, to_page_id, link_type, context, link_source)
select distinct
  p.id,
  c.id,
  'bought',
  coalesce(o.course_name, o.course_slug, ''),
  'manual'
from orders o
join pages p
  on p.source_id = 'customers'
 and p.slug = 'people/' || left(regexp_replace(lower(trim(o.customer_email)), '[^a-z0-9]+', '-', 'g'), 80)
join pages c
  on c.source_id = 'shared'
 and c.slug = 'courses/' || o.course_slug
where o.payment_status = 'succeeded'
  and o.course_slug is not null
on conflict do nothing;

-- Links: person -> company
insert into links (from_page_id, to_page_id, link_type, context, link_source)
select distinct
  p.id,
  co.id,
  'works_at',
  coalesce(c.job_title, ''),
  'manual'
from customers c
join pages p
  on p.source_id = 'customers'
 and p.slug = 'people/' || left(regexp_replace(lower(trim(c.email)), '[^a-z0-9]+', '-', 'g'), 80)
join pages co
  on co.source_id = 'customers'
 and co.slug = 'companies/' || left(regexp_replace(lower(trim(c.company_name)), '[^a-z0-9]+', '-', 'g'), 60)
where c.company_name is not null
  and length(trim(c.company_name)) > 1
on conflict do nothing;

insert into links (from_page_id, to_page_id, link_type, context, link_source)
select d.id, a.id, 'founded', 'CEO & Founder', 'manual'
from pages d
join pages a on a.source_id = 'shared' and a.slug = 'companies/agile36'
where d.source_id = 'shared' and d.slug = 'people/deadra-stevenson'
on conflict do nothing;

insert into links (from_page_id, to_page_id, link_type, context, link_source)
select a.id, s.id, 'partner_of', 'SAFe Silver Partner', 'manual'
from pages a
join pages s on s.source_id = 'shared' and s.slug = 'companies/scaled-agile'
where a.source_id = 'shared' and a.slug = 'companies/agile36'
on conflict do nothing;

insert into links (from_page_id, to_page_id, link_type, context, link_source)
select t.id, p.id, 'corporate_contact', 'Victoria Bradford', 'manual'
from pages t
join pages p on p.source_id = 'customers'
 and p.slug = 'people/' || left(regexp_replace(lower('vbradford@trimont.com'), '[^a-z0-9]+', '-', 'g'), 80)
where t.source_id = 'customers' and t.slug = 'companies/trimont'
on conflict do nothing;

-- Replace load-tagged facts
delete from facts where source = 'agile36-brain-load';

insert into facts (source_id, entity_slug, fact, kind, visibility, notability, source, confidence)
values
  ('shared', 'notes/how-we-sell', '100OFF is revealed by subscribing on the site banner. n8n does not send the checkout discount.', 'fact', 'world', 'high', 'agile36-brain-load', 1),
  ('shared', 'notes/how-we-sell', 'POPM/POPM399 caps product-owner-manager at $399 per seat. SASM465 caps advanced-scrum-master at $465 per seat.', 'fact', 'world', 'high', 'agile36-brain-load', 1),
  ('shared', 'notes/exam-access', 'AI PM exam access is a paid order resolving to certified-ai-product-manager. Plan on those orders is basic.', 'fact', 'world', 'high', 'agile36-brain-load', 1),
  ('shared', 'notes/exam-access', 'Pro practice exams require orders.plan = pro (plus combo resolution).', 'fact', 'world', 'high', 'agile36-brain-load', 1),
  ('shared', 'people/deadra-stevenson', 'Deadra Stevenson is CEO and founder of Agile36, SPC, SAFe Silver Partner.', 'fact', 'world', 'high', 'agile36-brain-load', 1),
  ('shared', 'notes/brand-voice', 'brand_voice says trained 25K+ professionals. SAFe catalog cards say 52,000+ Participants. Do not merge these into one number.', 'fact', 'world', 'high', 'agile36-brain-load', 1),
  ('shared', 'courses/product-owner-manager', 'POPM catalog list price is $545 as of July 2026 in CLAUDE.md / course-catalog.ts. Live checkout may differ (POPM399 cap).', 'fact', 'world', 'high', 'agile36-brain-load', 1),
  ('shared', 'companies/agile36', 'Site chat today is Crisp. This brain is for agents, not the Crisp widget.', 'fact', 'world', 'medium', 'agile36-brain-load', 1),
  ('internal', 'notes/data-map', 'customers has ~2045 rows and is not read by the storefront. orders is the live purchase record.', 'fact', 'private', 'medium', 'agile36-brain-load', 1);

insert into content_chunks (page_id, chunk_index, chunk_text, chunk_source)
select id, 0, compiled_truth, 'compiled_truth'
from pages
where deleted_at is null
  and length(compiled_truth) > 0
  and not exists (select 1 from content_chunks c where c.page_id = pages.id);

insert into ingest_log (source_id, source_type, source_ref, summary)
values ('shared', 'agile36-brain-load', 'scripts/load-company-brain.sql', 'Loaded company brain from storefront + known operating facts');
