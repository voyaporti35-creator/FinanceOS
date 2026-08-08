import type { Liability } from "../types/liability";


/**
 * Calcula el total actual de pasivos incluidos
 * en patrimonio neto
 */
export function calculateTotalLiabilities(
  liabilities: Liability[]
): number {

  return liabilities

    .filter(
      (liability) =>
        liability.isIncludedInNetWorth &&
        liability.isActive
    )

    .reduce(
      (total, liability) =>
        total + liability.currentValue,
      0
    );

}


/**
 * Calcula solo pasivos incluidos en patrimonio neto
 */
export function calculateIncludedLiabilities(
  liabilities: Liability[]
): number {

  return liabilities

    .filter(
      (liability) =>
        liability.isIncludedInNetWorth
    )

    .reduce(
      (total, liability) =>
        total + liability.currentValue,
      0
    );

}


/**
 * Número total de pasivos registrados
 */
export function calculateLiabilityCount(
  liabilities: Liability[]
): number {

  return liabilities.length;

}


/**
 * Calcula deuda inicial total
 */
export function calculateInitialLiabilities(
  liabilities: Liability[]
): number {

  return liabilities.reduce(
    (total, liability) =>
      total + liability.initialValue,
    0
  );

}


/**
 * Capital amortizado
 */
export function calculatePaidLiabilities(
  liabilities: Liability[]
): number {

  return liabilities.reduce(
    (total, liability) =>
      total +
      (
        liability.initialValue -
        liability.currentValue
      ),
    0
  );

}


/**
 * Cuota mensual total
 */
export function calculateMonthlyDebtPayment(
  liabilities: Liability[]
): number {

  return liabilities.reduce(
    (total, liability) =>
      total +
      (liability.monthlyPayment ?? 0),
    0
  );

}


/**
 * Deuda hipotecaria actual
 */
export function calculateMortgageDebt(
  liabilities: Liability[]
): number {

  return liabilities

    .filter(
      (liability) =>
        liability.type === "mortgage" &&
        liability.isActive
    )

    .reduce(
      (total, liability) =>
        total + liability.currentValue,
      0
    );

}


/**
 * Ratio deuda / activos
 */
export function calculateDebtRatio(
  liabilities: Liability[],
  assetsValue: number
): number {

  if (assetsValue === 0) {

    return 0;

  }


  return (
    calculateTotalLiabilities(
      liabilities
    ) /
    assetsValue
  );

}