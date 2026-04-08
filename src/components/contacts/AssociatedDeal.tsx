import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export interface AssociatedDealProps {
  dealName: string;
  stageName: string;
  amount: string;
  confidenceOrPipeline: string;
  icon: ReactNode;
  iconBgColor: string;
  iconTextColor: string;
}

export function AssociatedDeal({
  dealName,
  stageName,
  amount,
  confidenceOrPipeline,
  icon,
  iconBgColor,
  iconTextColor,
}: AssociatedDealProps) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-surface-container-low rounded-2xl transition-colors cursor-pointer group">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgColor} ${iconTextColor}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-on-surface">{dealName}</h4>
        <p className="text-xs text-on-surface-variant">{stageName}</p>
      </div>
      <div className="text-right">
        <p className="font-black text-on-surface">{amount}</p>
        <p className={`text-xs font-bold ${confidenceOrPipeline.includes("%") ? "text-secondary-dim" : "text-on-surface-variant"}`}>
          {confidenceOrPipeline}
        </p>
      </div>
      <ChevronRight
        size={18}
        className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
}
