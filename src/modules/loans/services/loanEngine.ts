import type { Loan } from "../types/loan";

export interface LoanPayment {

  interest: number;

  principal: number;

  payment: number;

  remainingAmount: number;

}

export function calculateLoanPayment(
  loan: Loan
): LoanPayment {

  const interest =
    loan.remainingAmount *
    (loan.interestRate / 100 / 12);

  const principal =
    Math.max(
      0,
      loan.monthlyPayment - interest
    );

  const remainingAmount =
    Math.max(
      0,
      loan.remainingAmount - principal
    );

  return {

    interest,

    principal,

    payment:
      loan.monthlyPayment,

    remainingAmount,

  };

}

export function applyLoanPayment(
  loan: Loan
): Loan {

  const payment =
    calculateLoanPayment(
      loan
    );

  return {

    ...loan,

    remainingAmount:
      payment.remainingAmount,

    updatedAt:
      Date.now(),

  };

}