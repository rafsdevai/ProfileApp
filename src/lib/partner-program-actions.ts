"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  clearAdminSession,
  createAdminSession,
  requireAdminSession,
  verifyAdminCredentials,
} from "@/src/lib/admin-auth";
import { sendEmail } from "@/src/lib/email";
import {
  buildPartnerLeadUrl,
  calculateCommissionAmount,
  cleanEnvValue,
  createPartnerToken,
  formatNewLeadAdminEmailHtml,
  formatNewLeadAdminEmailText,
  formatPartnerApprovedEmailHtml,
  formatPartnerApprovedEmailText,
  getAppBaseUrl,
  hashPartnerToken,
  normalizeLeadManagementUpdate,
  resolveCommissionStatus,
  validateLeadSubmission,
} from "@/src/lib/partner-program";
import {
  consumeRateLimit,
  getClientIpFromHeaders,
  resetRateLimit,
  retryAfterSeconds,
} from "@/src/lib/rate-limit";
import {
  approvePartnerApplication,
  getLeadById,
  getPartnerApplicationById,
  getPartnerById,
  getPartnerByTokenHash,
  insertLead,
  regeneratePartnerToken,
  rejectPartnerApplication,
  updateLeadManagement,
  updatePartnerSettings,
} from "@/src/lib/supabase-admin";
import type {
  LeadStatus,
  PartnerLeadSubmissionData,
} from "@/src/types/partner-program";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getOptionalMoneyValue(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export async function adminLoginAction(formData: FormData) {
  const requestHeaders = await headers();
  const clientIp = getClientIpFromHeaders(requestHeaders);
  const rateLimitResult = consumeRateLimit({
    namespace: "admin-login",
    identifier: clientIp,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimitResult.allowed) {
    redirect(
      `/admin/login?error=rate-limited&retryAfter=${retryAfterSeconds(rateLimitResult.retryAfterMs)}`,
    );
  }

  const email = getString(formData, "email");
  const password = getString(formData, "password");

  if (!verifyAdminCredentials(email, password)) {
    redirect("/admin/login?error=invalid");
  }

  resetRateLimit("admin-login", clientIp);
  await createAdminSession(email);
  redirect("/admin/applications");
}

export async function adminLogoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function approveApplicationAction(formData: FormData) {
  await requireAdminSession();

  const applicationId = getString(formData, "applicationId");
  const commissionPercent = Number.parseInt(getString(formData, "commissionPercent"), 10);

  if (!applicationId || Number.isNaN(commissionPercent)) {
    redirect(`/admin/applications/${applicationId}?error=invalid-approval`);
  }

  const application = await getPartnerApplicationById(applicationId);

  if (!application) {
    redirect("/admin/applications?error=application-not-found");
  }

  const token = createPartnerToken();

  let approvalResult;

  try {
    approvalResult = await approvePartnerApplication({
      applicationId,
      commissionPercent,
      tokenHash: token.tokenHash,
      tokenEncrypted: token.tokenEncrypted,
      tokenLastFour: token.tokenLastFour,
    });
  } catch (error) {
    console.error("Failed to approve partner application:", error);
    redirect(`/admin/applications/${applicationId}?error=approve-failed`);
  }

  const leadUrl = buildPartnerLeadUrl(token.rawToken);

  try {
    await sendEmail({
      to: approvalResult.partner_email,
      subject: "Welcome to the Rafael.Dev Partner Program",
      html: formatPartnerApprovedEmailHtml({
        partnerName: approvalResult.partner_name,
        commissionPercent: approvalResult.commission_percent,
        leadUrl,
      }),
      text: formatPartnerApprovedEmailText({
        partnerName: approvalResult.partner_name,
        commissionPercent: approvalResult.commission_percent,
        leadUrl,
      }),
    });
  } catch (error) {
    console.error("Failed to send partner approval email:", error);
    revalidatePath("/admin/applications");
    revalidatePath("/admin/partners");
    redirect(`/admin/partners/${approvalResult.partner_id}?warning=email-failed`);
  }

  revalidatePath("/admin/applications");
  revalidatePath("/admin/partners");
  redirect(`/admin/partners/${approvalResult.partner_id}?success=approved`);
}

export async function rejectApplicationAction(formData: FormData) {
  await requireAdminSession();

  const applicationId = getString(formData, "applicationId");
  const rejectionNote = getString(formData, "rejectionNote");

  if (!applicationId) {
    redirect("/admin/applications?error=application-not-found");
  }

  try {
    await rejectPartnerApplication(applicationId, rejectionNote);
  } catch (error) {
    console.error("Failed to reject partner application:", error);
    redirect(`/admin/applications/${applicationId}?error=reject-failed`);
  }

  revalidatePath("/admin/applications");
  redirect(`/admin/applications/${applicationId}?success=rejected`);
}

export async function updatePartnerAction(formData: FormData) {
  await requireAdminSession();

  const partnerId = getString(formData, "partnerId");
  const commissionPercent = Number.parseInt(getString(formData, "commissionPercent"), 10);
  const isActive = getString(formData, "isActive") === "true";

  if (!partnerId || Number.isNaN(commissionPercent)) {
    redirect(`/admin/partners/${partnerId}?error=invalid-partner-update`);
  }

  try {
    await updatePartnerSettings({
      id: partnerId,
      commissionPercent,
      isActive,
    });
  } catch (error) {
    console.error("Failed to update partner settings:", error);
    redirect(`/admin/partners/${partnerId}?error=update-failed`);
  }

  revalidatePath("/admin/partners");
  redirect(`/admin/partners/${partnerId}?success=updated`);
}

export async function regeneratePartnerTokenAction(formData: FormData) {
  await requireAdminSession();

  const partnerId = getString(formData, "partnerId");
  const shouldSendEmail = getString(formData, "sendEmail") === "true";

  if (!partnerId) {
    redirect("/admin/partners?error=partner-not-found");
  }

  const partner = await getPartnerById(partnerId);

  if (!partner) {
    redirect("/admin/partners?error=partner-not-found");
  }

  const token = createPartnerToken();

  try {
    await regeneratePartnerToken({
      partnerId,
      tokenHash: token.tokenHash,
      tokenEncrypted: token.tokenEncrypted,
      tokenLastFour: token.tokenLastFour,
    });
  } catch (error) {
    console.error("Failed to regenerate partner token:", error);
    redirect(`/admin/partners/${partnerId}?error=token-regeneration-failed`);
  }

  const leadUrl = buildPartnerLeadUrl(token.rawToken);

  if (shouldSendEmail) {
    try {
      await sendEmail({
        to: partner.email,
        subject: "Welcome to the Rafael.Dev Partner Program",
        html: formatPartnerApprovedEmailHtml({
          partnerName: partner.fullName,
          commissionPercent: partner.commissionPercent,
          leadUrl,
        }),
        text: formatPartnerApprovedEmailText({
          partnerName: partner.fullName,
          commissionPercent: partner.commissionPercent,
          leadUrl,
        }),
      });
    } catch (error) {
      console.error("Failed to send regenerated partner token email:", error);
      revalidatePath("/admin/partners");
      redirect(`/admin/partners/${partnerId}?warning=email-failed`);
    }
  }

  revalidatePath("/admin/partners");
  redirect(`/admin/partners/${partnerId}?success=token-regenerated`);
}

export async function updateLeadAction(formData: FormData) {
  await requireAdminSession();

  const leadId = getString(formData, "leadId");
  const normalized = normalizeLeadManagementUpdate({
    status: getString(formData, "status") as LeadStatus,
    projectValue: getString(formData, "projectValue"),
    clientPaidAmount: getString(formData, "clientPaidAmount"),
    commissionStatus: getString(formData, "commissionStatus") as never,
    internalNotes: getString(formData, "internalNotes"),
  });

  if (!leadId) {
    redirect("/admin/leads?error=lead-not-found");
  }

  const lead = await getLeadById(leadId);

  if (!lead) {
    redirect("/admin/leads?error=lead-not-found");
  }

  const commissionAmount = calculateCommissionAmount(
    normalized.clientPaidAmount,
    lead.commissionPercentSnapshot,
  );
  const commissionStatus = resolveCommissionStatus(
    normalized.commissionStatus,
    normalized.clientPaidAmount,
  );

  try {
    await updateLeadManagement({
      id: leadId,
      status: normalized.status,
      projectValue: getOptionalMoneyValue(normalized.projectValue),
      clientPaidAmount: getOptionalMoneyValue(normalized.clientPaidAmount),
      commissionAmount,
      commissionStatus,
      internalNotes: normalized.internalNotes || null,
    });
  } catch (error) {
    console.error("Failed to update lead management state:", error);
    redirect(`/admin/leads/${leadId}?error=update-failed`);
  }

  revalidatePath("/admin/leads");
  redirect(`/admin/leads/${leadId}?success=updated`);
}

export async function submitPartnerLeadAction(
  token: string,
  values: PartnerLeadSubmissionData,
) {
  const requestHeaders = await headers();
  const clientIp = getClientIpFromHeaders(requestHeaders);
  const rateLimitResult = consumeRateLimit({
    namespace: "partner-lead-submit",
    identifier: `${clientIp}:${hashPartnerToken(token)}`,
    limit: 10,
    windowMs: 60 * 60 * 1000,
  });

  if (!rateLimitResult.allowed) {
    return {
      ok: false as const,
      fieldErrors: {},
      message: `Too many lead submissions from this connection. Please try again in about ${retryAfterSeconds(rateLimitResult.retryAfterMs)} seconds.`,
    };
  }

  const validation = validateLeadSubmission(values);

  if (Object.keys(validation.errors).length > 0) {
    return {
      ok: false as const,
      fieldErrors: validation.errors,
      message: "Please fix the highlighted fields and try again.",
    };
  }

  const tokenHash = hashPartnerToken(token);
  const partner = await getPartnerByTokenHash(tokenHash);

  if (!partner || !partner.is_active) {
    return {
      ok: false as const,
      fieldErrors: {},
      message: "This private link is invalid or no longer active.",
    };
  }

  let createdLead;

  try {
    createdLead = await insertLead({
      partner_id: partner.id,
      company_name: validation.values.companyName,
      contact_name: validation.values.contactName,
      email: validation.values.email,
      phone: validation.values.phone || null,
      website: validation.values.website || null,
      country_city: validation.values.countryCity || null,
      service_needed: validation.values.serviceNeeded,
      estimated_budget: validation.values.estimatedBudget || null,
      partner_notes: validation.values.additionalContext || null,
      status: "NEW",
      project_value: null,
      client_paid_amount: null,
      commission_percent_snapshot: partner.commission_percent,
      commission_amount: null,
      commission_status: "NOT_APPLICABLE",
      internal_notes: null,
      submitted_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to insert partner lead:", error);
    return {
      ok: false as const,
      fieldErrors: {},
      message: "We couldn't save this lead right now. Please try again in a moment.",
    };
  }

  const toEmail =
    cleanEnvValue(process.env.PARTNER_PROGRAM_TO_EMAIL) ?? "rafs.dev.ai@gmail.com";
  const leadDetailsUrl = `${getAppBaseUrl()}/admin/leads/${createdLead.id}`;

  try {
    await sendEmail({
      to: toEmail,
      subject: `New Partner Lead - ${createdLead.companyName}`,
      html: formatNewLeadAdminEmailHtml({
        partnerName: partner.full_name,
        companyName: createdLead.companyName,
        contactName: createdLead.contactName,
        serviceNeeded: createdLead.serviceNeeded,
        estimatedBudget: createdLead.estimatedBudget,
        leadDetailsUrl,
      }),
      text: formatNewLeadAdminEmailText({
        partnerName: partner.full_name,
        companyName: createdLead.companyName,
        contactName: createdLead.contactName,
        serviceNeeded: createdLead.serviceNeeded,
        estimatedBudget: createdLead.estimatedBudget,
        leadDetailsUrl,
      }),
      replyTo: createdLead.email,
    });
  } catch (error) {
    console.error("Failed to send new partner lead email:", error);
  }

  revalidatePath("/admin/leads");

  return {
    ok: true as const,
    fieldErrors: {},
    message: "Lead submitted successfully. Thanks for the referral.",
  };
}

export async function submitPartnerLeadFormAction(token: string, formData: FormData) {
  return submitPartnerLeadAction(token, {
    companyName: getString(formData, "companyName"),
    contactName: getString(formData, "contactName"),
    email: getString(formData, "email"),
    phone: getString(formData, "phone"),
    website: getString(formData, "website"),
    countryCity: getString(formData, "countryCity"),
    serviceNeeded: getString(formData, "serviceNeeded"),
    estimatedBudget: getString(formData, "estimatedBudget"),
    additionalContext: getString(formData, "additionalContext"),
    consentToShare: getString(formData, "consentToShare") === "on",
  });
}
