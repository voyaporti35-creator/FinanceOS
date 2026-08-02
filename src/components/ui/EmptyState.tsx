import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description ? <p className="mt-2 text-sm text-slate-400">{description}</p> : null}
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
