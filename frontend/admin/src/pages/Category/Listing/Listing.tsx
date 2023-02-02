import { FC } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import { useGetCategoriesQuery } from "store/category";
import { DataGrid } from "components";

export const CategoryListingPage: FC = () => {
  const { data: categories = [], isLoading } = useGetCategoriesQuery();

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Категории</h1>
        <Link to="create">Создать</Link>
      </Box>
      <div>
        <DataGrid
          isLoading={isLoading}
          rows={categories}
          columns={{
            id: {
              title: "ID",
              cell: ({ id }) => <Link to={`edit/${id}`}>{id}</Link>,
            },
            title: { title: "Наименование", cell: ({ title }) => title },
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
