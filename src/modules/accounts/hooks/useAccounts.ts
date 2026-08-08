import { useEffect } from "react";
import { useAccountStore } from "../store/accountStore";

export function useAccounts() {

  const accounts = useAccountStore((state) => state.accounts);
  const isLoading = useAccountStore((state) => state.isLoading);
  const error = useAccountStore((state) => state.error);

  const loadAccounts = useAccountStore((state) => state.loadAccounts);
  const createAccount = useAccountStore((state) => state.createAccount);
  const updateAccount = useAccountStore((state) => state.updateAccount);
  const deleteAccount = useAccountStore((state) => state.deleteAccount);
  const clearError = useAccountStore((state) => state.clearError);

  useEffect(() => {
    void loadAccounts();
  }, [loadAccounts]);

  return {

    accounts,

    isLoading,

    error,

    loadAccounts,

    createAccount,

    updateAccount,

    deleteAccount,

    clearError,

    reload: loadAccounts,

  };

}