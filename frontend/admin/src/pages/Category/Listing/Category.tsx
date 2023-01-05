import { Box } from "@mui/material";
import { DataGrid } from "components";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "store";

export const CategoryListingPage: FC = () => {
  const categories = useAppSelector(({ category }) => category.categories);

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
        <Link to="create">
          <a>Создать</a>
        </Link>
      </Box>
      <div>
        <DataGrid
          rows={categories}
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
