/**
 * Calcula el capital pendiente después de una amortización.
 */
export function calculateRemainingPrincipal(
  currentBalance: number,
  principalPaid: number
): number {
  if (currentBalance <= 0) {
    return 0;
  }

  return Math.max(currentBalance - principalPaid, 0);
}