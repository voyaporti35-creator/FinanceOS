import type { FinancialHealth } from "../models";

interface FinancialHealthInput {
  income: number;
  expenses: number;
  assets: number;
  debts: number;
  liquidity: number;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function calculateSavingsScore(
  income: number,
  expenses: number
): number {

  if (income <= 0) {
    return 0;
  }

  const savingsRate =
    (income - expenses) / income;

  return clamp(
    savingsRate * 100
  );

}

function calculateDebtScore(
  liquidity: number,
  assets: number,
  debts: number
): number {

  if (debts <= 0) {
    return 100;
  }

  const financialResources =
    liquidity + assets;

  if (financialResources <= 0) {
    return 0;
  }

  const ratio =
    debts / financialResources;

  return clamp(
    (1 - ratio) * 100
  );

}

function calculateWealthScore(
  liquidity: number,
  assets: number,
  debts: number
): number {

  const totalResources =
    liquidity + assets;

  const netWorth =
    totalResources - debts;

  if (netWorth <= 0) {
    return 0;
  }

  if (totalResources <= 0) {
    return 0;
  }

  return clamp(
    (netWorth / totalResources) * 100
  );

}

function calculateLiquidityScore(
  liquidity: number,
  expenses: number
): number {

  if (expenses <= 0) {
    return liquidity > 0
      ? 100
      : 0;
  }

  const months =
    liquidity / expenses;

  return clamp(
    (months / 6) * 100
  );

}

function calculateLevel(
  score: number
): FinancialHealth["level"] {

  if (score >= 80) {
    return "excellent";
  }

  if (score >= 60) {
    return "good";
  }

  if (score >= 40) {
    return "fair";
  }

  return "poor";

}

export function calculateFinancialHealth(
  input: FinancialHealthInput
): FinancialHealth {

  const {
    income,
    expenses,
    assets,
    debts,
    liquidity,
  } = input;

  const savingsScore =
    calculateSavingsScore(
      income,
      expenses
    );

  const debtScore =
    calculateDebtScore(
      liquidity,
      assets,
      debts
    );

  const wealthScore =
    calculateWealthScore(
      liquidity,
      assets,
      debts
    );

  const liquidityScore =
    calculateLiquidityScore(
      liquidity,
      expenses
    );

  const score =
    Math.round(
      (
        savingsScore * 0.30 +
        debtScore * 0.25 +
        wealthScore * 0.20 +
        liquidityScore * 0.25
      )
    );

  return {

    score,

    level:
      calculateLevel(score),

    savingsScore:
      Math.round(savingsScore),

    debtScore:
      Math.round(debtScore),

    wealthScore:
      Math.round(wealthScore),

    liquidityScore:
      Math.round(liquidityScore),

  };

}