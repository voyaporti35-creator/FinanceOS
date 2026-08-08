export interface Loan {

  id: string;

  name: string;

  lender: string;

  accountId: string;

  categoryId?: string;

  originalAmount: number;

  remainingAmount: number;

  interestRate: number;

  monthlyPayment: number;

  termMonths: number;

  startDate: string;

  nextPayment: string;

  paymentDay: number;

  isActive: boolean;

  notes?: string;

  createdAt: number;

  updatedAt: number;

}