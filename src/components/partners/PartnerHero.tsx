import Image from "next/image";
import { CalendarRange, Coins, Rocket } from "lucide-react";

import { Reveal } from "@/components/Reveal";

const benefits = [
  {
    title: "10% - 20%",
    text: "Commission",
    icon: Coins,
  },
  {
    title: "No schedule",
    text: "Work when you want",
    icon: CalendarRange,
  },
  {
    title: "Unlimited potential",
    text: "No limits, no pressure",
    icon: Rocket,
  },
] as const;

export function PartnerHero() {
  return (
    <section className="relative overflow-visible pb-10 pt-24 sm:pb-14 sm:pt-28 lg:pb-16 lg:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
      <div className="pointer-events-none absolute -left-10 top-20 h-72 w-72 rounded-full bg-blue-500/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-10 h-[26rem] w-[26rem] rounded-full bg-violet-500/12 blur-[150px]" />

      <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-12 xl:gap-14">
        <div className="relative z-10 max-w-[42rem]">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-200 shadow-[0_0_18px_rgba(59,130,246,0.07)]">
              Partner Program
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-[3rem] font-bold leading-[0.92] text-white sm:text-[3.8rem] lg:text-[4.9rem] xl:text-[5.25rem]">
              <span className="block lg:whitespace-nowrap">Partner with us.</span>
              <span className="block lg:whitespace-nowrap">
                <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-violet-400 bg-clip-text text-transparent">
                  Grow
                </span>{" "}
                together
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-7 max-w-[32rem] space-y-2 text-[1.02rem] leading-8 text-slate-300 sm:text-lg">
              <p>
                Join our network of partners and earn 10% - 20% commission for
                every client you refer.
              </p>
              <p>You connect us with great opportunities.</p>
              <p>We deliver outstanding results.</p>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="relative mt-8 lg:hidden">
            <div className="pointer-events-none absolute left-[22%] top-[2%] h-[18rem] w-[18rem] rounded-full bg-violet-500/24 blur-[115px]" />
            <div className="pointer-events-none absolute bottom-[6%] left-[12%] h-52 w-[20rem] rounded-full bg-blue-500/14 blur-[110px]" />
            <div className="relative mx-auto w-full max-w-[29rem]">
              <Image
                src="/partners/partner-hero.png"
                alt="Partnership illustration showing a professional collaboration and shared business growth"
                width={1400}
                height={1200}
                priority
                className="h-auto w-full object-contain brightness-[1.04]"
                sizes="100vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-7 grid grid-cols-3 gap-x-3 gap-y-4 sm:mt-8 sm:gap-x-6 lg:mt-12 lg:max-w-[39.5rem] lg:grid-cols-[repeat(3,11.25rem)] lg:justify-between lg:gap-x-0">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="min-w-0 lg:w-[11.25rem]"
                  >
                    <div className="relative flex size-[2.9rem] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,11,22,0.88))] text-blue-200 shadow-[0_16px_34px_rgba(2,6,23,0.22)] ring-1 ring-inset ring-white/[0.04] sm:size-[3.2rem]">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_45%),radial-gradient(circle_at_72%_78%,rgba(168,85,247,0.18),transparent_50%)]" />
                      <Icon
                        className="relative z-10 size-[1.05rem] text-[rgb(167,139,250)] drop-shadow-[0_0_10px_rgba(96,165,250,0.22)] sm:size-[1.2rem]"
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-3 text-[1.06rem] font-semibold leading-[1.08] text-white sm:mt-4 sm:text-[1.32rem] lg:text-[1.5rem] lg:whitespace-nowrap">
                      {benefit.title}
                    </p>
                    <p className="mt-1 text-[0.82rem] leading-5 text-slate-400 sm:mt-1.5 sm:text-[0.96rem] sm:leading-6 lg:whitespace-nowrap">
                      {benefit.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="relative hidden lg:block">
          <div className="pointer-events-none absolute left-[22%] top-[2%] h-[26rem] w-[26rem] rounded-full bg-violet-500/24 blur-[145px]" />
          <div className="pointer-events-none absolute bottom-[6%] left-[12%] h-72 w-[28rem] rounded-full bg-blue-500/14 blur-[135px]" />
          <div className="relative mx-auto w-full max-w-[70rem] lg:max-w-none lg:-translate-y-10 lg:translate-x-8 xl:-translate-y-12 xl:translate-x-12">
            <Image
              src="/partners/partner-hero.png"
              alt="Partnership illustration showing a professional collaboration and shared business growth"
              width={1400}
              height={1200}
              priority
              className="h-auto w-full object-contain brightness-[1.04] lg:scale-[1.2]"
              sizes="(min-width: 1280px) 1180px, (min-width: 1024px) 68vw, 100vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
