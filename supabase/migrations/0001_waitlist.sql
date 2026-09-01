-- Miswak Club — Phase 1 waitlist schema.
-- Run in the Supabase SQL editor, or via `supabase db push`.

create extension if not exists "pgcrypto";

create table if not exists public.waitlist_users (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (char_length(trim(first_name)) between 2 and 60),
  email text not null check (position('@' in email) > 1),
  phone text,
  country text,
  replacement_frequency text check (
    replacement_frequency in ('weekly', 'biweekly', 'monthly', 'when_needed', 'not_using')
  ),
  referral_code text not null,
  referred_by uuid references public.waitlist_users (id) on delete set null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  landing_page text,
  status text not null default 'waiting' check (status in ('waiting', 'invited', 'converted', 'unsubscribed')),
  created_at timestamptz not null default now()
);

-- Email is normalized to lowercase in the application; enforce uniqueness
-- case-insensitively so duplicates can never be created another way.
create unique index if not exists waitlist_users_email_key
  on public.waitlist_users (lower(email));

create unique index if not exists waitlist_users_referral_code_key
  on public.waitlist_users (referral_code);

create index if not exists waitlist_users_created_at_idx
  on public.waitlist_users (created_at desc);

create index if not exists waitlist_users_referred_by_idx
  on public.waitlist_users (referred_by);

create index if not exists waitlist_users_utm_source_idx
  on public.waitlist_users (utm_source);

-- Referral ledger. Kept separate from waitlist_users so future reward
-- thresholds and payouts can be added without touching signup data.
create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referral_code text not null,
  referrer_id uuid not null references public.waitlist_users (id) on delete cascade,
  referred_user_id uuid not null references public.waitlist_users (id) on delete cascade,
  status text not null default 'joined' check (status in ('joined', 'converted', 'rewarded', 'void')),
  created_at timestamptz not null default now(),
  unique (referred_user_id)
);

create index if not exists referrals_referrer_idx on public.referrals (referrer_id);

-- Row Level Security: no public policies. Every read and write happens through
-- server-side code using the service role key, which bypasses RLS. The anon
-- key therefore has no access to waitlist data even if it is exposed.
alter table public.waitlist_users enable row level security;
alter table public.referrals enable row level security;

revoke all on public.waitlist_users from anon, authenticated;
revoke all on public.referrals from anon, authenticated;
