import { Columns } from "components/common/data-grid/interfaces";
import moment from "moment";
import { Expense } from "store/expense";

export const columnsConfig: Columns<Expense> = {
  cost: {
    title: "Сумма",
    cell: ({ cost }) => cost.toString(),
  },
  paymentDate: {
    title: "Дата оплаты",
    cell: ({ paymentDate }) => moment(paymentDate).format("MM/DD/YYYY"),
  },
};
