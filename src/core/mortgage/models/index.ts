export interface MortgageScenario {

  currentDebt: number;

  interestRate: number;

  monthlyPayment: number;

  extraPayment: number;

}


export interface MortgageResult {

  remainingDebt: number;

  monthsSaved: number;

  interestSaved: number;

  newMonthlyPayment: number;

}


export interface MortgageProgress {

  paidPercentage: number;

  remainingPercentage: number;

  remainingYears: number;

}