"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 520);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const start = window.scrollY;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || start <= 0) {
      window.scrollTo({ top: 0 });
      return;
    }

    const isTouchWidth = window.innerWidth < 1024;
    const duration = isTouchWidth ? 1100 : 720;
    const startTime = window.performance.now();
    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

    const animateScroll = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo({ top: start * (1 - easedProgress) });

      if (progress < 1) {
        window.requestAnimationFrame(animateScroll);
      }
    };

    window.requestAnimationFrame(animateScroll);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 14, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.92 }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-50 flex size-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-blue-100 shadow-[0_18px_50px_rgba(2,6,23,0.45),0_0_24px_rgba(59,130,246,0.12)] backdrop-blur-2xl transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-blue-300/30 hover:bg-blue-500/10 hover:text-white hover:shadow-[0_22px_60px_rgba(2,6,23,0.5),0_0_34px_rgba(59,130,246,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:translate-y-0 sm:bottom-6 sm:right-6"
        >
          <ArrowUp className="size-4" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
