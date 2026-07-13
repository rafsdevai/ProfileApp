export const partnerApplicationStatuses = [
  "PENDING",
  "APPROVED",
  "REJECTED",
] as const;

export const leadStatuses = [
  "NEW",
  "CONTACTED",
  "PROPOSAL_SENT",
  "WON",
  "LOST",
] as const;

export const commissionStatuses = [
  "NOT_APPLICABLE",
  "PENDING",
  "DUE",
  "PAID",
] as const;

export type PartnerApplicationStatus =
  (typeof partnerApplicationStatuses)[number];

export type LeadStatus = (typeof leadStatuses)[number];

export type CommissionStatus = (typeof commissionStatuses)[number];

export type PartnerApplicationRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  countryCity: string;
  role: string;
  companyStatus: string;
  discoverySource: string;
  potentialClients: string;
  industries: string[];
  clientAcquisitionPlan: string;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  youtubeUrl?: string | null;
  tiktokUrl?: string | null;
  twitterUrl?: string | null;
  websiteUrl?: string | null;
  additionalInformation?: string | null;
  consentGiven: boolean;
  status: PartnerApplicationStatus;
  rejectionNote?: string | null;
  submittedAt: string;
  reviewedAt?: string | null;
  createdAt: string;
  notificationStatus: "pending" | "sent" | "failed";
  notificationError?: string | null;
  resendEmailId?: string | null;
};

export type PartnerRecord = {
  id: string;
  applicationId?: string | null;
  fullName: string;
  email: string;
  phone?: string | null;
  countryCity?: string | null;
  commissionPercent: number;
  tokenLastFour: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LeadRecord = {
  id: string;
  partnerId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  website?: string | null;
  countryCity?: string | null;
  serviceNeeded: string;
  estimatedBudget?: string | null;
  partnerNotes?: string | null;
  status: LeadStatus;
  projectValue?: string | null;
  clientPaidAmount?: string | null;
  commissionPercentSnapshot: number;
  commissionAmount?: string | null;
  commissionStatus: CommissionStatus;
  internalNotes?: string | null;
  submittedAt: string;
  updatedAt: string;
};

export type PartnerLeadSubmissionData = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  countryCity: string;
  serviceNeeded: string;
  estimatedBudget: string;
  additionalContext: string;
  consentToShare: boolean;
};

export type PartnerLeadSubmissionErrors = Partial<
  Record<keyof PartnerLeadSubmissionData, string>
>;

export type LeadManagementUpdate = {
  status: LeadStatus;
  projectValue: string;
  clientPaidAmount: string;
  commissionStatus: CommissionStatus;
  internalNotes: string;
};

