"use client";

import type { CSSProperties, PointerEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, BrainCircuit, Code2, GraduationCap } from "lucide-react";

import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const serviceMeta: Array<{
  icon: LucideIcon;
  tint: string;
  featured?: boolean;
}> = [
  {
    icon: BrainCircuit,
    tint: "from-blue-500/24 via-cyan-400/10 to-violet-500/18",
    featured: true,
  },
  {
    icon: Code2,
    tint: "from-violet-500/16 via-blue-500/8 to-sky-400/12",
  },
  {
    icon: GraduationCap,
    tint: "from-fuchsia-500/14 via-violet-500/8 to-blue-500/12",
  },
];

export function AboutServices() {
  const { t } = useI18n();
  const motionStyle = {
    "--about-spotlight-x": "68%",
    "--about-spotlight-y": "38%",
    "--about-spotlight-opacity": "0",
    "--about-depth-x": "0px",
    "--about-depth-y": "0px",
    "--about-depth-inverse-x": "0px",
    "--about-depth-inverse-y": "0px",
  } as CSSProperties;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const depthX = (x / bounds.width - 0.5) * 8;
    const depthY = (y / bounds.height - 0.5) * 8;

    event.currentTarget.style.setProperty("--about-spotlight-x", `${x}px`);
    event.currentTarget.style.setProperty("--about-spotlight-y", `${y}px`);
    event.currentTarget.style.setProperty("--about-spotlight-opacity", "1");
    event.currentTarget.style.setProperty("--about-depth-x", `${depthX}px`);
    event.currentTarget.style.setProperty("--about-depth-y", `${depthY}px`);
    event.currentTarget.style.setProperty(
      "--about-depth-inverse-x",
      `${depthX * -0.55}px`,
    );
    event.currentTarget.style.setProperty(
      "--about-depth-inverse-y",
      `${depthY * -0.55}px`,
    );
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--about-spotlight-opacity", "0");
    event.currentTarget.style.setProperty("--about-depth-x", "0px");
    event.currentTarget.style.setProperty("--about-depth-y", "0px");
    event.currentTarget.style.setProperty("--about-depth-inverse-x", "0px");
    event.currentTarget.style.setProperty("--about-depth-inverse-y", "0px");
  };

  return (
    <section
      id="about"
      style={motionStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative grid scroll-mt-24 gap-0 border-b border-white/10 lg:grid-cols-[0.34fr_0.66fr]"
    >
      <div className="section-gradient-drift about-depth-back pointer-events-none absolute -inset-6 bg-[linear-gradient(120deg,rgba(59,130,246,0.042),transparent_38%,rgba(139,92,246,0.032),transparent_72%,rgba(34,211,238,0.03))]" />
      <div className="section-system-drift about-depth-front pointer-events-none absolute -inset-6 opacity-[0.12] [mask-image:radial-gradient(circle_at_68%_38%,black,transparent_56%)]" />
      <div className="about-cursor-light pointer-events-none absolute inset-0" />

      <div className="relative p-7 sm:p-10 lg:border-r lg:border-white/10 lg:p-11">
        <div className="max-w-[23.5rem]">
          <Reveal>
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-200">
                {t.about.badges[0]}
              </span>
              <span className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1.5 text-xs font-semibold text-slate-200">
                {t.about.badges[1]}
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-normal text-white">
              {t.about.title}
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-8 text-slate-300 sm:text-base sm:leading-8">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="group/stack relative mt-7 overflow-hidden rounded-xl border border-white/[0.05] bg-slate-950/[0.22] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_18px_50px_rgba(0,0,0,0.14)] backdrop-blur-2xl transition duration-500 hover:border-blue-300/14 hover:bg-slate-950/[0.3]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.075),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.025),transparent_44%)] opacity-55 transition duration-500 group-hover/stack:opacity-80" />
              <p className="relative text-xs font-semibold uppercase text-slate-400">
                {t.about.stackTitle}
              </p>
              <div className="relative mt-4 flex flex-wrap gap-2">
                {t.about.currentStack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/[0.055] bg-white/[0.04] px-3 py-0.5 text-xs font-medium text-slate-300 shadow-[0_0_0_rgba(59,130,246,0)] backdrop-blur-xl transition duration-300 hover:border-blue-300/20 hover:bg-blue-300/[0.055] hover:text-blue-100 hover:shadow-[0_0_14px_rgba(59,130,246,0.11)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div id="services" className="relative scroll-mt-24 p-7 sm:p-10 lg:p-11">
        <Reveal delay={0.04} className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-blue-300">
              {t.about.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white">
              {t.about.servicesTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              {t.about.servicesSubtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {t.about.services.map((service, index) => {
            const meta = serviceMeta[index];
            const Icon = meta.icon;

            return (
              <Reveal key={service.title} delay={0.1 + index * 0.075}>
                <Card
                  className={cn(
                    "service-card group relative h-full min-h-[252px] transform-gpu overflow-hidden rounded-xl p-[1px] transition duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-2 hover:border-blue-400/24 hover:shadow-[0_24px_70px_rgba(2,6,23,0.32),0_0_34px_rgba(37,99,235,0.13)]",
                    meta.featured &&
                      "service-card-featured shadow-[0_0_0_1px_rgba(96,165,250,0.11),0_26px_70px_rgba(37,99,235,0.13)] hover:shadow-[0_0_0_1px_rgba(96,165,250,0.18),0_28px_76px_rgba(37,99,235,0.2)]",
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/0 via-cyan-300/0 to-violet-400/0 opacity-0 blur-[1px] transition duration-[650ms] group-hover:from-blue-400/30 group-hover:via-cyan-300/10 group-hover:to-violet-400/26 group-hover:opacity-100",
                      meta.featured &&
                        "opacity-65 from-blue-400/18 via-cyan-300/7 to-violet-400/14 group-hover:from-blue-300/38 group-hover:to-violet-300/34",
                    )}
                  />
                  <span className="service-border-sweep pointer-events-none absolute inset-y-0 -left-1/2 z-[1] w-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div
                    className={cn(
                      "service-surface relative flex h-full flex-col rounded-xl border border-white/[0.035] bg-gradient-to-br p-4 text-left backdrop-blur-xl transition duration-500 group-hover:border-white/10 sm:p-5",
                      meta.tint,
                      meta.featured &&
                        "border-blue-300/[0.09] bg-blue-950/[0.08] group-hover:border-blue-200/20",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={cn(
                          "flex size-14 items-center justify-center rounded-lg border border-white/10 bg-slate-950/45 text-blue-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.045] group-hover:border-blue-300/40 group-hover:bg-blue-500/14",
                          meta.featured &&
                            "border-blue-300/20 bg-blue-500/12 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_24px_rgba(59,130,246,0.14)] group-hover:border-cyan-200/42 group-hover:bg-blue-400/18 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_30px_rgba(96,165,250,0.24)]",
                        )}
                      >
                        <Icon
                          className="size-7 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[-3deg] group-hover:scale-110"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <h3 className="mt-3.5 text-lg font-semibold leading-6 text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-[1.6] text-slate-300">
                      {service.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/[0.055] bg-white/[0.04] px-2.5 py-0.5 text-xs font-medium text-slate-300 backdrop-blur-xl transition duration-300 group-hover:border-blue-300/18 group-hover:bg-blue-300/[0.055] group-hover:text-blue-100 group-hover:shadow-[0_0_13px_rgba(59,130,246,0.1)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-200/85 transition duration-300 hover:translate-x-0.5 hover:text-blue-100"
                    >
                      {service.cta}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
