import type { DebtAnalytics } from "../models";

export function calculateDebtAnalytics(
  totalDebt: number,
  monthlyDebtPayment: number,
  monthlyIncome: number
): DebtAnalytics {
  const debtRatio =
    monthlyIncome > 0
      ? monthlyDebtPayment / monthlyIncome
      : 0;

  let debtLevel: DebtAnalytics["debtLevel"] = "low";

  if (debtRatio >= 0.5) {
    debtLevel = "high";
  } else if (debtRatio >= 0.35) {
    debtLevel = "medium";
  }

  return {
    totalDebt,
    monthlyDebtPayment,
    debtRatio,
    debtLevel,
  };
}