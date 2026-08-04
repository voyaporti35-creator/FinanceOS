import type {
  MortgageScenario,
  MortgageResult,
} from "../models";


export function simulateMortgage(
  scenario: MortgageScenario
): MortgageResult {


  const original =
    calculateMortgageCost(
      scenario.currentDebt,
      scenario.interestRate,
      scenario.monthlyPayment
    );


  const accelerated =
    calculateMortgageCost(
      scenario.currentDebt,
      scenario.interestRate,
      scenario.monthlyPayment +
        scenario.extraPayment
    );


  return {

    remainingDebt:
      accelerated.remainingDebt,


    monthsSaved:
      Math.max(
        original.months -
        accelerated.months,
        0
      ),


    interestSaved:
      Math.max(
        original.interest -
        accelerated.interest,
        0
      ),


    newMonthlyPayment:
      scenario.monthlyPayment +
      scenario.extraPayment,

  };

}



function calculateMortgageCost(
  debt:number,
  interestRate:number,
  payment:number
) {


  const monthlyRate =
    interestRate / 100 / 12;


  let balance =
    debt;


  let months =
    0;


  let interest =
    0;


  while (
    balance > 0 &&
    months < 600
  ) {


    const monthInterest =
      balance *
      monthlyRate;


    interest +=
      monthInterest;


    const capital =
      payment -
      monthInterest;


    balance -=
      capital;


    months++;


  }


  return {

    months,

    interest,

    remainingDebt:
      Math.max(balance,0),

  };

}