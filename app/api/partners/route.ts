import { NextResponse } from "next/server";

import {
  formatPartnerApplicationHtml,
  formatPartnerApplicationText,
  validatePartnerApplication,
} from "@/src/lib/partners";
import {
  consumeRateLimit,
  getClientIpFromHeaders,
  retryAfterSeconds,
} from "@/src/lib/rate-limit";
import {
  insertPartnerProgramApplication,
  updatePartnerProgramApplicationNotification,
} from "@/src/lib/supabase-admin";
import type { PartnerApplicationData } from "@/src/types/partner-application";

const resendApiUrl = "https://api.resend.com/emails";

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

export async function POST(request: Request) {
  const clientIp = getClientIpFromHeaders(request.headers);
  const rateLimitResult = consumeRateLimit({
    namespace: "partner-application-submit",
    identifier: clientIp,
    limit: 5,
    windowMs: 30 * 60 * 1000,
  });

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        message: `Too many applications from this connection. Please try again in about ${retryAfterSeconds(rateLimitResult.retryAfterMs)} seconds.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds(rateLimitResult.retryAfterMs)),
        },
      },
    );
  }

  let payload: PartnerApplicationData;

  try {
    payload = (await request.json()) as PartnerApplicationData;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const validation = validatePartnerApplication(payload);

  if (Object.keys(validation.errors).length > 0) {
    return NextResponse.json(
      {
        message: "Please fix the highlighted fields and try again.",
        fieldErrors: validation.errors,
      },
      { status: 400 },
    );
  }

  const resendApiKey = cleanEnvValue(process.env.RESEND_API_KEY);
  const toEmail =
    cleanEnvValue(process.env.PARTNER_PROGRAM_TO_EMAIL) ?? "rafs.dev.ai@gmail.com";
  const fromEmail = cleanEnvValue(process.env.PARTNER_PROGRAM_FROM_EMAIL);

  if (!resendApiKey || !fromEmail) {
    return NextResponse.json(
      {
        message:
          "Partner Program submissions are not configured yet. Please set the required email and Supabase environment variables.",
      },
      { status: 503 },
    );
  }

  let submission;

  try {
    submission = await insertPartnerProgramApplication({
      full_name: validation.values.fullName,
      email: validation.values.email,
      phone: validation.values.phone,
      location: validation.values.location,
      best_describes_you: validation.values.bestDescribesYou,
      company_status: validation.values.companyStatus,
      heard_about_program: validation.values.heardAboutProgram,
      industries: validation.values.industries,
      client_acquisition_plan: validation.values.clientAcquisitionPlan,
      potential_clients: validation.values.potentialClients,
      linkedin_url: validation.values.linkedInUrl || null,
      instagram_url: validation.values.instagramUrl || null,
      facebook_url: validation.values.facebookUrl || null,
      youtube_url: validation.values.youtubeUrl || null,
      tiktok_url: validation.values.tiktokUrl || null,
      x_url: validation.values.xUrl || null,
      website_url: validation.values.websiteUrl || null,
      additional_notes: validation.values.additionalNotes || null,
      agreement_accepted: false,
      notification_status: "pending",
      notification_error: null,
      resend_email_id: null,
      submitted_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to save partner application to Supabase:", error);

    return NextResponse.json(
      {
        message:
          "We couldn't save your application right now. Please try again later.",
      },
      { status: 502 },
    );
  }

  const response = await fetch(resendApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: validation.values.email,
      subject: `New Partner Program Application - ${validation.values.fullName}`,
      text: formatPartnerApplicationText(validation.values),
      html: formatPartnerApplicationHtml(validation.values),
    }),
  });

  if (!response.ok) {
    const resendError = await response.text();

    console.error("Resend email request failed:", resendError);

    await updatePartnerProgramApplicationNotification(submission.id, {
      notification_status: "failed",
      notification_error: `Resend request failed with status ${response.status}: ${resendError}`,
    }).catch(() => undefined);

    return NextResponse.json(
      {
        message:
          "Your application was saved, but we couldn't send the email notification right now.",
      },
      { status: 502 },
    );
  }

  const resendPayload = (await response.json()) as { id?: string };

  await updatePartnerProgramApplicationNotification(submission.id, {
    notification_status: "sent",
    resend_email_id: resendPayload.id ?? null,
  }).catch(() => undefined);

  return NextResponse.json({
    message:
      "Application sent successfully. We'll get back to you within 2 business days.",
  });
}
