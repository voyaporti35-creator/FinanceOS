import { create } from "zustand";
import { accountService } from "../services/accountService";
import type { Account } from "../types/account";

interface AccountStoreState {
  accounts: Account[];
  isLoading: boolean;
  error: string | null;
  loadAccounts: () => Promise<void>;
  createAccount: (account: Omit<Account, "id" | "createdAt">) => Promise<void>;
  updateAccount: (account: Account) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
}

export const useAccountStore = create<AccountStoreState>((set) => ({
  accounts: [],
  isLoading: false,
  error: null,

  loadAccounts: async () => {
    set({ isLoading: true, error: null });

    try {
      const accounts = await accountService.getAll();
      set({ accounts, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "No se pudieron cargar las cuentas",
        isLoading: false,
      });
    }
  },

  createAccount: async (account) => {
    try {
      const createdAccount = await accountService.create(account);
      set((state) => ({ accounts: [createdAccount, ...state.accounts] }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "No se pudo crear la cuenta",
      });
    }
  },

  updateAccount: async (account) => {
    try {
      await accountService.update(account);
      set((state) => ({
        accounts: state.accounts.map((item) => (item.id === account.id ? account : item)),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "No se pudo actualizar la cuenta",
      });
    }
  },

  deleteAccount: async (id) => {
    try {
      await accountService.delete(id);
      set((state) => ({ accounts: state.accounts.filter((item) => item.id !== id) }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "No se pudo eliminar la cuenta",
      });
    }
  },
}));
