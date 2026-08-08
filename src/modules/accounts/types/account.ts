export type AccountType =
  | "bank"
  | "cash"
  | "savings"
  | "card";

export interface Account {
  id: string;

  // Datos
  name: string;
  type: AccountType;
  currency: string;
  bankId: string;

  // Saldo
  initialBalance: number;
  currentBalance?: number;

  // Estado
  archived: boolean;

  // Presentación
  color?: string;
  icon?: string;

  // Configuración
  isDefault: boolean;
  displayOrder: number;

  // Auditoría
  createdAt: number;
  updatedAt: number;
}