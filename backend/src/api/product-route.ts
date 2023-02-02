import { RequestHandler, Express } from "express";
import { CRUD } from "../services/product-helper";
import { canAdmin } from "../services/user-permission";

const handleGetProducts: RequestHandler = async (req, res) => {
  const categoryId: number | undefined = !!req.query.categoryId
    ? Number(req.query.categoryId)
    : undefined;

  const products = await CRUD.readAll(categoryId);
  res.json(products);
};

const handleGetProductById: RequestHandler = async (req, res) => {
  const productId = req.params.productId;
  const product = await CRUD.readOne(Number(productId));
  res.json(product);
};

const handleCreateProduct: RequestHandler = async (req, res) => {
  const product = req.body;
  const result = await CRUD.create(product);

  res.json(result);
};

const handleUpdateProduct: RequestHandler = async (req, res) => {
  const category = req.body;
  const result = await CRUD.update(category);

  res.json(result);
};

export const productRouter: (app: Express) => void = (app) => {
  app.get("/api/products", canAdmin, handleGetProducts);
  app.get("/api/products/:productId", canAdmin, handleGetProductById);
  app.post("/api/products", canAdmin, handleCreateProduct);
  app.put("/api/products", canAdmin, handleUpdateProduct);
};
