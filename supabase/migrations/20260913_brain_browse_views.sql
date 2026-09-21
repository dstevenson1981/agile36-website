-- Readable browse views for the company brain.
-- Same rows as public.pages / public.links. Not exposed on the Data API.

create schema if not exists brain;

revoke all on schema brain from public, anon, authenticated;
grant usage on schema brain to postgres, service_role;

create or replace view brain.people
with (security_invoker = true) as
select
  p.id,
  p.title as name,
  p.frontmatter->>'kind' as kind,
  p.frontmatter->>'email' as email,
  p.frontmatter->>'company_name' as company_last_known,
  p.frontmatter->>'job_title' as job_title,
  p.frontmatter->>'role' as role,
  p.frontmatter->>'linkedin_url' as linkedin,
  p.source_id as source,
  p.compiled_truth as summary,
  p.slug,
  p.updated_at
from public.pages p
where p.deleted_at is null
  and p.type = 'person';

create or replace view brain.companies
with (security_invoker = true) as
select
  p.id,
  p.title as name,
  p.frontmatter->>'subtype' as kind,
  p.frontmatter->>'domain' as domain,
  p.source_id as source,
  p.compiled_truth as summary,
  p.slug,
  p.updated_at
from public.pages p
where p.deleted_at is null
  and p.type = 'company';

create or replace view brain.courses
with (security_invoker = true) as
select
  p.id,
  p.title as name,
  p.frontmatter->>'course_slug' as course,
  p.frontmatter->>'category' as category,
  p.frontmatter->>'hours' as hours,
  p.frontmatter->>'catalog_list_price' as list_price,
  p.source_id as source,
  p.compiled_truth as summary,
  p.slug,
  p.updated_at
from public.pages p
where p.deleted_at is null
  and p.type = 'project'
  and p.slug like 'courses/%';

create or replace view brain.notes
with (security_invoker = true) as
select
  p.id,
  p.title as name,
  case
    when p.slug like 'campaigns/%' then 'campaign'
    else coalesce(p.frontmatter->>'kind', 'note')
  end as kind,
  p.frontmatter->>'status' as status,
  nullif(p.frontmatter->>'sent_count', '')::int as emails_sent,
  p.source_id as source,
  p.compiled_truth as summary,
  p.slug,
  p.updated_at
from public.pages p
where p.deleted_at is null
  and p.type = 'note';

create or replace view brain.links
with (security_invoker = true) as
select
  l.id,
  f.title as from_name,
  f.type as from_type,
  l.link_type as relationship,
  t.title as to_name,
  t.type as to_type,
  f.slug as from_slug,
  t.slug as to_slug,
  l.created_at
from public.links l
join public.pages f
  on f.id = l.from_page_id
 and f.deleted_at is null
join public.pages t
  on t.id = l.to_page_id
 and t.deleted_at is null;

comment on schema brain is 'Company brain, split into normal tables for browsing.';
comment on view brain.people is 'Instructors, paid students, checkout starts, and the Wix-era customer file. company_last_known is last-known employer, not current.';
comment on view brain.companies is 'Agile36, partners, corporate accounts, and employers on file.';
comment on view brain.courses is 'Catalog courses. Live dates and checkout prices stay on course_schedules.';
comment on view brain.notes is 'Playbooks plus email campaign names. Filter kind = playbook or campaign.';
comment on view brain.links is 'Who teaches, bought, works at, founded, or is a partner of whom.';

revoke all on all tables in schema brain from public, anon, authenticated;
grant select on all tables in schema brain to postgres, service_role;
