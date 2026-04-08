import { GripVertical } from 'lucide-react';
import { ContactAvatar } from '@/components/shared/ContactAvatar';
import React from 'react';

export interface KanbanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  stageText: string;
  stageColorClass: string;
  dealName: string;
  companyName: string;
  amount: string;
  agentAvatarSrc?: string;
  borderColorClass?: string;
}

export function KanbanCard({
  stageText,
  stageColorClass,
  dealName,
  companyName,
  amount,
  agentAvatarSrc,
  borderColorClass = "border-transparent hover:border-primary-fixed",
  ...props
}: KanbanCardProps) {
  return (
    <div
      {...props}
      className={`bg-surface-container-lowest p-4 rounded-xl shadow-sm border-b-2 transition-all group cursor-grab active:cursor-grabbing ${borderColorClass}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`${stageColorClass} text-[10px] font-bold px-2 py-0.5 rounded uppercase pointer-events-none`}
        >
          {stageText}
        </span>
        <span className="text-outline-variant group-hover:text-primary transition-colors cursor-grab pointer-events-none">
          <GripVertical size={16} />
        </span>
      </div>
      <h4 className="font-headline font-bold text-on-surface leading-snug pointer-events-none">
        {dealName}
      </h4>
      <p className="text-xs text-on-surface-variant mt-1 font-label pointer-events-none">
        {companyName}
      </p>
      <div className="mt-4 pt-4 flex justify-between items-center pointer-events-none">
        <span className={`font-bold ${borderColorClass.includes('emerald') ? 'text-emerald-600' : 'text-primary'}`}>
          {amount}
        </span>
        <div className="ring-2 ring-surface rounded-full">
          <ContactAvatar size="sm" initials="AC" src={agentAvatarSrc} />
        </div>
      </div>
    </div>
  );
}
