import {
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";

import { PanelCard } from "../../../components/ui/PanelCard";

import { useAdvisor } from "../../../core/advisor/hooks/useAdvisor";


function PriorityIcon({
  priority,
}: {
  priority: "low" | "medium" | "high";
}) {

  if (priority === "high") {
    return (
      <AlertTriangle className="size-5 text-red-400" />
    );
  }

  if (priority === "medium") {
    return (
      <Info className="size-5 text-yellow-400" />
    );
  }

  return (
    <CheckCircle className="size-5 text-emerald-400" />
  );
}


export function AdvisorPanel() {

  const {
    suggestions,
  } = useAdvisor();


  if (!suggestions.length) {
    return null;
  }


  return (

    <PanelCard

      title="Asesor financiero"

      subtitle="Recomendaciones automáticas basadas en tu situación"

    >

      <div className="space-y-3">

        {suggestions
          .slice(0, 5)
          .map((suggestion) => (

            <div

              key={suggestion.id}

              className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"

            >

              <div className="flex items-start gap-3">


                <PriorityIcon
                  priority={suggestion.priority}
                />


                <div className="flex-1">


                  <div className="flex items-center justify-between">


                    <h3 className="font-semibold text-white">
                      {suggestion.title}
                    </h3>


                    <span className="text-xs uppercase text-slate-400">
                      {suggestion.priority}
                    </span>


                  </div>



                  <p className="mt-1 text-sm text-slate-400">
                    {suggestion.description}
                  </p>



                  <p className="mt-3 text-sm text-cyan-300">
                    Acción:
                    {" "}
                    {suggestion.action}
                  </p>



                  {suggestion.metric && (

                    <p className="mt-2 text-xs text-slate-500">
                      {suggestion.metric}
                    </p>

                  )}



                </div>


              </div>


            </div>

          ))}

      </div>


    </PanelCard>

  );

}