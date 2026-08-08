export type AssetType =
  | "property"
  | "vehicle"
  | "investment"
  | "cash"
  | "business"
  | "other";


export interface Asset {

  id: string;

  name: string;

  type: AssetType;

  value: number;

  purchaseDate: string;

  currency: string;

  institution?: string;

  notes?: string;

  isIncludedInNetWorth: boolean;

  createdAt: number;

  updatedAt: number;
}