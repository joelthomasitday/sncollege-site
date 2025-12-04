import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { MinimalCard } from "./brutal-card";

interface MetricWidgetProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "accent";
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricWidget({
  title,
  value,
  icon: Icon,
  variant = "default",
  trend,
  className,
}: MetricWidgetProps) {
  const variantStyles = {
    default: {
      card: "bg-white border-slate-200",
      icon: "bg-slate-100 text-slate-600",
      title: "text-slate-500",
      value: "text-slate-800",
    },
    primary: {
      card: "bg-blue-50 border-blue-100",
      icon: "bg-blue-100 text-blue-600",
      title: "text-blue-600/70",
      value: "text-blue-800",
    },
    accent: {
      card: "bg-white border-blue-200",
      icon: "bg-blue-500 text-white",
      title: "text-slate-500",
      value: "text-slate-800",
    },
  };

  const styles = variantStyles[variant];

  return (
    <MinimalCard
      variant="bordered"
      padding="default"
      className={`${styles.card} card-hover ${className || ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-xs font-medium uppercase tracking-wide ${styles.title}`}>
            {title}
          </p>
          <p className={`text-2xl font-semibold mt-2 ${styles.value}`}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.isPositive ? (
                <TrendingUp size={14} className="text-emerald-500" />
              ) : (
                <TrendingDown size={14} className="text-red-500" />
              )}
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {trend.value}%
              </span>
              <span className="text-xs text-slate-400">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${styles.icon}`}>
          <Icon size={22} />
        </div>
      </div>
    </MinimalCard>
  );
}
