alter table public.chat_conversations
  add column if not exists taken_over boolean not null default false,
  add column if not exists taken_over_at timestamptz;

create unique index if not exists chat_conversations_session_id_uidx
  on public.chat_conversations (session_id);

alter table public.chat_messages drop constraint if exists chat_messages_role_check;
alter table public.chat_messages
  add constraint chat_messages_role_check
  check (role = any (array['user'::text, 'assistant'::text, 'system'::text, 'owner'::text]));
