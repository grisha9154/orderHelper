import {
  ExpenseCategoryHistory,
  ExpenseCategory,
  Expense,
} from "../../../models";
import {
  CreateExpenseCategoryPayload,
  ReadAllExpenseCategoryResult,
  ReadExpenseCategoryResult,
  UpdateExpenseCategoryPayload,
} from "./interfaces";
import { Includeable, Op } from "sequelize";

const readOne = async (
  id: string,
  includeExpenses?: boolean,
  from?: Date,
  to?: Date,
): Promise<ReadExpenseCategoryResult | null> => {
  const include: Includeable[] = [];

  if (includeExpenses) {
    include.push({
      model: ExpenseCategoryHistory,
      as: "histories",
      include:
        from && to
          ? [
              {
                model: Expense,
                as: "expenses",
                where: {
                  paymentDate: {
                    [Op.between]: [from, to],
                  },
                },
              },
            ]
          : undefined,
    });
  }

  const expenseCategory = await ExpenseCategory.findOne({
    where: {
      id,
    },
    include,
  });

  if (expenseCategory === null) {
    return null;
  }

  const result: ReadExpenseCategoryResult = {
    id: expenseCategory.id,
    title: expenseCategory.title,
    description: expenseCategory.description,
  };

  if (includeExpenses) {
    const histories = expenseCategory.histories;

    const expenses: Expense[] = [];
    let expensesSum: number = 0;

    histories.forEach((x) => {
      x.expenses.forEach((y) => {
        expenses.push(y);
        expensesSum += y.cost;
      });
    });

    result.expenses = expenses;
    result.expensesSum = expensesSum;
  }

  return result;
};

const readAll = async (
  from?: Date,
  to?: Date,
): Promise<ReadAllExpenseCategoryResult> => {
  const expenseCategories = await ExpenseCategory.findAll({
    include: [
      {
        model: ExpenseCategoryHistory,
        as: "histories",
        include: [
          {
            model: Expense,
            as: "expenses",
            where: {
              paymentDate: {
                [Op.between]: [from, to],
              },
            },
          },
        ],
      },
    ],
  });

  let totalSum = 0;

  const result: ReadExpenseCategoryResult[] = expenseCategories.map((x) => {
    const obj = {
      id: x.id,
      title: x.title,
      description: x.description,
      expensesSum: x.histories.reduce((acc, cur) => {
        const sum = cur.expenses.reduce((x, y) => x + y.cost, 0);
        return acc + sum;
      }, 0),
    };

    totalSum += obj.expensesSum;

    return obj;
  });

  return {
    expenseCategories: result,
    totalSum,
  };
};

const create = async (
  payload: CreateExpenseCategoryPayload,
): Promise<ReadExpenseCategoryResult | null> => {
  const category = await ExpenseCategory.create({
    ...payload,
  });

  return readOne(category.id);
};

const update = async ({
  id,
  ...payload
}: UpdateExpenseCategoryPayload): Promise<ReadExpenseCategoryResult | null> => {
  await ExpenseCategory.update(payload, {
    where: {
      id: id,
    },
  });

  return readOne(id);
};

export const CRUD = {
  readAll,
  readOne,
  create,
  update,
};
