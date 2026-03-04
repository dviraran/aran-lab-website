-- Aran Lab Website Database Schema
-- Run this in Supabase SQL Editor after creating your project

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Members table (linked to Supabase auth users for login)
create table public.members (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  slug text unique not null,
  name text not null,
  role text not null,
  group_type text not null check (group_type in ('pi', 'current', 'alumni', 'collaborator')),
  bio text,
  photo_url text,
  email text,
  linkedin_url text,
  twitter_url text,
  github_url text,
  scholar_url text,
  website_url text,
  orcid text,
  research_focus text,
  current_position text,
  display_order int default 100,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Research areas
create table public.research_areas (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  icon text,
  display_order int default 100
);

-- Publications
create table public.publications (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  authors text[] not null,
  journal text not null,
  year int not null,
  doi text,
  pub_type text default 'journal' check (pub_type in ('journal', 'review', 'preprint', 'conference', 'book_chapter')),
  featured boolean default false,
  tags text[] default '{}',
  added_by uuid references auth.users(id),
  created_at timestamptz default now()
);

-- News
create table public.news (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text,
  url text,
  date date not null default current_date,
  category text not null check (category in ('publication', 'presentation', 'prize', 'media', 'grant', 'welcome', 'general')),
  author_id uuid references auth.users(id),
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Software
create table public.software (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  long_description text,
  url text,
  github_url text,
  paper_doi text,
  users_count text,
  journal text,
  display_order int default 100
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

alter table public.members enable row level security;
alter table public.publications enable row level security;
alter table public.news enable row level security;
alter table public.research_areas enable row level security;
alter table public.software enable row level security;

-- Public read access (everyone can view the website)
create policy "Public read members" on public.members for select using (true);
create policy "Public read publications" on public.publications for select using (true);
create policy "Public read news" on public.news for select using (is_published = true);
create policy "Public read research_areas" on public.research_areas for select using (true);
create policy "Public read software" on public.software for select using (true);

-- Authenticated users can edit their own member profile
create policy "Members edit own profile" on public.members
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Authenticated users can create news
create policy "Members create news" on public.news
  for insert with check (auth.uid() = author_id);

-- Authenticated users can edit their own news
create policy "Members edit own news" on public.news
  for update using (auth.uid() = author_id);

-- Authenticated users can delete their own news
create policy "Members delete own news" on public.news
  for delete using (auth.uid() = author_id);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to check if user is admin (PI)
-- The admin user IDs are set in the application env vars,
-- but this function can be used for DB-level admin checks if needed.
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.members
    where user_id = auth.uid()
    and group_type = 'pi'
  );
end;
$$ language plpgsql security definer;

-- Admin policies (PI can do everything)
create policy "Admin full access members" on public.members
  for all using (public.is_admin());

create policy "Admin full access publications" on public.publications
  for all using (public.is_admin());

create policy "Admin full access news" on public.news
  for all using (public.is_admin());

create policy "Admin full access research_areas" on public.research_areas
  for all using (public.is_admin());

create policy "Admin full access software" on public.software
  for all using (public.is_admin());

-- ============================================
-- INDEXES
-- ============================================

create index idx_members_group on public.members(group_type);
create index idx_members_user on public.members(user_id);
create index idx_publications_year on public.publications(year desc);
create index idx_publications_featured on public.publications(featured) where featured = true;
create index idx_news_date on public.news(date desc);
create index idx_news_published on public.news(is_published) where is_published = true;

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger members_updated_at
  before update on public.members
  for each row execute function public.handle_updated_at();

create trigger news_updated_at
  before update on public.news
  for each row execute function public.handle_updated_at();
