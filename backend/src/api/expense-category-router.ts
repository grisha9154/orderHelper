import { RequestHandler, Express } from "express";
import {
  CreateExpenseCategoryPayload,
  ReadAllExpenseCategoryResult,
  ReadExpenseCategoryResult,
  UpdateExpenseCategoryPayload,
} from "src/services/expense/expense-category-helper/interfaces";
import { CRUD } from "../services/expense/expense-category-helper";
import { canAdmin } from "../services/user-permission";

const handleGetExpenseCategories: RequestHandler<
  {},
  ReadAllExpenseCategoryResult,
  undefined,
  { from?: Date; to?: Date }
> = async (req, res) => {
  const result = await CRUD.readAll(req.query.from, req.query.to);
  res.json(result);
};

const handleGetExpenseCategoryById: RequestHandler<
  { id: string },
  ReadExpenseCategoryResult | null,
  undefined,
  { includeExpenses?: boolean; from?: Date; to?: Date }
> = async (req, res) => {
  const id = req.params.id;

  const result = await CRUD.readOne(
    id,
    req.query.includeExpenses,
    req.query.from,
    req.query.to,
  );
  res.json(result);
};

const handleCreateExpenseCategory: RequestHandler<
  {},
  ReadExpenseCategoryResult | null,
  CreateExpenseCategoryPayload
> = async (req, res) => {
  const category = req.body;
  const result = await CRUD.create(category);

  res.json(result);
};

const handleUpdateExpenseCategory: RequestHandler<
  {},
  ReadExpenseCategoryResult | null,
  UpdateExpenseCategoryPayload
> = async (req, res) => {
  const category = req.body;
  const result = await CRUD.update(category);

  res.json(result);
};

export const expenseCategoryRouter: (app: Express) => void = (app) => {
  app.get("/api/expense-category", canAdmin, handleGetExpenseCategories);
  app.get("/api/expense-category/:id", canAdmin, handleGetExpenseCategoryById);
  app.post("/api/expense-category", canAdmin, handleCreateExpenseCategory);
  app.put("/api/expense-category", canAdmin, handleUpdateExpenseCategory);
};
