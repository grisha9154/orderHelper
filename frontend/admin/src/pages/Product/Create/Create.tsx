import { BaseOption } from "components";
import { Path } from "global-constants";
import { FC, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "store/category";
import { useCreateProductMutation } from "store/products";
import { ProductForm } from "../common";

export const ProductCreatePage: FC = () => {
  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();

  const { data: categories = [] } = useGetCategoriesQuery();

  const categoryOptions = useMemo<BaseOption[]>(
    () => categories.map((x) => ({ id: x.id.toString(), title: x.title })),
    [categories]
  );

  return (
    <div>
      <h1>Создание товара</h1>
      <ProductForm
        handleSubmit={async (data) => {
          const result = await createProduct({
            categoryId: +data.category.id,
            description: data.description,
            price: data.price,
            title: data.title,
          }).unwrap();

          navigate(`/${Path.PRODUCT}/${data.category?.id}/edit/${result.id}`);
        }}
        categoryOptions={categoryOptions}
      />
    </div>
  );
};
