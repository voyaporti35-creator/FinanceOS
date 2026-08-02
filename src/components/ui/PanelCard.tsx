import type { ReactNode } from "react";

interface PanelCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function PanelCard({ title, subtitle, children }: PanelCardProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
      </div>

      {children}
    </section>
  );
}
