"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

const calendlyHref = "https://calendly.com/rafstefanache";

export function Hero() {
  const { t } = useI18n();
  const heroStyle = {
    "--hero-spotlight-x": "62%",
    "--hero-spotlight-y": "28%",
    "--hero-spotlight-opacity": "0",
    "--hero-depth-x": "0px",
    "--hero-depth-y": "0px",
  } as CSSProperties;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    const depthX = (x - 50) * 0.1;
    const depthY = (y - 50) * 0.08;

    event.currentTarget.style.setProperty("--hero-spotlight-x", `${x}%`);
    event.currentTarget.style.setProperty("--hero-spotlight-y", `${y}%`);
    event.currentTarget.style.setProperty("--hero-spotlight-opacity", "1");
    event.currentTarget.style.setProperty("--hero-depth-x", `${depthX}px`);
    event.currentTarget.style.setProperty("--hero-depth-y", `${depthY}px`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--hero-spotlight-opacity", "0");
    event.currentTarget.style.setProperty("--hero-depth-x", "0px");
    event.currentTarget.style.setProperty("--hero-depth-y", "0px");
  };

  return (
    <section
      id="home"
      style={heroStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate min-h-[700px] overflow-hidden pt-[72px] md:min-h-[660px] lg:min-h-[675px]"
    >
      <div className="hero-grid-drift absolute inset-0 -z-10 bg-grid opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_52%,transparent_88%)]" />
      <div className="hero-orchestration-drift hero-depth absolute -inset-8 -z-10 opacity-[0.16] [mask-image:radial-gradient(circle_at_58%_28%,black,transparent_64%)]" />
      <div className="hero-particles absolute inset-0 -z-10 opacity-20 [mask-image:radial-gradient(circle_at_65%_26%,black,transparent_58%)]" />
      <div className="hero-cursor-light pointer-events-none absolute inset-0 z-0" />
      <div className="absolute inset-x-0 top-[72px] -z-10 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute left-[48%] top-24 -z-10 h-52 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[90px]" />
      <div className="absolute right-[16%] top-14 -z-10 h-72 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative z-20 mx-auto grid max-w-6xl items-center gap-6 px-5 pb-8 pt-8 sm:gap-8 sm:px-6 md:min-h-[588px] lg:px-8 xl:grid-cols-[0.45fr_0.55fr] xl:gap-10 xl:pb-11 xl:pt-7">
        <div className="relative z-20 mx-auto max-w-[34rem] text-center xl:mx-0 xl:text-left">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-3 py-1.5 text-[11px] font-semibold uppercase text-blue-300 shadow-[0_0_30px_rgba(37,99,235,0.2)] backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />
              {t.hero.badge}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-8 max-w-[33.5rem] text-balance text-[1.55rem] font-bold leading-[1.08] text-white drop-shadow-[0_12px_34px_rgba(0,0,0,0.3)] min-[390px]:text-[1.68rem] sm:mt-9 sm:text-[2.35rem] sm:leading-[1.1] lg:text-[2.65rem] xl:mx-0 xl:text-[2.95rem]">
              {t.hero.headline[0]}
              <span className="block">{t.hero.headline[1]}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-8 max-w-[33rem] text-[0.95rem] leading-7 text-slate-300 sm:text-base sm:leading-8 xl:mx-0">
              {t.hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4 xl:justify-start">
              <Button
                asChild
                size="lg"
                className="shadow-[0_0_58px_rgba(59,130,246,0.5)] hover:shadow-[0_0_78px_rgba(59,130,246,0.66)]"
              >
                <a href={calendlyHref} target="_blank" rel="noreferrer">
                  {t.hero.primaryCta}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/10 bg-transparent text-slate-400 shadow-none hover:border-white/15 hover:bg-white/[0.035] hover:text-slate-100"
              >
                <a href="#contact">
                  {t.hero.secondaryCta}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-7 flex justify-center sm:mt-8 xl:justify-start">
              <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-1 rounded-full border border-white/10 bg-slate-950/35 px-3.5 py-2 text-[13px] font-medium text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl sm:flex-nowrap sm:text-sm">
                {t.hero.trust.map((item, index) => (
                  <span key={item}>
                    {index > 0 ? (
                      <span className="mr-1.5 text-blue-400/70">&bull;</span>
                    ) : null}
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div
          className="relative mx-auto mt-1 min-h-[218px] w-full max-w-[46rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/30 shadow-[0_24px_90px_rgba(15,23,42,0.45)] min-[390px]:min-h-[238px] sm:-mt-2 sm:min-h-[340px] xl:mx-0 xl:mt-0 xl:min-h-[490px] xl:max-w-none xl:overflow-visible xl:rounded-none xl:border-0 xl:bg-transparent xl:shadow-none"
          aria-label={t.hero.portraitAria}
        >
          <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-blue-500/10 via-slate-950/20 to-violet-500/10 blur-sm" />
          <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/18 blur-[120px]" />
          <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-blue-600/16 blur-[100px]" />
          <div className="absolute right-14 top-12 h-72 w-72 rounded-full bg-violet-600/12 blur-[115px]" />
          <div className="absolute bottom-8 left-14 h-24 w-72 rounded-full bg-cyan-400/10 blur-[70px]" />
          <div className="absolute inset-x-10 bottom-16 h-32 rounded-full bg-gradient-to-r from-transparent via-blue-400/10 to-violet-400/10 blur-2xl" />
          <div className="absolute inset-0 overflow-hidden xl:inset-y-10 xl:right-0 xl:left-0">
            <Image
              src="/images/hero-rafael.png"
              alt={t.hero.portraitAlt}
              fill
              priority
              sizes="(min-width: 1280px) 520px, 100vw"
              className="hero-portrait-mask scale-[1.01] object-cover object-[58%_36%] opacity-[0.88] saturate-[1.03] min-[390px]:scale-[0.98] sm:scale-[0.96] xl:scale-[0.93] xl:object-[66%_42%] xl:opacity-[0.86]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02050d]/44 via-[#02050d]/10 to-transparent xl:from-[#02050d]/48 xl:via-[#02050d]/12" />
            <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#02050d]/18 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#02050d]/90 to-transparent sm:h-20" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#02050d] via-[#02050d]/54 to-transparent sm:h-44 sm:via-[#02050d]/62" />
          </div>

          <div
            className="animate-float-slow absolute left-6 top-10 hidden w-56 rounded-lg border border-white/10 bg-slate-950/45 p-4 text-[11px] text-slate-300 shadow-card-glow backdrop-blur-2xl md:block xl:left-4 xl:top-20"
            aria-hidden="true"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-blue-300 shadow-[0_0_14px_rgba(147,197,253,0.75)]" />
                <span className="size-1.5 rounded-full bg-violet-300/80" />
                <span className="size-1.5 rounded-full bg-slate-600" />
              </div>
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-blue-200">
                {t.hero.workflowLabel}
              </span>
            </div>
            <div className="space-y-2.5">
              {t.hero.workflowSteps.map((step, index) => (
                <div key={step} className="relative flex items-center gap-3">
                  <div className="relative flex size-6 shrink-0 items-center justify-center rounded-full border border-blue-300/25 bg-blue-500/10">
                    <span className="size-1.5 rounded-full bg-blue-200" />
                    {index < t.hero.workflowSteps.length - 1 ? (
                      <span className="absolute left-1/2 top-full h-3.5 w-px -translate-x-1/2 bg-gradient-to-b from-blue-300/60 to-violet-300/20" />
                    ) : null}
                  </div>
                  <span
                    className={
                      index === t.hero.workflowSteps.length - 1
                        ? "font-semibold text-violet-200"
                        : "text-slate-300"
                    }
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute left-4 top-8 hidden items-center gap-2 rounded-full border border-white/10 bg-slate-950/45 px-3 py-2 text-xs text-slate-300 backdrop-blur-xl sm:flex md:hidden"
            aria-hidden="true"
          >
            <Sparkles className="size-4 text-blue-300" />
            {t.hero.mobileNote}
          </div>
        </div>
      </div>
    </section>
  );
}
