"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

import { ProjectFilters } from "@/src/components/work/ProjectFilters";
import { ProjectsGrid } from "@/src/components/work/ProjectsGrid";
import type { ProjectSummary } from "@/src/types/project";

type WorksContentProps = {
  projects: readonly ProjectSummary[];
};

const FILTER_KEYWORDS = {
  ai: [
    "ai",
    "ml",
    "machine learning",
    "rag",
    "chatbot",
    "embedding",
    "healthcare",
    "education",
    "assistant",
  ],
  web: ["website", "web", "platform", "dashboard", "business website"],
  mobile: ["mobile", "responsive", "qr", "booking"],
  automation: ["automation", "workflow", "admin", "scheduling"],
  ecommerce: ["e-commerce", "ecommerce", "store", "retail", "catalog"],
  academic: ["academic", "atestat", "certification", "documentation"],
} as const;

function matchesFilter(project: ProjectSummary, activeFilter: string) {
  if (activeFilter === "all") {
    return true;
  }

  if (activeFilter === "ecommerce") {
    return project.category === "ecommerce";
  }

  if (activeFilter === "academic") {
    return project.category === "academic";
  }

  if (activeFilter === "ai") {
    return (
      project.category === "ai-healthcare" ||
      project.category === "ai-education" ||
      includesKeywords(project, FILTER_KEYWORDS.ai)
    );
  }

  if (activeFilter === "web") {
    return (
      project.category === "business" ||
      includesKeywords(project, FILTER_KEYWORDS.web)
    );
  }

  if (activeFilter === "mobile") {
    return includesKeywords(project, FILTER_KEYWORDS.mobile);
  }

  if (activeFilter === "automation") {
    return includesKeywords(project, FILTER_KEYWORDS.automation);
  }

  return false;
}

function includesKeywords(
  project: ProjectSummary,
  keywords: readonly string[],
) {
  const haystack = [
    project.title,
    project.description,
    project.categoryLabel,
    ...project.technologies,
  ]
    .join(" ")
    .toLowerCase();

  return keywords.some((keyword) => haystack.includes(keyword));
}

export function WorksContent({ projects }: WorksContentProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredProjects = projects.filter((project) =>
    matchesFilter(project, activeFilter),
  );

  return (
    <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
      <Reveal aria-label="Project filters" className="-mt-10 px-0.5 pt-0 sm:-mt-11 lg:-mt-12">
        <ProjectFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </Reveal>

      <Reveal
        aria-labelledby="works-grid-heading"
        className="rounded-[28px] border border-white/[0.07] bg-[linear-gradient(180deg,rgba(6,10,20,0.76),rgba(4,8,18,0.62))] p-5 shadow-[0_22px_84px_rgba(2,6,23,0.3)] backdrop-blur-2xl sm:p-6 lg:p-7"
        delay={0.04}
      >
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
              Project Grid
            </p>
            <h2 id="works-grid-heading" className="mt-1 text-2xl font-bold">
              Project collection
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {filteredProjects.length > 0 ? (
          <ProjectsGrid projects={filteredProjects} />
        ) : (
          <div className="grid min-h-[260px] place-items-center rounded-[24px] border border-dashed border-white/12 bg-[linear-gradient(180deg,rgba(15,23,42,0.44),rgba(2,6,23,0.58)),linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px] px-5 py-14 text-center">
            <div className="max-w-sm">
              <p className="text-base font-semibold text-white">
                No projects found for this category.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Try another filter to explore more selected work.
              </p>
            </div>
          </div>
        )}
      </Reveal>
    </div>
  );
}
