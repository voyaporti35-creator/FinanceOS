export interface FinanceSnapshot {
  // Liquidez disponible en cuentas
  liquidityTotal: number;

  // Patrimonio
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;

  // Flujo mensual
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
  savingsRate: number;

  // Patrimonio inicial
  initialNetWorth: number;

  // Contadores
  accountCount: number;
  transactionCount: number;
  lastTransactionDate: string | null;

  // Assets
  assetCount: number;

  // Liabilities
  liabilityCount: number;
  monthlyDebtPayment: number;

  // Nivel de endeudamiento
  debtRatio: number;
}