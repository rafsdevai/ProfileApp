import { existsSync } from "node:fs";
import path from "node:path";

import { Code2, Layers3, Rocket } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { HeroVisual } from "@/src/components/work/HeroVisual";

const workHeroPngPath = "/projects/hero_works.png";
const hasWorkHeroPng = existsSync(
  path.join(process.cwd(), "public", "projects", "hero_works.png"),
);

const stats = [
  { value: "12+", label: "Projects Completed", icon: Code2 },
  { value: "15+", label: "Technologies", icon: Layers3 },
  { value: "100%", label: "Focus on Quality", icon: Rocket },
] as const;

export function WorksHero() {
  const heroVisualSrc = hasWorkHeroPng ? workHeroPngPath : null;

  return (
    <Reveal
      aria-labelledby="works-hero-heading"
      className="relative mb-6 overflow-visible py-8 sm:mb-8 sm:py-10 lg:mb-10 lg:py-14"
    >
      <div className="pointer-events-none absolute -bottom-16 -left-20 h-56 w-72 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.08),transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-12 h-72 w-80 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_72%)] blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1400px] gap-8 sm:gap-10 lg:grid-cols-[minmax(0,48%)_minmax(0,52%)] lg:items-center lg:gap-20 xl:gap-24">
        <div className="max-w-[36rem] lg:py-10 xl:pl-1">
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_18px_rgba(124,58,237,0.75)]" />
            Selected Work
          </p>

          <h1
            id="works-hero-heading"
            className="text-[2.95rem] font-bold leading-[0.92] tracking-normal text-white sm:text-[3.8rem] lg:text-[4.8rem] xl:text-[5rem]"
          >
            <span className="block lg:whitespace-nowrap">Real Projects.</span>
            <span className="block lg:whitespace-nowrap">
              Real{" "}
              <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-violet-400 bg-clip-text text-transparent">
                Impact.
              </span>
            </span>
          </h1>

          <p className="mt-7 max-w-[32rem] text-base leading-8 text-slate-300 sm:text-lg sm:leading-8">
            A collection of AI systems, web applications and automation
            solutions I&apos;ve built from idea to production.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:mt-12 md:flex md:flex-wrap md:items-start md:gap-x-12 md:gap-y-6 lg:mt-14 lg:flex-nowrap lg:gap-x-12">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex min-w-0 flex-col items-center gap-2 text-center md:min-w-[150px] md:flex-row md:items-start md:gap-3.5 md:text-left"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/[0.03] text-slate-300 md:mt-1 md:size-8">
                    <Icon className="size-3.5 md:size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[1.75rem] font-bold leading-none text-white sm:text-[2rem] md:text-[2.2rem]">
                      {item.value}
                    </p>
                    <p className="mt-1.5 text-[11px] font-medium leading-4 text-slate-400 sm:text-xs md:mt-2 md:text-sm md:leading-5">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative lg:min-h-[560px]">
          <HeroVisual src={heroVisualSrc} />
        </div>
      </div>
    </Reveal>
  );
}
