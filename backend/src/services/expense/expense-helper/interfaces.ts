export interface CreateExpensePayload {
  expenseCategoryId: string;
  cost: number;
  paymentDate: Date;
}

export interface ReadExpenseResult {
  id: string;
  cost: number;
  paymentDate: Date;
}
