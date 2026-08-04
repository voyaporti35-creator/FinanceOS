import type { AdvisorSuggestion } from "../models";
import type { FinanceSnapshot } from "../../finance/types";


export function buildAdvisorSuggestions(
  snapshot: FinanceSnapshot
): AdvisorSuggestion[] {


  const suggestions: AdvisorSuggestion[] = [];



  /*
   * AHORRO
   */

  if (snapshot.savingsRate < 0.20) {

    suggestions.push({

      id: "low-saving-rate",

      priority: "high",

      category: "saving",

      title: "Aumenta tu tasa de ahorro",

      description:
        "Tu porcentaje de ahorro mensual está por debajo del objetivo recomendado.",

      action:
        "Reduce gastos o aumenta ingresos hasta superar el 20%.",

      metric:
        `${(snapshot.savingsRate * 100).toFixed(1)}% ahorro`,

      impact:
        "Mayor capacidad para crear patrimonio.",

    });

  }




  /*
   * DEUDA
   */

  if (snapshot.debtRatio > 0.35) {

    suggestions.push({

      id: "high-debt",

      priority: "high",

      category: "debt",

      title: "Controla tu nivel de deuda",

      description:
        "Tus obligaciones financieras tienen un peso elevado sobre tus ingresos.",

      action:
        "Prioriza amortización de deuda.",

      metric:
        `${(snapshot.debtRatio * 100).toFixed(1)}% endeudamiento`,

      impact:
        "Mejora tu capacidad financiera mensual.",

    });

  }




  /*
   * LIQUIDEZ
   */

  const emergencyMonths =
    snapshot.monthlyExpenses > 0
      ? snapshot.liquidityTotal /
        snapshot.monthlyExpenses
      : 0;



  if (emergencyMonths < 3) {

    suggestions.push({

      id: "low-emergency-fund",

      priority: "high",

      category: "liquidity",

      title: "Aumenta tu fondo de emergencia",

      description:
        "Tu liquidez cubre menos de tres meses de gastos.",

      action:
        "Prioriza crear un colchón financiero.",

      metric:
        `${emergencyMonths.toFixed(1)} meses cubiertos`,

      impact:
        "Mayor seguridad ante imprevistos.",

    });

  }




  /*
   * PATRIMONIO
   */

  if (snapshot.netWorth < 0) {

    suggestions.push({

      id: "negative-wealth",

      priority: "high",

      category: "wealth",

      title: "Patrimonio negativo",

      description:
        "Tus pasivos superan tus activos.",

      action:
        "Reduce deuda y aumenta activos.",

      metric:
        `${snapshot.netWorth.toLocaleString("es-ES")} €`,

      impact:
        "Construcción progresiva de patrimonio.",

    });

  }




  /*
   * SITUACIÓN POSITIVA
   */

  if (
    suggestions.length === 0
  ) {

    suggestions.push({

      id: "financial-health",

      priority: "low",

      category: "wealth",

      title: "Situación financiera saludable",

      description:
        "No se detectan riesgos relevantes.",

      action:
        "Mantén tu estrategia actual.",

      impact:
        "Continúa aumentando patrimonio.",

    });

  }



  return suggestions;

}