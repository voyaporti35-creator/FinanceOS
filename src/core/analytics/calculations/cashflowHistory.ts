export interface CashflowPoint {
  label: string;
  income: number;
  expenses: number;
  savings: number;
}


export function buildCashflowHistory(
  monthlyIncome: number,
  monthlyExpenses: number
): CashflowPoint[] {

  const months = [
    "Hace 5 meses",
    "Hace 4 meses",
    "Hace 3 meses",
    "Hace 2 meses",
    "Hace 1 mes",
    "Actual",
  ];


  return months.map((label, index) => {

    const factor =
      0.75 + index * 0.05;


    const income =
      monthlyIncome * factor;


    const expenses =
      monthlyExpenses * factor;


    return {
      label,

      income,

      expenses,

      savings:
        income - expenses,
    };

  });
}