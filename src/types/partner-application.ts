export type PartnerIndustry =
  | "E-commerce"
  | "Real Estate"
  | "Healthcare"
  | "Education"
  | "Legal"
  | "Finance / Accounting"
  | "Marketing / Advertising"
  | "Hospitality / Restaurants"
  | "Technology"
  | "Construction"
  | "Other";

export type PartnerRoleOption =
  | "Freelancer / Consultant"
  | "Entrepreneur / Business Owner"
  | "Student / Junior Professional"
  | "Agency / Team Representative"
  | "Other";

export type CompanyOption =
  | "Yes, I have a company"
  | "No, I don't have a company"
  | "I'm in the process of setting one up";

export type ReferralSourceOption =
  | "LinkedIn"
  | "Instagram"
  | "Google Search"
  | "YouTube"
  | "TikTok"
  | "Friend / Colleague"
  | "Existing Client / Partner"
  | "Other";

export type ReferralPotentialOption =
  | "1-2 potential clients"
  | "3-5 potential clients"
  | "6-10 potential clients"
  | "10+ potential clients"
  | "Not sure yet";

export type PartnerApplicationData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bestDescribesYou: PartnerRoleOption | "";
  companyStatus: CompanyOption | "";
  heardAboutProgram: ReferralSourceOption | "";
  industries: PartnerIndustry[];
  clientAcquisitionPlan: string;
  potentialClients: ReferralPotentialOption | "";
  linkedInUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  xUrl: string;
  websiteUrl: string;
  additionalNotes: string;
};

export type PartnerApplicationErrors = Partial<
  Record<keyof PartnerApplicationData, string>
>;
