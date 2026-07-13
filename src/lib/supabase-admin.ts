import type {
  CommissionStatus,
  LeadRecord,
  LeadStatus,
  PartnerApplicationRecord,
  PartnerApplicationStatus,
  PartnerRecord,
} from "@/src/types/partner-program";

type JsonRecord = Record<string, unknown>;

const partnerApplicationsTable = "partner_program_applications";
const partnersTable = "partner_program_partners";
const leadsTable = "partner_program_leads";

function cleanEnvValue(value: string | undefined) {
  if (!value) {
    return value;
  }

  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function getSupabaseConfig() {
  const url = cleanEnvValue(process.env.SUPABASE_URL);
  const serviceRoleKey = cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase server environment variables are missing.");
  }

  return { url, serviceRoleKey };
}

function toQueryString(params?: Record<string, string | undefined>) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value) {
      searchParams.set(key, value);
    }
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

async function supabaseRequest<T>({
  path,
  method,
  body,
  prefer,
}: {
  path: string;
  method: "GET" | "POST" | "PATCH";
  body?: JsonRecord;
  prefer?: string;
}): Promise<T> {
  const { url, serviceRoleKey } = getSupabaseConfig();

  const response = await fetch(`${url}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Supabase request failed (${response.status}): ${errorText || "Unknown error"}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

async function supabaseRpc<T>(name: string, body: JsonRecord) {
  return supabaseRequest<T>({
    path: `rpc/${name}`,
    method: "POST",
    body,
    prefer: "return=representation",
  });
}

export type PartnerProgramApplicationInsert = {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  best_describes_you: string;
  company_status: string;
  heard_about_program: string;
  industries: string[];
  client_acquisition_plan: string;
  potential_clients: string;
  linkedin_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
  tiktok_url: string | null;
  x_url: string | null;
  website_url: string | null;
  additional_notes: string | null;
  agreement_accepted: boolean;
  notification_status: "pending" | "sent" | "failed";
  notification_error: string | null;
  resend_email_id: string | null;
  submitted_at: string;
};

type PartnerApplicationRow = PartnerProgramApplicationInsert & {
  id: string;
  created_at: string;
  status: PartnerApplicationStatus;
  reviewed_at: string | null;
  rejection_note: string | null;
};

type PartnerRow = {
  id: string;
  application_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  country_city: string | null;
  commission_percent: number;
  token_hash: string;
  token_encrypted: string;
  token_last_four: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type LeadRow = {
  id: string;
  partner_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  website: string | null;
  country_city: string | null;
  service_needed: string;
  estimated_budget: string | null;
  partner_notes: string | null;
  status: LeadStatus;
  project_value: string | null;
  client_paid_amount: string | null;
  commission_percent_snapshot: number;
  commission_amount: string | null;
  commission_status: CommissionStatus;
  internal_notes: string | null;
  submitted_at: string;
  updated_at: string;
};

export type LeadInsert = {
  partner_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  website: string | null;
  country_city: string | null;
  service_needed: string;
  estimated_budget: string | null;
  partner_notes: string | null;
  status: LeadStatus;
  project_value: string | null;
  client_paid_amount: string | null;
  commission_percent_snapshot: number;
  commission_amount: string | null;
  commission_status: CommissionStatus;
  internal_notes: string | null;
  submitted_at: string;
};

function mapApplicationRow(row: PartnerApplicationRow): PartnerApplicationRecord {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    countryCity: row.location,
    role: row.best_describes_you,
    companyStatus: row.company_status,
    discoverySource: row.heard_about_program,
    potentialClients: row.potential_clients,
    industries: row.industries,
    clientAcquisitionPlan: row.client_acquisition_plan,
    linkedinUrl: row.linkedin_url,
    instagramUrl: row.instagram_url,
    facebookUrl: row.facebook_url,
    youtubeUrl: row.youtube_url,
    tiktokUrl: row.tiktok_url,
    twitterUrl: row.x_url,
    websiteUrl: row.website_url,
    additionalInformation: row.additional_notes,
    consentGiven: row.agreement_accepted,
    status: row.status,
    rejectionNote: row.rejection_note,
    submittedAt: row.submitted_at,
    reviewedAt: row.reviewed_at,
    createdAt: row.created_at,
    notificationStatus: row.notification_status,
    notificationError: row.notification_error,
    resendEmailId: row.resend_email_id,
  };
}

function mapPartnerRow(row: PartnerRow): PartnerRecord {
  return {
    id: row.id,
    applicationId: row.application_id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    countryCity: row.country_city,
    commissionPercent: row.commission_percent,
    tokenLastFour: row.token_last_four,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapLeadRow(row: LeadRow): LeadRecord {
  return {
    id: row.id,
    partnerId: row.partner_id,
    companyName: row.company_name,
    contactName: row.contact_name,
    email: row.email,
    phone: row.phone,
    website: row.website,
    countryCity: row.country_city,
    serviceNeeded: row.service_needed,
    estimatedBudget: row.estimated_budget,
    partnerNotes: row.partner_notes,
    status: row.status,
    projectValue: row.project_value,
    clientPaidAmount: row.client_paid_amount,
    commissionPercentSnapshot: row.commission_percent_snapshot,
    commissionAmount: row.commission_amount,
    commissionStatus: row.commission_status,
    internalNotes: row.internal_notes,
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
  };
}

export async function insertPartnerProgramApplication(
  payload: PartnerProgramApplicationInsert,
) {
  const rows = await supabaseRequest<PartnerApplicationRow[]>({
    path: partnerApplicationsTable,
    method: "POST",
    body: payload,
    prefer: "return=representation",
  });

  return mapApplicationRow(rows[0]);
}

export async function updatePartnerProgramApplicationNotification(
  id: string,
  payload: {
    notification_status: "sent" | "failed";
    notification_error?: string | null;
    resend_email_id?: string | null;
  },
) {
  await supabaseRequest<void>({
    path: `${partnerApplicationsTable}?id=eq.${encodeURIComponent(id)}`,
    method: "PATCH",
    body: {
      ...payload,
      notification_error: payload.notification_error ?? null,
      resend_email_id: payload.resend_email_id ?? null,
    },
    prefer: "return=minimal",
  });
}

export async function listPartnerApplications(status?: PartnerApplicationStatus) {
  const query = toQueryString({
    select: "*",
    order: "submitted_at.desc",
    ...(status ? { status: `eq.${status}` } : {}),
  });

  const rows = await supabaseRequest<PartnerApplicationRow[]>({
    path: `${partnerApplicationsTable}${query}`,
    method: "GET",
  });

  return rows.map(mapApplicationRow);
}

export async function getPartnerApplicationById(id: string) {
  const query = toQueryString({
    select: "*",
    id: `eq.${id}`,
    limit: "1",
  });

  const rows = await supabaseRequest<PartnerApplicationRow[]>({
    path: `${partnerApplicationsTable}${query}`,
    method: "GET",
  });

  return rows[0] ? mapApplicationRow(rows[0]) : null;
}

export async function approvePartnerApplication({
  applicationId,
  commissionPercent,
  tokenHash,
  tokenEncrypted,
  tokenLastFour,
}: {
  applicationId: string;
  commissionPercent: number;
  tokenHash: string;
  tokenEncrypted: string;
  tokenLastFour: string;
}) {
  const rows = await supabaseRpc<
    Array<{
      application_id: string;
      partner_id: string;
      partner_name: string;
      partner_email: string;
      commission_percent: number;
    }>
  >("approve_partner_program_application", {
    p_application_id: applicationId,
    p_commission_percent: commissionPercent,
    p_token_hash: tokenHash,
    p_token_encrypted: tokenEncrypted,
    p_token_last_four: tokenLastFour,
  });

  return rows[0];
}

export async function rejectPartnerApplication(
  applicationId: string,
  rejectionNote?: string,
) {
  await supabaseRpc<void>("reject_partner_program_application", {
    p_application_id: applicationId,
    p_rejection_note: rejectionNote?.trim() || null,
  });
}

export async function listPartners() {
  const query = toQueryString({
    select:
      "id,application_id,full_name,email,phone,country_city,commission_percent,token_hash,token_encrypted,token_last_four,is_active,created_at,updated_at",
    order: "created_at.desc",
  });

  const rows = await supabaseRequest<PartnerRow[]>({
    path: `${partnersTable}${query}`,
    method: "GET",
  });

  return rows.map(mapPartnerRow);
}

export async function getPartnerById(id: string) {
  const query = toQueryString({
    select:
      "id,application_id,full_name,email,phone,country_city,commission_percent,token_hash,token_encrypted,token_last_four,is_active,created_at,updated_at",
    id: `eq.${id}`,
    limit: "1",
  });

  const rows = await supabaseRequest<PartnerRow[]>({
    path: `${partnersTable}${query}`,
    method: "GET",
  });

  return rows[0] ? mapPartnerRow(rows[0]) : null;
}

export async function getPartnerWithSecretsById(id: string) {
  const query = toQueryString({
    select:
      "id,application_id,full_name,email,phone,country_city,commission_percent,token_hash,token_encrypted,token_last_four,is_active,created_at,updated_at",
    id: `eq.${id}`,
    limit: "1",
  });

  const rows = await supabaseRequest<PartnerRow[]>({
    path: `${partnersTable}${query}`,
    method: "GET",
  });

  return rows[0] ?? null;
}

export async function getPartnerByTokenHash(tokenHash: string) {
  const query = toQueryString({
    select:
      "id,application_id,full_name,email,phone,country_city,commission_percent,token_hash,token_encrypted,token_last_four,is_active,created_at,updated_at",
    token_hash: `eq.${tokenHash}`,
    limit: "1",
  });

  const rows = await supabaseRequest<PartnerRow[]>({
    path: `${partnersTable}${query}`,
    method: "GET",
  });

  return rows[0] ? rows[0] : null;
}

export async function updatePartnerSettings({
  id,
  commissionPercent,
  isActive,
}: {
  id: string;
  commissionPercent: number;
  isActive: boolean;
}) {
  const rows = await supabaseRequest<PartnerRow[]>({
    path: `${partnersTable}?id=eq.${encodeURIComponent(id)}`,
    method: "PATCH",
    body: {
      commission_percent: commissionPercent,
      is_active: isActive,
    },
    prefer: "return=representation",
  });

  return mapPartnerRow(rows[0]);
}

export async function regeneratePartnerToken({
  partnerId,
  tokenHash,
  tokenEncrypted,
  tokenLastFour,
}: {
  partnerId: string;
  tokenHash: string;
  tokenEncrypted: string;
  tokenLastFour: string;
}) {
  const rows = await supabaseRpc<
    Array<{
      partner_id: string;
      partner_name: string;
      partner_email: string;
      is_active: boolean;
    }>
  >("regenerate_partner_program_token", {
    p_partner_id: partnerId,
    p_token_hash: tokenHash,
    p_token_encrypted: tokenEncrypted,
    p_token_last_four: tokenLastFour,
  });

  return rows[0];
}

export async function insertLead(payload: LeadInsert) {
  const rows = await supabaseRequest<LeadRow[]>({
    path: leadsTable,
    method: "POST",
    body: payload,
    prefer: "return=representation",
  });

  return mapLeadRow(rows[0]);
}

export async function listLeads(filters?: {
  status?: LeadStatus;
  partnerId?: string;
}) {
  const query = toQueryString({
    select: "*",
    order: "submitted_at.desc",
    ...(filters?.status ? { status: `eq.${filters.status}` } : {}),
    ...(filters?.partnerId ? { partner_id: `eq.${filters.partnerId}` } : {}),
  });

  const rows = await supabaseRequest<LeadRow[]>({
    path: `${leadsTable}${query}`,
    method: "GET",
  });

  return rows.map(mapLeadRow);
}

export async function getLeadById(id: string) {
  const query = toQueryString({
    select: "*",
    id: `eq.${id}`,
    limit: "1",
  });

  const rows = await supabaseRequest<LeadRow[]>({
    path: `${leadsTable}${query}`,
    method: "GET",
  });

  return rows[0] ? mapLeadRow(rows[0]) : null;
}

export async function updateLeadManagement({
  id,
  status,
  projectValue,
  clientPaidAmount,
  commissionAmount,
  commissionStatus,
  internalNotes,
}: {
  id: string;
  status: LeadStatus;
  projectValue: string | null;
  clientPaidAmount: string | null;
  commissionAmount: string | null;
  commissionStatus: CommissionStatus;
  internalNotes: string | null;
}) {
  const rows = await supabaseRequest<LeadRow[]>({
    path: `${leadsTable}?id=eq.${encodeURIComponent(id)}`,
    method: "PATCH",
    body: {
      status,
      project_value: projectValue,
      client_paid_amount: clientPaidAmount,
      commission_amount: commissionAmount,
      commission_status: commissionStatus,
      internal_notes: internalNotes,
    },
    prefer: "return=representation",
  });

  return mapLeadRow(rows[0]);
}
