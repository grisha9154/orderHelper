import { BaseOption } from "components";
import { Path } from "global-constants";
import { FC, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "store/category";
import { useGetProductQuery, useUpdateProductMutation } from "store/products";
import { ProductForm, FormValues } from "../common";

export const ProductEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [updateProduct] = useUpdateProductMutation();
  const { data: product, isLoading } = useGetProductQuery(`${id}`, {
    skip: !id,
  });
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  const categoryOptions = useMemo<BaseOption[]>(() => {
    return categories.map((x) => ({ id: x.id.toString(), title: x.title }));
  }, [categories]);

  return (
    <div>
      <h1>Редактирование товара {id}</h1>
      <ProductForm
        defaultValues={{
          ...product,
          category: categoryOptions.find((x) => x.id === id),
        }}
        handleSubmit={async (data) => {
          if (product) {
            const result = await updateProduct({
              id: product.id,
              categoryId: +data.category.id,
              description: data.description,
              price: data.price,
              title: data.title,
            }).unwrap();
          }
        }}
        categoryOptions={categoryOptions}
      />
    </div>
  );
};
