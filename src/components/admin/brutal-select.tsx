"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MinimalSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const MinimalSelect = forwardRef<HTMLSelectElement, MinimalSelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg border bg-white text-slate-700",
              "text-sm appearance-none cursor-pointer pr-10",
              "transition-smooth focus:outline-none",
              error
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                : "border-slate-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown 
            size={18} 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" 
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

MinimalSelect.displayName = "MinimalSelect";

// Keep BrutalSelect as an alias for backwards compatibility
export const BrutalSelect = MinimalSelect;
