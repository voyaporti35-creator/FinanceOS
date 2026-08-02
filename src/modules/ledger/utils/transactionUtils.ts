import type { Transaction } from "../types/transaction";

export function getTransactionLabel(transaction: Transaction): string {
  const labels: Record<Transaction["type"], string> = {
    income: "Ingreso",
    expense: "Gasto",
    transfer: "Transferencia",
  };

  return labels[transaction.type] ?? transaction.type;
}

export function getTransactionSummary(transactions: Transaction[]): {
  income: number;
  expense: number;
  balance: number;
} {
  const income = transactions.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
  const expense = transactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0);

  return {
    income,
    expense,
    balance: income - expense,
  };
}
