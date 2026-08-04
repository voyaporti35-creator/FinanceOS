import { Card, EmptyState } from "../../../components/ui";
import type { DashboardViewModel } from "../types";

interface SystemStatusProps {
  data: DashboardViewModel | null;
}

export function SystemStatus({ data }: SystemStatusProps) {
  if (!data) {
    return <EmptyState title="Estado del sistema" description="No hay información disponible todavía." />;
  }

  return (
    <Card title="Estado del sistema" subtitle="Sincronización local y estado del core financiero">
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
          <span className="text-slate-400">Fuente de verdad</span>
          <span className="font-semibold text-emerald-300">Dexie</span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
          <span className="text-slate-400">Motor financiero</span>
          <span className="font-semibold text-cyan-300">FinancialEngine</span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
          <span className="text-slate-400">Estado</span>
          <span className="font-semibold text-white">Operativo</span>
        </div>
      </div>
    </Card>
  );
}
