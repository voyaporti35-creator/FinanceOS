import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">FinanceOS</p>
        <h2 className="mt-1 text-3xl font-semibold text-white">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-slate-400">{subtitle}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
