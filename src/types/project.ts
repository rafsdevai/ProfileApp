export type ProjectCategory =
  | "food-hospitality"
  | "beauty-wellness"
  | "health-fitness"
  | "ai-healthcare"
  | "ai-education"
  | "ecommerce"
  | "business"
  | "academic";

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  "food-hospitality": "Food & Hospitality",
  "beauty-wellness": "Beauty & Wellness",
  "health-fitness": "Health & Fitness",
  "ai-healthcare": "AI Healthcare",
  "ai-education": "AI Education",
  ecommerce: "E-commerce",
  business: "Business",
  academic: "Academic",
};

export type ProjectDetailIcon =
  | "qr-code"
  | "utensils"
  | "smartphone"
  | "monitor-smartphone"
  | "layout-dashboard"
  | "shopping-cart"
  | "bar-chart-3"
  | "calendar-range"
  | "images"
  | "users"
  | "nextjs"
  | "api"
  | "clock-3"
  | "shield-check"
  | "star"
  | "lock-keyhole"
  | "search"
  | "zap"
  | "settings-2"
  | "database"
  | "workflow"
  | "scan-line"
  | "badge-check";

export type ProjectOverviewSnapshotItem = {
  readonly label: string;
  readonly value: string;
  readonly icon: ProjectDetailIcon;
};

export type ProjectOverviewSection = {
  readonly problemTitle: string;
  readonly problemPoints: readonly string[];
  readonly solutionTitle: string;
  readonly solutionDescription: string;
  readonly solutionPoints: readonly string[];
  readonly snapshot?: readonly ProjectOverviewSnapshotItem[];
};

export type ProjectScreenshot = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
};

export type ProjectFeature = {
  readonly title: string;
  readonly description: string;
  readonly icon: ProjectDetailIcon;
};

export type ProjectArchitectureItem = {
  readonly title: string;
  readonly description?: string;
  readonly icon?: ProjectDetailIcon;
};

export type ProjectTechStackGroup = {
  readonly label: string;
  readonly items: readonly string[];
};

export type ProjectChallenge = {
  readonly title: string;
  readonly description: string;
};

export type ProjectResult = {
  readonly title: string;
  readonly description: string;
};

export type ProjectCta = {
  readonly title: string;
  readonly description: string;
  readonly buttonLabel: string;
  readonly buttonHref: string;
};

export type ProjectTrustSignal = {
  readonly title: string;
  readonly description: string;
  readonly icon: ProjectDetailIcon;
};

export type ProjectSummary = {
  readonly slug: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly categoryLabel: string;
  readonly description: string;
  readonly cardImage: string;
  readonly cardImageAlt: string;
  readonly tags: readonly string[];
  readonly technologies: readonly string[];
  readonly featured?: boolean;
};

export type ProjectDetail = ProjectSummary & {
  readonly heroImage: string;
  readonly heroImageAlt: string;
  readonly heroTitleLines?: readonly string[];
  readonly liveDemoUrl?: string;
  readonly githubUrl?: string;
  readonly overview: ProjectOverviewSection;
  readonly screenshots?: readonly ProjectScreenshot[];
  readonly features?: readonly ProjectFeature[];
  readonly architecture?: readonly ProjectArchitectureItem[];
  readonly techStack?: readonly ProjectTechStackGroup[];
  readonly challenges?: readonly ProjectChallenge[];
  readonly results?: readonly ProjectResult[];
  readonly cta?: ProjectCta;
  readonly trustSignals?: readonly ProjectTrustSignal[];
};

export type Project = ProjectSummary;
