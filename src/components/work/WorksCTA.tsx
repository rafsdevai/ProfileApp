import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export function WorksCTA() {
  return (
    <Reveal
      aria-labelledby="works-cta-heading"
      className="relative overflow-hidden rounded-[30px] border border-violet-300/16 bg-[linear-gradient(180deg,rgba(7,11,21,0.9),rgba(6,10,20,0.72))] px-6 py-7 shadow-[0_26px_90px_rgba(2,6,23,0.34)] backdrop-blur-2xl sm:px-8 sm:py-8 lg:px-12 lg:py-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_40%,rgba(124,58,237,0.24),transparent_20rem),radial-gradient(circle_at_18%_64%,rgba(37,99,235,0.12),transparent_20rem),linear-gradient(90deg,rgba(37,99,235,0.1),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.03]" />

      <div className="relative grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
        <div className="flex">
          <div className="flex size-16 items-center justify-center rounded-[22px] border border-violet-300/18 bg-[linear-gradient(180deg,rgba(124,58,237,0.2),rgba(37,99,235,0.1))] text-violet-100 shadow-[0_0_44px_rgba(124,58,237,0.16)] sm:size-20">
            <Rocket className="size-7 sm:size-9" aria-hidden="true" />
          </div>
        </div>

        <div className="max-w-2xl">
          <h2
            id="works-cta-heading"
            className="text-balance text-2xl font-bold text-white sm:text-3xl"
          >
            Have a project in mind?
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            Let&apos;s build something amazing together. I&apos;m available for
            freelance projects and long-term collaborations.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-3 lg:flex-col lg:items-end lg:gap-4 xl:flex-row xl:items-center xl:gap-3">
          <Button asChild size="lg" className="shadow-[0_0_32px_rgba(59,130,246,0.24)] active:scale-[0.99]">
            <Link href="/#contact">
              Book a Free Consultation
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>

          <Link
            href="/#services"
            className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-slate-300 transition duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.99] motion-reduce:transition-none motion-reduce:transform-none"
          >
            View Services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
