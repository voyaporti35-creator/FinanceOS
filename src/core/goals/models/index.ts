export type GoalType =
  | "saving"
  | "debt"
  | "investment"
  | "wealth";


export interface FinancialGoal {

  id: string;

  title: string;

  type: GoalType;

  targetAmount: number;

  currentAmount: number;

  deadline?: string;

}


export interface GoalProgress {

  percentage: number;

  remaining: number;

  completed: boolean;

}