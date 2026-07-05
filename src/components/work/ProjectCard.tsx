"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BrainCircuit,
  Database,
  FileCode2,
  Globe,
  LayoutDashboard,
  MonitorSmartphone,
  QrCode,
  Search,
  ShoppingBag,
  Sparkles,
  Workflow,
} from "lucide-react";

import type { ProjectSummary } from "@/src/types/project";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: ProjectSummary;
};

const categoryBadgeClasses: Record<ProjectSummary["category"], string> = {
  "food-hospitality": "bg-emerald-400/14 text-emerald-100 ring-emerald-300/18",
  "beauty-wellness": "bg-fuchsia-400/14 text-fuchsia-100 ring-fuchsia-300/18",
  "health-fitness": "bg-blue-400/14 text-blue-100 ring-blue-300/18",
  "ai-healthcare": "bg-violet-400/14 text-violet-100 ring-violet-300/18",
  "ai-education": "bg-cyan-400/14 text-cyan-100 ring-cyan-300/18",
  ecommerce: "bg-amber-400/14 text-amber-100 ring-amber-300/18",
  business: "bg-teal-400/14 text-teal-100 ring-teal-300/18",
  academic: "bg-slate-300/12 text-slate-100 ring-slate-200/14",
};

const categoryAccentClasses: Record<ProjectSummary["category"], string> = {
  "food-hospitality": "from-emerald-400/30 via-teal-400/16 to-cyan-400/10",
  "beauty-wellness": "from-fuchsia-400/30 via-pink-400/16 to-violet-400/10",
  "health-fitness": "from-blue-400/30 via-cyan-400/16 to-sky-400/10",
  "ai-healthcare": "from-violet-400/30 via-indigo-400/16 to-blue-400/10",
  "ai-education": "from-cyan-400/30 via-blue-400/16 to-violet-400/10",
  ecommerce: "from-amber-400/28 via-orange-400/16 to-yellow-400/10",
  business: "from-teal-400/28 via-emerald-400/16 to-lime-400/10",
  academic: "from-slate-300/18 via-violet-400/14 to-blue-400/10",
};

const techIconMap = {
  React: Atom,
  "Next.js": Globe,
  TypeScript: FileCode2,
  Python: BrainCircuit,
  FastAPI: Workflow,
  Supabase: Database,
  SQLite: Database,
  ChromaDB: Search,
  Recharts: LayoutDashboard,
  "OpenAI API": Sparkles,
  Embeddings: Search,
  "Vector Search": Search,
  "QR Codes": QrCode,
  "Admin Dashboard": LayoutDashboard,
  Scheduling: MonitorSmartphone,
  Ecommerce: ShoppingBag,
  "E-commerce": ShoppingBag,
  Catalog: ShoppingBag,
  "Product Catalog": ShoppingBag,
} as const;

