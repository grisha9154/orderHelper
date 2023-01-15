import { FC, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";
import { DataGrid } from "packages";

import { NavBar, Tab } from "components";
import { Path } from "global-constants";
import { useGetCategoriesQuery } from "store/category";
import { useGetProductsByCategoryQuery } from "store/products";

export const ProductListingPage: FC = () => {
  const { id: categoryId } = useParams<{ id: string }>();

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  const { currentData: products, isError } = useGetProductsByCategoryQuery(
    `${categoryId}`,
    { skip: !categoryId }
  );

  const isProductsLoading = !!categoryId && !products && !isError;

  const tabs = useMemo(
    () =>
      categories.map<Tab>((x) => ({
        path: `/${Path.PRODUCT}/${x.id}`,
        title: x.title,
      })),
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
        <Link to="create">
          <a>Создать</a>
        </Link>
      </Box>
      <Box>
        {isCategoriesLoading ? <LinearProgress /> : <NavBar tabs={tabs} />}
      </Box>
      <div>
        <DataGrid
          isLoading={isProductsLoading}
          rows={products || []}
          columns={{
            id: {
              title: "ID",
              cell: ({ id }) => (
                <Link to={`edit/${id}`}>
                  <a>{id}</a>
                </Link>
              ),
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
