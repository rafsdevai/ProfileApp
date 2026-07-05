"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import type { ProjectDetail } from "@/src/types/project-detail";

type ProjectScreenshotsProps = {
  project: ProjectDetail;
};

const swipeThreshold = 56;

export function ProjectScreenshots({ project }: ProjectScreenshotsProps) {
  const screenshots = useMemo(() => project.screenshots ?? [], [project.screenshots]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const activeScreenshot =
    activeIndex !== null ? screenshots[activeIndex] ?? null : null;

  const hasMultipleScreenshots = screenshots.length > 1;

  const goToPrevious = useCallback(() => {
    if (activeIndex === null || !screenshots.length) {
      return;
    }

    setActiveIndex((activeIndex - 1 + screenshots.length) % screenshots.length);
  }, [activeIndex, screenshots.length]);

  const goToNext = useCallback(() => {
    if (activeIndex === null || !screenshots.length) {
      return;
    }

    setActiveIndex((activeIndex + 1) % screenshots.length);
  }, [activeIndex, screenshots.length]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        goToPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        goToNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, goToNext, goToPrevious]);

  if (!screenshots.length) {
    return null;
  }

  return (
    <section
      id="gallery"
      aria-labelledby="project-screenshots-title"
      className="mt-10 scroll-mt-32 sm:mt-12 lg:mt-[72px]"
    >
      <div className="max-w-2xl">
        <h2
          id="project-screenshots-title"
          className="text-[2rem] font-semibold tracking-tight text-white sm:text-[2.25rem]"
        >
          Screenshots
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
          A glimpse of the platform
        </p>
        <p className="mt-1.5 text-xs leading-6 text-slate-500 sm:text-sm">
          Click any screenshot to view it in full resolution.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {screenshots.map((screenshot, index) => (
          <article
            key={screenshot.id}
            className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.82),rgba(7,11,21,0.68))] shadow-[0_18px_44px_rgba(2,6,23,0.3),inset_0_1px_0_rgba(255,255,255,0.03)] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-blue-400/18 hover:shadow-[0_28px_60px_rgba(15,23,42,0.42),0_18px_48px_rgba(37,99,235,0.12)]"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="relative aspect-[16/9] overflow-hidden border-b border-white/[0.06] bg-slate-950/50 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-inset"
              aria-label={`Open ${screenshot.title} screenshot`}
            >
              <Image
                src={screenshot.image}
                alt={`${project.title} ${screenshot.title} screenshot`}
                width={1919}
                height={957}
                className="h-full w-full cursor-zoom-in object-cover object-top transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                sizes="(min-width: 1280px) 180px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.06),rgba(2,6,23,0.46))] opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/72 px-3 py-2 text-xs font-medium text-white shadow-[0_10px_30px_rgba(2,6,23,0.34)] backdrop-blur-md">
                  <Expand className="size-3.5" aria-hidden="true" />
                  Expand
                </span>
              </div>
            </button>

            <div className="flex flex-1 flex-col px-4 py-3.5">
              <h3 className="text-base font-semibold text-white">
                {screenshot.title}
              </h3>
              <p className="mt-1 text-[11px] leading-5 text-slate-400">
                {screenshot.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {activeScreenshot ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? {} : { opacity: 1 }}
            exit={reduceMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(0,0,0,0.88)] p-4 backdrop-blur-md sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={activeScreenshot.title}
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-white transition duration-300 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:right-6 sm:top-6"
              aria-label="Close screenshot preview"
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            {hasMultipleScreenshots ? (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-white transition duration-300 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:flex"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-white transition duration-300 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:flex"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </>
            ) : null}

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 14 }}
              animate={reduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, scale: 0.985, y: 10 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[90vw]"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={(event) => {
                setTouchStartX(event.touches[0]?.clientX ?? null);
              }}
              onTouchEnd={(event) => {
                if (touchStartX === null || !hasMultipleScreenshots) {
                  setTouchStartX(null);
                  return;
                }

                const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
                const deltaX = touchEndX - touchStartX;

                if (deltaX > swipeThreshold) {
                  goToPrevious();
                } else if (deltaX < -swipeThreshold) {
                  goToNext();
                }

                setTouchStartX(null);
              }}
            >
              <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,14,26,0.92),rgba(7,11,21,0.84))] shadow-[0_30px_80px_rgba(2,6,23,0.55)]">
                <div className="relative flex items-center justify-center bg-slate-950/70 px-3 py-3 sm:px-6 sm:py-5">
                  <Image
                    src={activeScreenshot.image}
                    alt={`${project.title} ${activeScreenshot.title} screenshot enlarged`}
                    width={1919}
                    height={957}
                    className="h-auto max-h-[80vh] w-auto max-w-[90vw] object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>

                <div className="flex flex-col gap-3 border-t border-white/[0.08] px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white">
                      {activeScreenshot.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {activeScreenshot.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-sm font-medium text-slate-400">
                    {activeIndex! + 1} / {screenshots.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
