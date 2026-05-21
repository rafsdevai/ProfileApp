import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex transform-gpu items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:ease-[cubic-bezier(0.22,1,0.36,1)] hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5",
  {
    variants: {
      variant: {
        default:
          "border border-blue-300/20 bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 text-white shadow-blue-glow hover:-translate-y-1 hover:scale-[1.015] hover:from-blue-500 hover:to-violet-500 hover:shadow-[0_0_62px_rgba(37,99,235,0.38)] active:translate-y-0 active:scale-[0.99]",
        outline:
          "border border-white/10 bg-slate-950/45 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:-translate-y-1 hover:scale-[1.01] hover:border-blue-400/35 hover:bg-blue-500/[0.075] active:translate-y-0 active:scale-[0.99]",
        ghost:
          "text-slate-200 hover:bg-white/5 hover:text-white",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-10 px-4",
        lg: "h-11 px-5 sm:h-12 sm:px-7",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
