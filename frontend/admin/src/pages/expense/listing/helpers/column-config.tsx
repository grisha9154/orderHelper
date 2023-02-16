import { Columns } from "components/common/data-grid/interfaces";
import { ExpenseCategory } from "store/expense";
import { Actions } from "../components";

export const columnsConfig: Columns<ExpenseCategory> = {
  id: {
    title: "",
    cell: ({ id }) => <Actions id={id} />,
  },
  title: { title: "Наименование", cell: ({ title }) => title },
  description: {
    title: "Описание",
    cell: ({ description }) => description,
  },
  expensesSum: {
    title: "Траты",
    cell: ({ expensesSum }) => expensesSum?.toString(),
  },
};
