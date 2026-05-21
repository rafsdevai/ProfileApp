"use client";

import { ArrowUpRight, CalendarDays, CheckCircle2 } from "lucide-react";

import { useI18n } from "@/components/I18nProvider";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

const calendlyHref = "https://calendly.com/rafstefanache";

export function FreeConsultation() {
  const { t } = useI18n();

  return (
    <section className="relative border-b border-white/10 p-7 sm:p-9 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.065),transparent_34%),linear-gradient(120deg,rgba(59,130,246,0.035),transparent_42%,rgba(139,92,246,0.03))]" />

      <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-12">
        <Reveal>
          <div className="inline-flex rounded-full border border-blue-300/18 bg-blue-300/[0.065] px-3 py-1.5 text-xs font-semibold uppercase text-blue-100 shadow-[0_0_18px_rgba(59,130,246,0.08)] backdrop-blur-xl">
            {t.consultation.badge}
          </div>

          <h2 className="mt-5 max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            {t.consultation.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            {t.consultation.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={calendlyHref} target="_blank" rel="noreferrer">
                {t.consultation.primaryCta}
                <CalendarDays aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full bg-transparent shadow-none sm:w-auto"
            >
              <a href="#services">
                {t.consultation.secondaryCta}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-white/[0.07] bg-slate-950/32 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_80px_rgba(2,6,23,0.22)] backdrop-blur-2xl sm:p-6">
            <ul className="grid gap-3 sm:grid-cols-2">
              {t.consultation.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-white/[0.055] bg-white/[0.025] px-3 py-3 text-sm font-medium text-slate-200"
                >
                  <CheckCircle2
                    className="size-4 shrink-0 text-blue-300 drop-shadow-[0_0_12px_rgba(96,165,250,0.25)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 rounded-lg border border-white/[0.055] bg-slate-950/35 px-4 py-3 text-sm leading-6 text-slate-400">
              {t.consultation.note}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
