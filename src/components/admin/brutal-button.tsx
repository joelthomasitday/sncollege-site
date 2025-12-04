import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const minimalButtonVariants = cva(
  `
    inline-flex items-center justify-center gap-2
    font-medium tracking-normal
    rounded-lg transition-smooth
    disabled:opacity-50 disabled:cursor-not-allowed
    focus-ring
  `,
  {
    variants: {
      variant: {
        default:
          "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
        primary:
          "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-soft hover:shadow-card",
        secondary:
          "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
        outline:
          "bg-transparent text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
        ghost:
          "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        default: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface MinimalButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof minimalButtonVariants> {}

export const MinimalButton = forwardRef<HTMLButtonElement, MinimalButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(minimalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

MinimalButton.displayName = "MinimalButton";

// Keep BrutalButton as an alias for backwards compatibility
export const BrutalButton = MinimalButton;
