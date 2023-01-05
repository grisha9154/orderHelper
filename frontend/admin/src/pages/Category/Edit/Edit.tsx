import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CategoryForm, FormValues } from "../common";

export const CategoryEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const data = useMemo<FormValues>(() => {
    return { name: "name1", description: "test1" };
  }, [id]);

  return (
    <div>
      <h1>Редактирование категории {id}</h1>
      <CategoryForm
        defaultValues={data}
        handleSubmit={async (data) => {
          console.log(data);
        }}
      />
    </div>
  );
};
