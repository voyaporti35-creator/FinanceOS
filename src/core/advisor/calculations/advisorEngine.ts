import type { AdvisorSuggestion } from "../index";
import type { FinanceSnapshot } from "../../finance/types";

export function buildAdvisorSuggestions(
  snapshot: FinanceSnapshot
): AdvisorSuggestion[] {
  const suggestions: AdvisorSuggestion[] = [];

  /*
   * ============================================================
   * 1. AHORRO
   * ============================================================
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
        `${(snapshot.savingsRate * 100).toFixed(1)}% de ahorro`,
      impact:
        "Mayor capacidad para crear patrimonio.",
    });
  }

  /*
   * ============================================================
   * 2. DEUDA
   * ============================================================
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
        "Prioriza la amortización de deuda antes de asumir nuevas obligaciones.",
      metric:
        `${(snapshot.debtRatio * 100).toFixed(1)}% de endeudamiento`,
      impact:
        "Mejora tu capacidad financiera mensual.",
    });
  }

  /*
   * ============================================================
   * 3. FONDO DE EMERGENCIA
   * ============================================================
   */

  const emergencyMonths =
    snapshot.monthlyExpenses > 0
      ? snapshot.liquidityTotal /
        snapshot.monthlyExpenses
      : 0;

  if (
    snapshot.monthlyExpenses > 0 &&
    emergencyMonths < 3
  ) {
    suggestions.push({
      id: "low-emergency-fund",
      priority: "high",
      category: "liquidity",
      title: "Aumenta tu fondo de emergencia",
      description:
        "Tu liquidez cubre menos de tres meses de gastos.",
      action:
        "Prioriza crear un colchón financiero antes de aumentar el riesgo.",
      metric:
        `${emergencyMonths.toFixed(1)} meses de gastos cubiertos`,
      impact:
        "Mayor seguridad ante imprevistos.",
    });
  }

  /*
   * ============================================================
   * 4. PATRIMONIO NEGATIVO
   * ============================================================
   */

  if (snapshot.netWorth < 0) {
    suggestions.push({
      id: "negative-wealth",
      priority: "high",
      category: "wealth",
      title: "Patrimonio negativo",
      description:
        "Tus pasivos superan el valor de tus activos y liquidez.",
      action:
        "Reduce deuda y aumenta progresivamente tu patrimonio.",
      metric:
        `${snapshot.netWorth.toLocaleString("es-ES")} €`,
      impact:
        "Construcción progresiva de patrimonio.",
    });
  }

  /*
   * ============================================================
   * 5. PATRIMONIO CONCENTRADO EN VEHÍCULOS
   * ============================================================
   */

  const vehicleAssets =
    snapshot.assetsByType?.vehicle ?? 0;

  const vehicleShare =
    snapshot.totalAssets > 0
      ? vehicleAssets /
        snapshot.totalAssets
      : 0;

  const vehicleShareOfNetWorth =
    snapshot.netWorth > 0
      ? vehicleAssets /
        snapshot.netWorth
      : 0;

  if (
    vehicleAssets > 0 &&
    (
      vehicleShare >= 0.50 ||
      vehicleShareOfNetWorth >= 0.50
    ) &&
    snapshot.netWorth > 0
  ) {
    suggestions.push({
      id: "vehicle-concentration",
      priority: "medium",
      category: "wealth",
      title:
        "Patrimonio concentrado en vehículos",
      description:
        "Una parte importante de tu patrimonio está concentrada en vehículos, que son activos de uso personal y normalmente pierden valor con el tiempo.",
      action:
        "Mantén una liquidez adecuada y dirige progresivamente parte del ahorro hacia activos que puedan preservar o aumentar tu patrimonio.",
      metric:
        `${(vehicleShareOfNetWorth * 100).toFixed(1)}% del patrimonio está en vehículos`,
      impact:
        "Mayor diversificación y capacidad de crecimiento patrimonial.",
    });
  }

  /*
   * ============================================================
   * 6. TODO EL PATRIMONIO EN LIQUIDEZ
   * ============================================================
   */

  const allWealthInLiquidity =
    snapshot.netWorth > 0 &&
    snapshot.liquidityTotal > 0 &&
    snapshot.totalAssets === 0;

  if (
    allWealthInLiquidity &&
    snapshot.savingsRate >= 0.20 &&
    snapshot.debtRatio <= 0.35
  ) {
    suggestions.push({
      id: "build-wealth",
      priority: "medium",
      category: "investment",
      title: "Construye patrimonio",
      description:
        "Tu situación financiera es saludable, pero actualmente todo tu patrimonio está concentrado en liquidez.",
      action:
        "Mantén tu fondo de emergencia y destina progresivamente el excedente de ahorro a activos según tu estrategia financiera.",
      metric:
        `${snapshot.liquidityTotal.toLocaleString("es-ES")} € de liquidez`,
      impact:
        "Mayor diversificación y crecimiento patrimonial.",
    });
  }

  /*
   * ============================================================
   * 7. ESTRUCTURA PATRIMONIAL EQUILIBRADA
   * ============================================================
   *
   * Solo mostramos esta recomendación cuando:
   *
   * - Hay activos.
   * - Hay liquidez.
   * - No existe una concentración importante en vehículos.
   * - El ahorro es saludable.
   * - La deuda está controlada.
   */

  const assetsShare =
    snapshot.netWorth > 0
      ? snapshot.totalAssets /
        snapshot.netWorth
      : 0;

  const liquidityShare =
    snapshot.netWorth > 0
      ? snapshot.liquidityTotal /
        snapshot.netWorth
      : 0;

  const balancedStructure =
    snapshot.netWorth > 0 &&
    snapshot.totalAssets > 0 &&
    snapshot.liquidityTotal > 0 &&
    vehicleShare < 0.50 &&
    snapshot.savingsRate >= 0.20 &&
    snapshot.debtRatio <= 0.35;

  if (balancedStructure) {
    suggestions.push({
      id: "balanced-wealth",
      priority: "low",
      category: "wealth",
      title:
        "Mantén una estructura patrimonial equilibrada",
      description:
        "Tu patrimonio combina activos y liquidez sin detectar una concentración excesiva en vehículos.",
      action:
        "Continúa aumentando patrimonio y revisa periódicamente la distribución entre liquidez y activos.",
      metric:
        `${(assetsShare * 100).toFixed(1)}% activos · ${(
          liquidityShare * 100
        ).toFixed(1)}% liquidez`,
      impact:
        "Mayor estabilidad y diversificación patrimonial.",
    });
  }

  /*
   * ============================================================
   * 8. SITUACIÓN SALUDABLE
   * ============================================================
   *
   * Solo se muestra si no existe ninguna recomendación.
   */

  if (suggestions.length === 0) {
    suggestions.push({
      id: "financial-health",
      priority: "low",
      category: "wealth",
      title:
        "Situación financiera saludable",
      description:
        "No se detectan riesgos financieros relevantes.",
      action:
        "Mantén tu estrategia actual y continúa aumentando patrimonio.",
      impact:
        "Consolidación progresiva de tu situación financiera.",
    });
  }

  return suggestions;
}