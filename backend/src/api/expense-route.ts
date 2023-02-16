import { RequestHandler, Express } from "express";
import { CRUD } from "../services/expense/expense-helper";
import {
  CreateExpensePayload,
  ReadExpenseResult,
} from "../services/expense/expense-helper/interfaces";
import { canAdmin } from "../services/user-permission";

const handleGetExpenseById: RequestHandler<
  { id: string },
  ReadExpenseResult | null
> = async (req, res) => {
  const id = req.params.id;
  const result = await CRUD.readOne(id);
  res.json(result);
};

const handleCreateExpenseCategory: RequestHandler<
  {},
  ReadExpenseResult | null,
  CreateExpensePayload
> = async (req, res) => {
  const category = req.body;
  const result = await CRUD.create(category);

  res.json(result);
};

export const expenseRouter = (app: Express): void => {
  app.get("/api/expense/:id", canAdmin, handleGetExpenseById);
  app.post("/api/expense", canAdmin, handleCreateExpenseCategory);
};
