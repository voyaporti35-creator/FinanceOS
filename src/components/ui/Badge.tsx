import type { ReactNode } from "react";
import type { DesignTokenTone } from "./tokens";

interface BadgeProps {
  children: ReactNode;
  tone?: DesignTokenTone;
}

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "border-slate-700 bg-slate-800/70 text-slate-200",
  positive: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  error: "border-red-500/20 bg-red-500/10 text-red-300",
};

export function Badge({ children, tone = "default" }: BadgeProps) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}>{children}</span>;
}
