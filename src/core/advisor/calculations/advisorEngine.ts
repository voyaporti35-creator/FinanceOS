import type { AdvisorSuggestion } from "../index";
import type { FinanceSnapshot } from "../../finance/types";

export function buildAdvisorSuggestions(
snapshot: FinanceSnapshot
): AdvisorSuggestion[] {
const suggestions: AdvisorSuggestion[] = [];

const savingsRate = snapshot.savingsRate;
const debtRatio = snapshot.debtRatio;

const emergencyMonths =
snapshot.monthlyExpenses > 0
? snapshot.liquidityTotal / snapshot.monthlyExpenses
: 0;

const vehicleAssets =
snapshot.assetsByType?.vehicle ?? 0;

const vehicleShare =
snapshot.totalAssets > 0
? vehicleAssets / snapshot.totalAssets
: 0;

const vehicleShareOfNetWorth =
snapshot.netWorth > 0
? vehicleAssets / snapshot.netWorth
: 0;

const assetsShare =
snapshot.netWorth > 0
? snapshot.totalAssets / snapshot.netWorth
: 0;

const liquidityShare =
snapshot.netWorth > 0
? snapshot.liquidityTotal / snapshot.netWorth
: 0;

/*

* 1. PATRIMONIO NEGATIVO
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
"Prioriza reducir deuda y evita asumir nuevas obligaciones.",
metric:
`${snapshot.netWorth.toLocaleString("es-ES")} € de patrimonio neto`,
impact:
"Recuperación progresiva de la solvencia patrimonial.",
});
}

/*

* 2. DEUDA
  */

if (debtRatio > 0.35) {
suggestions.push({
id: "high-debt",
priority: "high",
category: "debt",
title: "Controla tu nivel de deuda",
description:
"Tus obligaciones financieras tienen un peso elevado sobre tus ingresos.",
action:
"Prioriza la amortización de deuda antes de aumentar inversiones o asumir nuevas obligaciones.",
metric:
`${(debtRatio * 100).toFixed(1)}% de endeudamiento`,
impact:
"Mayor capacidad financiera mensual y menor riesgo.",
});
}

/*

* 3. AHORRO
  */

if (savingsRate < 0.20) {
suggestions.push({
id: "low-saving-rate",
priority: "high",
category: "saving",
title: "Aumenta tu tasa de ahorro",
description:
"Tu porcentaje de ahorro mensual está por debajo del objetivo recomendado.",
action:
"Reduce gastos o aumenta ingresos hasta alcanzar al menos un 20% de ahorro.",
metric:
`${(savingsRate * 100).toFixed(1)}% de ahorro`,
impact:
"Mayor capacidad para crear un fondo de seguridad y patrimonio.",
});
}

/*

* 4. FONDO DE EMERGENCIA
  */

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
"Tu liquidez actual cubre menos de tres meses de gastos.",
action:
"Prioriza alcanzar un colchón de al menos tres meses de gastos antes de aumentar el riesgo.",
metric:
`${emergencyMonths.toFixed(1)} meses de gastos cubiertos`,
impact:
"Mayor protección frente a imprevistos.",
});
}

/*

* Si existe un riesgo importante,
* mostramos primero esos problemas.
  */

const hasHighPriorityRisk =
suggestions.some(
(suggestion) =>
suggestion.priority === "high"
);

if (hasHighPriorityRisk) {
return suggestions.slice(0, 5);
}

/*

* 5. CONCENTRACIÓN EN VEHÍCULOS
  */

const vehicleConcentration =
vehicleAssets > 0 &&
snapshot.netWorth > 0 &&
(
vehicleShare >= 0.50 ||
vehicleShareOfNetWorth >= 0.50
);

if (vehicleConcentration) {
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

* 6. TODO EL PATRIMONIO EN LIQUIDEZ
  */

const allWealthInLiquidity =
snapshot.netWorth > 0 &&
snapshot.liquidityTotal > 0 &&
snapshot.totalAssets === 0;

if (
allWealthInLiquidity &&
savingsRate >= 0.20 &&
debtRatio <= 0.35
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

* 7. ESTRUCTURA PATRIMONIAL EQUILIBRADA
  */

const balancedStructure =
snapshot.netWorth > 0 &&
snapshot.totalAssets > 0 &&
snapshot.liquidityTotal > 0 &&
!vehicleConcentration &&
savingsRate >= 0.20 &&
debtRatio <= 0.35;

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
`${(assetsShare * 100).toFixed(1)}% activos · ${(liquidityShare * 100).toFixed(1)}% liquidez`,
impact:
"Mayor estabilidad y diversificación patrimonial.",
});
}

/*

* 8. SITUACIÓN SALUDABLE
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

return suggestions.slice(0, 5);
}
