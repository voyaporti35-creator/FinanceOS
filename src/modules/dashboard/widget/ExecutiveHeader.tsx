import { Landmark, ShieldCheck } from "lucide-react";

interface ExecutiveHeaderProps {

  netWorth: number;

  healthScore: number;

  updatedAt: string;

}

function formatCurrency(value: number) {

  return value.toLocaleString("es-ES", {

    style: "currency",

    currency: "EUR",

  });

}

export function ExecutiveHeader({

  netWorth,

  healthScore,

  updatedAt,

}: ExecutiveHeaderProps) {

  return (

    <section className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-8">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">

            FinanceOS

          </p>

          <h2 className="mt-3 text-5xl font-bold text-white">

            {formatCurrency(netWorth)}

          </h2>

          <p className="mt-2 text-slate-400">

            Patrimonio Neto

          </p>

          <p className="mt-6 text-sm text-slate-500">

            Actualizado

            {" "}

            {updatedAt}

          </p>

        </div>

        <div className="flex flex-col gap-4">

          <div className="flex items-center gap-3 rounded-2xl bg-cyan-500/10 px-5 py-4">

            <Landmark className="h-7 w-7 text-cyan-300" />

            <div>

              <p className="text-sm text-slate-400">

                Estado financiero

              </p>

              <p className="text-3xl font-bold text-white">

                {healthScore}/100

              </p>

            </div>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">

            <div

              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400"

              style={{

                width: `${Math.max(

                  0,

                  Math.min(

                    healthScore,

                    100

                  )

                )}%`,

              }}

            />

          </div>

          <div className="flex items-center gap-2 text-sm text-emerald-300">

            <ShieldCheck className="h-4 w-4" />

            Salud financiera

          </div>

        </div>

      </div>

    </section>

  );

}