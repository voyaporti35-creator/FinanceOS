import type { Loan } from "../types/loan";

export function calculateMonthlyInterest(
  loan: Loan
): number {

  return (
    loan.remainingAmount *
    (loan.interestRate / 100 / 12)
  );

}

export function calculatePrincipalPayment(
  loan: Loan
): number {

  return Math.max(
    0,
    loan.monthlyPayment -
      calculateMonthlyInterest(
        loan
      )
  );

}

export function calculateRemainingAmount(
  loan: Loan
): number {

  return Math.max(
    0,
    loan.remainingAmount -
      calculatePrincipalPayment(
        loan
      )
  );

}

export function isLoanFinished(
  loan: Loan
): boolean {

  return (
    calculateRemainingAmount(
      loan
    ) <= 0
  );

}