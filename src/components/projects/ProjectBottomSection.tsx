import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  LayoutDashboard,
  Rocket,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import type { ProjectDetail, ProjectDetailIcon } from "@/src/types/project";

type ProjectBottomSectionProps = {
  project: ProjectDetail;
};

const trustIconMap: Partial<Record<ProjectDetailIcon, typeof ShieldCheck>> = {
  "shield-check": ShieldCheck,
  workflow: Code2,
  zap: Zap,
  users: Users,
  "layout-dashboard": LayoutDashboard,
};

export function ProjectBottomSection({
  project,
}: ProjectBottomSectionProps) {
  const challenges = project.challenges ?? [];
  const results = project.results ?? [];
  const cta = project.cta;
  const trustSignals = project.trustSignals ?? [];

  if (!challenges.length && !results.length && !cta && !trustSignals.length) {
    return null;
  }

  return (
    <section className="mt-10 sm:mt-12 lg:mt-[72px]">
      {(challenges.length || results.length || cta) ? (
        <div className="grid gap-5 md:grid-cols-2 md:items-start xl:grid-cols-3 xl:items-start">
          {challenges.length ? (
            <article
              id="challenges"
              aria-labelledby="project-challenges-title"
              className="h-full scroll-mt-32 rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.82),rgba(7,11,21,0.68))] p-6 shadow-[0_16px_40px_rgba(2,6,23,0.28),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl"
            >
              <h2
                id="project-challenges-title"
                className="text-[2rem] font-semibold tracking-tight text-white sm:text-[2.25rem]"
              >
                Challenges
              </h2>

              <div className="mt-5 space-y-3">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.title}
                    className="relative rounded-[20px] border border-white/[0.08] bg-white/[0.025] px-4 py-3.5"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-4 h-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
                    />
                    <h3 className="text-base font-semibold text-white">
                      {challenge.title}
                    </h3>
                    <p className="mt-1.5 max-w-[28ch] text-sm leading-6 text-slate-400">
                      {challenge.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ) : null}

          {results.length ? (
            <article
              aria-labelledby="project-results-title"
              className="relative h-full rounded-[24px] border border-[rgba(52,211,153,0.12)] bg-[linear-gradient(180deg,rgba(16,185,129,0.025),rgba(15,23,42,0.01))] p-6 shadow-[0_0_32px_rgba(16,185,129,0.032),0_16px_40px_rgba(2,6,23,0.28),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/12 to-transparent"
              />
              <h2
                id="project-results-title"
                className="text-[2rem] font-semibold tracking-tight text-white sm:text-[2.25rem]"
              >
                Results
              </h2>

              <div className="mt-4 space-y-3 sm:space-y-4">
                {results.map((result) => (
                  <div
                    key={result.title}
                    className="rounded-[20px] border border-[rgba(52,211,153,0.16)] bg-white/[0.03] px-4 py-[0.8125rem] shadow-[0_0_24px_rgba(16,185,129,0.025)] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[rgba(52,211,153,0.28)] sm:py-3"
                  >
                    <h3 className="flex items-start gap-2.5 text-base font-semibold text-white">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-emerald-300/80"
                        aria-hidden="true"
                      />
                      <span>{result.title}</span>
                    </h3>
                    <p className="mt-1.5 max-w-[28ch] text-sm leading-6 text-slate-400">
                      {result.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ) : null}

          {cta ? (
            <article
              id="future"
              aria-labelledby="project-cta-title"
              className="scroll-mt-32 rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.82),rgba(7,11,21,0.68))] p-6 shadow-[0_16px_40px_rgba(2,6,23,0.28),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl md:col-span-2 xl:col-span-1"
            >
              <div className="md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-6 xl:block">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-violet-300/18 bg-violet-400/10 text-violet-200">
                  <Rocket className="size-5" aria-hidden="true" />
                </div>

                <div className="md:min-w-0">
                  <h2
                    id="project-cta-title"
                    className="mt-5 text-[2rem] font-semibold tracking-tight text-white sm:text-[2.25rem] md:mt-0 xl:mt-5"
                  >
                    {cta.title}
                  </h2>
                  <p className="mt-3 max-w-[27ch] text-sm leading-7 text-slate-300 md:max-w-none">
                    {cta.description}
                  </p>
                </div>

                <div className="mt-4 md:mt-0 md:flex md:justify-end xl:mt-4 xl:block">
                  <Link
                    href={cta.buttonHref}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-500 to-violet-500 px-6 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(59,130,246,0.24)] transition duration-300 hover:translate-y-[-1px] hover:shadow-[0_22px_52px_rgba(76,29,149,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    {cta.buttonLabel}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      ) : null}

      {trustSignals.length ? (
        <div className="mt-4 rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.82),rgba(7,11,21,0.68))] px-4 py-2.5 backdrop-blur-xl sm:px-5 sm:py-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {trustSignals.map((item, index) => {
              const Icon = trustIconMap[item.icon] ?? ShieldCheck;

              return (
                <div
                  key={item.title}
                  className="relative rounded-xl px-3 py-2.5 lg:rounded-none lg:px-5 lg:py-1.5"
                >
                  {index > 0 ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-2 left-0 top-2 hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block"
                    />
                  ) : null}

                  <div className="flex items-start gap-3 lg:gap-3">
                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-blue-200">
                      <Icon className="size-[1.125rem]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold leading-5 text-white">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-5 text-slate-400 sm:text-[13px]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
