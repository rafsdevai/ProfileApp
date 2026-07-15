import type {
  CompanyOption,
  PartnerApplicationData,
  PartnerApplicationErrors,
  PartnerIndustry,
  PartnerRoleOption,
  ReferralPotentialOption,
  ReferralSourceOption,
} from "@/src/types/partner-application";

export const partnerRoleOptions: readonly PartnerRoleOption[] = [
  "Freelancer / Consultant",
  "Entrepreneur / Business Owner",
  "Student / Junior Professional",
  "Agency / Team Representative",
  "Other",
] as const;

export const companyOptions: readonly CompanyOption[] = [
  "Yes, I have a company",
  "No, I don't have a company",
  "I'm in the process of setting one up",
] as const;

export const referralSourceOptions: readonly ReferralSourceOption[] = [
  "LinkedIn",
  "Instagram",
  "Google Search",
  "YouTube",
  "TikTok",
  "Friend / Colleague",
  "Existing Client / Partner",
  "Other",
] as const;

export const partnerIndustryOptions: readonly PartnerIndustry[] = [
  "E-commerce",
  "Real Estate",
  "Healthcare",
  "Education",
  "Legal",
  "Finance / Accounting",
  "Marketing / Advertising",
  "Hospitality / Restaurants",
  "Technology",
  "Construction",
  "Other",
] as const;

export const referralPotentialOptions: readonly ReferralPotentialOption[] = [
  "1-2 potential clients",
  "3-5 potential clients",
  "6-10 potential clients",
  "10+ potential clients",
  "Not sure yet",
] as const;

export const partnerApplicationInitialValues: PartnerApplicationData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  bestDescribesYou: "",
  companyStatus: "",
  heardAboutProgram: "",
  industries: [],
  clientAcquisitionPlan: "",
  potentialClients: "",
  linkedInUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
  tiktokUrl: "",
  xUrl: "",
  websiteUrl: "",
  additionalNotes: "",
};

const urlFields: Array<keyof PartnerApplicationData> = [
  "linkedInUrl",
  "instagramUrl",
  "facebookUrl",
  "youtubeUrl",
  "tiktokUrl",
  "xUrl",
  "websiteUrl",
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value: string) {
  return URL.canParse(value);
}

function normalizeString(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizePartnerApplicationData(
  values: PartnerApplicationData,
): PartnerApplicationData {
  return {
    ...values,
    fullName: normalizeString(values.fullName),
    email: values.email.trim(),
    phone: normalizeString(values.phone),
    location: normalizeString(values.location),
    clientAcquisitionPlan: values.clientAcquisitionPlan.trim(),
    linkedInUrl: values.linkedInUrl.trim(),
    instagramUrl: values.instagramUrl.trim(),
    facebookUrl: values.facebookUrl.trim(),
    youtubeUrl: values.youtubeUrl.trim(),
    tiktokUrl: values.tiktokUrl.trim(),
    xUrl: values.xUrl.trim(),
    websiteUrl: values.websiteUrl.trim(),
    additionalNotes: values.additionalNotes.trim(),
  };
}

export function validatePartnerApplication(
  rawValues: PartnerApplicationData,
): {
  values: PartnerApplicationData;
  errors: PartnerApplicationErrors;
} {
  const values = normalizePartnerApplicationData(rawValues);
  const errors: PartnerApplicationErrors = {};

  if (!values.fullName) {
    errors.fullName = "Full Name is required.";
  }

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.phone) {
    errors.phone = "Phone / WhatsApp is required.";
  }

  if (!values.location) {
    errors.location = "Country / City is required.";
  }

  if (!values.bestDescribesYou) {
    errors.bestDescribesYou = "Please choose the option that describes you best.";
  }

  if (!values.companyStatus) {
    errors.companyStatus = "Please tell us if you have a company.";
  }

  if (!values.heardAboutProgram) {
    errors.heardAboutProgram =
      "Please tell us how you heard about the Partner Program.";
  }

  if (!values.industries.length) {
    errors.industries = "Select at least one industry.";
  }

  if (!values.clientAcquisitionPlan) {
    errors.clientAcquisitionPlan =
      "Please describe how you plan to bring us clients.";
  }

  if (!values.potentialClients) {
    errors.potentialClients =
      "Please estimate how many potential clients you can refer.";
  }

  for (const field of urlFields) {
    const fieldValue = values[field];

    if (typeof fieldValue === "string" && fieldValue && !isValidUrl(fieldValue)) {
      errors[field] = "Please enter a valid URL.";
    }
  }

  return { values, errors };
}

