export interface ReadExpenseCategoryResult {
  id: string;
  title: string;
  description?: string;
  expenses?: { id: string; cost: number; paymentDate: Date }[];
  expensesSum?: number;
}

export interface ReadAllExpenseCategoryResult {
  expenseCategories: ReadExpenseCategoryResult[];
  totalSum: number;
}

export interface CreateExpenseCategoryPayload {
  title: string;
  description?: string;
}

export interface UpdateExpenseCategoryPayload {
  id: string;
  title: string;
  description?: string;
}
