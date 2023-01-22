import { Product } from "../../models/products";
import { Category } from '../../models/category';
import {
  ReadProductResult,
  CreateProductPayload,
  UpdateProductPayload,
} from "./interfaces";

const readOne = async (id: number): Promise<ReadProductResult | null> => {
  const product = await Product.findOne({
    where: {
      id,
    },
  });

  if (product === null) {
    return null;
  }

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    categoryId: product.categoryId,
  };
};

const readAll = async (): Promise<ReadProductResult[]> => {
  const products = await Product.findAll();

  return products.map((p) => {
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      categoryId: p.categoryId,
    };
  });
};

const create = async (
  payload: CreateProductPayload
): Promise<ReadProductResult | null> => {
  const category = await Category.findOne({where: { id: payload.categoryId }});
  if (category === null) {
    return null;
  }
  const product = await Product.create(payload as any);

  return readOne(product.id);
};

const update = async (
  payload: UpdateProductPayload
): Promise<ReadProductResult | null> => {
  const product = await Product.findOne({
    where: {
      id: payload.id,
    },
  });

  if (product === null) {
    return null;
  }

  if (payload.title) {
    product.title = payload.title;
  }

  if (payload.description) {
    product.description = payload.description;
  }

  if (payload.categoryId) {
    product.categoryId = payload.categoryId;
  }

  if (payload.price) {
    product.price = payload.price;
  }

  await product.save();

  return readOne(product.id);
};

export const CRUD = {
  readAll,
  readOne,
  create,
  update,
};
