import {
  ArrowDown,
  Database,
  HardDrive,
  Layers3,
  ServerCog,
  Users,
} from "lucide-react";

import type {
  ProjectDetail,
  ProjectDetailIcon,
} from "@/src/types/project-detail";

type ProjectArchitectureStackProps = {
  project: ProjectDetail;
};

const architectureIconMap: Partial<Record<ProjectDetailIcon, typeof Users>> = {
  users: Users,
  nextjs: Layers3,
  api: ServerCog,
  database: Database,
  "scan-line": HardDrive,
};

export function ProjectArchitectureStack({
  project,
}: ProjectArchitectureStackProps) {
  const architectureItems = project.architecture ?? [];
  const techStackGroups = project.techStack ?? [];

  if (!architectureItems.length && !techStackGroups.length) {
    return null;
  }

  return (
    <section className="mt-10 sm:mt-12 lg:mt-[72px]">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
        <article
          id="architecture"
          aria-labelledby="project-architecture-title"
          className="scroll-mt-32 rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.82),rgba(7,11,21,0.68))] p-6 shadow-[0_18px_48px_rgba(2,6,23,0.28),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl sm:p-6"
        >
          <h2
            id="project-architecture-title"
            className="text-[2rem] font-semibold tracking-tight text-white sm:text-[2.25rem]"
          >
            Architecture Overview
          </h2>

          <div className="mt-6 flex flex-col items-center">
            {architectureItems.map((item, index) => {
              const Icon = architectureIconMap[item.icon ?? "users"] ?? Users;
              const isLast = index === architectureItems.length - 1;
              const subtitle =
                item.description ??
                (index === 0
                  ? "Client requests"
                  : index === 1
                    ? "App framework"
                    : index === 2
                      ? "Business logic"
                      : index === 3
                        ? "Database layer"
                        : "Assets & files");

              return (
                <div
                  key={`${item.title}-${index}`}
                  className="flex w-full flex-col items-center"
                >
                  <div className="grid w-full grid-cols-[3rem_1fr] items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/12 bg-blue-400/10 text-blue-200">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white sm:text-[15px]">
                        {item.title}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {subtitle}
                      </div>
                    </div>
                  </div>

                  {!isLast ? (
                    <div className="flex h-8 items-center justify-center text-slate-500">
                      <ArrowDown className="size-4" aria-hidden="true" />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </article>

        <article
          id="tech-stack"
          aria-labelledby="project-tech-stack-title"
          className="scroll-mt-32 rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.82),rgba(7,11,21,0.68))] p-6 shadow-[0_18px_48px_rgba(2,6,23,0.28),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl sm:p-6"
        >
          <h2
            id="project-tech-stack-title"
            className="text-[2rem] font-semibold tracking-tight text-white sm:text-[2.25rem]"
          >
            Tech Stack
          </h2>

          <div className="mt-6 space-y-4">
            {techStackGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-sm font-semibold text-slate-200">
                  {group.label}
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span
                      key={`${group.label}-${item}`}
                      className="inline-flex min-h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 text-sm font-medium text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
