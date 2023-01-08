import React, { useMemo } from "react";
import {
  DataGrid as MuiDataGrid,
  GridCellParams,
  GridColDef,
} from "@mui/x-data-grid";

import { BaseRow, GridProps } from "./interfaces";
import { GridLoader } from "./Loader";

export const DataGrid = <TRow extends BaseRow>({
  rows,
  isLoading,
  ...props
}: GridProps<TRow>) => {
  const columns = useMemo<GridColDef[]>(
    () =>
      Object.keys(props.columns).reduce<GridColDef[]>((acc, key) => {
        const column = props.columns[key as keyof typeof props.columns];

        if (column) {
          const cell: GridColDef = {
            field: key,
            headerName: column.title,
            renderCell: (params: GridCellParams) => (
              <div>{params.row && column.cell(params.row as TRow)}</div>
            ),
          };
          acc.push(cell);
        }

        return acc;
      }, []),
    [props.columns]
  );

  return (
    <MuiDataGrid
      loading={isLoading}
      sx={{ minHeight: "500px" }}
      autoHeight
      rows={rows}
      columns={columns}
      components={{
        LoadingOverlay: GridLoader,
      }}
    />
  );
};
