"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const projectFilters = [
  { value: "all", label: "All Projects" },
  { value: "ai", label: "AI & Machine Learning" },
  { value: "web", label: "Web Applications" },
  { value: "mobile", label: "Mobile" },
  { value: "automation", label: "Automation" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "academic", label: "Academic" },
] as const;

type ProjectFiltersProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export function ProjectFilters({
  activeFilter,
  onFilterChange,
}: ProjectFiltersProps) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (!scrollArea) {
      return;
    }

    const activeButton = scrollArea.querySelector<HTMLButtonElement>(
      `[data-filter="${activeFilter}"]`,
    );

    activeButton?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeFilter]);

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#050816] to-transparent lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#050816] to-transparent lg:hidden"
      />

      <div
        ref={scrollAreaRef}
        aria-label="Project categories"
        className="overflow-x-auto px-1 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:px-0"
      >
        <div className="flex min-w-max snap-x snap-mandatory justify-start gap-2.5 pr-6 sm:pr-8 lg:min-w-0 lg:justify-center lg:pr-0">
          {projectFilters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                data-filter={filter.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => onFilterChange(filter.value)}
                className={cn(
                  "shrink-0 snap-start rounded-full border px-4 py-2.5 text-sm font-semibold tracking-[0.01em] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.99] motion-reduce:transition-none motion-reduce:transform-none",
                  isActive
                    ? "border-blue-300/18 bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 text-white shadow-[0_0_26px_rgba(59,130,246,0.22)]"
                    : "border-white/8 bg-white/[0.02] text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-white/16 hover:bg-white/[0.045] hover:text-white",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
