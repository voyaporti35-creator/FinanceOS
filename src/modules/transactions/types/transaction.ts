export type TransactionType =
  | "income"
  | "expense"
  | "transfer";

export interface Transaction {
  id: string;

  accountId: string;

  destinationAccountId?: string;

  type: TransactionType;

  amount: number;

  date: string;

  category?: string;

  description?: string;

  transferId?: string;

  notes?: string;

  isRecurring?: boolean;

  recurringId?: string;

  createdAt: number;

  updatedAt: number;
}