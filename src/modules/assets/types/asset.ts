export type AssetType =
  | "bank"
  | "cash"
  | "property"
  | "vehicle"
  | "stock"
  | "etf"
  | "fund"
  | "crypto"
  | "gold"
  | "silver"
  | "pension"
  | "business"
  | "collectible"
  | "other";

export interface Asset {
  id: string;

  name: string;

  type: AssetType;

  currentValue: number;

  purchaseValue: number;

  purchaseDate: string;

  currency: string;

  institution?: string;

  notes?: string;

  isIncludedInNetWorth: boolean;

  createdAt: number;

  updatedAt: number;
}