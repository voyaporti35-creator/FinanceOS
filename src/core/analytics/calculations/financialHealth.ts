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
  if (income <= 0) return 0;

  const savingsRate = (income - expenses) / income;

  return clamp(savingsRate * 200);
}

function calculateDebtScore(
  assets: number,
  debts: number
): number {
  if (assets <= 0) {
    return debts === 0 ? 100 : 0;
  }

  const debtRatio = debts / assets;

  return clamp(100 - debtRatio * 100);
}

function calculateWealthScore(
  assets: number,
  debts: number
): number {
  const netWorth = assets - debts;

  if (netWorth <= 0) return 0;

  return clamp(netWorth / 1000);
}

function calculateLiquidityScore(
  liquidity: number,
  income: number
): number {
  if (income <= 0) return 0;

  const monthsCovered = liquidity / income;

  return clamp(monthsCovered * 25);
}

function calculateLevel(
  score: number
): FinancialHealth["level"] {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "fair";

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

  const savingsScore = calculateSavingsScore(
    income,
    expenses
  );

  const debtScore = calculateDebtScore(
    assets,
    debts
  );

  const wealthScore = calculateWealthScore(
    assets,
    debts
  );

  const liquidityScore = calculateLiquidityScore(
    liquidity,
    income
  );

  const score = Math.round(
    (
      savingsScore +
      debtScore +
      wealthScore +
      liquidityScore
    ) / 4
  );

  return {
    score,
    level: calculateLevel(score),
    savingsScore: Math.round(savingsScore),
    debtScore: Math.round(debtScore),
    wealthScore: Math.round(wealthScore),
    liquidityScore: Math.round(liquidityScore),
  };
}