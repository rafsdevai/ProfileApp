"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { useI18n } from "@/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const activeLockUntilRef = useRef(0);
  const { t } = useI18n();
  const navItems = t.nav.items;

  const setActiveFromClick = (href: string) => {
    activeLockUntilRef.current = Date.now() + 1400;
    setActiveHref(href);
  };

  useEffect(() => {
    const elements = navItems
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < activeLockUntilRef.current) {
          return;
        }

        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aDistance = Math.abs(a.boundingClientRect.top - 96);
            const bDistance = Math.abs(b.boundingClientRect.top - 96);

            return aDistance - bDistance;
          })[0];

        if (visibleEntry) {
          setActiveHref(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-32% 0px -58% 0px",
        threshold: [0.12, 0.28, 0.44, 0.6],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#02050d]/72 shadow-[0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-2xl">
      <nav
        className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8"
        aria-label={t.nav.aria}
      >
        <a href="#home" className="text-base font-bold text-white drop-shadow-sm">
          Rafael<span className="text-blue-400">.</span>Dev
        </a>

        <div className="hidden h-full items-center gap-10 md:flex">
          {navItems.map((item) => {
            const active = activeHref === item.href;

            return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActiveFromClick(item.href)}
              className={cn(
                "relative flex h-full min-w-16 items-center justify-center px-1 text-sm transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white",
                active ? "text-blue-300" : "text-slate-300",
              )}
            >
              {item.label}
              {active ? (
                <motion.span
                  layoutId="navbar-active-indicator"
                  className="absolute inset-x-0 bottom-0 flex justify-center"
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="relative h-px w-16 bg-gradient-to-r from-transparent via-blue-400 to-transparent">
                    <span className="absolute -top-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-blue-400 shadow-blue-glow" />
                  </span>
                </motion.span>
              ) : null}
            </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild size="sm">
            <a href="#contact">
              {t.nav.contact}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative md:hidden"
          aria-label={t.nav.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "menu"}
              initial={{ opacity: 0, rotate: open ? -45 : 45, scale: 0.86 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: open ? 45 : -45, scale: 0.86 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </motion.span>
          </AnimatePresence>
        </Button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/10 bg-[#02050d]/90 px-5 py-5 shadow-card-glow backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-medium transition duration-300 hover:bg-white/5 hover:text-white",
                  activeHref === item.href
                    ? "bg-blue-500/10 text-blue-200"
                    : "text-slate-200",
                )}
                onClick={() => {
                  setActiveFromClick(item.href);
                  setOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-2 w-full">
              <a href="#contact" onClick={() => setOpen(false)}>
                {t.nav.contact}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
