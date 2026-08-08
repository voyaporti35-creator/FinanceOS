import type {
  RecurringTransaction,
} from "../types/recurringTransaction";

function normalizeDate(
  date: Date
): Date {

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

}

export function today(): Date {

  return normalizeDate(
    new Date()
  );

}

export function parseDate(
  value: string
): Date {

  const [
    year,
    month,
    day,
  ] = value
    .split("-")
    .map(Number);

  return new Date(
    year,
    month - 1,
    day
  );

}

export function formatDate(
  date: Date
): string {

  return date
    .toISOString()
    .slice(0, 10);

}

export function isExpired(
  recurring: RecurringTransaction
): boolean {

  if (!recurring.endDate) {
    return false;
  }

  return (
    parseDate(
      recurring.endDate
    ) < today()
  );

}

export function isDue(
  recurring: RecurringTransaction
): boolean {

  if (!recurring.enabled) {
    return false;
  }

  if (
    isExpired(recurring)
  ) {
    return false;
  }

  const nextExecution =
    parseDate(
      recurring.nextExecution
    );

  return (
    nextExecution <=
    today()
  );

}

export function calculateNextExecution(
  recurring: RecurringTransaction
): string {

  const next =
    parseDate(
      recurring.nextExecution
    );

  switch (
    recurring.frequency
  ) {

    case "daily":
      next.setDate(
        next.getDate() + 1
      );
      break;

    case "weekly":
      next.setDate(
        next.getDate() + 7
      );
      break;

    case "monthly":
      next.setMonth(
        next.getMonth() + 1
      );
      break;

    case "quarterly":
      next.setMonth(
        next.getMonth() + 3
      );
      break;

    case "yearly":
      next.setFullYear(
        next.getFullYear() + 1
      );
      break;

  }

  return formatDate(
    next
  );

}