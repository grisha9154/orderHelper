import { Expense } from "../../../models/expense/expense";
import { CreateExpensePayload, ReadExpenseResult } from "./interfaces";
import { ExpenseCategoryHistory } from "../../../models";

const readOne = async (id: string): Promise<ReadExpenseResult | null> => {
  const expense = await Expense.findOne({
    where: {
      id,
    },
    include: {
      all: true,
      nested: true,
    },
  });

  if (expense === null) {
    return null;
  }

  return {
    id: expense.id,
    cost: expense.cost,
    paymentDate: expense.paymentDate,
  };
};

const create = async (
  payload: CreateExpensePayload,
): Promise<ReadExpenseResult | null> => {
  const expenseCategoryHistory = await ExpenseCategoryHistory.findOne({
    where: {
      mainEntityId: payload.expenseCategoryId,
    },
    order: [["createdAt", "DESC"]],
  });

  if (expenseCategoryHistory === null) {
    return null;
  }

  const expense = await Expense.create({
    ...payload,
    expenseCategoryHistoryId: expenseCategoryHistory.id,
  });

  return readOne(expense.id);
};

export const CRUD = {
  readOne,
  create,
};
