export interface NetWorthPoint {
  date: string;
  value: number;
}

export function buildNetWorthHistory(
  currentNetWorth: number
): NetWorthPoint[] {
  return [
    { date: "Hace 5 meses", value: currentNetWorth * 0.82 },
    { date: "Hace 4 meses", value: currentNetWorth * 0.86 },
    { date: "Hace 3 meses", value: currentNetWorth * 0.91 },
    { date: "Hace 2 meses", value: currentNetWorth * 0.95 },
    { date: "Hace 1 mes", value: currentNetWorth * 0.98 },
    { date: "Actual", value: currentNetWorth },
  ];
}