export function formatPartnerApplicationText(values: PartnerApplicationData) {
  return [
    "New Partner Program application",
    "",
    `Full Name: ${values.fullName}`,
    `Email: ${values.email}`,
    `Phone / WhatsApp: ${values.phone}`,
    `Country / City: ${values.location}`,
    `What best describes you?: ${values.bestDescribesYou}`,
    `Do you have a company?: ${values.companyStatus}`,
    `How did you hear about our Partner Program?: ${values.heardAboutProgram}`,
    `Industries: ${values.industries.join(", ")}`,
    `How do you plan to bring us clients?: ${values.clientAcquisitionPlan}`,
    `Potential clients in next 3 months: ${values.potentialClients}`,
    `LinkedIn: ${values.linkedInUrl || "-"}`,
    `Instagram: ${values.instagramUrl || "-"}`,
    `Facebook: ${values.facebookUrl || "-"}`,
    `YouTube: ${values.youtubeUrl || "-"}`,
    `TikTok: ${values.tiktokUrl || "-"}`,
    `X (Twitter): ${values.xUrl || "-"}`,
    `Website / platform: ${values.websiteUrl || "-"}`,
    `Anything else?: ${values.additionalNotes || "-"}`,
  ].join("\n");
}

export function formatPartnerApplicationHtml(values: PartnerApplicationData) {
  const profileRows: Array<[string, string]> = [
    ["Full Name", values.fullName],
    ["Email", values.email],
    ["Phone / WhatsApp", values.phone],
    ["Country / City", values.location],
    ["Role", values.bestDescribesYou],
    ["Company Status", values.companyStatus],
  ];

  const referralRows: Array<[string, string]> = [
    ["Referral Source", values.heardAboutProgram],
    ["Industries", values.industries.join(", ")],
    ["Potential Clients", values.potentialClients],
    ["Acquisition Plan", values.clientAcquisitionPlan],
  ];

  const presenceRows: Array<[string, string]> = [
    ["LinkedIn", values.linkedInUrl || "-"],
    ["Instagram", values.instagramUrl || "-"],
    ["Facebook", values.facebookUrl || "-"],
    ["YouTube", values.youtubeUrl || "-"],
    ["TikTok", values.tiktokUrl || "-"],
    ["X (Twitter)", values.xUrl || "-"],
    ["Website / platform", values.websiteUrl || "-"],
  ];

  const notesRows: Array<[string, string]> = [
    ["Additional Notes", values.additionalNotes || "-"],
  ];

  const linkLabels = new Set([
    "Email",
    "LinkedIn",
    "Instagram",
    "Facebook",
    "YouTube",
    "TikTok",
    "X (Twitter)",
    "Website / platform",
  ]);

  const escapeHtml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const renderValue = (label: string, value: string) => {
    const safeValue = escapeHtml(value || "-");

    if (label === "Email" && value && value !== "-") {
      return `<a href="mailto:${safeValue}" style="color:#2563eb;text-decoration:none;">${safeValue}</a>`;
    }

    if (linkLabels.has(label) && value && value !== "-") {
      return `<a href="${safeValue}" style="color:#2563eb;text-decoration:none;" target="_blank" rel="noreferrer noopener">${safeValue}</a>`;
    }

    return safeValue.replaceAll("\n", "<br />");
  };

  const topHighlights: Array<[string, string]> = [
    ["Contact", escapeHtml(values.email)],
    ["Role", escapeHtml(values.bestDescribesYou)],
    ["Potential", escapeHtml(values.potentialClients)],
  ];

  const renderRows = (rows: Array<[string, string]>) =>
    rows
      .map(
        ([label, value], index) => `
          <tr>
            <td style="padding:14px 16px;border-top:1px solid #e2e8f0;background:${index % 2 === 0 ? "#f8fafc" : "#ffffff"};width:34%;vertical-align:top;font-size:13px;line-height:1.5;font-weight:700;color:#334155;">
              ${escapeHtml(label)}
            </td>
            <td style="padding:14px 16px;border-top:1px solid #e2e8f0;background:${index % 2 === 0 ? "#f8fafc" : "#ffffff"};vertical-align:top;font-size:14px;line-height:1.7;color:#0f172a;">
              ${renderValue(label, value)}
            </td>
          </tr>
        `,
      )
      .join("");

  const renderSection = (title: string, subtitle: string, rows: Array<[string, string]>) => `
    <div style="margin-top:24px;">
      <div style="margin-bottom:10px;">
        <div style="font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6366f1;">${title}</div>
        <div style="margin-top:4px;font-size:13px;line-height:1.6;color:#64748b;">${subtitle}</div>
      </div>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
        <tbody>
          ${renderRows(rows)}
        </tbody>
      </table>
    </div>
  `;

  return `
    <div style="margin:0;padding:32px 0;background-color:#f3f6fb;font-family:Inter,Arial,sans-serif;color:#0f172a;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        <tbody>
          <tr>
            <td align="center" style="padding:0 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:860px;border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;box-shadow:0 24px 80px rgba(15,23,42,0.08);">
                <tbody>
                  <tr>
                    <td style="padding:28px 32px;background:linear-gradient(135deg,#081121 0%,#101a35 55%,#1d1b46 100%);">
                      <div style="display:inline-block;padding:7px 12px;border:1px solid rgba(147,197,253,0.22);border-radius:999px;background:rgba(255,255,255,0.04);font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#bfdbfe;">
                        Partner Program
                      </div>
                      <h1 style="margin:18px 0 10px;font-size:32px;line-height:1.15;font-weight:800;color:#ffffff;">
                        New Partner Application
                      </h1>
                      <p style="margin:0;font-size:15px;line-height:1.7;color:#cbd5e1;">
                        ${escapeHtml(values.fullName)} submitted a new partner application.
                      </p>
                      <div style="margin-top:18px;">
                        <a href="mailto:${escapeHtml(values.email)}" style="display:inline-block;padding:12px 16px;border-radius:14px;background:linear-gradient(135deg,#2563eb,#7c3aed);font-size:13px;font-weight:700;color:#ffffff;text-decoration:none;">
                          Reply to applicant
                        </a>
                      </div>
                      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px;border-collapse:separate;border-spacing:10px 0;">
                        <tbody>
                          <tr>
                            ${topHighlights
                              .map(
                                ([label, value]) => `
                                  <td style="padding:12px 14px;border:1px solid rgba(255,255,255,0.08);border-radius:16px;background:rgba(255,255,255,0.05);min-width:140px;">
                                    <div style="font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#93c5fd;">${label}</div>
                                    <div style="margin-top:6px;font-size:14px;line-height:1.5;font-weight:600;color:#ffffff;">${value}</div>
                                  </td>
                                `,
                              )
                              .join("")}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:28px 32px 32px;">
                      ${renderSection(
                        "Applicant Profile",
                        "Core identity and direct contact details.",
                        profileRows,
                      )}
                      ${renderSection(
                        "Referral Context",
                        "Opportunity source, verticals and expected pipeline.",
                        referralRows,
                      )}
                      ${renderSection(
                        "Online Presence",
                        "Public profiles and external links shared by the applicant.",
                        presenceRows,
                      )}
                      ${renderSection(
                        "Notes",
                        "Extra context submitted with the form.",
                        notesRows,
                      )}
                      <div style="margin-top:18px;font-size:12px;line-height:1.6;color:#64748b;">
                        Sent automatically from the Rafael.Dev Partner Program form.
                      </div>
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
