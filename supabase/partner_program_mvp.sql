create extension if not exists pgcrypto;

alter table if exists public.partner_program_applications
  add column if not exists status text not null default 'PENDING'
    check (status in ('PENDING', 'APPROVED', 'REJECTED')),
  add column if not exists reviewed_at timestamptz,
  add column if not exists rejection_note text;

create index if not exists partner_program_applications_status_idx
  on public.partner_program_applications (status, submitted_at desc);

create table if not exists public.partner_program_partners (
  id uuid primary key default gen_random_uuid(),
  application_id uuid unique references public.partner_program_applications(id) on delete set null,
  full_name text not null,
  email text not null unique,
  phone text,
  country_city text,
  commission_percent integer not null default 10
    check (commission_percent between 10 and 20),
  token_hash text not null unique,
  token_encrypted text not null,
  token_last_four text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists partner_program_partners_email_idx
  on public.partner_program_partners (email);

create index if not exists partner_program_partners_active_idx
  on public.partner_program_partners (is_active, created_at desc);

create table if not exists public.partner_program_leads (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partner_program_partners(id) on delete cascade,
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  website text,
  country_city text,
  service_needed text not null,
  estimated_budget numeric(12, 2),
  partner_notes text,
  status text not null default 'NEW'
    check (status in ('NEW', 'CONTACTED', 'PROPOSAL_SENT', 'WON', 'LOST')),
  project_value numeric(12, 2),
  client_paid_amount numeric(12, 2),
  commission_percent_snapshot integer not null
    check (commission_percent_snapshot between 10 and 20),
  commission_amount numeric(12, 2),
  commission_status text not null default 'NOT_APPLICABLE'
    check (commission_status in ('NOT_APPLICABLE', 'PENDING', 'DUE', 'PAID')),
  internal_notes text,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists partner_program_leads_partner_idx
  on public.partner_program_leads (partner_id, submitted_at desc);

create index if not exists partner_program_leads_status_idx
  on public.partner_program_leads (status, submitted_at desc);

create or replace function public.set_partner_program_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists partner_program_partners_set_updated_at
  on public.partner_program_partners;

create trigger partner_program_partners_set_updated_at
before update on public.partner_program_partners
for each row
execute function public.set_partner_program_updated_at();

drop trigger if exists partner_program_leads_set_updated_at
  on public.partner_program_leads;

create trigger partner_program_leads_set_updated_at
before update on public.partner_program_leads
for each row
execute function public.set_partner_program_updated_at();

create or replace function public.approve_partner_program_application(
  p_application_id uuid,
  p_commission_percent integer,
  p_token_hash text,
  p_token_encrypted text,
  p_token_last_four text
)
returns table (
  application_id uuid,
  partner_id uuid,
  partner_name text,
  partner_email text,
  commission_percent integer
)
language plpgsql
as $$
declare
  v_application public.partner_program_applications%rowtype;
  v_partner public.partner_program_partners%rowtype;
begin
  if p_commission_percent < 10 or p_commission_percent > 20 then
    raise exception 'Commission percent must be between 10 and 20.';
  end if;

  select *
  into v_application
  from public.partner_program_applications
  where id = p_application_id
  for update;

  if not found then
    raise exception 'Application not found.';
  end if;

  if v_application.status = 'APPROVED' then
    raise exception 'This application has already been approved.';
  end if;

  if v_application.status = 'REJECTED' then
    raise exception 'Rejected applications cannot be approved.';
  end if;

  if exists (
    select 1
    from public.partner_program_partners as existing_partner
    where existing_partner.application_id = p_application_id
       or existing_partner.email = v_application.email
  ) then
    raise exception 'A partner already exists for this application or email.';
  end if;

  update public.partner_program_applications
  set status = 'APPROVED',
      reviewed_at = now(),
      rejection_note = null
  where id = p_application_id;

  insert into public.partner_program_partners (
    application_id,
    full_name,
    email,
    phone,
    country_city,
    commission_percent,
    token_hash,
    token_encrypted,
    token_last_four,
    is_active
  )
  values (
    v_application.id,
    v_application.full_name,
    v_application.email,
    v_application.phone,
    v_application.location,
    p_commission_percent,
    p_token_hash,
    p_token_encrypted,
    p_token_last_four,
    true
  )
  returning *
  into v_partner;

  return query
  select
    v_application.id,
    v_partner.id,
    v_partner.full_name,
    v_partner.email,
    v_partner.commission_percent;
end;
$$;

create or replace function public.reject_partner_program_application(
  p_application_id uuid,
  p_rejection_note text default null
)
returns void
language plpgsql
as $$
declare
  v_status text;
begin
  select status
  into v_status
  from public.partner_program_applications
  where id = p_application_id
  for update;

  if not found then
    raise exception 'Application not found.';
  end if;

  if v_status = 'APPROVED' then
    raise exception 'Approved applications cannot be rejected.';
  end if;

  update public.partner_program_applications
  set status = 'REJECTED',
      reviewed_at = now(),
      rejection_note = p_rejection_note
  where id = p_application_id;
end;
$$;

create or replace function public.regenerate_partner_program_token(
  p_partner_id uuid,
  p_token_hash text,
  p_token_encrypted text,
  p_token_last_four text
)
returns table (
  partner_id uuid,
  partner_name text,
  partner_email text,
  is_active boolean
)
language plpgsql
as $$
declare
  v_partner public.partner_program_partners%rowtype;
begin
  update public.partner_program_partners
  set token_hash = p_token_hash,
      token_encrypted = p_token_encrypted,
      token_last_four = p_token_last_four,
      updated_at = now()
  where id = p_partner_id
  returning *
  into v_partner;

  if not found then
    raise exception 'Partner not found.';
  end if;

  return query
  select v_partner.id, v_partner.full_name, v_partner.email, v_partner.is_active;
end;
$$;
