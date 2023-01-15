import { RequestHandler, Express } from "express";
import { CRUD } from "../services/category-helper";

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
}

export const categoryRouter: (app: Express) => void = (app) => {
  app.get("/api/categories", handleGetCategories);
  app.get("/api/categories/:descriptionId", handleGetCategoryById);
  app.post("/api/categories", handleCreateCategory);
  app.put("/api/categories", handleUpdateCategory);
};
