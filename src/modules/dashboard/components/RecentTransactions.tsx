import { Card, EmptyState } from "../../../components/ui";
import type { DashboardViewModel } from "../types";

interface RecentTransactionsProps {
  data: DashboardViewModel | null;
}

export function RecentTransactions({ data }: RecentTransactionsProps) {
  if (!data) {
    return <EmptyState title="Sin movimientos recientes" description="Aún no hay movimientos para mostrar." />;
  }

  return (
    <Card title="Movimientos recientes" subtitle="Última actividad del sistema">
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
          <span className="text-slate-400">Movimientos registrados</span>
          <span className="font-semibold text-white">{data.transactionCount}</span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
          <span className="text-slate-400">Último movimiento</span>
          <span className="font-semibold text-white">{data.lastTransactionDate ?? "Sin datos"}</span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
          <span className="text-slate-400">Próxima recurrente</span>
          <span className="font-semibold text-white">{data.nextRecurringDate ?? "Sin datos"}</span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
          <span className="text-slate-400">Pendientes</span>
          <span className="font-semibold text-white">{data.pendingRecurringCount}</span>
        </div>
      </div>
    </Card>
  );
}
