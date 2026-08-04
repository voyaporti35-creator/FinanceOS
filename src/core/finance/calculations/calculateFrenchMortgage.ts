/**
 * Calcula la cuota mensual mediante el sistema francés.
 *
 * principal -> capital pendiente
 * annualRate -> interés anual (ej: 3.25)
 * months -> plazo restante
 */
export function calculateFrenchMortgage(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (months <= 0) {
    return 0;
  }

  if (annualRate === 0) {
    return principal / months;
  }

  const monthlyRate = annualRate / 100 / 12;

  const factor = Math.pow(1 + monthlyRate, months);

  return principal * (monthlyRate * factor) / (factor - 1);
}