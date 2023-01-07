import { Path } from "global-constants";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "../common";

export const ProductCreatePage: FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Создание товара</h1>
      <ProductForm
        handleSubmit={async (data) => {
          console.log(data);
          navigate(`/${Path.PRODUCT}/${data.category?.id}/edit/1`);
        }}
      />
    </div>
  );
};
