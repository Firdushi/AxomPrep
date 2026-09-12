create extension if not exists "pgcrypto";

create type public.user_role as enum ('user','admin');
create type public.content_type as enum ('note','gk','current_affairs','test');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role public.user_role not null default 'user',
  preferred_language text not null default 'en' check (preferred_language in ('en','as')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_as text,
  slug text unique not null,
  type public.content_type not null default 'note',
  created_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_en text not null,
  title_as text,
  excerpt_en text,
  excerpt_as text,
  content_en text not null default '',
  content_as text not null default '',
  category_id uuid references public.categories(id) on delete set null,
  pdf_path text,
  published boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  question_en text not null,
  question_as text,
  options jsonb not null,
  correct_index integer not null check (correct_index >= 0),
  explanation_en text,
  explanation_as text,
  category_id uuid references public.categories(id) on delete set null,
  difficulty text not null default 'medium' check (difficulty in ('easy','medium','hard')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.tests (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_as text,
  description_en text,
  description_as text,
  duration_minutes integer not null default 30 check (duration_minutes > 0),
  published boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.test_questions (
  test_id uuid not null references public.tests(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  position integer not null,
  primary key (test_id, question_id),
  unique (test_id, position)
);

create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  test_id uuid not null references public.tests(id) on delete cascade,
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  score integer not null default 0,
  total integer not null default 0,
  answers jsonb not null default '{}'::jsonb
);

create table public.bookmarks (
  user_id uuid not null references public.profiles(id) on delete cascade,
  note_id uuid not null references public.notes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, note_id)
);

create table public.current_affairs (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_as text,
  content_en text not null,
  content_as text,
  event_date date not null default current_date,
  source_name text,
  source_url text,
  published boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index notes_category_idx on public.notes(category_id);
create index notes_published_idx on public.notes(published);
create index questions_category_idx on public.questions(category_id);
create index tests_published_idx on public.tests(published);
create index attempts_user_idx on public.attempts(user_id);
create index current_affairs_date_idx on public.current_affairs(event_date desc);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.notes enable row level security;
alter table public.questions enable row level security;
alter table public.tests enable row level security;
alter table public.test_questions enable row level security;
alter table public.attempts enable row level security;
alter table public.bookmarks enable row level security;
alter table public.current_affairs enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create policy "profiles own read" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles own update" on public.profiles for update using (id = auth.uid() or public.is_admin());

create policy "categories public read" on public.categories for select using (true);
create policy "categories admin write" on public.categories for all using (public.is_admin()) with check (public.is_admin());

create policy "notes public published read" on public.notes for select using (published = true or public.is_admin());
create policy "notes admin write" on public.notes for all using (public.is_admin()) with check (public.is_admin());

create policy "questions public read" on public.questions for select using (true);
create policy "questions admin write" on public.questions for all using (public.is_admin()) with check (public.is_admin());

create policy "tests public published read" on public.tests for select using (published = true or public.is_admin());
create policy "tests admin write" on public.tests for all using (public.is_admin()) with check (public.is_admin());

create policy "test questions public read" on public.test_questions for select using (
  exists(select 1 from public.tests t where t.id = test_id and (t.published = true or public.is_admin()))
);
create policy "test questions admin write" on public.test_questions for all using (public.is_admin()) with check (public.is_admin());

create policy "attempts own read" on public.attempts for select using (user_id = auth.uid() or public.is_admin());
create policy "attempts own insert" on public.attempts for insert with check (user_id = auth.uid());
create policy "attempts own update" on public.attempts for update using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());

create policy "bookmarks own all" on public.bookmarks for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "current affairs public published read" on public.current_affairs for select using (published = true or public.is_admin());
create policy "current affairs admin write" on public.current_affairs for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('notes-pdfs', 'notes-pdfs', false)
on conflict (id) do nothing;

create policy "pdf admin insert" on storage.objects for insert to authenticated
with check (bucket_id = 'notes-pdfs' and public.is_admin());

create policy "pdf admin update" on storage.objects for update to authenticated
using (bucket_id = 'notes-pdfs' and public.is_admin());

create policy "pdf admin delete" on storage.objects for delete to authenticated
using (bucket_id = 'notes-pdfs' and public.is_admin());
