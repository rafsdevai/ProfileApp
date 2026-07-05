"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type HeroVisualProps = {
  src: string | null;
};

function HeroVisualFallback() {
  return (
    <div className="relative mx-auto w-full max-w-[980px] overflow-visible lg:translate-x-14 xl:translate-x-20">
      <div className="relative aspect-[16/10] overflow-visible">
        <div className="absolute left-[7%] top-[11%] w-[70%] overflow-hidden rounded-[24px] border border-white/10 bg-[#0a1020]/92 shadow-[0_36px_90px_rgba(2,6,23,0.44)]">
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-violet-400/90" />
              <span className="size-2 rounded-full bg-blue-400/75" />
              <span className="size-2 rounded-full bg-cyan-300/70" />
            </div>
            <div className="h-2.5 w-24 rounded-full bg-white/8" />
          </div>

          <div className="grid grid-cols-[0.24fr_1fr] gap-4 p-4">
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 rounded-lg border border-white/6 bg-white/[0.03]"
                />
              ))}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/8 bg-white/[0.035] p-3"
                  >
                    <div className="h-2 w-10 rounded-full bg-white/10" />
                    <div className="mt-3 h-6 w-16 rounded-full bg-blue-500/25" />
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-4">
                <div className="flex h-36 items-end gap-3">
                  {[34, 52, 40, 67, 48, 76, 58].map((height, index) => (
                    <div key={index} className="flex-1">
                      <div
                        className="w-full rounded-t-full bg-gradient-to-t from-blue-500/55 via-blue-400/35 to-violet-400/25"
                        style={{ height }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 rounded-xl border border-white/8 bg-white/[0.03]" />
                <div className="h-20 rounded-xl border border-white/8 bg-white/[0.03]" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[7%] right-[9%] w-[25%] min-w-[150px] max-w-[220px] rotate-[8deg] rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(10,14,26,0.96),rgba(4,8,18,0.98))] p-2 shadow-[0_28px_78px_rgba(2,6,23,0.54)]">
          <div className="overflow-hidden rounded-[24px] border border-white/8 bg-[radial-gradient(circle_at_50%_18%,rgba(124,58,237,0.24),transparent_42%),linear-gradient(180deg,rgba(12,18,34,0.98),rgba(6,10,20,0.98))] px-3 py-4">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-white/10" />
            <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.035] p-3">
              <div className="text-center text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                Weekly Output
              </div>
              <div className="mt-3 flex items-center justify-center">
                <div className="relative flex size-24 items-center justify-center rounded-full border border-violet-300/20">
                  <div className="absolute inset-2 rounded-full border-4 border-blue-400/40 border-r-violet-400/80" />
                  <span className="text-lg font-semibold text-white">82%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-10 rounded-lg border border-white/8 bg-white/[0.03]" />
              <div className="h-10 rounded-lg border border-white/8 bg-white/[0.03]" />
              <div className="h-10 rounded-lg border border-white/8 bg-white/[0.03]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroVisual({ src }: HeroVisualProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 24, y: 12 }}
      whileInView={reduceMotion ? {} : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-visible"
    >
      <div className="pointer-events-none absolute left-[34%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.56),transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute left-[28%] bottom-[8%] h-40 w-80 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.3),transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[12%] top-[20%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.18),transparent_74%)] blur-3xl" />

      {src ? (
        <div className="relative mx-auto w-full max-w-[980px] overflow-visible lg:translate-x-14 xl:translate-x-20">
          <Image
            src={src}
            alt="Preview collage of Rafael.Dev selected work projects and dashboard interfaces"
            width={1200}
            height={900}
            priority
            className="relative z-10 h-auto w-[118%] max-w-none object-contain [transform:translateX(-6%)_scale(0.98)] [transform-origin:center_center] md:w-[126%] md:[transform:translateX(-8%)_scale(1.03)] lg:w-[136%] lg:[transform:translateX(-9%)_scale(1.08)] xl:w-[140%]"
            sizes="(min-width: 1280px) 920px, (min-width: 1024px) 68vw, (min-width: 768px) 82vw, 100vw"
          />
        </div>
      ) : (
        <HeroVisualFallback />
      )}
    </motion.div>
  );
}
