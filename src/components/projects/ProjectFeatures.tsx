import {
  CalendarRange,
  ImageIcon,
  LayoutDashboard,
  LockKeyhole,
  MonitorSmartphone,
  Search,
  ShieldCheck,
  Star,
  Utensils,
  Zap,
} from "lucide-react";

import type {
  ProjectDetail,
  ProjectDetailIcon,
} from "@/src/types/project-detail";

type ProjectFeaturesProps = {
  project: ProjectDetail;
};

const featureIconMap: Partial<Record<ProjectDetailIcon, typeof MonitorSmartphone>> = {
  "monitor-smartphone": MonitorSmartphone,
  utensils: Utensils,
  "calendar-range": CalendarRange,
  images: ImageIcon,
  star: Star,
  "layout-dashboard": LayoutDashboard,
  "lock-keyhole": LockKeyhole,
  search: Search,
  "shield-check": ShieldCheck,
  zap: Zap,
};

export function ProjectFeatures({ project }: ProjectFeaturesProps) {
  const features = project.features ?? [];

  if (!features.length) {
    return null;
  }

  return (
    <section
      id="features"
      aria-labelledby="project-features-title"
      className="mt-10 scroll-mt-32 sm:mt-12 lg:mt-[72px]"
    >
      <div className="max-w-2xl">
        <h2
          id="project-features-title"
          className="text-[2rem] font-semibold tracking-tight text-white sm:text-[2.25rem]"
        >
          Key Features
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
          Everything in one platform
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = featureIconMap[feature.icon] ?? Zap;

          return (
            <article
              key={feature.title}
              className="group rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.82),rgba(7,11,21,0.68))] p-4 shadow-[0_16px_40px_rgba(2,6,23,0.26),inset_0_1px_0_rgba(255,255,255,0.03)] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:border-violet-400/18 hover:shadow-[0_18px_42px_rgba(76,29,149,0.1),0_16px_36px_rgba(2,6,23,0.28)] md:p-4 xl:p-5"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-blue-200 transition duration-300 group-hover:border-blue-400/20 group-hover:text-violet-200">
                <Icon className="size-[1.375rem]" aria-hidden="true" />
              </div>

              <h3 className="mt-4 text-[1.02rem] font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
