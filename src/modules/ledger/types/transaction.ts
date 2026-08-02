export type TransactionType = "income" | "expense" | "transfer";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  accountId: string;
  categoryId: string;
  type: TransactionType;
  notes: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}
