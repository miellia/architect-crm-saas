import { ReactNode } from "react";

export interface TimelineItemProps {
  icon: ReactNode;
  title: ReactNode;
  timestamp: string;
  description?: string;
  badge?: string;
  iconBgColor?: string;
  iconTextColor?: string;
  compact?: boolean;
}

export function TimelineItem({
  icon,
  title,
  timestamp,
  description,
  badge,
  iconBgColor = "bg-surface-container",
  iconTextColor = "text-on-surface-variant",
  compact = false,
}: TimelineItemProps) {
  if (compact) {
    return (
      <div className="flex gap-4 relative">
        <div className="absolute top-8 left-4 bottom-[-16px] w-[2px] bg-outline-variant/30"></div>
        <div className={`z-10 w-8 h-8 rounded-full border-2 border-surface-dim bg-white flex items-center justify-center ${iconTextColor}`}>
          {icon}
        </div>
        <div className="pb-2">
          <p className="text-sm font-bold text-on-surface">{title}</p>
          {description && <p className="text-xs text-on-surface-variant mb-2">{description}</p>}
          <span className="text-[10px] text-outline font-semibold">{timestamp}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex gap-6">
      <div
        className={`z-10 w-9 h-9 rounded-full ${iconBgColor} flex items-center justify-center ${iconTextColor}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-on-surface">{title}</h4>
          <span className="text-xs text-on-surface-variant font-medium">
            {timestamp}
          </span>
        </div>
        {description && (
          <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
            {description}
          </p>
        )}
        {badge && (
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-1 bg-surface-container rounded-md text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">
              {badge}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
