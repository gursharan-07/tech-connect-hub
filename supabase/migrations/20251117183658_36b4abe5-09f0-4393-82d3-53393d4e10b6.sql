-- Create enum for user roles (Developer/Learner)
create type public.user_role as enum ('developer', 'learner');

-- Create enum for app roles (for security)
create type public.app_role as enum ('user', 'admin');

-- Create profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  location text,
  bio text,
  avatar_url text,
  user_role public.user_role,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create tech_stacks table for many-to-many relationship
create table public.tech_stacks (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

-- Create user_tech_stacks junction table
create table public.user_tech_stacks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  tech_stack_id uuid references public.tech_stacks(id) on delete cascade,
  unique(user_id, tech_stack_id)
);

-- Create learning_goals table
create table public.learning_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  goal text not null,
  created_at timestamptz default now()
);

-- Create project_interests table
create table public.project_interests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  interest text not null,
  created_at timestamptz default now()
);

-- Create user_roles table for security
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null default 'user',
  unique (user_id, role)
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.tech_stacks enable row level security;
alter table public.user_tech_stacks enable row level security;
alter table public.learning_goals enable row level security;
alter table public.project_interests enable row level security;
alter table public.user_roles enable row level security;

-- Create security definer function
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- RLS Policies for profiles
create policy "Users can view all profiles"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- RLS Policies for tech_stacks (public read)
create policy "Anyone can view tech stacks"
  on public.tech_stacks for select
  using (true);

-- RLS Policies for user_tech_stacks
create policy "Users can view all user tech stacks"
  on public.user_tech_stacks for select
  using (true);

create policy "Users can manage own tech stacks"
  on public.user_tech_stacks for all
  using (auth.uid() = user_id);

-- RLS Policies for learning_goals
create policy "Users can view all learning goals"
  on public.learning_goals for select
  using (true);

create policy "Users can manage own learning goals"
  on public.learning_goals for all
  using (auth.uid() = user_id);

-- RLS Policies for project_interests
create policy "Users can view all project interests"
  on public.project_interests for select
  using (true);

create policy "Users can manage own project interests"
  on public.project_interests for all
  using (auth.uid() = user_id);

-- RLS Policies for user_roles
create policy "Users can view own role"
  on public.user_roles for select
  using (auth.uid() = user_id);

-- Create function to handle new user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');
  
  return new;
end;
$$;

-- Trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger for profiles updated_at
create trigger on_profile_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();