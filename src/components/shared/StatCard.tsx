import { TrendingDown, TrendingUp } from "lucide-react";
import { ReactNode } from "react";

export interface StatCardProps {
  label: string;
  value: string | number;
  diffText: string;
  trend: "up" | "down" | "neutral";
  icon?: ReactNode;
  borderVariant?: "primary" | "tertiary" | "error" | "none";
}

export function StatCard({
  label,
  value,
  diffText,
  trend,
  icon,
  borderVariant = "none",
}: StatCardProps) {
  const borderColors = {
    primary: "border-b-2 border-primary/10",
    tertiary: "border-b-2 border-tertiary/10",
    error: "border-b-2 border-error/10",
    none: "",
  };

  const getTrendStyle = () => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-100";
      case "down":
        return "text-red-600 bg-red-100";
      case "neutral":
      default:
        return "text-blue-600 bg-blue-100";
    }
  };

  const getTrendIconStyle = () => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-error text-red-600";
      case "neutral":
      default:
        return "text-on-surface-variant";
    }
  };

  return (
    <div
      className={`bg-surface-container-lowest p-6 rounded-xl transition-all hover:bg-surface-container ${borderColors[borderVariant]} relative flex flex-col`}
    >
      <div className="flex justify-between items-start mb-4">
        {icon ? (
          <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg shadow-sm text-primary">
            {icon}
          </div>
        ) : (
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-1">
            {label}
          </p>
        )}

        {icon ? (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${getTrendStyle()}`}>
            {diffText}
          </span>
        ) : null}
      </div>

      {!icon && (
        <div className="flex items-end gap-2 mt-auto pb-1">
          <span className={`text-2xl font-black ${trend === "down" && borderVariant === "error" ? "text-error" : "text-on-surface"}`}>
            {value}
          </span>
          <span className={`text-xs font-bold mb-1 flex items-center gap-1 ${getTrendIconStyle()}`}>
            {trend === "up" && <TrendingUp size={14} />}
            {trend === "down" && borderVariant !== "error" && <TrendingDown size={14} />}
            {diffText}
          </span>
        </div>
      )}

      {icon && (
        <>
          <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-1 mt-auto">
            {label}
          </p>
          <p className="text-2xl font-extrabold text-on-surface">{value}</p>
        </>
      )}
    </div>
  );
}
