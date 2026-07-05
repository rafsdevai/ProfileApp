"use client";

import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
      whileInView={
        reduceMotion ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, margin: "-72px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.82, ease: [0.16, 1, 0.3, 1], delay }
      }
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
