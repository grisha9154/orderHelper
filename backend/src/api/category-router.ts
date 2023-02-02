import { RequestHandler, Express } from "express";
import { CRUD } from "../services/category-helper";
import { canAdmin } from "../services/user-permission";

const handleGetCategories: RequestHandler = async (_, res) => {
  const categories = await CRUD.readAll();
  res.json(categories);
};

const handleGetCategoryById: RequestHandler = async (req, res) => {
  const descriptionId = req.params.descriptionId;
  const categories = await CRUD.readOne(Number(descriptionId));
  res.json(categories);
};

const handleCreateCategory: RequestHandler = async (req, res) => {
  const category = req.body;
  const result = await CRUD.create(category);

  res.json(result);
};

const handleUpdateCategory: RequestHandler = async (req, res) => {
  const category = req.body;
  const result = await CRUD.update(category);

  res.json(result);
};

export const categoryRouter: (app: Express) => void = (app) => {
  app.get("/api/categories", canAdmin, handleGetCategories);
  app.get("/api/categories/:descriptionId", canAdmin, handleGetCategoryById);
  app.post("/api/categories", canAdmin, handleCreateCategory);
  app.put("/api/categories", canAdmin, handleUpdateCategory);
};
