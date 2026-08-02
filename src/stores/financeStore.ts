import { create } from "zustand";

interface FinanceState {
  balance: number;
  setBalance: (value: number) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  balance: 0,

  setBalance: (value) =>
    set({
      balance: value,
    }),
}));