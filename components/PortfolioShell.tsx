"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

type PortfolioShellProps = {
  children: ReactNode;
};

export function PortfolioShell({ children }: PortfolioShellProps) {
  const shellStyle = {
    "--portfolio-spotlight-x": "50%",
    "--portfolio-spotlight-y": "24%",
    "--portfolio-spotlight-opacity": "0",
    "--portfolio-depth-x": "0px",
    "--portfolio-depth-y": "0px",
  } as CSSProperties;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const depthX = (x / bounds.width - 0.5) * 8;
    const depthY = (y / bounds.height - 0.5) * 8;

    event.currentTarget.style.setProperty("--portfolio-spotlight-x", `${x}px`);
    event.currentTarget.style.setProperty("--portfolio-spotlight-y", `${y}px`);
    event.currentTarget.style.setProperty("--portfolio-spotlight-opacity", "1");
    event.currentTarget.style.setProperty("--portfolio-depth-x", `${depthX}px`);
    event.currentTarget.style.setProperty("--portfolio-depth-y", `${depthY}px`);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--portfolio-spotlight-opacity", "0");
    event.currentTarget.style.setProperty("--portfolio-depth-x", "0px");
    event.currentTarget.style.setProperty("--portfolio-depth-y", "0px");
  };

  return (
    <div
      style={shellStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="portfolio-shell glass-panel glass-edge relative mx-4 mb-12 max-w-6xl overflow-hidden rounded-xl border border-white/10 shadow-card-glow backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-[4] before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue-300/35 before:to-transparent sm:mx-6 lg:mx-auto"
    >
      <div className="portfolio-global-system pointer-events-none absolute -inset-6 z-[1]" />
      <div className="portfolio-global-light pointer-events-none absolute inset-0 z-[3]" />
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
