export interface FinanceSnapshot {
  liquidityTotal: number;

  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
  savingsRate: number;

  initialNetWorth: number;

  totalAssets: number;
  totalLiabilities: number;

  netWorth: number;

  accountCount: number;
  transactionCount: number;
  lastTransactionDate: string | null;
}