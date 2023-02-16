import { FC } from "react";
import { useParams } from "react-router-dom";

import {
  useGetExpenseCategoryQuery,
  useUpdateExpenseCategoryMutation,
} from "store/expense";
import { ExpenseCategoryForm } from "../common";

export interface FormValues {
  title: string;
  description?: string;
}

export const ExpenseCategoryEditPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useGetExpenseCategoryQuery(
    {
      id: `${id}`,
    },
    { skip: !id }
  );

  const [updateExpenseCategory] = useUpdateExpenseCategoryMutation();

  return (
    <div>
      <h1>Редактирование категории расходов</h1>
      <ExpenseCategoryForm
        handleSubmit={async (values) => {
          if (id) {
            await updateExpenseCategory({
              id,
              title: values.title,
              description: values.description,
            }).unwrap();
          }
        }}
        defaultValues={{
          title: data?.title,
          description: data?.description,
        }}
      />
    </div>
  );
};
