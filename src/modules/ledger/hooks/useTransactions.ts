import { useEffect } from "react";
import { useTransactionStore } from "../store/transactionStore";

export function useTransactions() {
  const transactions = useTransactionStore((state) => state.transactions);
  const isLoading = useTransactionStore((state) => state.isLoading);
  const error = useTransactionStore((state) => state.error);
  const loadTransactions = useTransactionStore((state) => state.loadTransactions);
  const createTransaction = useTransactionStore((state) => state.createTransaction);
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  useEffect(() => {
    void loadTransactions();
  }, [loadTransactions]);

  return {
    transactions,
    isLoading,
    error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
