export type LiabilityType =
  | "mortgage"
  | "loan"
  | "credit_card"
  | "financing"
  | "personal"
  | "other";

export interface Liability {
  id: string;

  name: string;

  type: LiabilityType;

  initialValue: number;

  currentValue: number;

  interestRate?: number;

  monthlyPayment?: number;

  startDate: string;

  endDate?: string;

  institution?: string;

  notes?: string;

  isIncludedInNetWorth: boolean;

  isActive: boolean;

  createdAt: number;

  updatedAt: number;
}