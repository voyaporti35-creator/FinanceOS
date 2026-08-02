export type AccountType = "bank" | "cash" | "savings" | "card";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  initialBalance: number;
  currency: string;
  createdAt: number;
}
