import type { ProjectSummary } from "@/src/types/project";
import { projectDetails } from "@/src/data/project-details";

export const projects: readonly ProjectSummary[] = projectDetails.map(
  (project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    categoryLabel: project.categoryLabel,
    description: project.description,
    cardImage: project.cardImage,
    cardImageAlt: project.cardImageAlt,
    tags: project.tags,
    technologies: project.technologies,
    featured: project.featured,
  }),
).sort((project) =>
  project.slug === "tamysweetuk-breeder-platform" ? -1 : 0,
);
