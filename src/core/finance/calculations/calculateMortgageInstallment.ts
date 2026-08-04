export interface MortgageInstallment {
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

/**
 * Calcula el desglose de una cuota del sistema francés.
 */
export function calculateMortgageInstallment(
  balance: number,
  annualRate: number,
  monthlyPayment: number
): MortgageInstallment {
  if (balance <= 0) {
    return {
      payment: 0,
      principal: 0,
      interest: 0,
      remainingBalance: 0,
    };
  }

  const monthlyRate = annualRate / 100 / 12;

  const interest = balance * monthlyRate;

  const principal = Math.min(monthlyPayment - interest, balance);

  const remainingBalance = Math.max(balance - principal, 0);

  return {
    payment: principal + interest,
    principal,
    interest,
    remainingBalance,
  };
}