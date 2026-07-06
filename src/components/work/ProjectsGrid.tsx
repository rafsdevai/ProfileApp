import { ProjectCard } from "@/src/components/work/ProjectCard";
import type { ProjectSummary } from "@/src/types/project";

type ProjectsGridProps = {
  projects: readonly ProjectSummary[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
