import { FC } from "react";
import { CategoryForm } from "../common";

export const CategoryCreatePage: FC = () => {
  return (
    <div>
      <h1>Создание категории</h1>
      <CategoryForm
        handleSubmit={async (data) => {
          console.log(data);
        }}
      />
    </div>
  );
};
