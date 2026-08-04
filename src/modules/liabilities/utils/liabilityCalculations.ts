import type { Liability } from "../types/liability";


/**
 * Calcula el total actual de pasivos
 */
export function calculateTotalLiabilities(
  liabilities: Liability[]
): number {

  return liabilities.reduce(
    (total, liability) =>
      total + liability.currentValue,
    0
  );

}


/**
 * Calcula solo los pasivos incluidos en patrimonio neto
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
 * Número de pasivos registrados
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
 * Diferencia entre deuda inicial y actual
 * (capital amortizado)
 */
export function calculatePaidLiabilities(
  liabilities: Liability[]
): number {

  return liabilities.reduce(
    (total, liability) =>
      total +
      (liability.initialValue -
        liability.currentValue),
    0
  );

}


/**
 * Calcula cuota mensual total
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
 * Busca deuda hipotecaria
 */
export function calculateMortgageDebt(
  liabilities: Liability[]
): number {

  return liabilities
    .filter(
      (liability) =>
        liability.type === "mortgage"
    )
    .reduce(
      (total, liability) =>
        total + liability.currentValue,
      0
    );

}


/**
 * Patrimonio negativo generado por deuda
 */
export function calculateDebtRatio(
  liabilities: Liability[],
  assetsValue: number
): number {

  if (assetsValue === 0) {
    return 0;
  }


  return (
    calculateTotalLiabilities(liabilities) /
    assetsValue
  );

}