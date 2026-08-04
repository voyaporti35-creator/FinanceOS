/**
 * Calcula el saldo pendiente de un préstamo después de un número de cuotas.
 *
 * Sistema francés.
 */
export function calculateLoanBalance(
  principal: number,
  annualRate: number,
  totalMonths: number,
  paidMonths: number
): number {
  if (paidMonths <= 0) {
    return principal;
  }

  if (paidMonths >= totalMonths) {
    return 0;
  }

  if (annualRate === 0) {
    const principalPaid = principal * (paidMonths / totalMonths);
    return Math.max(principal - principalPaid, 0);
  }

  const monthlyRate = annualRate / 100 / 12;

  const factor = Math.pow(1 + monthlyRate, totalMonths);

  const payment =
    principal * (monthlyRate * factor) / (factor - 1);

  let balance = principal;

  for (let i = 0; i < paidMonths; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = payment - interest;
    balance -= principalPaid;
  }

  return Math.max(balance, 0);
}