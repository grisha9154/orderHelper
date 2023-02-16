import { Category } from "../../models/category";
import {
  CreateCategoryPayload,
  ReadCategoryResult,
  UpdateCategoryPayload,
} from "./interfaces";

const readOne = async (id: number): Promise<ReadCategoryResult | null> => {
  const category = await Category.findOne({
    where: {
      id,
    },
  });

  if (category === null) {
    return null;
  }

  return {
    id: category.id,
    title: category.title,
    description: category.description,
  };
};

const readAll = async (): Promise<ReadCategoryResult[]> => {
  const categories = await Category.findAll();

  return categories.map((c) => {
    return {
      id: c.id,
      title: c.title,
      description: c.description,
    };
  });
};

const create = async (
  payload: CreateCategoryPayload
): Promise<ReadCategoryResult | null> => {
  const category = await Category.create(payload as any);

  return readOne(category.id);
};

const update = async (
  payload: UpdateCategoryPayload
): Promise<ReadCategoryResult | null> => {
  const category = await Category.findOne({
    where: {
      id: payload.id,
    },
  });

  if (category === null) {
    return null;
  }

  if (payload.title) {
    category.title = payload.title;
  }

  if (payload.description) {
    category.description = payload.description;
  }

  await category.save();

  return readOne(category.id);
};

export const CRUD = {
  readAll,
  readOne,
  create,
  update,
};
