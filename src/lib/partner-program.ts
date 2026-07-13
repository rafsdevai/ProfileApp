import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

import type {
  CommissionStatus,
  LeadManagementUpdate,
  PartnerLeadSubmissionData,
  PartnerLeadSubmissionErrors,
} from "../types/partner-program";

const maxTextLengths = {
  companyName: 120,
  contactName: 120,
  email: 180,
  phone: 40,
  website: 220,
  countryCity: 120,
  serviceNeeded: 180,
  estimatedBudget: 40,
  additionalContext: 2000,
  internalNotes: 3000,
};

export function cleanEnvValue(value: string | undefined) {
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

function normalizeString(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value: string) {
  return URL.canParse(value);
}

export function createPartnerToken() {
  const rawToken = randomBytes(32).toString("base64url");
  return {
    rawToken,
    tokenHash: hashPartnerToken(rawToken),
    tokenEncrypted: encryptPartnerToken(rawToken),
    tokenLastFour: rawToken.slice(-4),
  };
}

export function hashPartnerToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function getPartnerTokenEncryptionKey() {
  const rawValue = cleanEnvValue(process.env.PARTNER_TOKEN_ENCRYPTION_KEY);

  if (!rawValue) {
    throw new Error(
      "PARTNER_TOKEN_ENCRYPTION_KEY is missing. It must be a 32-byte hex or base64 string.",
    );
  }

  const hexPattern = /^[0-9a-fA-F]{64}$/;

  if (hexPattern.test(rawValue)) {
    return Buffer.from(rawValue, "hex");
  }

  const base64Buffer = Buffer.from(rawValue, "base64");

  if (base64Buffer.length !== 32) {
    throw new Error(
      "PARTNER_TOKEN_ENCRYPTION_KEY must decode to exactly 32 bytes.",
    );
  }

  return base64Buffer;
}

export function encryptPartnerToken(token: string) {
  const iv = randomBytes(12);
  const key = getPartnerTokenEncryptionKey();
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return Buffer.concat([iv, authTag, encrypted]).toString("base64url");
}

export function decryptPartnerToken(value: string) {
  const payload = Buffer.from(value, "base64url");
  const iv = payload.subarray(0, 12);
  const authTag = payload.subarray(12, 28);
  const encrypted = payload.subarray(28);
  const key = getPartnerTokenEncryptionKey();
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}

export function buildPartnerLeadUrl(token: string) {
  const baseUrl =
    cleanEnvValue(process.env.NEXT_PUBLIC_SITE_URL) ??
    cleanEnvValue(process.env.SITE_URL) ??
    "http://localhost:3001";

  return `${baseUrl.replace(/\/$/, "")}/partners/submit-lead/${token}`;
}

export function normalizeLeadSubmissionData(
  values: PartnerLeadSubmissionData,
): PartnerLeadSubmissionData {
  return {
    companyName: normalizeString(values.companyName),
    contactName: normalizeString(values.contactName),
    email: values.email.trim(),
    phone: normalizeString(values.phone),
    website: values.website.trim(),
    countryCity: normalizeString(values.countryCity),
    serviceNeeded: normalizeString(values.serviceNeeded),
    estimatedBudget: normalizeString(values.estimatedBudget),
    additionalContext: values.additionalContext.trim(),
    consentToShare: values.consentToShare,
  };
}

function validateMaxLength(
  value: string,
  maxLength: number,
  message: string,
  errors: PartnerLeadSubmissionErrors,
  field: keyof PartnerLeadSubmissionData,
) {
  if (value.length > maxLength) {
    errors[field] = message;
  }
}

export function validateLeadSubmission(
  rawValues: PartnerLeadSubmissionData,
): {
  values: PartnerLeadSubmissionData;
  errors: PartnerLeadSubmissionErrors;
} {
  const values = normalizeLeadSubmissionData(rawValues);
  const errors: PartnerLeadSubmissionErrors = {};

  if (!values.companyName) {
    errors.companyName = "Company name is required.";
  }

  if (!values.contactName) {
    errors.contactName = "Contact person is required.";
  }

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.serviceNeeded) {
    errors.serviceNeeded = "Service needed is required.";
  }

  if (values.website && !isValidUrl(values.website)) {
    errors.website = "Please enter a valid URL.";
  }

  if (!values.consentToShare) {
    errors.consentToShare =
      "You must confirm that you have permission to share these contact details.";
  }

  validateMaxLength(
    values.companyName,
    maxTextLengths.companyName,
    "Company name is too long.",
    errors,
    "companyName",
  );
  validateMaxLength(
    values.contactName,
    maxTextLengths.contactName,
    "Contact name is too long.",
    errors,
    "contactName",
  );
  validateMaxLength(
    values.email,
    maxTextLengths.email,
    "Email is too long.",
    errors,
    "email",
  );
  validateMaxLength(
    values.phone,
    maxTextLengths.phone,
    "Phone number is too long.",
    errors,
    "phone",
  );
  validateMaxLength(
    values.website,
    maxTextLengths.website,
    "Website URL is too long.",
    errors,
    "website",
  );
  validateMaxLength(
    values.countryCity,
    maxTextLengths.countryCity,
    "Country / City is too long.",
    errors,
    "countryCity",
  );
  validateMaxLength(
    values.serviceNeeded,
    maxTextLengths.serviceNeeded,
    "Service needed is too long.",
    errors,
    "serviceNeeded",
  );
  validateMaxLength(
    values.estimatedBudget,
    maxTextLengths.estimatedBudget,
    "Estimated budget is too long.",
    errors,
    "estimatedBudget",
  );
  validateMaxLength(
    values.additionalContext,
    maxTextLengths.additionalContext,
    "Additional context is too long.",
    errors,
    "additionalContext",
  );

  return { values, errors };
}

