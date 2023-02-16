export interface ExpenseCategory {
  id: string;
  title: string;
  description?: string;
  expenses?: { id: string; cost: number; paymentDate: Date }[];
  expensesSum?: number;
}

export interface GetExpenseCategoriesResult {
  expenseCategories: ExpenseCategory[];
  totalSum: number;
}

export interface GetExpenseCategoriesPayload {
  filter?: {
    from: Date;
    to: Date;
  };
}

export interface GetExpenseCategoryPayload {
  id: string;
  filter?: {
    from: Date;
    to: Date;
  };
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

export interface Expense {
  id: string;
  cost: number;
  paymentDate: Date;
}

export interface CreateExpensePayload {
  expenseCategoryId: string;
  cost: number;
  paymentDate: Date;
}
