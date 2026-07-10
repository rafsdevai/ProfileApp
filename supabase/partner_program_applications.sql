create extension if not exists pgcrypto;

create table if not exists public.partner_program_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  submitted_at timestamptz not null default now(),

  full_name text not null,
  email text not null,
  phone text not null,
  location text not null,
  best_describes_you text not null,
  company_status text not null,
  heard_about_program text not null,
  industries text[] not null default '{}',
  client_acquisition_plan text not null,
  potential_clients text not null,

  linkedin_url text,
  instagram_url text,
  facebook_url text,
  youtube_url text,
  tiktok_url text,
  x_url text,
  website_url text,
  additional_notes text,

  agreement_accepted boolean not null default false,

  notification_status text not null default 'pending'
    check (notification_status in ('pending', 'sent', 'failed')),
  notification_error text,
  resend_email_id text
);

create index if not exists partner_program_applications_created_at_idx
  on public.partner_program_applications (created_at desc);

create index if not exists partner_program_applications_email_idx
  on public.partner_program_applications (email);

