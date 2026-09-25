export type BudgetType = "Income" | "Expense";

export interface BudgetItem {
  id: number;
  description: string;
  amount: number;
  type: BudgetType;
  date: string;
}