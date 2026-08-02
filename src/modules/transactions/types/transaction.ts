export type TransactionType = "income" | "expense" | "transfer";

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  date: string;
  category?: string;
  description?: string;
  transferId?: string;
  createdAt: Date;
}
