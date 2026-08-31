-- Live shared POPM class board (Mural-style stickies).
create table if not exists public.workshop_notes (
  id uuid primary key default gen_random_uuid(),
  board_id text not null,
  activity_id text not null,
  body text not null default '',
  author_label text,
  color text not null default 'amber',
  x double precision not null default 40,
  y double precision not null default 40,
  z_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workshop_notes_board_activity_idx
  on public.workshop_notes (board_id, activity_id);

alter table public.workshop_notes enable row level security;

drop policy if exists workshop_notes_select on public.workshop_notes;
drop policy if exists workshop_notes_insert on public.workshop_notes;
drop policy if exists workshop_notes_update on public.workshop_notes;
drop policy if exists workshop_notes_delete on public.workshop_notes;

create policy workshop_notes_select on public.workshop_notes
  for select to anon, authenticated
  using (board_id = 'popm');

create policy workshop_notes_insert on public.workshop_notes
  for insert to anon, authenticated
  with check (board_id = 'popm');

create policy workshop_notes_update on public.workshop_notes
  for update to anon, authenticated
  using (board_id = 'popm')
  with check (board_id = 'popm');

create policy workshop_notes_delete on public.workshop_notes
  for delete to anon, authenticated
  using (board_id = 'popm');

alter table public.workshop_notes replica identity full;

grant select, insert, update, delete on table public.workshop_notes to anon, authenticated;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'workshop_notes'
  ) then
    alter publication supabase_realtime add table public.workshop_notes;
  end if;
end $$;
