export type AccountType =
  | "checking"
  | "savings"
  | "money_market"
  | "cash"
  | "credit_card";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  color: string;
  icon: string;
  createdAt: number;
}
