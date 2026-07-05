"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type ProjectNavigationItem = {
  readonly id: string;
  readonly label: string;
};

type ProjectNavigationProps = {
  items?: readonly ProjectNavigationItem[];
};

const defaultItems = [
  { id: "overview", label: "Overview" },
  { id: "gallery", label: "Gallery" },
  { id: "features", label: "Features" },
  { id: "challenges", label: "Challenges" },
  { id: "future", label: "Future Improvements" },
] as const satisfies readonly ProjectNavigationItem[];

export function ProjectNavigation({
  items = defaultItems,
}: ProjectNavigationProps) {
  const [activeSection, setActiveSection] = useState(items[0]?.id ?? "overview");
  const navItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const navScrollRef = useRef<HTMLElement | null>(null);

  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio,
          );

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");

      if (sectionIds.includes(hash)) {
        setActiveSection(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [sectionIds]);

  useEffect(() => {
    const activeNode = navItemRefs.current[activeSection];
    const scrollContainer = navScrollRef.current;

    if (!activeNode || !scrollContainer) {
      return;
    }

    const containerRect = scrollContainer.getBoundingClientRect();
    const nodeRect = activeNode.getBoundingClientRect();
    const currentScrollLeft = scrollContainer.scrollLeft;
    const targetScrollLeft =
      currentScrollLeft +
      (nodeRect.left - containerRect.left) -
      (containerRect.width / 2 - nodeRect.width / 2);

    scrollContainer.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: "smooth",
    });
  }, [activeSection]);

  return (
    <div className="sticky top-20 z-30 sm:top-24">
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#050816] via-[#050816]/92 to-transparent md:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#050816] via-[#050816]/92 to-transparent md:hidden"
        />
        <nav
          ref={navScrollRef}
          aria-label="Project sections"
          className="overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
        >
          <div className="mx-auto flex min-w-max items-center gap-1 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,26,0.82),rgba(7,10,20,0.64))] p-1.5 shadow-[0_18px_48px_rgba(2,6,23,0.26)] backdrop-blur-xl">
          {items.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <Link
                key={item.id}
                ref={(node) => {
                  navItemRefs.current[item.id] = node;
                }}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 md:min-h-[52px] md:px-5 md:py-3",
                  isActive
                    ? "bg-white/[0.05] text-white"
                    : "text-slate-400 hover:bg-white/[0.03] hover:text-slate-100",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 bottom-1.5 h-0.5 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-violet-400 transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </div>
        </nav>
      </div>
    </div>
  );
}
