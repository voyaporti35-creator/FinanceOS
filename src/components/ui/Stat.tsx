import type { LucideIcon } from "lucide-react";
import KpiCard from "./KpiCard";

interface StatProps {
  title: string;
  value: string;
  detail: string;
  trend: string;
  icon: LucideIcon;
  tone?: "positive" | "neutral" | "negative";
}

export function Stat(props: StatProps) {
  return <KpiCard {...props} />;
}
