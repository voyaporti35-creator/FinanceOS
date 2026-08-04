import { Card, EmptyState } from "../../../components/ui";
import type { DashboardViewModel } from "../types";

interface CashFlowCardProps {
  data: DashboardViewModel | null;
}

function formatAmount(value: number): string {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}

export function CashFlowCard({
  data,
}: CashFlowCardProps) {

  if (!data) {
    return (
      <EmptyState
        title="Sin flujo de caja"
        description="No hay movimientos disponibles para mostrar."
      />
    );
  }


  return (

    <Card
      title="Flujo de caja"
      subtitle="Balance mensual derivado del core financiero"
    >

      <div className="grid gap-4 sm:grid-cols-3">


        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">

          <p className="text-sm text-slate-400">
            Ingresos
          </p>

          <p className="mt-2 text-xl font-semibold text-emerald-300">
            {formatAmount(data.monthlyIncome)}
          </p>

        </div>



        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">

          <p className="text-sm text-slate-400">
            Gastos
          </p>

          <p className="mt-2 text-xl font-semibold text-red-300">
            {formatAmount(data.monthlyExpenses)}
          </p>

        </div>



        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">

          <p className="text-sm text-slate-400">
            Ahorro
          </p>

          <p className="mt-2 text-xl font-semibold text-cyan-300">
            {formatAmount(data.monthlySavings)}
          </p>

        </div>


      </div>


      <div className="mt-4 rounded-xl bg-slate-950/70 p-4">

        <p className="text-sm text-slate-400">
          Tasa de ahorro
        </p>

        <p className="mt-1 text-2xl font-bold text-white">
          {(data.savingsRate * 100).toFixed(1)}%
        </p>

      </div>


    </Card>

  );

}