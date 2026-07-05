import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AmbientCursor } from "@/components/AmbientCursor";
import { Navbar } from "@/components/Navbar";
import { ProjectBottomSection } from "@/src/components/projects/ProjectBottomSection";
import { ProjectFeatures } from "@/src/components/projects/ProjectFeatures";
import { ProjectHero } from "@/src/components/projects/ProjectHero";
import { ProjectNavigation } from "@/src/components/projects/ProjectNavigation";
import { ProjectOverview } from "@/src/components/projects/ProjectOverview";
import { ProjectScreenshots } from "@/src/components/projects/ProjectScreenshots";
import {
  getProjectDetailBySlug,
  projectDetails,
} from "@/src/data/project-details";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return projectDetails.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectDetailBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Work`,
    description: project.description,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Rafael.Dev`,
      description: project.description,
      url: `/work/${project.slug}`,
      images: [
        {
          url: project.heroImage,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectDetailBySlug(slug);

  if (!project) {
    notFound();
  }

  const navigationItems = [
    { id: "overview", label: "Overview" },
    ...(project.screenshots?.length ? [{ id: "gallery", label: "Gallery" }] : []),
    ...(project.features?.length ? [{ id: "features", label: "Features" }] : []),
    ...(project.challenges?.length ? [{ id: "challenges", label: "Challenges" }] : []),
    ...(project.cta ? [{ id: "future", label: "Future Improvements" }] : []),
  ] as const;

  return (
    <>
      <AmbientCursor />
      <Navbar />
      <main className="relative min-h-screen overflow-hidden px-5 pb-16 pt-24 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-[7.5rem]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_24%,rgba(37,99,235,0.12),transparent_30rem),radial-gradient(circle_at_86%_12%,rgba(124,58,237,0.18),transparent_34rem),radial-gradient(circle_at_78%_44%,rgba(59,130,246,0.08),transparent_24rem),linear-gradient(180deg,rgba(2,5,13,0.08),rgba(2,4,10,0.78))]" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" />
        <div className="project-system-drift pointer-events-none absolute inset-x-0 top-14 h-[44rem] opacity-[0.06] [mask-image:radial-gradient(circle_at_50%_0%,black,transparent_72%)]" />

        <div className="relative mx-auto w-full max-w-[1200px]">
          <ProjectHero project={project} />
          <div className="mt-5 sm:mt-6">
            <ProjectNavigation items={navigationItems} />
          </div>
          <div id="overview" className="scroll-mt-32" />
          <ProjectOverview project={project} />
          {project.screenshots?.length ? (
            <ProjectScreenshots project={project} />
          ) : null}
          {project.features?.length ? (
            <ProjectFeatures project={project} />
          ) : null}
          {project.challenges?.length ||
          project.results?.length ||
          project.cta ||
          project.trustSignals?.length ? (
            <ProjectBottomSection project={project} />
          ) : null}
        </div>
      </main>
    </>
  );
}
