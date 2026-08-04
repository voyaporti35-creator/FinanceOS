import { Home } from "lucide-react";

import { PanelCard } from "../../../components/ui/PanelCard";
import { useMortgage } from "../../../core/mortgage/hooks/useMortgage";


export function MortgageOverview() {

  const {
    mortgage,
    progress,
    freedom,
  } = useMortgage();



  if (!mortgage) {

    return null;

  }



  return (

    <PanelCard
      title="Hipoteca"
      subtitle="Estado actual y libertad financiera"
    >

      <div className="space-y-4">


        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-400">
              Deuda pendiente
            </p>


            <p className="mt-1 text-2xl font-semibold text-white">

              {mortgage.currentValue.toLocaleString(
                "es-ES",
                {
                  style: "currency",
                  currency: "EUR",
                }
              )}

            </p>

          </div>


          <Home className="size-8 text-cyan-300" />

        </div>




        <div>

          <div className="mb-2 flex justify-between text-sm">

            <span className="text-slate-400">
              Hipoteca pagada
            </span>


            <span className="text-emerald-300">
              {progress.paidPercentage.toFixed(1)}%
            </span>

          </div>


          <div className="h-2 rounded-full bg-slate-800">

            <div

              className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"

              style={{
                width:
                  `${progress.paidPercentage}%`,
              }}

            />

          </div>

        </div>





        <div className="grid grid-cols-2 gap-3">


          <div className="rounded-xl bg-slate-950/70 p-3">

            <p className="text-xs text-slate-400">
              Libertad
            </p>


            <p className="mt-1 text-lg font-semibold text-emerald-300">

              {freedom.year}

            </p>

          </div>




          <div className="rounded-xl bg-slate-950/70 p-3">

            <p className="text-xs text-slate-400">
              Restante
            </p>


            <p className="mt-1 text-lg font-semibold text-white">

              {progress.remainingYears} años

            </p>

          </div>


        </div>


      </div>


    </PanelCard>

  );

}