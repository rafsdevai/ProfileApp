import {
  BadgeDollarSign,
  BriefcaseBusiness,
  FileSignature,
  Handshake,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";

const steps = [
  {
    number: "01",
    title: "You refer",
    description: "You connect us with a business that needs our services.",
    icon: Handshake,
  },
  {
    number: "02",
    title: "We take over",
    description: "We handle the meetings, proposals and everything else.",
    icon: BriefcaseBusiness,
  },
  {
    number: "03",
    title: "Client signs & pays",
    description: "Once the client signs the contract and pays the invoice...",
    icon: FileSignature,
  },
  {
    number: "04",
    title: "You earn",
    description: "You earn 10% - 20% commission. Simple as that.",
    icon: BadgeDollarSign,
  },
] as const;

export function PartnershipSteps() {
  return (
    <section
      id="partnership-steps"
      className="relative scroll-mt-28 border-t border-white/[0.05] py-10 sm:py-12"
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-[1.45rem] font-bold leading-tight text-white sm:text-[1.55rem] lg:text-[1.65rem]">
          How our partnership works
        </h2>
      </Reveal>

      <div className="mt-7 grid gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-7 xl:gap-y-0">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <Reveal key={step.title} delay={0.06 + index * 0.05}>
              <article className="relative px-3 py-1 xl:px-2">
                <div className="relative min-h-[9rem] pl-8 sm:min-h-[9.25rem] xl:min-h-[8.7rem]">
                  <div className="relative h-11">
                    <span className="absolute -left-8 top-[-6px] flex size-6 items-center justify-center rounded-full border border-violet-300/28 bg-[linear-gradient(180deg,rgba(58,32,105,0.7),rgba(14,19,33,0.92))] text-[11px] font-semibold text-white shadow-[0_0_14px_rgba(139,92,246,0.12)]">
                      {index + 1}
                    </span>

                    <span className="relative flex size-11 items-center justify-center rounded-xl border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,16,30,0.78),rgba(7,11,22,0.66))] text-[rgb(167,139,250)] shadow-[0_8px_20px_rgba(2,6,23,0.12)] ring-1 ring-inset ring-white/[0.035]">
                      <Icon
                        className="size-[1.15rem] drop-shadow-[0_0_10px_rgba(96,165,250,0.16)]"
                        strokeWidth={1.85}
                        aria-hidden="true"
                      />
                    </span>

                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -left-5 top-[44px] h-[4.1rem] w-px bg-gradient-to-b to-transparent ${
                        index === 0
                          ? "from-white/[0.12] via-white/[0.08]"
                          : "from-white/[0.08] via-white/[0.05]"
                      }`}
                    />

                    {index < steps.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-[58px] top-[20px] hidden h-px w-[calc(100%-3.5rem)] bg-[linear-gradient(90deg,rgba(96,165,250,0.16),rgba(148,163,184,0.08),transparent)] xl:block"
                      />
                    ) : null}

                    {index < steps.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-[6px] top-[17px] hidden size-[7px] rotate-45 border-r border-t border-blue-200/20 xl:block"
                      />
                    ) : null}
                  </div>

                  <div className="mt-3">
                    <h3 className="text-[0.95rem] font-semibold leading-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-[13rem] text-[0.8rem] leading-[1.55] text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
