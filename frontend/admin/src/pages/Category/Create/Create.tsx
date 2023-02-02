import { FC } from "react";
import { useCreateCategoryMutation } from "store/category";
import { CategoryForm } from "../common";

export const CategoryCreatePage: FC = () => {
  const [createCategory] = useCreateCategoryMutation();

  return (
    <div>
      <h1>Создание категории</h1>
      <CategoryForm
        handleSubmit={async (data) => {
          await createCategory({
            description: data.description,
            title: data.title,
          });
        }}
      />
    </div>
  );
};
