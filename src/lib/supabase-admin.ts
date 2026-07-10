type JsonRecord = Record<string, unknown>;

const partnerApplicationsTable = "partner_program_applications";

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

export type PartnerProgramApplicationRow = PartnerProgramApplicationInsert & {
  id: string;
  created_at: string;
};

export async function insertPartnerProgramApplication(
  payload: PartnerProgramApplicationInsert,
) {
  const rows = await supabaseRequest<PartnerProgramApplicationRow[]>({
    path: partnerApplicationsTable,
    method: "POST",
    body: payload,
    prefer: "return=representation",
  });

  return rows[0];
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
