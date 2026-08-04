export interface DashboardViewModel {

  // Patrimonio
  netWorth: number;
  liquidity: number;
  assets: number;
  liabilities: number;

  // Flujo mensual
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
  savingsRate: number;

  // Salud financiera
  financialHealthScore: number;

  // Actividad
  accountCount: number;
  transactionCount: number;
  lastTransactionDate: string | null;

  // Recurrentes
  nextRecurringDate: string | null;
  pendingRecurringCount: number;

  // Hipoteca
  mortgageDebt?: number;
  mortgageMonthlyPayment?: number;
  mortgageFreeDate?: string | null;

  // Metadatos
  updatedAt: string;

}