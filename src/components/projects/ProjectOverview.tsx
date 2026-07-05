import {
  AlertCircle,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Database,
  Dot,
  LayoutDashboard,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

import type {
  ProjectDetail,
  ProjectDetailIcon,
} from "@/src/types/project";

type ProjectOverviewProps = {
  project: ProjectDetail;
};

const snapshotIconMap: Partial<Record<ProjectDetailIcon, typeof BadgeCheck>> = {
  "badge-check": BadgeCheck,
  "layout-dashboard": LayoutDashboard,
  workflow: Workflow,
  "clock-3": Clock3,
  "shield-check": ShieldCheck,
  database: Database,
  "settings-2": Settings2,
  users: Users,
};

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const snapshotItems = project.overview.snapshot ?? [];

  return (
    <section
      aria-labelledby="project-overview-title"
      className="mt-10 scroll-mt-32 sm:mt-12 lg:mt-[72px]"
    >
      <h2 id="project-overview-title" className="sr-only">
        Project overview
      </h2>

      <div className="grid gap-5 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.8),rgba(7,11,21,0.64))] p-6 shadow-[0_16px_40px_rgba(2,6,23,0.28),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full border border-rose-300/15 bg-rose-400/10 text-rose-300">
              <AlertCircle className="size-4" aria-hidden="true" />
            </div>
            <h3 className="text-[1.35rem] font-semibold tracking-tight text-rose-400">
              {project.overview.problemTitle}
            </h3>
          </div>
          <ul className="space-y-3.5 text-sm leading-[1.65rem] text-slate-300">
            {project.overview.problemPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <Dot
                  className="mt-1 size-5 shrink-0 text-rose-400"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.8),rgba(7,11,21,0.64))] p-6 shadow-[0_16px_40px_rgba(2,6,23,0.28),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full border border-emerald-300/15 bg-emerald-400/10 text-emerald-300">
              <Sparkles className="size-4" aria-hidden="true" />
            </div>
            <h3 className="text-[1.35rem] font-semibold tracking-tight text-emerald-400">
              {project.overview.solutionTitle}
            </h3>
          </div>
          <p className="text-sm leading-6 text-slate-300">
            {project.overview.solutionDescription}
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            {project.overview.solutionPoints.map((point) => (
              <li key={point} className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-emerald-400"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.8),rgba(7,11,21,0.64))] p-6 shadow-[0_16px_40px_rgba(2,6,23,0.24),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl md:col-span-2 xl:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full border border-violet-300/15 bg-violet-400/10 text-violet-300">
              <LayoutDashboard className="size-4" aria-hidden="true" />
            </div>
            <h3 className="text-[1.35rem] font-semibold tracking-tight text-violet-400">
              Project Overview
            </h3>
          </div>
          <dl className="space-y-4 md:space-y-3.5">
            {snapshotItems.map((item) => {
              const Icon = snapshotIconMap[item.icon] ?? BadgeCheck;

              return (
                <div
                  key={`${item.label}-${item.value}`}
                  className="grid items-start gap-2.5 border-b border-white/[0.08] pb-3.5 last:border-b-0 last:pb-0 md:grid-cols-[minmax(0,124px)_1fr] md:gap-4 md:pb-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-violet-300/90">
                      <Icon className="size-3" aria-hidden="true" />
                    </div>
                    <dt className="text-[11px] font-medium text-slate-400 sm:text-xs">
                      {item.label}
                    </dt>
                  </div>
                  <dd className="pl-[2.125rem] text-sm font-medium leading-6 text-slate-100 md:pl-0 md:leading-7">
                    {item.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </article>
      </div>
    </section>
  );
}
