import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  PiggyBank,
  Wallet2,
} from "lucide-react";

import { useEffect, useMemo } from "react";

import KpiCard from "../components/ui/KpiCard";
import { PanelCard } from "../components/ui/PanelCard";

import { useFinanceStore } from "../stores/financeStore";
import { useAssetStore } from "../modules/assets/store/assetStore";
import { useLiabilityStore } from "../modules/liabilities/store/liabilityStore";

import { buildFinanceSnapshot } from "../core/finance/calculations/financeCalculations";
import { useAdvisor } from "../core/advisor/hooks/useAdvisor";
import { useAnalytics } from "../core/analytics/hooks/useAnalytics";


export default function Dashboard() {

  const {
    transactions,
    accounts,
    loadTransactions,
  } = useFinanceStore();


  const {
    assets,
    loadAssets,
  } = useAssetStore();


  const {
    liabilities,
    loadLiabilities,
  } = useLiabilityStore();


  useEffect(() => {
    void loadTransactions();
    void loadAssets();
    void loadLiabilities();
  }, [
    loadTransactions,
    loadAssets,
    loadLiabilities,
  ]);


  const snapshot = useMemo(
    () =>
      buildFinanceSnapshot(
        accounts,
        transactions,
        new Date(),
        assets,
        liabilities
      ),
    [
      accounts,
      transactions,
      assets,
      liabilities,
    ]
  );


  const {
  suggestions,
} = useAdvisor();


const {
  analytics,
} = useAnalytics();


  const balance = snapshot.liquidityTotal;


  const kpis = [
    {
      title: "Patrimonio Neto",
      value: snapshot.netWorth.toLocaleString(
        "es-ES",
        {
          style: "currency",
          currency: "EUR",
        }
      ),
      subtitle: "Valor actual",
      detail: "Patrimonio total",
      trend: "",
      icon: Wallet2,
      tone: "positive" as const,
    },

    {
      title: "Cuentas",
      value: snapshot.accountCount.toString(),
      subtitle: "Cuentas registradas",
      detail: `${snapshot.transactionCount} movimientos`,
      trend: "",
      icon: Wallet2,
      tone: "neutral" as const,
    },

    {
      title: "Liquidez",
      value: snapshot.liquidityTotal.toLocaleString(
        "es-ES",
        {
          style: "currency",
          currency: "EUR",
        }
      ),
      subtitle: "Disponible",
      detail: "Efectivo actual",
      trend: "",
      icon: CreditCard,
      tone: "neutral" as const,
    },

    {
      title: "Deuda",
      value: snapshot.totalLiabilities.toLocaleString(
        "es-ES",
        {
          style: "currency",
          currency: "EUR",
        }
      ),
      subtitle: "Pasivos",
      detail: "Deuda total",
      trend: "",
      icon: ArrowDownRight,
      tone: "negative" as const,
    },

    {
      title: "Ahorro Mensual",
      value: snapshot.monthlySavings.toLocaleString(
        "es-ES",
        {
          style: "currency",
          currency: "EUR",
        }
      ),
      subtitle: "Mes actual",
      detail:
        `${(snapshot.savingsRate * 100).toFixed(1)}% ahorro`,
      trend: "",
      icon: PiggyBank,
      tone: "positive" as const,
    },
  ];


  return (
    <section className="space-y-6">

      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Dashboard
          </p>

          <h2 className="mt-1 text-3xl font-semibold text-white">
            Tu salud financiera en un vistazo
          </h2>
        </div>


        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">

          <span className="font-medium">
            Saldo actual:
          </span>{" "}

          {balance.toLocaleString(
            "es-ES",
            {
              style: "currency",
              currency: "EUR",
            }
          )}

        </div>

      </div>


      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.title}
            {...kpi}
          />
        ))}

      </div>



      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">


        <PanelCard
          title="Flujo de caja"
          subtitle="Evolución financiera"
        >

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">

            <div className="flex items-end gap-3">

              {analytics.cashflowHistory.map(
  (month) => {

    const height =
      Math.max(
        month.savings / 100,
        10
      );

    return (
      <div
        key={month.label}
        className="flex-1 rounded-t-xl bg-gradient-to-t from-cyan-600 to-emerald-400"
        style={{
          height: `${height}px`,
        }}
        title={`${month.label}: ${month.savings.toLocaleString(
          "es-ES",
          {
            style: "currency",
            currency: "EUR",
          }
        )}`}
      />
    );
  }
)}

            </div>

          </div>

        </PanelCard>



        <PanelCard
          title="Asesor financiero"
          subtitle="Recomendaciones automáticas"
        >

          <div className="space-y-3">

            {suggestions.map(
              (suggestion)=>{

                const Icon =
                  suggestion.priority === "high"
                    ? ArrowDownRight
                    : ArrowUpRight;


                return (

                  <div
                    key={suggestion.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"
                  >

                    <div className="flex items-center justify-between">

                      <h4 className="font-medium text-white">
                        {suggestion.title}
                      </h4>

                      <Icon className="size-4 text-cyan-300"/>

                    </div>


                    <p className="mt-2 text-sm text-slate-400">
                      {suggestion.description}
                    </p>


                    <p className="mt-3 text-xs font-medium text-emerald-300">
                      {suggestion.action}
                    </p>


                  </div>

                );

              }
            )}

          </div>

        </PanelCard>


      </div>


    </section>
  );
}