import type { ReactNode } from "react";
import { PanelCard } from "./PanelCard";

interface CardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Card({ title, subtitle, children }: CardProps) {
  return (
    <PanelCard title={title} subtitle={subtitle}>
      {children}
    </PanelCard>
  );
}
