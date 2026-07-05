import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ExternalLink,
  Github,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProjectDetail } from "@/src/types/project";

type ProjectHeroProps = {
  project: ProjectDetail;
};

function ActionButton({
  href,
  label,
  icon: Icon,
  variant = "default",
  className,
}: {
  href?: string;
  label: string;
  icon: typeof ExternalLink;
  variant?: "default" | "outline";
  className?: string;
}) {
  if (!href) {
    return (
      <button
        type="button"
        disabled
        className={cn(
          buttonVariants({ variant, size: "lg" }),
          "cursor-not-allowed opacity-50",
          className,
        )}
      >
        {label}
        <Icon aria-hidden="true" />
      </button>
    );
  }

  return (
    <Button asChild variant={variant} size="lg" className={className}>
      <Link href={href} target={href.startsWith("http") ? "_blank" : undefined}>
        {label}
        <Icon aria-hidden="true" />
      </Link>
    </Button>
  );
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section
      aria-labelledby="project-hero-title"
      className="relative overflow-visible pt-16 sm:pt-20 lg:pt-[6.5rem]"
    >
      <div className="pointer-events-none absolute -left-12 bottom-4 h-48 w-56 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12),transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-6%] top-6 h-[25rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.2),transparent_72%)] blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1500px] gap-9 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:items-center lg:gap-[4.5rem] xl:gap-20">
        <div className="max-w-[40rem]">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-slate-400"
          >
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-white"
            >
              Home
            </Link>
            <ChevronRight className="size-4 text-slate-500" aria-hidden="true" />
            <Link
              href="/work"
              className="transition-colors duration-300 hover:text-white"
            >
              Work
            </Link>
            <ChevronRight className="size-4 text-slate-500" aria-hidden="true" />
            <span className="text-slate-200">{project.title}</span>
          </nav>

          <div className="mt-4 sm:mt-5">
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
              {project.categoryLabel}
            </span>
          </div>

          <h1
            id="project-hero-title"
            className="mt-6 text-balance text-[2.75rem] font-bold leading-[0.95] text-white sm:mt-7 sm:text-[3.25rem] lg:mt-8 lg:text-[4.25rem]"
          >
            {project.heroTitleLines?.length ? (
              <>
                {project.heroTitleLines.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </>
            ) : (
              project.title
            )}
          </h1>

          <p className="mt-6 max-w-[38rem] text-base leading-7 text-slate-300 sm:mt-7 sm:text-lg sm:leading-8 lg:mt-8">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-7 lg:mt-8">
            <ActionButton
              href={project.liveDemoUrl}
              label="Live Demo"
              icon={ExternalLink}
              className="min-h-12 px-6 text-[15px] shadow-[0_18px_44px_rgba(59,130,246,0.22)]"
            />
            <ActionButton
              href={project.githubUrl}
              label="GitHub"
              icon={Github}
              variant="outline"
              className="min-h-12 px-6 text-[15px] border-white/12 bg-slate-950/55"
            />
          </div>

        </div>

        <div className="relative mt-6 mb-8 md:order-first md:mt-0 md:mb-0 lg:order-none">
          <div className="pointer-events-none absolute left-[22%] top-[6%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.46),transparent_72%)] blur-3xl" />
          <div className="pointer-events-none absolute left-[14%] bottom-[6%] h-40 w-96 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.24),transparent_72%)] blur-3xl" />

          <div className="relative mx-auto w-full max-w-[1080px] overflow-visible md:translate-x-6 lg:translate-x-14 xl:translate-x-16">
            <Image
              src={project.heroImage}
              alt={project.heroImageAlt}
              width={1440}
              height={1080}
              priority
              className="h-auto w-[94%] object-contain sm:w-[96%] lg:w-full"
              sizes="(min-width: 1280px) 1080px, (min-width: 1024px) 66vw, (min-width: 768px) 78vw, 96vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