function ProjectImageFallback({ project }: ProjectCardProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#0e1321_0%,#090d18_100%)]">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          categoryAccentClasses[project.category],
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_42%)]" />
      <div className="absolute inset-0 bg-grid opacity-[0.05] [mask-image:radial-gradient(circle_at_55%_35%,black,transparent_72%)]" />

      <div className="relative flex h-full items-center justify-center px-5 py-4">
        <div className="w-[74%] rounded-[20px] border border-white/10 bg-[#0b0f1c]/92 shadow-[0_20px_48px_rgba(2,6,23,0.45)]">
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
            <div className="flex gap-2">
              <span className="size-2 rounded-full bg-violet-400/80" />
              <span className="size-2 rounded-full bg-blue-400/75" />
              <span className="size-2 rounded-full bg-cyan-300/70" />
            </div>
            <span className="h-2 w-16 rounded-full bg-white/10" />
          </div>

          <div className="space-y-3 p-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-10 rounded-xl border border-white/8 bg-white/[0.035]" />
              <div className="h-10 rounded-xl border border-white/8 bg-white/[0.035]" />
              <div className="h-10 rounded-xl border border-white/8 bg-white/[0.035]" />
            </div>

            <div className="rounded-[18px] border border-white/8 bg-white/[0.03] p-3">
              <div className="flex h-16 items-end gap-2">
                <span className="h-8 flex-1 rounded-t-full bg-gradient-to-t from-blue-500/55 to-violet-400/20" />
                <span className="h-12 flex-1 rounded-t-full bg-gradient-to-t from-blue-500/55 to-violet-400/20" />
                <span className="h-10 flex-1 rounded-t-full bg-gradient-to-t from-blue-500/55 to-violet-400/20" />
                <span className="h-14 flex-1 rounded-t-full bg-gradient-to-t from-blue-500/55 to-violet-400/20" />
                <span className="h-9 flex-1 rounded-t-full bg-gradient-to-t from-blue-500/55 to-violet-400/20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="h-8 rounded-xl border border-white/8 bg-white/[0.03]" />
              <div className="h-8 rounded-xl border border-white/8 bg-white/[0.03]" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 w-[28%] min-w-[82px] rounded-[24px] border border-white/10 bg-[#0b0f1c]/96 p-2 shadow-[0_18px_44px_rgba(2,6,23,0.5)]">
          <div className="rounded-[18px] border border-white/8 bg-[radial-gradient(circle_at_50%_20%,rgba(124,58,237,0.22),transparent_44%),linear-gradient(180deg,#10172b_0%,#090d18_100%)] px-2 py-3">
            <span className="mx-auto block h-1.5 w-8 rounded-full bg-white/10" />
            <div className="mt-3 flex justify-center">
              <div className="relative flex size-14 items-center justify-center rounded-full border border-violet-300/20">
                <div className="absolute inset-1.5 rounded-full border-[3px] border-blue-400/35 border-r-violet-400/75" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechnologyRow({ technologies }: { technologies: readonly string[] }) {
  return (
    <div
      aria-label="Project technologies"
      className="flex min-h-10 flex-wrap items-center gap-2"
    >
      {technologies.slice(0, 5).map((technology) => {
        const Icon = techIconMap[technology as keyof typeof techIconMap];

        if (Icon) {
          return (
            <span
              key={technology}
              title={technology}
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-slate-200 transition duration-300 group-hover:border-white/16 group-hover:bg-white/[0.06] motion-reduce:transition-none"
            >
              <Icon className="size-4" aria-hidden="true" />
              <span className="sr-only">{technology}</span>
            </span>
          );
        }

        return (
          <span
            key={technology}
            className="inline-flex rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-slate-300 transition duration-300 group-hover:border-white/16 group-hover:bg-white/[0.06] group-hover:text-slate-100 motion-reduce:transition-none"
          >
            {technology}
          </span>
        );
      })}
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full active:scale-[0.995] motion-reduce:transform-none"
    >
      <Link
        href={`/work/${project.slug}`}
        aria-label={`View case study for ${project.title}`}
        className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0B0D16] shadow-[0_18px_48px_rgba(2,6,23,0.28)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-violet-300/28 hover:shadow-[0_36px_96px_rgba(2,6,23,0.52),0_0_34px_rgba(124,58,237,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[24px] bg-slate-950">
          {imageFailed ? (
            <ProjectImageFallback project={project} />
          ) : (
            <Image
              src={project.cardImage}
              alt={project.cardImageAlt}
              fill
              onError={() => setImageFailed(true)}
              className="object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          )}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.01),rgba(2,6,23,0.2)),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_36%)]" />

          <div className="absolute left-4 top-4 z-10">
            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] ring-1 backdrop-blur-xl",
                categoryBadgeClasses[project.category],
              )}
            >
              {project.categoryLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <header className="space-y-3.5">
            <h3 className="min-h-[3.5rem] text-xl font-bold leading-tight text-white sm:text-[1.45rem]">
              {project.title}
            </h3>
            <p className="min-h-[4.5rem] overflow-hidden text-sm leading-6 text-slate-400 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
              {project.description}
            </p>
          </header>

          <div className="pt-0.5 sm:pt-1">
            <TechnologyRow technologies={project.technologies} />
          </div>

          <div className="mt-auto -mx-2 -mb-2 pt-2">
            <span className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-blue-200 transition duration-300 group-hover:text-violet-100 motion-reduce:transition-none">
              View Case Study
              <ArrowRight
                className="size-4 transition duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
