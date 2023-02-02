import { FC, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";

import { DataGrid, NavBar, Tab } from "components";
import { Path } from "global-constants";
import { useGetCategoriesQuery } from "store/category";
import { useGetProductsQuery } from "store/products";

export const ProductListingPage: FC = () => {
  const { id: categoryId } = useParams<{ id: string }>();

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  const { currentData: products, isError } = useGetProductsQuery(categoryId);

  const isProductsLoading = !!categoryId && !products && !isError;

  const tabs = useMemo(
    () => [
      {
        path: `/${Path.PRODUCT}`,
        title: "Все",
      },
      ...categories.map<Tab>((x) => ({
        path: `/${Path.PRODUCT}/${x.id}`,
        title: x.title,
      })),
    ],
    [categories]
  );

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Товары</h1>
        <Link to="create">Создать</Link>
      </Box>
      <Box>
        {isCategoriesLoading ? (
          <LinearProgress />
        ) : (
          <NavBar tabs={tabs} strict />
        )}
      </Box>
      <div>
        <DataGrid
          isLoading={isProductsLoading}
          rows={products || []}
          columns={{
            id: {
              title: "ID",
              cell: ({ id }) => <Link to={`edit/${id}`}>{id}</Link>,
            },
            title: { title: "Наименование", cell: ({ title }) => title },
            price: { title: "Цена", cell: ({ price }) => price.toString() },
            description: {
              title: "Описание",
              cell: ({ description }) => description,
            },
          }}
        />
      </div>
    </div>
  );
};
