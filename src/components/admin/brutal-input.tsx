import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface MinimalInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const MinimalInput = forwardRef<HTMLInputElement, MinimalInputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border bg-white text-slate-700",
            "placeholder:text-slate-400 text-sm",
            "transition-smooth focus:outline-none",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
              : "border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);

MinimalInput.displayName = "MinimalInput";

// Keep BrutalInput as an alias for backwards compatibility
export const BrutalInput = MinimalInput;
