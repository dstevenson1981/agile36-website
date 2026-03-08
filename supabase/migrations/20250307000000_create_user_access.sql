-- Practice exam access control: links users to course access (free vs pro)
create table user_access (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  course_id text not null,
  plan_type text not null default 'free', -- 'free' or 'pro'
  created_at timestamp with time zone default now(),
  unique(user_id, course_id)
);

-- Only the user can read their own access rows
alter table user_access enable row level security;
create policy "Users can view own access" on user_access
  for select using (auth.uid() = user_id);
