import {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

import { PanelCard } from "../../../components/ui/PanelCard";

import { useAnalytics } from "../../../core/analytics/hooks/useAnalytics";


export function FinancialHealthCard() {


  const {
    analytics,
    isLoading,
  } = useAnalytics();



  if (isLoading || !analytics) {

    return null;

  }



  const {
    health,
    debt,
    cashflow,
    recommendations,
  } = analytics;



  const HealthIcon =
    health.level === "excellent" ||
    health.level === "good"
      ? CheckCircle
      : AlertTriangle;



  return (

    <PanelCard

      title="Salud financiera"

      subtitle="Análisis automático de tu situación"

    >

      <div className="space-y-5">


        <div className="flex items-center justify-between">


          <div className="flex items-center gap-3">


            <HealthIcon className="size-8 text-cyan-300" />


            <div>

              <p className="text-sm text-slate-400">
                Nivel financiero
              </p>


              <p className="text-xl font-semibold text-white">
                {health.level}
              </p>


            </div>


          </div>




          <div className="text-right">

            <p className="text-sm text-slate-400">
              Puntuación
            </p>


            <p className="text-3xl font-bold text-emerald-300">
              {health.score}
            </p>


          </div>


        </div>





        <div className="grid grid-cols-2 gap-4">


          <div className="rounded-xl bg-slate-950/70 p-4">


            <p className="text-sm text-slate-400">
              Ratio deuda
            </p>


            <p className="mt-1 text-xl font-semibold text-white">
              {(debt.debtRatio * 100).toFixed(1)}%
            </p>


          </div>




          <div className="rounded-xl bg-slate-950/70 p-4">


            <p className="text-sm text-slate-400">
              Ahorro mensual
            </p>


            <p className="mt-1 text-xl font-semibold text-emerald-300">

              {cashflow.monthlySavings.toLocaleString(
                "es-ES",
                {
                  style: "currency",
                  currency: "EUR",
                }
              )}

            </p>


          </div>


        </div>





        <div>


          <p className="mb-3 flex items-center gap-2 text-sm text-slate-400">

            <TrendingUp className="size-4" />

            Recomendaciones

          </p>




          <div className="space-y-2">


            {recommendations
              .slice(0, 3)
              .map(
                (recommendation) => (

                  <div

                    key={recommendation.id}

                    className="rounded-xl border border-slate-800 bg-slate-950/70 p-3"

                  >

                    <p className="font-medium text-white">
                      {recommendation.title}
                    </p>


                    <p className="mt-1 text-sm text-slate-400">
                      {recommendation.description}
                    </p>


                  </div>

                )
              )}


          </div>


        </div>


      </div>


    </PanelCard>

  );

}