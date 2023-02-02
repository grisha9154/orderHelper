import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useUpdateCategoryMutation, useGetCategoryQuery } from "store/category";

import { CategoryForm, FormValues } from "../common";

export const CategoryEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: category } = useGetCategoryQuery(id || "");
  const [updateCategory] = useUpdateCategoryMutation();

  return (
    <div>
      <h1>Редактирование категории {id}</h1>
      <CategoryForm
        defaultValues={category}
        handleSubmit={async (data) => {
          if (category) {
            updateCategory({
              id: category.id,
              title: data.title,
              description: data.description,
            });
          }
        }}
      />
    </div>
  );
};
