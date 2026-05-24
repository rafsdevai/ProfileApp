"use client";

import type { CSSProperties, PointerEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BotMessageSquare,
  Dumbbell,
  ExternalLink,
  Github,
  QrCode,
  Store,
} from "lucide-react";

import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProjectTone = "violet" | "blue" | "cyan" | "purple";

type ProjectCopy = {
  title: string;
  category: string;
  statement: string;
  stack: readonly string[];
  githubHref?: string;
  liveHref?: string;
  caseStudyHref?: string;
};

type ProjectMeta = {
  icon: LucideIcon;
  tone: ProjectTone;
  featured?: boolean;
};

const projectMeta: ProjectMeta[] = [
  {
    icon: BotMessageSquare,
    tone: "blue",
    featured: true,
  },
  {
    icon: Dumbbell,
    tone: "violet",
  },
  {
    icon: Store,
    tone: "cyan",
  },
  {
    icon: QrCode,
    tone: "purple",
  },
];

const toneClasses = {
  violet:
    "from-fuchsia-500/14 via-violet-500/7 to-blue-950/8 text-fuchsia-200",
  blue: "from-blue-500/12 via-sky-500/6 to-violet-950/8 text-blue-200",
  cyan: "from-cyan-500/14 via-teal-500/7 to-blue-950/8 text-cyan-200",
  purple:
    "from-violet-500/14 via-purple-500/7 to-blue-950/8 text-violet-200",
};

function ProjectActions({
  title,
  githubAria,
  liveAria,
  githubHref = "#",
  liveHref = "#",
}: {
  title: string;
  githubAria: string;
  liveAria: string;
  githubHref?: string;
  liveHref?: string;
}) {
  return (
    <div className="inline-flex rounded-md bg-slate-950/30 p-0.5 text-slate-400 backdrop-blur-xl transition duration-300 group-hover:bg-white/[0.045] group-hover:text-slate-200">
      <a
        href={githubHref}
        aria-label={`${title} ${githubAria}`}
        className="flex size-8 items-center justify-center rounded-md transition duration-300 hover:bg-white/[0.055] hover:text-blue-100"
      >
        <Github className="size-4" aria-hidden="true" />
      </a>
      <a
        href={liveHref}
        aria-label={`${title} ${liveAria}`}
        className="flex size-8 items-center justify-center rounded-md transition duration-300 hover:bg-white/[0.055] hover:text-blue-100"
      >
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}

function ProjectCard({
  project,
  meta,
  viewCaseStudy,
  githubAria,
  liveAria,
}: {
  project: ProjectCopy;
  meta: ProjectMeta;
  viewCaseStudy: string;
  githubAria: string;
  liveAria: string;
}) {
  const Icon = meta.icon;
  const cardStyle = {
    "--project-card-x": "50%",
    "--project-card-y": "20%",
    "--project-card-glow-opacity": "0",
  } as CSSProperties;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    event.currentTarget.style.setProperty("--project-card-x", `${x}px`);
    event.currentTarget.style.setProperty("--project-card-y", `${y}px`);
    event.currentTarget.style.setProperty(
      "--project-card-glow-opacity",
      meta.featured ? "0.9" : "0.74",
    );
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--project-card-glow-opacity", "0");
  };

  return (
    <Card
      style={cardStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "project-card group relative h-full overflow-hidden rounded-xl p-[1px] transition duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-blue-400/18 hover:shadow-[0_18px_52px_rgba(2,6,23,0.26),0_0_22px_rgba(37,99,235,0.09)]",
        meta.featured &&
          "project-card-featured shadow-[0_16px_48px_rgba(2,6,23,0.18)] hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(2,6,23,0.3),0_0_28px_rgba(37,99,235,0.13)]",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-br opacity-60 blur-[1px] transition duration-[650ms] group-hover:opacity-90",
          toneClasses[meta.tone],
          meta.featured && "opacity-50 group-hover:opacity-100",
        )}
      />
      <span className="service-border-sweep pointer-events-none absolute inset-y-0 -left-1/2 z-[1] w-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div
        className={cn(
          "project-surface relative flex h-full min-h-[310px] flex-col rounded-xl border border-white/[0.035] bg-gradient-to-br p-5 backdrop-blur-xl transition duration-500 group-hover:border-blue-300/14 sm:p-6",
          toneClasses[meta.tone],
          meta.featured &&
            "min-h-[330px] border-white/[0.045] group-hover:border-blue-300/18 group-hover:from-blue-500/18 group-hover:via-sky-400/9 group-hover:to-violet-500/12",
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04] [mask-image:radial-gradient(circle_at_35%_0%,black,transparent_62%)]" />
        <div className="project-card-cursor-light pointer-events-none absolute inset-0 rounded-xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-lg bg-slate-950/42 text-current shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] backdrop-blur-xl transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.035] group-hover:bg-blue-500/10",
              meta.featured &&
                "size-12 bg-slate-950/42 text-blue-100 group-hover:bg-blue-500/12 group-hover:text-cyan-100",
            )}
          >
            <Icon
              className={cn(
                "size-5 transition duration-500 group-hover:rotate-[-3deg] group-hover:scale-110",
                meta.featured && "size-6",
              )}
              aria-hidden="true"
            />
          </div>
          <div className="opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:opacity-100">
            <ProjectActions
              title={project.title}
              githubAria={githubAria}
              liveAria={liveAria}
              githubHref={project.githubHref}
              liveHref={project.liveHref}
            />
          </div>
        </div>

        <div className="relative mt-5 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/[0.045] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.02em] text-slate-300 backdrop-blur-xl transition duration-300 group-hover:text-blue-100">
            {project.category}
          </span>
        </div>

        <h3
          className={cn(
            "relative mt-4 text-lg font-semibold leading-6 text-white",
            meta.featured && "text-xl",
          )}
        >
          {project.title}
        </h3>
        <p className="relative mt-3 text-sm leading-6 text-slate-300">
          {project.statement}
        </p>

        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-md bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-xl transition duration-300 group-hover:bg-white/[0.055] group-hover:text-slate-200 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.08)]"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="relative mt-auto pt-6">
          <a
            href={project.caseStudyHref ?? "#"}
            className={cn(
              "group/case inline-flex items-center gap-2 text-xs font-semibold text-blue-300/85 transition duration-300 hover:-translate-y-0.5 hover:text-blue-100",
              meta.featured && "text-sm text-blue-200",
            )}
          >
            {viewCaseStudy}
            <ArrowUpRight
              className={cn(
                "size-3.5 transition-transform duration-300 group-hover/case:translate-x-0.5 group-hover/case:-translate-y-0.5",
                meta.featured && "size-4",
              )}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </Card>
  );
}

