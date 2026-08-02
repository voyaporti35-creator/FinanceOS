import type { Transaction } from "../types/transaction";

export function formatTransactionType(type: Transaction["type"]): string {
  const labels: Record<Transaction["type"], string> = {
    income: "Ingreso",
    expense: "Gasto",
    transfer: "Transferencia",
  };

  return labels[type];
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}
