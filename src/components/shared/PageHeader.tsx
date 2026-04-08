import { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-on-surface font-headline tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-on-surface-variant font-body text-sm mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {children && <div className="flex gap-3">{children}</div>}
    </div>
  );
}
