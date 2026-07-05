import { Code2, MessageCircle, ShieldCheck, Zap } from "lucide-react";

import { Reveal } from "@/components/Reveal";

const trustItems = [
  {
    title: "Production Ready",
    description: "Built for real users and real-world impact.",
    icon: ShieldCheck,
  },
  {
    title: "Clean & Scalable Code",
    description: "Modern architecture and best practices.",
    icon: Code2,
  },
  {
    title: "AI-Powered Solutions",
    description: "Intelligent systems that solve complex problems.",
    icon: Zap,
  },
  {
    title: "Long-term Support",
    description: "Ongoing maintenance and continuous improvement.",
    icon: MessageCircle,
  },
] as const;

export function WorksTrustRow() {
  return (
    <Reveal aria-labelledby="works-trust-heading" className="pb-2" delay={0.08}>
      <h2 id="works-trust-heading" className="sr-only">
        Trust signals
      </h2>

      <div className="rounded-[20px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(8,12,24,0.72),rgba(5,8,18,0.54))] px-4 py-3 backdrop-blur-xl sm:px-5 sm:py-4">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 lg:gap-0">
        {trustItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="relative rounded-xl px-3 py-3.5 lg:rounded-none lg:px-5 lg:py-2"
            >
              {index > 0 ? (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2 left-0 top-2 hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:block"
                />
              ) : null}

              <div className="flex items-start gap-3.5 lg:gap-3.5">
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-blue-200">
                  <Icon className="size-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-5 text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-[13px]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </Reveal>
  );
}
