import {
  CalendarDays,
  Euro,
  Home,
  TrendingDown,
} from "lucide-react";

import { PanelCard } from "../../components/ui/PanelCard";
import { useMortgage } from "../../core/mortgage/hooks/useMortgage";


export default function MortgageCenter() {


  const {
    mortgage,
    simulation,
    scenarios,
    progress,
    freedom,
  } = useMortgage();



  if (!mortgage) {

    return (

      <section className="space-y-6">

        <PanelCard
          title="Hipoteca"
          subtitle="Centro de inteligencia hipotecaria"
        >

          <p className="text-slate-400">
            No hay ninguna hipoteca registrada.
          </p>

        </PanelCard>

      </section>

    );

  }



  const cards = [

    {
      title: "Deuda actual",

      value:
        mortgage.currentValue.toLocaleString(
          "es-ES",
          {
            style: "currency",
            currency: "EUR",
          }
        ),

      icon: Home,
    },


    {
      title: "Tipo interés",

      value:
        `${mortgage.interestRate ?? 0}%`,

      icon: TrendingDown,
    },


    {
      title: "Cuota mensual",

      value:
        (mortgage.monthlyPayment ?? 0)
        .toLocaleString(
          "es-ES",
          {
            style: "currency",
            currency: "EUR",
          }
        ),

      icon: Euro,
    },


    {
      title: "Meses ahorrados",

      value:
        `${simulation.monthsSaved} meses`,

      icon: CalendarDays,
    },


    {
      title: "Intereses ahorrados",

      value:
        simulation.interestSaved.toLocaleString(
          "es-ES",
          {
            style: "currency",
            currency: "EUR",
          }
        ),

      icon: TrendingDown,
    },

  ];



  return (

    <section className="space-y-6">


      <div>

        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
          Mortgage Center
        </p>


        <h1 className="mt-1 text-3xl font-semibold text-white">
          Inteligencia hipotecaria
        </h1>

      </div>




      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        {cards.map(
          ({
            title,
            value,
            icon: Icon,
          }) => (

            <PanelCard
              key={title}
              title={title}
              subtitle=""
            >

              <div className="flex items-center justify-between">

                <span className="text-2xl font-semibold text-white">
                  {value}
                </span>


                <Icon className="size-6 text-cyan-300" />

              </div>

            </PanelCard>

          )
        )}

      </div>





      <PanelCard
        title="Libertad hipotecaria"
        subtitle="Fecha estimada de finalización"
      >

        <div className="grid gap-4 md:grid-cols-2">


          <div className="rounded-xl bg-slate-950/70 p-4">

            <p className="text-sm text-slate-400">
              Año estimado
            </p>


            <p className="mt-2 text-3xl font-semibold text-emerald-300">
              {freedom.year}
            </p>

          </div>



          <div className="rounded-xl bg-slate-950/70 p-4">

            <p className="text-sm text-slate-400">
              Tiempo restante
            </p>


            <p className="mt-2 text-2xl font-semibold text-white">
              {progress.remainingYears} años
            </p>

          </div>


        </div>


      </PanelCard>





      <PanelCard
        title="Progreso hipotecario"
        subtitle="Evolución hacia la libertad financiera"
      >

        <div className="space-y-4">


          <div className="flex justify-between text-sm">

            <span className="text-slate-400">
              Hipoteca pagada
            </span>


            <span className="font-semibold text-emerald-300">
              {progress.paidPercentage.toFixed(1)}%
            </span>

          </div>




          <div className="h-3 overflow-hidden rounded-full bg-slate-800">

            <div

              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"

              style={{
                width:
                  `${progress.paidPercentage}%`,
              }}

            />

          </div>




          <div className="grid gap-4 md:grid-cols-2">


            <div className="rounded-xl bg-slate-950/70 p-4">

              <p className="text-sm text-slate-400">
                Pendiente
              </p>


              <p className="mt-2 text-xl font-semibold text-white">

                {progress.remainingPercentage.toFixed(1)}%

              </p>


            </div>




            <div className="rounded-xl bg-slate-950/70 p-4">

              <p className="text-sm text-slate-400">
                Años restantes
              </p>


              <p className="mt-2 text-xl font-semibold text-cyan-300">

                {progress.remainingYears}

              </p>


            </div>


          </div>


        </div>


      </PanelCard>





      <PanelCard

        title="Simulador de amortización"

        subtitle="Compara diferentes aportaciones mensuales"

      >


        <div className="space-y-3">


          {scenarios.map(
            (scenario) => (

              <div

                key={scenario.label}

                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-4"

              >

                <div>

                  <p className="font-medium text-white">

                    {scenario.label}

                  </p>


                  <p className="text-sm text-slate-400">

                    Extra:
                    {" "}
                    {scenario.extraPayment.toLocaleString(
                      "es-ES",
                      {
                        style: "currency",
                        currency: "EUR",
                      }
                    )}

                    /mes

                  </p>

                </div>



                <div className="text-right">

                  <p className="text-lg font-semibold text-emerald-300">

                    {scenario.result.monthsSaved}
                    {" "}
                    meses

                  </p>


                  <p className="text-xs text-slate-400">

                    reducción estimada

                  </p>


                </div>


              </div>

            )
          )}


        </div>


      </PanelCard>


    </section>

  );

}