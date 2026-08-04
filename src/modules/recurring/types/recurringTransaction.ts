export type RecurringFrequency = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

export type RecurringTransactionType = "income" | "expense";

export interface RecurringTransaction {
  id: string;
  name: string;
  enabled: boolean;
  amount: number;
  type: RecurringTransactionType;
  accountId: string;
  categoryId?: string;
  frequency: RecurringFrequency;
  startDate: string;
  endDate?: string;
  lastExecution?: string;
  nextExecution: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}
