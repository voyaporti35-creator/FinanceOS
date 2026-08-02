export type TransactionType = "income" | "expense" | "transfer" | "adjustment";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  accountId: string;
  categoryId: string;
  type: TransactionType;
  notes: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}
