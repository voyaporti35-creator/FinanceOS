import type {
  MortgageProgress,
} from "../models";


export function calculateMortgageProgress(
  initialDebt: number,
  currentDebt: number,
  monthlyPayment: number
): MortgageProgress {

  const paidPercentage =
    initialDebt > 0
      ? ((initialDebt - currentDebt) / initialDebt) * 100
      : 0;


  const remainingPercentage =
    100 - paidPercentage;


  const remainingYears =
    monthlyPayment > 0
      ? Math.ceil(
          currentDebt /
          monthlyPayment /
          12
        )
      : 0;


  return {

    paidPercentage:
      Math.max(
        0,
        Math.min(
          paidPercentage,
          100
        )
      ),

    remainingPercentage,

    remainingYears,

  };

}