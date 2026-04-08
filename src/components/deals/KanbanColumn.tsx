import React, { ReactNode } from "react";
import { PlusCircle } from "lucide-react";

export interface KanbanColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  count: number;
  colorClass: string;
  children: ReactNode;
  bgVariant?: string;
}

export function KanbanColumn({
  title,
  count,
  colorClass,
  bgVariant = "bg-transparent",
  children,
  ...props
}: KanbanColumnProps) {
  return (
    <div className="flex-shrink-0 w-80 flex flex-col" {...props}>
      <div className="flex items-center justify-between px-3 mb-4 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${colorClass}`}></span>
          <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-on-surface-variant">
            {title}
          </h3>
          <span className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded text-[10px] font-bold">
            {count}
          </span>
        </div>
        <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer pointer-events-auto">
          <PlusCircle size={20} />
        </button>
      </div>
      <div className={`flex flex-col gap-3 min-h-[500px] rounded-2xl ${bgVariant} p-1 h-full`}>
        {children}
      </div>
    </div>
  );
}
