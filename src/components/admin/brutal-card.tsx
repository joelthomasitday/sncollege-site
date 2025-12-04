import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface MinimalCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered" | "accent";
  padding?: "sm" | "default" | "lg" | "none";
}

export const MinimalCard = forwardRef<HTMLDivElement, MinimalCardProps>(
  ({ className, variant = "default", padding = "default", children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-white border border-slate-200 shadow-soft",
      elevated: "bg-white border border-slate-100 shadow-card",
      bordered: "bg-white border border-slate-200",
      accent: "bg-blue-50 border border-blue-100",
    };

    const paddingClasses = {
      none: "",
      sm: "p-4",
      default: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl",
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MinimalCard.displayName = "MinimalCard";

// Keep BrutalCard as an alias for backwards compatibility
export const BrutalCard = MinimalCard;
