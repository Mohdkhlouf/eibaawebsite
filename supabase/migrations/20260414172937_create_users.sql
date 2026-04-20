create table public.users(
    id uuid primary key default gen_random_uuid(),
    email text not null unique,
    password text not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
)

