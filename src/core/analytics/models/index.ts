export interface FinancialHealth {
  score: number;
  level: "poor" | "fair" | "good" | "excellent";
  savingsScore: number;
  debtScore: number;
  wealthScore: number;
  liquidityScore: number;
}

export interface CashflowAnalytics {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
  savingsRate: number;
}

export interface DebtAnalytics {
  totalDebt: number;
  debtRatio: number;
  monthlyDebtPayment: number;
  debtLevel: "low" | "medium" | "high";
}

export interface WealthAnalytics {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}
  