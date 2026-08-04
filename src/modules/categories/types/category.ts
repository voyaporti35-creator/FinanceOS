export type CategoryType = "income" | "expense" | "transfer" | "system";

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon: string;
  color: string;
  parentId?: string;
  createdAt: number;
  updatedAt: number;
}
