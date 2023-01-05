export interface BaseRow {
  id?: string | number;
}

interface ColumnConfig<TRow extends BaseRow> {
  title: string;
  cell: (row: TRow) => string | undefined | JSX.Element;
}

export interface GridProps<TRow extends BaseRow> {
  rows: TRow[];
  columns: Partial<Record<keyof TRow, ColumnConfig<TRow>>>;
}
