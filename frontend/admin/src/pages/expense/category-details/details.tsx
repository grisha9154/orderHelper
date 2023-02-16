import { Box, Button } from "@mui/material";
import { DataGrid } from "components";
import { useAppForm } from "components/form";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetExpenseCategoryQuery } from "store/expense";
import { CreateExpensePopup } from "../common";
import { columnsConfig } from "./helpers";

interface FormValues {
  from: Date;
  to: Date;
}

interface AddExpenseProps {
  expenseCategoryId: string;
}

const AddExpense: FC<AddExpenseProps> = ({ expenseCategoryId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CreateExpensePopup
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        expenseCategoryId={expenseCategoryId}
      />
      <Button onClick={() => setIsOpen(true)}>Добавить</Button>
    </>
  );
};

const getDefaultDates = () => ({
  from: moment()
    .add({
      month: -1,
    })
    .toDate(),
  to: moment()
    .add({
      day: 1,
    })
    .toDate(),
});

export const ExpenseCategoryDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const [getCategory, { data }] = useLazyGetExpenseCategoryQuery();

  useEffect(() => {
    if (id) {
      getCategory({
        id,
        filter: getDefaultDates(),
      });
    }
  }, [getCategory, id]);

  const { Form, Controls } = useAppForm<FormValues>({
    defaultValues: getDefaultDates(),
    handleSubmit: async (values) => {
      if (id) {
        await getCategory({
          id,
          filter: {
            from: values.from,
            to: values.to,
          },
        });
      }
    },
  });

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>Детали категории расходов {data?.title}</h1>
      <Form>
        <Box>
          <Controls.Date name="from" />
          <Controls.Date name="to" />
        </Box>
        <Controls.SubmitButton>Поиск</Controls.SubmitButton>
      </Form>
      <Box>
        <h2>Сумма: {data?.expensesSum}</h2>
        <AddExpense expenseCategoryId={data?.id} />
      </Box>
      <DataGrid rows={data?.expenses || []} columns={columnsConfig} />
    </div>
  );
};
