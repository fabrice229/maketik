import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-button font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[hsl(217,92%,53%)] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success: "bg-success text-success-foreground hover:bg-success/90",
        outline: "border border-border bg-card text-foreground hover:bg-secondary",
        secondary: "border border-border bg-card text-foreground hover:bg-secondary",
        ghost: "text-primary bg-transparent hover:bg-primary/5",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground hover:bg-[hsl(217,92%,53%)] active:scale-[0.98] text-base px-8 py-4 rounded-[10px] font-semibold",
        "hero-outline": "border border-border bg-card text-foreground hover:bg-secondary text-base px-8 py-4 rounded-[10px] font-semibold",
      },
      size: {
        default: "h-11 px-[22px] py-[14px]",
        sm: "h-9 px-4",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base font-semibold",
        icon: "h-11 w-11",
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
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
