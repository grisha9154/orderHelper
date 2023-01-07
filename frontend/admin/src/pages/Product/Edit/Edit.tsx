import { Path } from "global-constants";
import { FC, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductForm, FormValues } from "../common";

export const ProductEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const data = useMemo<FormValues>(() => {
    return { name: "name1", description: "test1", price: 15 };
  }, [id]);

  return (
    <div>
      <h1>Редактирование товара {id}</h1>
      <ProductForm
        defaultValues={data}
        handleSubmit={async (data) => {
          console.log("hello", data);
        }}
      />
    </div>
  );
};
