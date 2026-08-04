import type { Recommendation } from "../models";

export function generateRecommendations(
  savingsRate: number,
  debtRatio: number,
  netWorth: number
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (savingsRate < 0.20) {
    recommendations.push({
      id: "increase-savings",
      priority: "high",
      title: "Aumenta tu ahorro",
      description:
        "Intenta ahorrar al menos el 20% de tus ingresos mensuales.",
    });
  }

  if (debtRatio > 0.35) {
    recommendations.push({
      id: "reduce-debt",
      priority: "high",
      title: "Reduce tu endeudamiento",
      description:
        "Destina parte de tu liquidez a amortizar deuda de mayor interés.",
    });
  }

  if (netWorth <= 0) {
    recommendations.push({
      id: "build-net-worth",
      priority: "medium",
      title: "Incrementa tu patrimonio",
      description:
        "Prioriza el ahorro y la adquisición de activos antes de asumir nuevas deudas.",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: "keep-going",
      priority: "low",
      title: "Buen trabajo",
      description:
        "Tu situación financiera es sólida. Mantén tu estrategia actual.",
    });
  }

  return recommendations;
}