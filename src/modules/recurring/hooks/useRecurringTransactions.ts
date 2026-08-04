import { useEffect } from "react";
import { useRecurringStore } from "../store/recurringStore";

export function useRecurringTransactions() {
  const recurringTransactions = useRecurringStore((state) => state.recurringTransactions);
  const isLoading = useRecurringStore((state) => state.isLoading);
  const error = useRecurringStore((state) => state.error);
  const loadRecurringTransactions = useRecurringStore((state) => state.loadRecurringTransactions);
  const createRecurringTransaction = useRecurringStore((state) => state.createRecurringTransaction);
  const updateRecurringTransaction = useRecurringStore((state) => state.updateRecurringTransaction);
  const deleteRecurringTransaction = useRecurringStore((state) => state.deleteRecurringTransaction);

  useEffect(() => {
    void loadRecurringTransactions();
  }, [loadRecurringTransactions]);

  return {
    recurringTransactions,
    isLoading,
    error,
    createRecurringTransaction,
    updateRecurringTransaction,
    deleteRecurringTransaction,
  };
}