export function Projects() {
  const { t } = useI18n();
  const sectionStyle = {
    "--projects-spotlight-x": "48%",
    "--projects-spotlight-y": "36%",
    "--projects-spotlight-opacity": "0",
    "--projects-depth-x": "0px",
    "--projects-depth-y": "0px",
  } as CSSProperties;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const depthX = (x / bounds.width - 0.5) * 6;
    const depthY = (y / bounds.height - 0.5) * 6;

    event.currentTarget.style.setProperty("--projects-spotlight-x", `${x}px`);
    event.currentTarget.style.setProperty("--projects-spotlight-y", `${y}px`);
    event.currentTarget.style.setProperty("--projects-spotlight-opacity", "1");
    event.currentTarget.style.setProperty("--projects-depth-x", `${depthX}px`);
    event.currentTarget.style.setProperty("--projects-depth-y", `${depthY}px`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--projects-spotlight-opacity", "0");
    event.currentTarget.style.setProperty("--projects-depth-x", "0px");
    event.currentTarget.style.setProperty("--projects-depth-y", "0px");
  };

  return (
    <section
      id="work"
      style={sectionStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative overflow-hidden border-b border-white/10 p-7 sm:p-9 lg:p-10"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="project-system-drift projects-depth pointer-events-none absolute -inset-6 opacity-[0.055] [mask-image:radial-gradient(circle_at_48%_36%,black,transparent_62%)]" />
      <div className="projects-cursor-light pointer-events-none absolute inset-0" />

      <Reveal className="relative mb-10 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {t.projects.title}
        </h2>
        <a
          href="https://github.com/orgs/RafaelDevLabs/repositories"
          className="shrink-0 text-xs font-medium text-slate-500 transition hover:text-slate-300"
        >
          {t.projects.viewAll}
        </a>
      </Reveal>

      <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.14fr_repeat(3,minmax(0,1fr))]">
        {t.projects.items.map((project, index) => (
          <Reveal key={project.title} delay={0.04 + index * 0.06}>
            <ProjectCard
              project={project}
              meta={projectMeta[index]}
              viewCaseStudy={t.projects.viewCaseStudy}
              githubAria={t.projects.githubAria}
              liveAria={t.projects.liveAria}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
