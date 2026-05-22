"use client";

import { useEffect, useRef } from "react";

export function AmbientCursor() {
  const lightRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 50, y: 32, opacity: 0 });
  const current = useRef({ x: 50, y: 32, opacity: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const light = lightRef.current;

    if (!light) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (prefersReducedMotion.matches || !finePointer.matches) {
      return;
    }

    const render = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      current.current.opacity +=
        (target.current.opacity - current.current.opacity) * 0.1;

      light.style.setProperty("--ambient-x", `${current.current.x}px`);
      light.style.setProperty("--ambient-y", `${current.current.y}px`);
      light.style.setProperty(
        "--ambient-opacity",
        current.current.opacity.toFixed(3),
      );

      frame.current = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.current = {
        x: event.clientX,
        y: event.clientY,
        opacity: prefersReducedMotion.matches ? 0 : 1,
      };
    };

    const handlePointerLeave = () => {
      target.current.opacity = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    frame.current = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);

      if (frame.current) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return (
    <div
      ref={lightRef}
      className="ambient-cursor-light pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
