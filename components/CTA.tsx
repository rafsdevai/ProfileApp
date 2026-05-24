"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export function CTA() {
  const { t } = useI18n();

  return (
    <section
      id="mentoring"
      aria-labelledby="mentoring-heading"
      className="relative grid items-center gap-8 border-b border-white/10 bg-blue-500/[0.035] p-7 sm:p-9 lg:grid-cols-[0.95fr_1fr_0.95fr] lg:p-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/[0.055] via-transparent to-violet-500/[0.045]" />
      <Reveal>
        <h2
          id="mentoring-heading"
          className="max-w-sm text-balance text-3xl font-bold leading-tight text-white sm:text-4xl"
        >
          {t.cta.title}
        </h2>
        <p className="mt-4 text-base text-slate-300">{t.cta.subtitle}</p>
        <Button asChild className="mt-7">
          <a href="#contact">
            {t.cta.button}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
      </Reveal>

      <Reveal delay={0.08}>
        <ul className="space-y-4 lg:pl-2">
          {t.cta.checklist.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm text-slate-200"
            >
              <CheckCircle2
                className="size-5 shrink-0 text-blue-400 drop-shadow-[0_0_16px_rgba(96,165,250,0.35)]"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.16}>
        <div className="card-sheen rounded-lg border border-white/10 bg-slate-950/50 p-5 shadow-card-glow backdrop-blur-2xl">
          <div className="mb-5 flex gap-2">
            <span className="size-3 rounded-full bg-red-400" />
            <span className="size-3 rounded-full bg-yellow-400" />
            <span className="size-3 rounded-full bg-emerald-400" />
          </div>
          <div className="space-y-3">
            {[
              "w-3/4 bg-violet-400",
              "w-5/6 bg-slate-500",
              "w-2/3 bg-blue-400",
              "w-4/5 bg-cyan-400",
              "w-1/2 bg-amber-400",
              "w-5/6 bg-emerald-400",
              "w-3/5 bg-violet-400",
            ].map((line, index) => (
              <div key={line + index} className="flex items-center gap-3">
                <span className="h-1 w-7 rounded-full bg-slate-700" />
                <span className={`h-1.5 rounded-full ${line}`} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
