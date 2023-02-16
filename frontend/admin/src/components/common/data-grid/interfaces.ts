export interface BaseRow {
  id?: string | number;
}

interface ColumnConfig<TRow extends BaseRow> {
  title: string;
  cell: (row: TRow) => string | undefined | JSX.Element;
}

export type Columns<TRow extends BaseRow> = Partial<
  Record<keyof TRow, ColumnConfig<TRow>>
>;

export interface GridProps<TRow extends BaseRow> {
  rows: TRow[];
  columns: Columns<TRow>;
  isLoading?: boolean;
}
