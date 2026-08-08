import type { CashflowAnalytics } from "../models/index";

export function calculateCashflow(
  monthlyIncome: number,
  monthlyExpenses: number
): CashflowAnalytics {
  const monthlySavings = monthlyIncome - monthlyExpenses;

  const savingsRate =
    monthlyIncome > 0
      ? monthlySavings / monthlyIncome
      : 0;

  return {
    monthlyIncome,
    monthlyExpenses,
    monthlySavings,
    savingsRate,
  };
}