function normalizeMoneyInput(value: string) {
  return value.trim().replace(",", ".");
}

export function parseMoneyToCents(value: string) {
  const normalized = normalizeMoneyInput(value);

  if (!normalized) {
    return null;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const [whole, decimal = ""] = normalized.split(".");
  return Number.parseInt(whole, 10) * 100 + Number.parseInt(decimal.padEnd(2, "0"), 10);
}

export function centsToMoneyString(value: number) {
  const sign = value < 0 ? "-" : "";
  const absoluteValue = Math.abs(value);
  const whole = Math.floor(absoluteValue / 100);
  const decimal = absoluteValue % 100;
  return `${sign}${whole}.${decimal.toString().padStart(2, "0")}`;
}

export function calculateCommissionAmount(
  clientPaidAmount: string,
  commissionPercentSnapshot: number,
) {
  const cents = parseMoneyToCents(clientPaidAmount);

  if (cents === null || cents <= 0) {
    return null;
  }

  const commissionCents = Math.round((cents * commissionPercentSnapshot) / 100);
  return centsToMoneyString(commissionCents);
}

export function normalizeLeadManagementUpdate(
  input: LeadManagementUpdate,
): LeadManagementUpdate {
  return {
    status: input.status,
    projectValue: normalizeMoneyInput(input.projectValue),
    clientPaidAmount: normalizeMoneyInput(input.clientPaidAmount),
    commissionStatus: input.commissionStatus,
    internalNotes: input.internalNotes.trim(),
  };
}

export function resolveCommissionStatus(
  status: CommissionStatus,
  clientPaidAmount: string,
) {
  const cents = parseMoneyToCents(clientPaidAmount);

  if (cents === null || cents <= 0) {
    return "NOT_APPLICABLE" as const;
  }

  return status === "PAID" ? "PAID" : status === "DUE" ? "DUE" : "PENDING";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function formatPartnerApprovedEmailHtml({
  partnerName,
  commissionPercent,
  leadUrl,
}: {
  partnerName: string;
  commissionPercent: number;
  leadUrl: string;
}) {
  return `
    <div style="margin:0;padding:32px 0;background:#f3f6fb;font-family:Inter,Arial,sans-serif;color:#0f172a;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        <tbody>
          <tr>
            <td align="center" style="padding:0 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:760px;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;background:#ffffff;box-shadow:0 24px 80px rgba(15,23,42,0.08);">
                <tbody>
                  <tr>
                    <td style="padding:28px 32px;background:linear-gradient(135deg,#081121 0%,#101a35 55%,#1d1b46 100%);">
                      <div style="display:inline-block;padding:7px 12px;border:1px solid rgba(147,197,253,0.22);border-radius:999px;background:rgba(255,255,255,0.04);font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#bfdbfe;">
                        Rafael.Dev Partner Program
                      </div>
                      <h1 style="margin:18px 0 10px;font-size:30px;line-height:1.12;font-weight:800;color:#ffffff;">
                        Welcome to the Rafael.Dev Partner Program
                      </h1>
                      <p style="margin:0;font-size:15px;line-height:1.7;color:#cbd5e1;">
                        Hi ${escapeHtml(partnerName)}, your application has been approved.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:28px 32px 32px;">
                      <p style="margin:0 0 14px;font-size:15px;line-height:1.8;color:#334155;">
                        Your default commission rate is <strong>${commissionPercent}%</strong>.
                      </p>
                      <p style="margin:0 0 14px;font-size:15px;line-height:1.8;color:#334155;">
                        Use the private referral form below whenever you want to submit a lead. Please keep this URL private and do not share it with anyone else.
                      </p>
                      <div style="margin:20px 0;padding:18px;border:1px solid #dbeafe;border-radius:18px;background:#eff6ff;">
                        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#2563eb;">
                          Private Lead Submission URL
                        </div>
                        <div style="margin-top:10px;word-break:break-all;font-size:14px;line-height:1.7;color:#0f172a;">
                          <a href="${escapeHtml(leadUrl)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(leadUrl)}</a>
                        </div>
                      </div>
                      <p style="margin:0 0 14px;font-size:15px;line-height:1.8;color:#334155;">
                        Referral flow: submit the lead, we take over discovery and proposal, and your commission is calculated from the amount actually paid by the client.
                      </p>
                      <p style="margin:0;font-size:14px;line-height:1.8;color:#64748b;">
                        Questions? Please contact <a href="mailto:rafs.dev.ai@gmail.com" style="color:#2563eb;text-decoration:none;">rafs.dev.ai@gmail.com</a>.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

export function formatPartnerApprovedEmailText({
  partnerName,
  commissionPercent,
  leadUrl,
}: {
  partnerName: string;
  commissionPercent: number;
  leadUrl: string;
}) {
  return [
    `Hi ${partnerName},`,
    "",
    "Welcome to the Rafael.Dev Partner Program.",
    `Your default commission rate is ${commissionPercent}%.`,
    "",
    "Use the private referral form below whenever you want to submit a lead:",
    leadUrl,
    "",
    "Please keep this URL private and do not share it.",
    "",
    "Referral flow: submit the lead, we take over discovery and proposal, and your commission is calculated from the amount actually paid by the client.",
    "",
    "Questions? Please contact rafs.dev.ai@gmail.com.",
  ].join("\n");
}

export function formatNewLeadAdminEmailHtml({
  partnerName,
  companyName,
  contactName,
  serviceNeeded,
  estimatedBudget,
  leadDetailsUrl,
}: {
  partnerName: string;
  companyName: string;
  contactName: string;
  serviceNeeded: string;
  estimatedBudget?: string | null;
  leadDetailsUrl: string;
}) {
  return `
    <div style="margin:0;padding:32px 0;background:#f3f6fb;font-family:Inter,Arial,sans-serif;color:#0f172a;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        <tbody>
          <tr>
            <td align="center" style="padding:0 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:760px;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;background:#ffffff;">
                <tbody>
                  <tr>
                    <td style="padding:28px 32px;background:linear-gradient(135deg,#081121 0%,#101a35 55%,#1d1b46 100%);">
                      <div style="display:inline-block;padding:7px 12px;border:1px solid rgba(147,197,253,0.22);border-radius:999px;background:rgba(255,255,255,0.04);font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#bfdbfe;">
                        New Partner Lead
                      </div>
                      <h1 style="margin:18px 0 0;font-size:30px;line-height:1.12;font-weight:800;color:#ffffff;">
                        ${escapeHtml(companyName)}
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:28px 32px 32px;">
                      <p style="margin:0 0 8px;font-size:15px;color:#334155;"><strong>Partner:</strong> ${escapeHtml(partnerName)}</p>
                      <p style="margin:0 0 8px;font-size:15px;color:#334155;"><strong>Contact:</strong> ${escapeHtml(contactName)}</p>
                      <p style="margin:0 0 8px;font-size:15px;color:#334155;"><strong>Service:</strong> ${escapeHtml(serviceNeeded)}</p>
                      <p style="margin:0 0 20px;font-size:15px;color:#334155;"><strong>Estimated budget:</strong> ${escapeHtml(estimatedBudget || "-")}</p>
                      <a href="${escapeHtml(leadDetailsUrl)}" style="display:inline-block;padding:12px 16px;border-radius:14px;background:linear-gradient(135deg,#2563eb,#7c3aed);font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;">
                        Open lead details
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

export function formatNewLeadAdminEmailText({
  partnerName,
  companyName,
  contactName,
  serviceNeeded,
  estimatedBudget,
  leadDetailsUrl,
}: {
  partnerName: string;
  companyName: string;
  contactName: string;
  serviceNeeded: string;
  estimatedBudget?: string | null;
  leadDetailsUrl: string;
}) {
  return [
    `New Partner Lead - ${companyName}`,
    "",
    `Partner: ${partnerName}`,
    `Contact: ${contactName}`,
    `Service: ${serviceNeeded}`,
    `Estimated budget: ${estimatedBudget || "-"}`,
    `Lead details: ${leadDetailsUrl}`,
  ].join("\n");
}
