import { RequestHandler, Express } from "express";
import { CRUD } from "../services/product-helper";

const handleGetProducts: RequestHandler = async (_, res) => {
  const products = await CRUD.readAll();
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
}

export const categoryRouter: (app: Express) => void = (app) => {
  app.get("/api/products", handleGetProducts);
  app.get("/api/products/:productId", handleGetProductById);
  app.post("/api/products", handleCreateProduct);
  app.put("/api/products", handleUpdateProduct);
};
